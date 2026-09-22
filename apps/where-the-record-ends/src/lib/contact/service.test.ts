import type { ContactSubmissionRepository } from '@/lib/db/contact-submissions';

import type { ContactNotifier } from './mailer';
import { submitContactForm } from './service';
import type { TurnstileVerifier } from './turnstile';

const validSubmission = {
  name: '  Ada   Lovelace  ',
  email: ' ADA@EXAMPLE.COM ',
  topic: '  Family   record ',
  message: '  I found a record that may help this investigation.  ',
  sourceUrl: 'https://example.com/record',
  referringPage: '/cases/parentage/highland-creek',
  website: '',
  turnstileToken: 'verified-token',
};

function createDependencies(overrides?: {
  create?: ContactSubmissionRepository['create'];
  notify?: ContactNotifier['notify'];
  verify?: TurnstileVerifier['verify'];
}) {
  const repository: ContactSubmissionRepository = {
    create: jest.fn(
      overrides?.create ?? (async () => ({ id: 'submission-id' }))
    ),
    markNotificationSent: jest.fn(async () => undefined),
    markNotificationFailed: jest.fn(async () => undefined),
  };
  const notifier: ContactNotifier = {
    notify: jest.fn(overrides?.notify ?? (async () => undefined)),
  };
  const turnstile: TurnstileVerifier = {
    verify: jest.fn(
      overrides?.verify ?? (async () => ({ status: 'verified' as const }))
    ),
  };

  return { repository, notifier, turnstile };
}

describe('submitContactForm', () => {
  it('rejects invalid and unbounded fields before external calls', async () => {
    const dependencies = createDependencies();
    const result = await submitContactForm(
      {
        ...validSubmission,
        email: 'not-an-email',
        message: 'short',
        topic: 'x'.repeat(161),
      },
      dependencies
    );

    expect(result).toMatchObject({
      status: 'invalid',
      fieldErrors: {
        email: expect.any(Array),
        message: expect.any(Array),
        topic: expect.any(Array),
      },
    });
    expect(dependencies.turnstile.verify).not.toHaveBeenCalled();
    expect(dependencies.repository.create).not.toHaveBeenCalled();
  });

  it('rejects an untrusted referring-page context', async () => {
    const dependencies = createDependencies();
    const result = await submitContactForm(
      { ...validSubmission, referringPage: 'https://attacker.example/path' },
      dependencies
    );

    expect(result).toMatchObject({
      status: 'invalid',
      fieldErrors: { referringPage: expect.any(Array) },
    });
    expect(dependencies.turnstile.verify).not.toHaveBeenCalled();
  });

  it.each(['not-a-url', 'http://'])(
    'returns validation errors for malformed source URL %s',
    async (sourceUrl) => {
      const dependencies = createDependencies();
      const result = await submitContactForm(
        { ...validSubmission, sourceUrl },
        dependencies
      );

      expect(result).toMatchObject({
        status: 'invalid',
        fieldErrors: { sourceUrl: expect.any(Array) },
      });
      expect(dependencies.turnstile.verify).not.toHaveBeenCalled();
    }
  );

  it('short-circuits a filled honeypot without verification or persistence', async () => {
    const dependencies = createDependencies();
    const result = await submitContactForm(
      { website: 'https://spam.example' },
      dependencies
    );

    expect(result).toEqual({ status: 'honeypot' });
    expect(dependencies.turnstile.verify).not.toHaveBeenCalled();
    expect(dependencies.repository.create).not.toHaveBeenCalled();
    expect(dependencies.notifier.notify).not.toHaveBeenCalled();
  });

  it('rejects failed Turnstile verification without persistence', async () => {
    const dependencies = createDependencies({
      verify: async () => ({ status: 'rejected' }),
    });
    const result = await submitContactForm(validSubmission, dependencies);

    expect(result).toEqual({ status: 'verification_failed' });
    expect(dependencies.repository.create).not.toHaveBeenCalled();
    expect(dependencies.notifier.notify).not.toHaveBeenCalled();
  });

  it('returns a safe server error when persistence fails', async () => {
    const dependencies = createDependencies({
      create: async () => {
        throw new Error('private database detail');
      },
    });
    const result = await submitContactForm(validSubmission, dependencies);

    expect(result).toEqual({ status: 'server_error' });
    expect(dependencies.notifier.notify).not.toHaveBeenCalled();
  });

  it('persists normalized content before sending and records delivery', async () => {
    const callOrder: string[] = [];
    const dependencies = createDependencies({
      create: async () => {
        callOrder.push('persist');
        return { id: 'submission-id' };
      },
      notify: async () => {
        callOrder.push('notify');
      },
    });
    const result = await submitContactForm(validSubmission, dependencies);

    expect(result).toEqual({
      status: 'accepted',
      notificationDelivered: true,
    });
    expect(callOrder).toEqual(['persist', 'notify']);
    expect(dependencies.repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        topic: 'Family record',
        message: 'I found a record that may help this investigation.',
      })
    );
    expect(dependencies.repository.markNotificationSent).toHaveBeenCalledWith(
      'submission-id'
    );
    expect(
      dependencies.repository.markNotificationFailed
    ).not.toHaveBeenCalled();
  });

  it('returns success and records failure when notification delivery fails', async () => {
    const dependencies = createDependencies({
      notify: async () => {
        throw new Error('private SMTP detail');
      },
    });
    const result = await submitContactForm(validSubmission, dependencies);

    expect(result).toEqual({
      status: 'accepted',
      notificationDelivered: false,
    });
    expect(dependencies.repository.markNotificationFailed).toHaveBeenCalledWith(
      'submission-id'
    );
    expect(dependencies.repository.markNotificationSent).not.toHaveBeenCalled();
  });
});
