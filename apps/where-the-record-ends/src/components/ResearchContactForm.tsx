'use client';

import { type FormEvent, useCallback, useRef, useState } from 'react';

import { TurnstileWidget } from '@/components/TurnstileWidget';
import type { ContactContext } from '@/lib/contact/context';

type FieldName = 'name' | 'email' | 'topic' | 'message' | 'sourceUrl';
type FieldErrors = Partial<Record<FieldName, string[]>>;
type FormState = 'idle' | 'submitting' | 'success' | 'validation' | 'server';

const inputClassName =
  'mt-2 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60';

function firstError(errors: FieldErrors, field: FieldName) {
  return errors[field]?.[0];
}

export function ResearchContactForm({
  context,
  turnstileSiteKey,
}: {
  context: ContactContext | null;
  turnstileSiteKey: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const handleTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setTurnstileError(false);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileError(true);
  }, []);

  function focusStatus() {
    window.requestAnimationFrame(() => statusRef.current?.focus());
  }

  function focusFirstInvalid(errors: FieldErrors) {
    const firstField = (Object.keys(errors) as FieldName[])[0];
    const control = firstField
      ? formRef.current?.elements.namedItem(firstField)
      : null;
    if (control instanceof HTMLElement) {
      window.requestAnimationFrame(() => control.focus());
    } else {
      focusStatus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (!turnstileToken) {
      setTurnstileError(true);
      setFormState('validation');
      focusStatus();
      return;
    }

    const formData = new FormData(form);
    setFormState('submitting');
    setFieldErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          topic: formData.get('topic'),
          message: formData.get('message'),
          sourceUrl: formData.get('sourceUrl'),
          referringPage: context?.path,
          website: formData.get('website'),
          turnstileToken,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        ok: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.ok && result?.ok) {
        form.reset();
        setFormState('success');
        setResetSignal((value) => value + 1);
        focusStatus();
        return;
      }

      if (response.status === 422) {
        const errors = result?.fieldErrors ?? {};
        setFieldErrors(errors);
        setFormState('validation');
        setResetSignal((value) => value + 1);
        focusFirstInvalid(errors);
        return;
      }

      if (result?.error === 'verification_failed') {
        setTurnstileError(true);
        setFormState('validation');
        setResetSignal((value) => value + 1);
        focusStatus();
        return;
      }

      setFormState('server');
      setResetSignal((value) => value + 1);
      focusStatus();
    } catch {
      setFormState('server');
      setResetSignal((value) => value + 1);
      focusStatus();
    }
  }

  if (formState === 'success') {
    return (
      <div
        ref={statusRef}
        className="rounded-2xl border border-moss/30 bg-moss/10 p-6 outline-none"
        role="status"
        tabIndex={-1}
      >
        <p className="font-serif text-3xl leading-tight">
          Thanks. Your research note has been received.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Your submission will be reviewed as a research lead. It will not be
          added to the public record automatically.
        </p>
      </div>
    );
  }

  const isSubmitting = formState === 'submitting';

  return (
    <form
      ref={formRef}
      action="/api/contact"
      method="post"
      noValidate
      onSubmit={handleSubmit}
    >
      {context ? (
        <div className="mb-8 rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <p className="eyebrow !text-[0.58rem]">Regarding</p>
          <p className="mt-2 font-serif text-2xl">{context.label}</p>
        </div>
      ) : null}

      <div
        ref={statusRef}
        className="mb-6 outline-none"
        role="alert"
        tabIndex={-1}
      >
        {formState === 'validation' ? (
          <p className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-accent">
            Please check the highlighted fields and complete the verification.
          </p>
        ) : null}
        {formState === 'server' ? (
          <p className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-accent">
            Your note could not be submitted right now. Please try again, or use
            the email option below.
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          required
          error={firstError(fieldErrors, 'name')}
        >
          <input
            className={inputClassName}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            disabled={isSubmitting}
            aria-describedby={
              firstError(fieldErrors, 'name') ? 'contact-name-error' : undefined
            }
            aria-invalid={Boolean(firstError(fieldErrors, 'name'))}
          />
        </Field>

        <Field
          label="Email"
          name="email"
          required
          error={firstError(fieldErrors, 'email')}
        >
          <input
            className={inputClassName}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            required
            disabled={isSubmitting}
            aria-describedby={
              firstError(fieldErrors, 'email')
                ? 'contact-email-error'
                : undefined
            }
            aria-invalid={Boolean(firstError(fieldErrors, 'email'))}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="What are you researching?"
          name="topic"
          hint="Optional — for example, a person, family, place, or case"
          error={firstError(fieldErrors, 'topic')}
        >
          <input
            className={inputClassName}
            id="contact-topic"
            name="topic"
            type="text"
            maxLength={160}
            disabled={isSubmitting}
            aria-describedby={
              firstError(fieldErrors, 'topic')
                ? 'contact-topic-error'
                : 'contact-topic-hint'
            }
            aria-invalid={Boolean(firstError(fieldErrors, 'topic'))}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Message"
          name="message"
          required
          error={firstError(fieldErrors, 'message')}
        >
          <textarea
            className={`${inputClassName} min-h-48 resize-y`}
            id="contact-message"
            name="message"
            minLength={10}
            maxLength={10000}
            required
            disabled={isSubmitting}
            aria-describedby={
              firstError(fieldErrors, 'message')
                ? 'contact-message-error'
                : undefined
            }
            aria-invalid={Boolean(firstError(fieldErrors, 'message'))}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Source or record URL"
          name="sourceUrl"
          hint="Optional — link to a catalog entry, public record, or repository page"
          error={firstError(fieldErrors, 'sourceUrl')}
        >
          <input
            className={inputClassName}
            id="contact-sourceUrl"
            name="sourceUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            maxLength={2048}
            placeholder="https://"
            disabled={isSubmitting}
            aria-describedby={
              firstError(fieldErrors, 'sourceUrl')
                ? 'contact-sourceUrl-error'
                : 'contact-sourceUrl-hint'
            }
            aria-invalid={Boolean(firstError(fieldErrors, 'sourceUrl'))}
          />
        </Field>
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto size-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="mt-8">
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          resetSignal={resetSignal}
          onTokenChange={handleTokenChange}
          onError={handleTurnstileError}
        />
        {turnstileError ? (
          <p className="mt-2 text-sm text-accent" role="alert">
            Please complete the verification before submitting.
          </p>
        ) : null}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink/55">
        Your name, email address, and message will be used only to review your
        submission and respond to you.
      </p>

      <button
        className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-55"
        type="submit"
        disabled={isSubmitting || !turnstileSiteKey}
      >
        {isSubmitting ? 'Sending research note…' : 'Send research note'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required = false,
  hint,
  error,
  children,
}: {
  label: string;
  name: FieldName;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="text-sm font-semibold text-ink"
        htmlFor={`contact-${name}`}
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      {hint ? (
        <p
          className="mt-1 text-xs leading-relaxed text-ink/50"
          id={`contact-${name}-hint`}
        >
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className="mt-2 text-sm text-accent" id={`contact-${name}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
