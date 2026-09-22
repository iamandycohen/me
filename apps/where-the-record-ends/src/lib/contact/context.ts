export type ContactContext = {
  path: string;
  label: string;
  subject: string;
};

const contactContexts = {
  '/cases/parentage/highland-creek': {
    path: '/cases/parentage/highland-creek',
    label: 'Highland Creek',
    subject: '[Where the Record Ends] Research lead — Highland Creek',
  },
} as const satisfies Record<string, ContactContext>;

export function resolveContactContext(
  path: string | null | undefined
): ContactContext | null {
  if (!path) {
    return null;
  }

  if (!Object.hasOwn(contactContexts, path)) {
    return null;
  }

  return contactContexts[path as keyof typeof contactContexts] ?? null;
}

export const trustedReferringPages = Object.freeze(
  Object.keys(contactContexts)
) as readonly string[];
