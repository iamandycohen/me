import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock Next.js components and hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/link', () => {
  return function MockLink({ children, href, onClick, className, ...props }: any) {
    return (
      <a href={href} onClick={onClick} className={className} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the data helpers BEFORE importing the component
jest.mock('@/lib/data-helpers', () => ({
  getDisplayName: jest.fn(() => 'John Doe') // Default return value
}));

jest.mock('@/lib/data', () => ({
  contact: {
    name: 'Test User',
    email: 'test@example.com'
  }
}));

// Import after mocking
import { usePathname } from 'next/navigation';
import Navigation from '../Navigation';
import { getDisplayName } from '@/lib/data-helpers';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockGetDisplayName = getDisplayName as jest.MockedFunction<typeof getDisplayName>;

describe('Navigation', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
    mockGetDisplayName.mockReturnValue('John Doe');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders navigation with correct structure', () => {
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('bg-white', 'shadow-sm', 'sticky', 'top-0', 'z-50');
    });

    test('displays the display name as home link', () => {
      render(<Navigation />);
      
      // Since getDisplayName is called at module level, we just verify the mock is returned
      const homeLink = screen.getByRole('link', { name: 'John Doe' });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    test('renders all navigation items', () => {
      render(<Navigation />);
      
      const expectedItems = [
        'About', 'Resume', 'Projects', 'Community', 'Contact', 'AI Chat', 'AI Tools Demo'
      ];
      
      expectedItems.forEach(item => {
        // Each item should appear twice - once in desktop and once in mobile menu
        const links = screen.getAllByRole('link', { name: item });
        expect(links).toHaveLength(2);
      });
    });

    test('renders GitHub link with correct href', () => {
      mockUsePathname.mockReturnValue('/resume');
      render(<Navigation />);
      
      const githubLinks = screen.getAllByRole('link', { name: /View page on/ });
      expect(githubLinks).toHaveLength(2); // Desktop and mobile
      expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/iamandycohen/me/blob/main/src/app/resume/page.tsx');
      expect(githubLinks[0]).toHaveAttribute('target', '_blank');
      expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Navigation Links', () => {
    test('renders correct href for each navigation item', () => {
      render(<Navigation />);
      
      const expectedLinks = [
        { name: 'About', href: '/' },
        { name: 'Resume', href: '/resume' },
        { name: 'Projects', href: '/projects' },
        { name: 'Community', href: '/community' },
        { name: 'Contact', href: '/contact' },
        { name: 'AI Chat', href: '/ai-chat' },
        { name: 'AI Tools Demo', href: '/ai-tools' }
      ];
      
      expectedLinks.forEach(({ name, href }) => {
        const links = screen.getAllByRole('link', { name });
        const desktopLink = links[0]; // First one should be desktop
        expect(desktopLink).toHaveAttribute('href', href);
      });
    });

    test('navigation items have correct styling classes', () => {
      render(<Navigation />);
      
      const aboutLinks = screen.getAllByRole('link', { name: 'About' });
      const desktopAboutLink = aboutLinks[0]; // First one is desktop
      expect(desktopAboutLink).toHaveClass(
        'text-gray-600',
        'hover:text-gray-900',
        'transition-colors',
        'font-medium'
      );
    });
  });

  describe('GitHub URL Generation', () => {
    test.each([
      ['/', 'page.tsx'],
      ['/resume', 'resume/page.tsx'],
      ['/projects', 'projects/page.tsx'],
      ['/community', 'community/page.tsx'],
      ['/contact', 'contact/page.tsx'],
      ['/ai-chat', 'ai-chat/page.tsx'],
      ['/ai-tools', 'ai-tools/page.tsx'],
      ['/unknown-path', 'page.tsx'] // fallback
    ])('generates correct GitHub URL for path %s', (path, expectedFile) => {
      mockUsePathname.mockReturnValue(path);
      render(<Navigation />);
      
      const githubLinks = screen.getAllByRole('link', { name: /View page on/ });
      expect(githubLinks[0]).toHaveAttribute(
        'href', 
        `https://github.com/iamandycohen/me/blob/main/src/app/${expectedFile}`
      );
    });
  });

  describe('Mobile Menu Functionality', () => {
    test('mobile menu toggle button is present', () => {
      render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveClass('md:hidden');
    });

    test('mobile menu is closed by default', () => {
      const { container } = render(<Navigation />);
      
      const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
      expect(mobileMenu).toHaveClass('max-h-0', 'opacity-0', 'overflow-hidden');
    });

    test('clicking toggle button opens mobile menu', async () => {
      const { container } = render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      await user.click(toggleButton);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-96', 'opacity-100');
        expect(mobileMenu).not.toHaveClass('overflow-hidden');
      });
    });

    test('clicking toggle button twice closes mobile menu', async () => {
      const { container } = render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Open menu
      await user.click(toggleButton);
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-96', 'opacity-100');
      });
      
      // Close menu
      await user.click(toggleButton);
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-0', 'opacity-0', 'overflow-hidden');
      });
    });

    test('hamburger icon animates when menu is open', async () => {
      render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      const hamburgerLines = toggleButton.querySelectorAll('div');
      
      expect(hamburgerLines).toHaveLength(3);
      
      // Initially closed state
      expect(hamburgerLines[0]).not.toHaveClass('rotate-45', 'translate-y-2');
      expect(hamburgerLines[1]).not.toHaveClass('opacity-0');
      expect(hamburgerLines[2]).not.toHaveClass('-rotate-45', '-translate-y-2');
      
      // Open menu
      await user.click(toggleButton);
      
      await waitFor(() => {
        expect(hamburgerLines[0]).toHaveClass('rotate-45', 'translate-y-2');
        expect(hamburgerLines[1]).toHaveClass('opacity-0');
        expect(hamburgerLines[2]).toHaveClass('-rotate-45', '-translate-y-2');
      });
    });

    test('clicking mobile navigation link closes menu', async () => {
      const { container } = render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Open menu
      await user.click(toggleButton);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-96', 'opacity-100');
      });
      
      // Find mobile about link - it should be in the mobile section
      const allAboutLinks = screen.getAllByRole('link', { name: 'About' });
      const mobileAboutLink = allAboutLinks[1]; // Second one should be mobile
      
      fireEvent.click(mobileAboutLink);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-0', 'opacity-0', 'overflow-hidden');
      });
    });

    test('clicking mobile GitHub link closes menu', async () => {
      const { container } = render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Open menu
      await user.click(toggleButton);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-96', 'opacity-100');
      });
      
      // Find mobile GitHub link - it should be the second one
      const allGitHubLinks = screen.getAllByRole('link', { name: /View page on/ });
      const mobileGitHubLink = allGitHubLinks[1]; // Second one should be mobile
      
      fireEvent.click(mobileGitHubLink);
      
      await waitFor(() => {
        const mobileMenu = container.querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-0', 'opacity-0', 'overflow-hidden');
      });
    });
  });

  describe('Responsive Design', () => {
    test('desktop navigation is hidden on mobile', () => {
      render(<Navigation />);
      
      const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex');
      expect(desktopNav).toBeInTheDocument();
      expect(desktopNav).toHaveClass('hidden', 'md:flex');
    });

    test('mobile toggle button is hidden on desktop', () => {
      render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(toggleButton).toHaveClass('md:hidden');
    });

    test('mobile menu is hidden on desktop', () => {
      render(<Navigation />);
      
      const mobileMenu = screen.getByRole('navigation').querySelector('.md\\:hidden.transition-all');
      expect(mobileMenu).toHaveClass('md:hidden');
    });
  });

  describe('Accessibility', () => {
    test('mobile menu toggle has proper aria-label', () => {
      render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle navigation menu');
    });

    test('GitHub link has proper title attribute', () => {
      render(<Navigation />);
      
      const githubLinks = screen.getAllByRole('link', { name: /View page on/ });
      const desktopGithubLink = githubLinks[0];
      expect(desktopGithubLink).toHaveAttribute('title', 'View page source on GitHub');
    });

    test('all links are keyboard accessible', () => {
      render(<Navigation />);
      
      const allLinks = screen.getAllByRole('link');
      allLinks.forEach(link => {
        expect(link).toBeVisible();
        // Links should be focusable by default
        expect(link.tagName).toBe('A');
      });
    });

    test('mobile toggle button is keyboard accessible', async () => {
      render(<Navigation />);
      
      const toggleButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Focus the button
      toggleButton.focus();
      expect(toggleButton).toHaveFocus();
      
      // Press Enter to activate
      fireEvent.keyDown(toggleButton, { key: 'Enter', code: 'Enter' });
      fireEvent.click(toggleButton); // Simulate the click that would happen
      
      await waitFor(() => {
        const mobileMenu = screen.getByRole('navigation').querySelector('.md\\:hidden.transition-all');
        expect(mobileMenu).toHaveClass('max-h-96', 'opacity-100');
      });
    });
  });

  describe('GitHub Icon Component', () => {
    test('GitHub icon is rendered with proper SVG attributes', () => {
      render(<Navigation />);
      
      const githubIcon = screen.getByRole('navigation').querySelector('svg');
      expect(githubIcon).toBeInTheDocument();
      expect(githubIcon).toHaveClass('h-4', 'w-4');
      expect(githubIcon).toHaveAttribute('fill', 'currentColor');
      expect(githubIcon).toHaveAttribute('viewBox', '0 0 24 24');
    });

    test('GitHub icon has proper path element', () => {
      render(<Navigation />);
      
      const githubIcon = screen.getByRole('navigation').querySelector('svg');
      const path = githubIcon?.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('fill-rule', 'evenodd');
      expect(path).toHaveAttribute('clip-rule', 'evenodd');
    });
  });

  describe('Layout and Styling', () => {
    test('navigation has sticky positioning with correct classes', () => {
      render(<Navigation />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('sticky', 'top-0', 'z-50', 'bg-white', 'shadow-sm');
    });

    test('container uses container-max class', () => {
      render(<Navigation />);
      
      const container = screen.getByRole('navigation').querySelector('.container-max');
      expect(container).toBeInTheDocument();
    });

    test('desktop navigation has proper spacing classes', () => {
      render(<Navigation />);
      
      const desktopNav = screen.getByRole('navigation').querySelector('.hidden.md\\:flex');
      expect(desktopNav).toHaveClass('items-center', 'space-x-8');
    });

    test('separator elements are present', () => {
      const { container } = render(<Navigation />);
      
      // Desktop separator
      const desktopSeparator = container.querySelector('.h-5.w-px.bg-gray-300');
      expect(desktopSeparator).toBeInTheDocument();
      
      // Mobile separator  
      const mobileSeparator = container.querySelector('.mx-4.my-2.h-px.bg-gray-200');
      expect(mobileSeparator).toBeInTheDocument();
    });
  });
});
