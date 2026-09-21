import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function stripTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

// Convert notable projects and historical references to supporting links
export function addProfileLinks(text: string): React.ReactNode {
  if (typeof text !== 'string') return text;

  const sitecoreUrl = 'https://www.sitecore.com/products/xm-cloud';
  const bbsArchiveUrl =
    'http://bbslist.textfiles.com/510/#:~:text=510-829-0981';

  const parts = text.split(/(Sitecore XM Cloud|XM Cloud|5:30 Departure)/gi);

  return parts.map((part, index) => {
    const lowerPart = part.toLowerCase();
    const href =
      lowerPart === 'sitecore xm cloud' || lowerPart === 'xm cloud'
        ? sitecoreUrl
        : lowerPart === '5:30 departure'
          ? bbsArchiveUrl
          : null;

    if (href) {
      return React.createElement(
        'a',
        {
          key: index,
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
          className:
            'text-primary-600 hover:text-primary-700 underline decoration-primary-200 hover:decoration-primary-400 transition-colors',
        },
        part
      );
    }
    return part;
  });
}
