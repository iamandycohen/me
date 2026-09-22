import nodemailer from 'nodemailer';

import { createSmtpContactNotifier } from './mailer';

const submission = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  topic: 'Family record',
  message: 'I found a record that may help this investigation.',
  sourceUrl: 'https://example.com/record',
  referringPage: '/cases/parentage/highland-creek',
};

afterEach(() => {
  jest.restoreAllMocks();
});

it('bounds SMTP waits and closes the transport after delivery', async () => {
  const sendMail = jest.fn(async () => ({ messageId: 'message-id' }));
  const close = jest.fn();
  const createTransport = jest
    .spyOn(nodemailer, 'createTransport')
    .mockReturnValue({ sendMail, close } as never);
  const notifier = createSmtpContactNotifier({
    getConfig: () => ({
      host: 'smtp.example.com',
      port: 465,
      secure: true,
      user: 'research@example.com',
      password: 'app-password',
      notificationTo: 'research@example.com',
    }),
  });

  await notifier.notify(submission);

  expect(createTransport).toHaveBeenCalledWith(
    expect.objectContaining({
      connectionTimeout: 7_000,
      greetingTimeout: 5_000,
      socketTimeout: 10_000,
    })
  );
  expect(sendMail).toHaveBeenCalledTimes(1);
  expect(close).toHaveBeenCalledTimes(1);
});

it('closes the transport when delivery fails', async () => {
  const sendMail = jest.fn(async () => {
    throw new Error('delivery failed');
  });
  const close = jest.fn();
  jest
    .spyOn(nodemailer, 'createTransport')
    .mockReturnValue({ sendMail, close } as never);
  const notifier = createSmtpContactNotifier({
    getConfig: () => ({
      host: 'smtp.example.com',
      port: 465,
      secure: true,
      user: 'research@example.com',
      password: 'app-password',
      notificationTo: 'research@example.com',
    }),
  });

  await expect(notifier.notify(submission)).rejects.toThrow('delivery failed');
  expect(close).toHaveBeenCalledTimes(1);
});
