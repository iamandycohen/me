import {
  getFirstName,
  getLastName,
  getDisplayName,
  getCurrentRole,
  formatLinkedInUrl,
  getBioParagraphs,
  truncateDescription,
  formatRoleTitle,
  getRoleDuration,
  getProfessionalTagline
} from '../data-helpers';
import type { Contact, Role, Bio } from '@/types';

describe('Data Helpers', () => {
  const mockContact: Contact = {
    name: 'John Michael Smith',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnsmith'
  };

  const mockRole: Role = {
    title: 'Senior Software Engineer',
    company: 'Tech Company',
    period: '2020 - Present',
    description: 'Building awesome software',
    highlights: ['Led team of 5 developers', 'Increased performance by 40%']
  };

  const mockBio: Bio = {
    short: 'Passionate software engineer with 5+ years experience.',
    full: 'A passionate software engineer with over 5 years of experience building scalable web applications.'
  };

  describe('name extraction functions', () => {
    test('getFirstName should return first name', () => {
      expect(getFirstName(mockContact)).toBe('John');
    });

    test('getFirstName should handle single name', () => {
      const singleNameContact = { ...mockContact, name: 'John' };
      expect(getFirstName(singleNameContact)).toBe('John');
    });

    test('getLastName should return last name', () => {
      expect(getLastName(mockContact)).toBe('Smith');
    });

    test('getLastName should handle single name', () => {
      const singleNameContact = { ...mockContact, name: 'John' };
      expect(getLastName(singleNameContact)).toBe('John');
    });

    test('getLastName should handle multiple middle names', () => {
      const complexNameContact = { ...mockContact, name: 'John Michael Patrick Smith Jr.' };
      expect(getLastName(complexNameContact)).toBe('Jr.');
    });

    test('getDisplayName should return full name', () => {
      expect(getDisplayName(mockContact)).toBe('John Michael Smith');
    });
  });

  describe('role functions', () => {
    test('getCurrentRole should return first role from array', () => {
      const roles = [mockRole, { ...mockRole, title: 'Junior Developer' }];
      expect(getCurrentRole(roles)).toBe(mockRole);
    });

    test('formatRoleTitle should combine title and company', () => {
      expect(formatRoleTitle(mockRole)).toBe('Senior Software Engineer at Tech Company');
    });

    test('getRoleDuration should detect current role', () => {
      const currentRole = { ...mockRole, period: '2020 - Present' };
      expect(getRoleDuration(currentRole)).toBe('Current Role');
    });

    test('getRoleDuration should detect current role case insensitive', () => {
      const currentRole = { ...mockRole, period: '2020 - present' };
      expect(getRoleDuration(currentRole)).toBe('Current Role');
    });

    test('getRoleDuration should return period for past roles', () => {
      const pastRole = { ...mockRole, period: '2018 - 2020' };
      expect(getRoleDuration(pastRole)).toBe('2018 - 2020');
    });
  });

  describe('formatLinkedInUrl', () => {
    test('should add https prefix when missing', () => {
      expect(formatLinkedInUrl('linkedin.com/in/johnsmith')).toBe('https://linkedin.com/in/johnsmith');
    });

    test('should preserve existing https prefix', () => {
      const httpsUrl = 'https://linkedin.com/in/johnsmith';
      expect(formatLinkedInUrl(httpsUrl)).toBe(httpsUrl);
    });

    test('should preserve existing http prefix', () => {
      const httpUrl = 'http://linkedin.com/in/johnsmith';
      expect(formatLinkedInUrl(httpUrl)).toBe(httpUrl);
    });
  });

  describe('getBioParagraphs', () => {
    test('should split bio text by double newlines', () => {
      const bioText = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
      const result = getBioParagraphs(bioText);
      expect(result).toEqual([
        'First paragraph.',
        'Second paragraph.',
        'Third paragraph.'
      ]);
    });

    test('should filter out empty paragraphs', () => {
      const bioText = 'First paragraph.\n\n\n\nSecond paragraph.\n\n   \n\nThird paragraph.';
      const result = getBioParagraphs(bioText);
      expect(result).toEqual([
        'First paragraph.',
        'Second paragraph.',
        'Third paragraph.'
      ]);
    });

    test('should handle single paragraph', () => {
      const bioText = 'Single paragraph text.';
      const result = getBioParagraphs(bioText);
      expect(result).toEqual(['Single paragraph text.']);
    });

    test('should handle empty string', () => {
      expect(getBioParagraphs('')).toEqual([]);
    });
  });

  describe('truncateDescription', () => {
    test('should truncate long text with ellipsis', () => {
      const longText = 'This is a very long description that should be truncated';
      const result = truncateDescription(longText, 20);
      expect(result).toBe('This is a very long...');
    });

    test('should not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateDescription(shortText, 20);
      expect(result).toBe('Short text');
    });

    test('should use default max length of 50', () => {
      const text = 'This is a text that is exactly fifty characters long!';
      expect(text).toHaveLength(53); // Verify our test text is > 50 chars
      const result = truncateDescription(text);
      expect(result).toBe('This is a text that is exactly fifty characters lo...');
    });

    test('should handle text exactly at max length', () => {
      const text = 'This is exactly twenty';
      expect(text).toHaveLength(22);
      const result = truncateDescription(text, 22);
      expect(result).toBe(text);
    });

    test('should trim before adding ellipsis', () => {
      const textWithSpaces = 'This has trailing spaces     ';
      const result = truncateDescription(textWithSpaces, 20);
      expect(result).toBe('This has trailing sp...');
    });
  });

  describe('getProfessionalTagline', () => {
    test('should combine role and bio information', () => {
      const result = getProfessionalTagline(mockRole, mockBio);
      expect(result).toBe('Senior Software Engineer at Tech Company. Passionate software engineer with 5+ years experience.');
    });

    test('should handle role with no bio', () => {
      const emptyBio = { short: '', full: '' };
      const result = getProfessionalTagline(mockRole, emptyBio);
      expect(result).toBe('Senior Software Engineer at Tech Company. ');
    });
  });
});
