import { z } from 'zod';

import { resolveContactContext } from './context';

const collapseWhitespace = (value: string) => value.trim().replace(/\s+/g, ' ');
const trim = (value: string) => value.trim();
const emptyToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

function isHttpUrl(value: string): boolean {
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const sourceUrlSchema = z.preprocess(
  emptyToUndefined,
  z
    .url({ message: 'Enter a valid source or record URL.' })
    .max(2048, 'Source URL must be 2,048 characters or fewer.')
    .refine(isHttpUrl, {
      message: 'Source URL must begin with http:// or https://.',
    })
    .optional()
);

const referringPageSchema = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .max(255, 'Referring page is too long.')
    .refine((value) => resolveContactContext(value) !== null, {
      message: 'Referring page is not recognized.',
    })
    .optional()
);

export const contactSubmissionSchema = z.strictObject({
  name: z
    .string({ message: 'Enter your name.' })
    .transform(collapseWhitespace)
    .pipe(
      z
        .string()
        .min(1, 'Enter your name.')
        .max(120, 'Name must be 120 characters or fewer.')
    ),
  email: z
    .string({ message: 'Enter your email address.' })
    .transform((value) => value.trim().toLowerCase())
    .pipe(
      z
        .email('Enter a valid email address.')
        .max(254, 'Email must be 254 characters or fewer.')
    ),
  topic: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .transform(collapseWhitespace)
      .pipe(z.string().max(160, 'Topic must be 160 characters or fewer.'))
      .optional()
  ),
  message: z
    .string({ message: 'Enter a message.' })
    .transform(trim)
    .pipe(
      z
        .string()
        .min(10, 'Message must be at least 10 characters.')
        .max(10_000, 'Message must be 10,000 characters or fewer.')
    ),
  sourceUrl: sourceUrlSchema,
  referringPage: referringPageSchema,
  website: z
    .string()
    .max(200, 'Invalid submission.')
    .transform(trim)
    .optional()
    .default(''),
  turnstileToken: z
    .string({ message: 'Complete the anti-spam check.' })
    .trim()
    .min(1, 'Complete the anti-spam check.')
    .max(2048, 'Invalid anti-spam token.'),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export type AcceptedContactSubmission = Omit<
  ContactSubmissionInput,
  'website' | 'turnstileToken'
>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactSubmissionInput, string[]>
>;
