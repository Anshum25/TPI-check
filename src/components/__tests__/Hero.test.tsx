import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Hero from '../Hero';
import { ContentProvider } from '@/lib/content';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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
      }
    }
  })
}));

// Mock RequestCallbackDialog
vi.mock('../RequestCallbackDialog', () => ({
  default: ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
    <div data-testid="callback-dialog" style={{ display: open ? 'block' : 'none' }}>
      <button onClick={() => onOpenChange(false)}>Close</button>
    </div>
  )
}));

const renderHero = () => {
  return render(
    <BrowserRouter>
      <ContentProvider>
        <Hero />
      </ContentProvider>
    </BrowserRouter>
  );
};

describe('Hero Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders three buttons with correct text', () => {
    renderHero();
    
    expect(screen.getByText('CALL NOW')).toBeInTheDocument();
    expect(screen.getByText('GET DIRECTION')).toBeInTheDocument();
    expect(screen.getByText('REQUEST CALL BACK')).toBeInTheDocument();
  });

  it('calls navigate with correct path when CALL NOW button is clicked', () => {
    renderHero();
    
    const callNowButton = screen.getByText('CALL NOW');
    fireEvent.click(callNowButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/contact#phone');
  });

  it('calls navigate with correct path when GET DIRECTION button is clicked', () => {
    renderHero();
    
    const getDirectionButton = screen.getByText('GET DIRECTION');
    fireEvent.click(getDirectionButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/contact#map');
  });

  it('opens RequestCallbackDialog when REQUEST CALL BACK button is clicked', () => {
    renderHero();
    
    const requestCallbackButton = screen.getByText('REQUEST CALL BACK');
    const dialog = screen.getByTestId('callback-dialog');
    
    // Dialog should be hidden initially
    expect(dialog).toHaveStyle({ display: 'none' });
    
    // Click the button
    fireEvent.click(requestCallbackButton);
    
    // Dialog should be visible
    expect(dialog).toHaveStyle({ display: 'block' });
  });

  it('closes RequestCallbackDialog when onOpenChange is called', () => {
    renderHero();
    
    const requestCallbackButton = screen.getByText('REQUEST CALL BACK');
    const dialog = screen.getByTestId('callback-dialog');
    
    // Open the dialog
    fireEvent.click(requestCallbackButton);
    expect(dialog).toHaveStyle({ display: 'block' });
    
    // Close the dialog
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(dialog).toHaveStyle({ display: 'none' });
  });

  it('renders slide content correctly', () => {
    renderHero();
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('applies correct CSS classes to buttons', () => {
    renderHero();
    
    const callNowButton = screen.getByText('CALL NOW');
    const getDirectionButton = screen.getByText('GET DIRECTION');
    const requestCallbackButton = screen.getByText('REQUEST CALL BACK');
    
    expect(callNowButton).toHaveClass('gradient-accent');
    expect(getDirectionButton).toHaveClass('bg-white/20');
    expect(requestCallbackButton).toHaveClass('bg-white/10');
  });
});