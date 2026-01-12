import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../Hero';
import { useContent } from '@/lib/content';

// Mock the content hook
jest.mock('@/lib/content', () => ({
  useContent: jest.fn()
}));

// Mock the RequestCallbackDialog component
jest.mock('../RequestCallbackDialog', () => {
  return function MockRequestCallbackDialog({ open, onOpenChange }: any) {
    return open ? (
      <div data-testid="callback-dialog">
        <button onClick={() => onOpenChange(false)}>Close Dialog</button>
      </div>
    ) : null;
  };
});

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Hero Component Integration', () => {
  const mockContent = {
    home: {
      heroButtons: {
        callNow: {
          text: 'CALL NOW',
          action: 'navigate',
          target: '/contact#phone',
          variant: 'default',
          enabled: true
        },
        getDirections: {
          text: 'GET DIRECTIONS',
          action: 'navigate',
          target: '/contact#map',
          variant: 'outline',
          enabled: true
        },
        requestCallback: {
          text: 'REQUEST CALLBACK',
          action: 'modal',
          target: 'RequestCallbackDialog',
          variant: 'outline',
          enabled: true
        }
      },
      heroCarousel: {
        slides: [
          {
            imageUrl: '/test-image.jpg',
            title: 'Test Title',
            subtitle: 'Test Subtitle',
            primaryButtonText: 'Old Primary',
            primaryButtonLink: '/old-primary',
            secondaryButtonText: 'Old Secondary',
            secondaryButtonLink: '/old-secondary'
          }
        ]
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useContent as jest.Mock).mockReturnValue({
      content: mockContent
    });
  });

  const renderHero = () => {
    return render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
  };

  it('should render all enabled buttons with correct text', () => {
    renderHero();

    expect(screen.getAllByText('CALL NOW')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('GET DIRECTIONS')).toHaveLength(2);
    expect(screen.getAllByText('REQUEST CALLBACK')).toHaveLength(2);
  });

  it('should navigate to correct target when navigation buttons are clicked', async () => {
    const user = userEvent.setup();
    renderHero();

    // Click CALL NOW button (desktop version)
    const callNowButtons = screen.getAllByText('CALL NOW');
    await user.click(callNowButtons[1]); // Desktop version

    expect(mockNavigate).toHaveBeenCalledWith('/contact#phone');

    // Click GET DIRECTIONS button
    const getDirectionsButtons = screen.getAllByText('GET DIRECTIONS');
    await user.click(getDirectionsButtons[1]); // Desktop version

    expect(mockNavigate).toHaveBeenCalledWith('/contact#map');
  });

  it('should open callback dialog when REQUEST CALLBACK button is clicked', async () => {
    const user = userEvent.setup();
    renderHero();

    // Click REQUEST CALLBACK button
    const callbackButtons = screen.getAllByText('REQUEST CALLBACK');
    await user.click(callbackButtons[1]); // Desktop version

    expect(screen.getByTestId('callback-dialog')).toBeInTheDocument();
  });

  it('should close callback dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    renderHero();

    // Open dialog
    const callbackButtons = screen.getAllByText('REQUEST CALLBACK');
    await user.click(callbackButtons[0]); // Mobile version

    expect(screen.getByTestId('callback-dialog')).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByText('Close Dialog');
    await user.click(closeButton);

    expect(screen.queryByTestId('callback-dialog')).not.toBeInTheDocument();
  });

  it('should only show enabled buttons', () => {
    const contentWithDisabledButton = {
      ...mockContent,
      home: {
        ...mockContent.home,
        heroButtons: {
          ...mockContent.home.heroButtons,
          getDirections: {
            ...mockContent.home.heroButtons.getDirections,
            enabled: false
          }
        }
      }
    };

    (useContent as jest.Mock).mockReturnValue({
      content: contentWithDisabledButton
    });

    renderHero();

    expect(screen.getAllByText('CALL NOW')).toHaveLength(2);
    expect(screen.queryByText('GET DIRECTIONS')).not.toBeInTheDocument();
    expect(screen.getAllByText('REQUEST CALLBACK')).toHaveLength(2);
  });

  it('should handle empty button configuration gracefully', () => {
    const contentWithNoButtons = {
      ...mockContent,
      home: {
        ...mockContent.home,
        heroButtons: {
          callNow: { ...mockContent.home.heroButtons.callNow, enabled: false },
          getDirections: { ...mockContent.home.heroButtons.getDirections, enabled: false },
          requestCallback: { ...mockContent.home.heroButtons.requestCallback, enabled: false }
        }
      }
    };

    (useContent as jest.Mock).mockReturnValue({
      content: contentWithNoButtons
    });

    renderHero();

    // Should render without buttons but not crash
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('CALL NOW')).not.toBeInTheDocument();
  });

  it('should apply correct styling based on button variant', () => {
    renderHero();

    const callNowButtons = screen.getAllByText('CALL NOW');
    const getDirectionsButtons = screen.getAllByText('GET DIRECTIONS');

    // Check that buttons have different styling classes based on variant
    // Default variant should have gradient-accent class
    expect(callNowButtons[1]).toHaveClass('gradient-accent');
    
    // Outline variant should have different styling
    expect(getDirectionsButtons[1]).toHaveClass('bg-white/10');
  });

  it('should handle carousel navigation', async () => {
    const user = userEvent.setup();
    
    const contentWithMultipleSlides = {
      ...mockContent,
      home: {
        ...mockContent.home,
        heroCarousel: {
          slides: [
            mockContent.home.heroCarousel.slides[0],
            {
              imageUrl: '/test-image-2.jpg',
              title: 'Test Title 2',
              subtitle: 'Test Subtitle 2',
              primaryButtonText: 'Old Primary 2',
              primaryButtonLink: '/old-primary-2',
              secondaryButtonText: 'Old Secondary 2',
              secondaryButtonLink: '/old-secondary-2'
            }
          ]
        }
      }
    };

    (useContent as jest.Mock).mockReturnValue({
      content: contentWithMultipleSlides
    });

    renderHero();

    // Should show first slide initially
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Click next button
    const nextButton = screen.getByLabelText('Next slide');
    await user.click(nextButton);

    // Should show second slide
    await waitFor(() => {
      expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    });

    // Buttons should still be the same (from admin configuration, not slide-specific)
    expect(screen.getAllByText('CALL NOW')).toHaveLength(2);
  });

  it('should handle responsive layout correctly', () => {
    renderHero();

    // Mobile layout should have different structure
    const mobileContainer = screen.getByText('CALL NOW').closest('.md\\:hidden');
    const desktopContainer = screen.getByText('CALL NOW').closest('.hidden.md\\:flex');

    expect(mobileContainer).toBeInTheDocument();
    expect(desktopContainer).toBeInTheDocument();
  });

  it('should handle custom button text from admin configuration', () => {
    const contentWithCustomText = {
      ...mockContent,
      home: {
        ...mockContent.home,
        heroButtons: {
          ...mockContent.home.heroButtons,
          callNow: {
            ...mockContent.home.heroButtons.callNow,
            text: 'CONTACT US NOW'
          }
        }
      }
    };

    (useContent as jest.Mock).mockReturnValue({
      content: contentWithCustomText
    });

    renderHero();

    expect(screen.getAllByText('CONTACT US NOW')).toHaveLength(2);
    expect(screen.queryByText('CALL NOW')).not.toBeInTheDocument();
  });

  it('should handle different button actions correctly', async () => {
    const user = userEvent.setup();
    renderHero();

    // Test navigation action
    const callNowButton = screen.getAllByText('CALL NOW')[0];
    await user.click(callNowButton);
    expect(mockNavigate).toHaveBeenCalledWith('/contact#phone');

    // Test modal action
    const callbackButton = screen.getAllByText('REQUEST CALLBACK')[0];
    await user.click(callbackButton);
    expect(screen.getByTestId('callback-dialog')).toBeInTheDocument();
  });
});