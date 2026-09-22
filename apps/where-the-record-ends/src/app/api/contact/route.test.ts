/** @jest-environment node */

import { submitContactForm } from '@/lib/contact/service';

import { POST } from './route';

jest.mock('@/lib/contact/service', () => ({
  submitContactForm: jest.fn(),
}));
jest.mock('@/lib/contact/mailer', () => ({
  createSmtpContactNotifier: jest.fn(() => ({})),
}));
jest.mock('@/lib/contact/turnstile', () => ({
  createTurnstileVerifier: jest.fn(() => ({})),
}));
jest.mock('@/lib/db/contact-submissions', () => ({
  createContactSubmissionRepository: jest.fn(() => ({})),
}));

const mockedSubmitContactForm = jest.mocked(submitContactForm);

afterEach(() => {
  jest.clearAllMocks();
});

it('accepts the maximum multibyte message payload for normal validation', async () => {
  mockedSubmitContactForm.mockResolvedValue({
    status: 'accepted',
    notificationDelivered: true,
  });
  const body = JSON.stringify({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: '研'.repeat(10_000),
    website: '',
    turnstileToken: 'test-token',
  });
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'content-length': String(new TextEncoder().encode(body).byteLength),
    },
    body,
  });

  const response = await POST(request);

  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toEqual({ ok: true });
  expect(mockedSubmitContactForm).toHaveBeenCalledTimes(1);
});

it('rejects oversized request bodies before parsing', async () => {
  const request = new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-length': '65537' },
    body: '{}',
  });

  const response = await POST(request);

  expect(response.status).toBe(422);
  expect(mockedSubmitContactForm).not.toHaveBeenCalled();
});
