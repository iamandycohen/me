export const siteName = 'Where the Record Ends';
export const siteDescription =
  'An evidence-led family history: a family atlas, open research cases, and the stories the records can support.';
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wheretherecordends.com';
export const isPublic = process.env.SITE_IS_PUBLIC === 'true';

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString();
}
