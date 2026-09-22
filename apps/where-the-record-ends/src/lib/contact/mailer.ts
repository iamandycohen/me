import nodemailer from 'nodemailer';
import { z } from 'zod';

import { resolveContactContext } from './context';
import type { AcceptedContactSubmission } from './validation';

const RESEARCH_EMAIL = 'research@wheretherecordends.com';
const emailAddressSchema = z.email().max(254);
const SMTP_CONNECTION_TIMEOUT_MS = 7_000;
const SMTP_GREETING_TIMEOUT_MS = 5_000;
const SMTP_SOCKET_TIMEOUT_MS = 10_000;

export type ContactNotifier = {
  notify(submission: AcceptedContactSubmission): Promise<void>;
};

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function parseSmtpSecure(
  value: string | undefined,
  port: number
): boolean | null {
  if (value === undefined || value.trim() === '') {
    return port === 465;
  }

  switch (value.trim().toLowerCase()) {
    case 'true':
    case '1':
    case 'yes':
      return true;
    case 'false':
    case '0':
    case 'no':
      return false;
    default:
      return null;
  }
}

function buildText(submission: AcceptedContactSubmission): string {
  const context = resolveContactContext(submission.referringPage);

  return [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Topic: ${submission.topic ?? 'Not provided'}`,
    `Referring page: ${context?.path ?? 'Not provided'}`,
    `Source URL: ${submission.sourceUrl ?? 'Not provided'}`,
    '',
    'Message:',
    submission.message,
  ].join('\n');
}

export function createSmtpContactNotifier({
  getConfig = () => ({
    host: process.env.SMTP_HOST?.trim() || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || '465'),
    secure: parseSmtpSecure(
      process.env.SMTP_SECURE,
      Number(process.env.SMTP_PORT || '465')
    ),
    user: process.env.SMTP_USER?.trim(),
    password: process.env.SMTP_PASSWORD,
    notificationTo:
      process.env.CONTACT_NOTIFICATION_TO?.trim() || RESEARCH_EMAIL,
  }),
}: {
  getConfig?: () => {
    host: string;
    port: number;
    secure: boolean | null;
    user: string | undefined;
    password: string | undefined;
    notificationTo: string;
  };
} = {}): ContactNotifier {
  return {
    async notify(submission) {
      const config = getConfig();
      if (
        !config.host ||
        !Number.isInteger(config.port) ||
        config.port < 1 ||
        config.port > 65_535 ||
        config.secure === null ||
        !config.user ||
        !config.password ||
        !emailAddressSchema.safeParse(config.notificationTo).success
      ) {
        throw new Error('SMTP is not configured.');
      }

      const transport = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        connectionTimeout: SMTP_CONNECTION_TIMEOUT_MS,
        greetingTimeout: SMTP_GREETING_TIMEOUT_MS,
        socketTimeout: SMTP_SOCKET_TIMEOUT_MS,
        auth: {
          user: config.user,
          pass: config.password,
        },
      });
      const context = resolveContactContext(submission.referringPage);
      const fallbackSubject = submission.topic
        ? `[Where the Record Ends] ${sanitizeHeaderValue(submission.topic)}`
        : '[Where the Record Ends] New research note';

      try {
        await transport.sendMail({
          from: `Where the Record Ends <${RESEARCH_EMAIL}>`,
          to: config.notificationTo,
          replyTo: {
            name: sanitizeHeaderValue(submission.name),
            address: submission.email,
          },
          subject: context?.subject ?? fallbackSubject,
          text: buildText(submission),
        });
      } finally {
        transport.close();
      }
    },
  };
}
