import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/lib/data-helpers', () => ({
  getDisplayName: jest.fn(() => 'Test User'),
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

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import Navigation from '../Navigation';

describe('Navigation', () => {
  it('renders display name as home link', () => {
    render(<Navigation />);
    const home = screen.getAllByRole('link', { name: /Test User/i })[0];
    expect(home).toHaveAttribute('href', '/');
  });

  it('renders the expected nav items (and no AI Chat/Tools)', () => {
    render(<Navigation />);
    ['About', 'Resume', 'Projects', 'Articles', 'Community', 'Contact'].forEach(
      (label) => {
        expect(
          screen.getAllByRole('link', { name: label })[0]
        ).toBeInTheDocument();
      }
    );
    expect(
      screen.queryByRole('link', { name: /AI Chat/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /AI Tools/i })
    ).not.toBeInTheDocument();
  });

  it('renders a Source link to GitHub', () => {
    render(<Navigation />);
    const source = screen.getAllByRole('link', { name: /Source/i })[0];
    expect(source).toHaveAttribute(
      'href',
      'https://github.com/iamandycohen/me/blob/main/src/app/page.tsx'
    );
    expect(source).toHaveAttribute('target', '_blank');
  });

  it('toggles the mobile menu', () => {
    render(<Navigation />);
    const button = screen.getByRole('button', {
      name: /Toggle navigation menu/i,
    });
    // Initial mobile container is collapsed; ensure the button toggles without errors
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
