import { render, screen } from '@testing-library/react';

jest.mock('@/lib/data-helpers', () => ({
  getDisplayName: jest.fn(() => 'Test User'),
  formatLinkedInUrl: jest.fn(() => 'https://linkedin.com/in/testuser'),
}));

jest.mock('@/lib/data', () => ({
  __esModule: true,
  default: {
    contact: {
      name: 'Test User',
      email: 'test@example.com',
      location: 'Somewhere',
      linkedin: 'linkedin.com/in/testuser',
    },
  },
}));

import Footer from '../Footer';

describe('Footer', () => {
  it('renders display name and current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
  });

  it('renders LinkedIn and GitHub links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/testuser'
    );
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/iamandycohen'
    );
  });

  it('renders the editorial tagline', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Built to last\. Built for what comes next\./i)
    ).toBeInTheDocument();
  });
});
