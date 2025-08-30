import { render, screen } from '@testing-library/react';

// Mock the data helpers BEFORE importing the component
jest.mock('@/lib/data-helpers', () => ({
  getDisplayName: jest.fn(() => 'John Doe') // Default return value
}));

jest.mock('@/lib/data', () => ({
  contact: {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1-555-0123',
    location: 'Test City, TC',
    linkedin: 'linkedin.com/in/testuser',
    website: 'https://testuser.com'
  }
}));

// Import after mocking
import Footer from '../Footer';
import { getDisplayName } from '@/lib/data-helpers';

const mockGetDisplayName = getDisplayName as jest.MockedFunction<typeof getDisplayName>;

describe('Footer', () => {
  beforeEach(() => {
    mockGetDisplayName.mockReturnValue('John Doe');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders footer with correct structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-gray-50', 'border-t', 'border-gray-200');
  });

  test('displays the mocked display name', () => {
    render(<Footer />);
    
    // Since getDisplayName is called at module level, we just verify the mock is returned
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  test('displays the main tagline text', () => {
    render(<Footer />);
    
    expect(
      screen.getByText(
        /Building systems that scale, teams that thrive, and developer experiences that delight\./
      )
    ).toBeInTheDocument();
  });

  test('displays the subtitle with key technologies', () => {
    render(<Footer />);
    
    expect(
      screen.getByText('AI-native architecture • MCP integration • Enterprise platforms')
    ).toBeInTheDocument();
  });

  test('has proper semantic structure with main and subtitle paragraphs', () => {
    const { container } = render(<Footer />);
    
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    
    // Main paragraph should have specific classes
    expect(paragraphs[0]).toHaveClass('text-gray-600', 'mb-2');
    
    // Subtitle paragraph should have different classes
    expect(paragraphs[1]).toHaveClass('text-sm', 'text-gray-500');
  });

  test('uses container-max class for responsive layout', () => {
    render(<Footer />);
    
    const container = screen.getByRole('contentinfo').querySelector('.container-max');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('py-12');
  });

  test('has centered text layout', () => {
    render(<Footer />);
    
    const textContainer = screen.getByRole('contentinfo').querySelector('.text-center');
    expect(textContainer).toBeInTheDocument();
  });

  test('renders consistent content structure', () => {
    render(<Footer />);
    
    // Verify the consistent content structure regardless of name
    expect(
      screen.getByText(
        /Building systems that scale, teams that thrive, and developer experiences that delight\./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('AI-native architecture • MCP integration • Enterprise platforms')
    ).toBeInTheDocument();
  });

  test('handles empty display name gracefully', () => {
    mockGetDisplayName.mockReturnValue('');
    
    render(<Footer />);
    
    // Should still render the rest of the content
    expect(
      screen.getByText(
        /Building systems that scale, teams that thrive, and developer experiences that delight\./
      )
    ).toBeInTheDocument();
  });

  test('maintains proper spacing and layout classes', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-50', 'border-t', 'border-gray-200');
    
    const innerContainer = footer?.querySelector('.container-max');
    expect(innerContainer).toHaveClass('py-12');
    
    const textContainer = innerContainer?.querySelector('.text-center');
    expect(textContainer).toBeInTheDocument();
  });

  test('has accessible structure', () => {
    render(<Footer />);
    
    // Footer should be identifiable as contentinfo landmark
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Text should be readable and have proper contrast classes
    expect(screen.getByText(/Building systems that scale/)).toHaveClass('text-gray-600');
    expect(screen.getByText(/AI-native architecture/)).toHaveClass('text-gray-500');
  });
});
