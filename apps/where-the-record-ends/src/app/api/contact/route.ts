import { NextResponse } from 'next/server';

import { createSmtpContactNotifier } from '@/lib/contact/mailer';
import { submitContactForm } from '@/lib/contact/service';
import { createTurnstileVerifier } from '@/lib/contact/turnstile';
import { createContactSubmissionRepository } from '@/lib/db/contact-submissions';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_REQUEST_BYTES = 65_536;

type PublicError = 'validation_error' | 'verification_failed' | 'server_error';

function errorResponse(
  error: PublicError,
  status: 400 | 422 | 503,
  fieldErrors?: Record<string, string[] | undefined>
) {
  return NextResponse.json(
    fieldErrors ? { ok: false, error, fieldErrors } : { ok: false, error },
    { status }
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return errorResponse('validation_error', 422);
  }

  let rawSubmission: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
      return errorResponse('validation_error', 422);
    }
    rawSubmission = JSON.parse(rawBody);
  } catch {
    return errorResponse('validation_error', 422);
  }

  const result = await submitContactForm(rawSubmission, {
    repository: createContactSubmissionRepository(),
    notifier: createSmtpContactNotifier(),
    turnstile: createTurnstileVerifier(),
  });

  switch (result.status) {
    case 'accepted':
    case 'honeypot':
      return NextResponse.json({ ok: true });
    case 'invalid':
      return errorResponse('validation_error', 422, result.fieldErrors);
    case 'verification_failed':
      return errorResponse('verification_failed', 400);
    case 'server_error':
      return errorResponse('server_error', 503);
  }
}
