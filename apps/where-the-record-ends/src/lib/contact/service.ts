import type { ContactSubmissionRepository } from '@/lib/db/contact-submissions';

import type { ContactNotifier } from './mailer';
import type { TurnstileVerifier } from './turnstile';
import {
  contactSubmissionSchema,
  type AcceptedContactSubmission,
  type ContactFieldErrors,
} from './validation';

export type ContactSubmissionResult =
  | { status: 'accepted'; notificationDelivered: boolean }
  | { status: 'honeypot' }
  | { status: 'invalid'; fieldErrors: ContactFieldErrors }
  | { status: 'verification_failed' }
  | { status: 'server_error' };

export async function submitContactForm(
  rawSubmission: unknown,
  dependencies: {
    repository: ContactSubmissionRepository;
    notifier: ContactNotifier;
    turnstile: TurnstileVerifier;
  }
): Promise<ContactSubmissionResult> {
  if (
    typeof rawSubmission === 'object' &&
    rawSubmission !== null &&
    'website' in rawSubmission &&
    typeof rawSubmission.website === 'string' &&
    rawSubmission.website.trim() !== ''
  ) {
    return { status: 'honeypot' };
  }

  const parsed = contactSubmissionSchema.safeParse(rawSubmission);
  if (!parsed.success) {
    return {
      status: 'invalid',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const verification = await dependencies.turnstile.verify(
    parsed.data.turnstileToken
  );
  if (verification.status === 'rejected') {
    return { status: 'verification_failed' };
  }
  if (verification.status === 'unavailable') {
    return { status: 'server_error' };
  }

  const submission: AcceptedContactSubmission = {
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic,
    message: parsed.data.message,
    sourceUrl: parsed.data.sourceUrl,
    referringPage: parsed.data.referringPage,
  };

  let created: { id: string };
  try {
    created = await dependencies.repository.create(submission);
  } catch {
    return { status: 'server_error' };
  }

  try {
    await dependencies.notifier.notify(submission);
  } catch {
    try {
      await dependencies.repository.markNotificationFailed(created.id);
    } catch {
      // The accepted submission is durable even if its delivery-status update fails.
    }
    return { status: 'accepted', notificationDelivered: false };
  }

  try {
    await dependencies.repository.markNotificationSent(created.id);
  } catch {
    // Delivery succeeded; a status-update failure must not invite a duplicate.
  }
  return { status: 'accepted', notificationDelivered: true };
}
