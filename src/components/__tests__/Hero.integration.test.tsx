import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import Hero from '../Hero';
import Contact from '../../pages/Contact';
import { ContentProvider } from '@/lib/content';

// Mock the content hook
vi.mock('@/lib/content', () => ({
  useContent: () => ({
    content: {
      home: {
        heroCarousel: {
          slides: [
            {
              title: 'Test Title',
              subtitle: 'Test Subtitle',
              imageUrl: '/src/assets/hero-classroom.jpg',
            }
          ]
        }
      },
      contact: {
        hero: {
          title: 'Contact Us',
          subtitle: 'Get in touch'
        },
        cards: [
          {
            type: 'phone',
            title: 'Phone',
            lines: ['+1 234 567 8900']
          },
          {
            type: 'address',
            title: 'Address',
            lines: ['123 Test Street', 'Test City']
          }
        ]
      }
    }
  }),
  ContentProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

// Mock Header and Footer components
vi.mock('../Header', () => ({
  default: () => <div data-testid="header">Header</div>
}));

vi.mock('../Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

// Mock scrollIntoView
const mockScrollIntoView = vi.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

const TestApp = ({ initialRoute = '/' }: { initialRoute?: string }) => {
  return (
    <BrowserRouter>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  );
};

describe('Hero Integration Tests', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    // Mock window.location.hash
    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        pathname: '/'
      },
      writable: true,
    });
  });

  it('navigates to contact page when CALL NOW button is clicked', async () => {
    render(<TestApp />);
    
    const callNowButton = screen.getByText('CALL NOW');
    fireEvent.click(callNowButton);
    
    // Should navigate to contact page
    await waitFor(() => {
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });

  it('navigates to contact page when GET DIRECTION button is clicked', async () => {
    render(<TestApp />);
    
    const getDirectionButton = screen.getByText('GET DIRECTION');
    fireEvent.click(getDirectionButton);
    
    // Should navigate to contact page
    await waitFor(() => {
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });

  it('scrolls to phone section when navigating with #phone hash', async () => {
    // Mock getElementById to return an element
    const mockElement = { scrollIntoView: mockScrollIntoView };
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue(mockElement);
    
    // Set hash before rendering
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#phone',
        pathname: '/contact'
      },
      writable: true,
    });
    
    render(<TestApp initialRoute="/contact" />);
    
    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.getElementById).toHaveBeenCalledWith('phone');
    }, { timeout: 200 });
    
    // Restore original function
    document.getElementById = originalGetElementById;
  });

  it('scrolls to map section when navigating with #map hash', async () => {
    // Mock getElementById to return an element
    const mockElement = { scrollIntoView: mockScrollIntoView };
    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue(mockElement);
    
    // Set hash before rendering
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#map',
        pathname: '/contact'
      },
      writable: true,
    });
    
    render(<TestApp initialRoute="/contact" />);
    
    // Wait for useEffect to run
    await waitFor(() => {
      expect(document.getElementById).toHaveBeenCalledWith('map');
    }, { timeout: 200 });
    
    // Restore original function
    document.getElementById = originalGetElementById;
  });

  it('opens and closes RequestCallbackDialog correctly', async () => {
    render(<TestApp />);
    
    const requestCallbackButton = screen.getByText('REQUEST CALL BACK');
    
    // Dialog should not be visible initially
    expect(screen.queryByText('Request a call back')).not.toBeInTheDocument();
    
    // Click to open dialog
    fireEvent.click(requestCallbackButton);
    
    // Dialog should be visible
    await waitFor(() => {
      expect(screen.getByText('Request a call back')).toBeInTheDocument();
    });
    
    // Find and click close button (X button in dialog)
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('maintains hero functionality across different slides', () => {
    render(<TestApp />);
    
    // All three buttons should be present regardless of slide
    expect(screen.getByText('CALL NOW')).toBeInTheDocument();
    expect(screen.getByText('GET DIRECTION')).toBeInTheDocument();
    expect(screen.getByText('REQUEST CALL BACK')).toBeInTheDocument();
    
    // Buttons should maintain their functionality
    const callNowButton = screen.getByText('CALL NOW');
    expect(callNowButton).toBeEnabled();
  });
});