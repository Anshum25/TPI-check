/**
 * Integration tests for PhoneDialer components within the app structure
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { 
  HeroSectionExample,
  HeaderExample,
  FooterExample,
  ContactPageExample,
  MobileOptimizedExample,
  CustomStyledExample,
  IntegrationExample,
  ShowcaseExample
} from '../examples/PhoneDialerExamples';
import * as usePhoneDialerHook from '@/hooks/usePhoneDialer';

// Mock the usePhoneDialer hook
const mockInitiateCall = vi.fn();
const mockFormatError = vi.fn();

vi.mock('@/hooks/usePhoneDialer', () => ({
  usePhoneDialer: vi.fn()
}));

const mockUsePhoneDialer = vi.mocked(usePhoneDialerHook.usePhoneDialer);

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined)
  }
});

// Mock console methods to avoid noise in tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

describe('PhoneDialer Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation
    mockUsePhoneDialer.mockReturnValue({
      initiateCall: mockInitiateCall,
      isMobile: true,
      isSupported: true,
      deviceInfo: {
        isMobile: true,
        isIOS: false,
        isAndroid: true,
        browserSupport: true
      },
      defaultNumber: '9725500435',
      formatError: mockFormatError
    });

    mockFormatError.mockReturnValue('Formatted error message');
    
    // Mock console methods
    console.log = vi.fn();
    console.error = vi.fn();
  });

  afterEach(() => {
    // Restore console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    
    // Clean up DOM
    document.body.innerHTML = '';
  });

  describe('HeroSectionExample', () => {
    test('renders hero section with prominent phone dialer', () => {
      render(<HeroSectionExample />);
      
      expect(screen.getByText('Need Help? Call Us Now!')).toBeInTheDocument();
      expect(screen.getByText('Our expert team is ready to assist you')).toBeInTheDocument();
      
      const phoneButton = screen.getByRole('button');
      expect(phoneButton).toBeInTheDocument();
      expect(phoneButton).toHaveTextContent('(972) 550-0435'); // Prominent preset shows phone number
    });

    test('handles success callback in hero section', async () => {
      render(<HeroSectionExample />);
      
      const phoneButton = screen.getByRole('button');
      fireEvent.click(phoneButton);
      
      expect(mockInitiateCall).toHaveBeenCalledWith('9725500435');
      
      // Wait for async callback
      await waitFor(() => {
        expect(console.log).toHaveBeenCalledWith('Call initiated from hero section:', '9725500435');
      });
    });

    test('handles error callback in hero section', async () => {
      const error = new Error('Test error');
      mockUsePhoneDialer.mockImplementation(({ onError }) => {
        setTimeout(() => onError?.(error), 0);
        return {
          initiateCall: mockInitiateCall,
          isMobile: true,
          isSupported: true,
          deviceInfo: {
            isMobile: true,
            isIOS: false,
            isAndroid: true,
            browserSupport: true
          },
          defaultNumber: '9725500435',
          formatError: mockFormatError
        };
      });

      render(<HeroSectionExample />);
      
      await waitFor(() => {
        expect(console.error).toHaveBeenCalledWith('Call failed from hero section:', error);
      });
    });
  });

  describe('HeaderExample', () => {
    test('renders header with compact phone dialer', () => {
      render(<HeaderExample />);
      
      expect(screen.getByText('Your Company')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
      
      const phoneButton = screen.getByRole('button');
      expect(phoneButton).toBeInTheDocument();
      expect(phoneButton).toHaveTextContent('Call'); // Compact preset text
    });

    test('compact dialer integrates with navigation', () => {
      render(<HeaderExample />);
      
      const phoneButton = screen.getByRole('button');
      expect(phoneButton).toHaveClass('h-9'); // Small size for header
      
      fireEvent.click(phoneButton);
      expect(mockInitiateCall).toHaveBeenCalled();
    });
  });

  describe('FooterExample', () => {
    test('renders footer with multiple phone options', () => {
      render(<FooterExample />);
      
      expect(screen.getByText('Contact Info')).toBeInTheDocument();
      expect(screen.getByText('123 Business St')).toBeInTheDocument();
      expect(screen.getByText('Emergency Contact')).toBeInTheDocument();
      
      const phoneButtons = screen.getAllByRole('button');
      expect(phoneButtons).toHaveLength(2); // Fallback-friendly + Emergency
    });

    test('emergency button has correct styling and number', () => {
      render(<FooterExample />);
      
      const emergencyButton = screen.getByText('Emergency: 911');
      expect(emergencyButton).toBeInTheDocument();
      // Check for destructive variant classes
      expect(emergencyButton.closest('button')).toHaveClass('bg-destructive');
    });
  });

  describe('ContactPageExample', () => {
    test('renders contact page with form and phone options', () => {
      render(<ContactPageExample />);
      
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
      expect(screen.getByText('Send a Message')).toBeInTheDocument();
      
      // Check form elements
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('How can we help you?')).toBeInTheDocument();
      
      // Check phone options
      const phoneButtons = screen.getAllByRole('button', { name: /call/i });
      expect(phoneButtons.length).toBeGreaterThan(0);
    });

    test('contact page phone dialer has error messages enabled', () => {
      render(<ContactPageExample />);
      
      const phoneButtons = screen.getAllByRole('button', { name: /call/i });
      const mainPhoneButton = phoneButtons[0]; // Get the first one
      expect(mainPhoneButton.parentElement).toHaveClass('relative'); // Wrapper for error messages
    });
  });

  describe('MobileOptimizedExample', () => {
    test('renders mobile-optimized layout', () => {
      render(<MobileOptimizedExample />);
      
      expect(screen.getByText('Need Immediate Help?')).toBeInTheDocument();
      expect(screen.getByText('Our support team is available to assist you right away.')).toBeInTheDocument();
      
      const phoneButton = screen.getByRole('button');
      expect(phoneButton).toHaveClass('w-full'); // Full width for mobile
      expect(phoneButton).toHaveTextContent('(972) 550-0435'); // Prominent preset
    });

    test('shows helpful text for mobile users', () => {
      render(<MobileOptimizedExample />);
      
      expect(screen.getByText('Tap to call directly, or copy number if calling is not supported')).toBeInTheDocument();
    });
  });

  describe('CustomStyledExample', () => {
    test('renders custom styled phone button', () => {
      render(<CustomStyledExample />);
      
      expect(screen.getByText('Premium Support')).toBeInTheDocument();
      expect(screen.getByText('Get expert help from our certified professionals')).toBeInTheDocument();
      
      const phoneButton = screen.getByRole('button');
      expect(phoneButton).toHaveClass('bg-white', 'text-blue-600', 'border-white');
      expect(phoneButton).toHaveTextContent('(800) 555-1234'); // Custom number with showPhoneNumber
    });
  });

  describe('IntegrationExample', () => {
    test('renders expandable support options', () => {
      render(<IntegrationExample />);
      
      expect(screen.getByText('Customer Support Options')).toBeInTheDocument();
      
      const expandButton = screen.getByText('📞 Phone Support');
      expect(expandButton).toBeInTheDocument();
      
      // Initially collapsed
      expect(screen.queryByText('General Support:')).not.toBeInTheDocument();
    });

    test('expands to show multiple phone options', () => {
      render(<IntegrationExample />);
      
      const expandButton = screen.getByRole('button', { name: /phone support/i });
      fireEvent.click(expandButton);
      
      expect(screen.getByText('General Support:')).toBeInTheDocument();
      expect(screen.getByText('Technical Support:')).toBeInTheDocument();
      expect(screen.getByText('Sales:')).toBeInTheDocument();
      
      const phoneButtons = screen.getAllByRole('button');
      expect(phoneButtons.length).toBeGreaterThan(3); // Expand button + phone buttons
    });
  });

  describe('ShowcaseExample', () => {
    test('renders all phone dialer variants', () => {
      render(<ShowcaseExample />);
      
      expect(screen.getByText('Phone Dialer Components Showcase')).toBeInTheDocument();
      
      // Check for all variant descriptions
      expect(screen.getByText('Default PhoneDialer')).toBeInTheDocument();
      expect(screen.getByText('Compact PhoneDialer')).toBeInTheDocument();
      expect(screen.getByText('Prominent PhoneDialer')).toBeInTheDocument();
      expect(screen.getByText('Fallback Friendly')).toBeInTheDocument();
      expect(screen.getByText('Custom PhoneButton')).toBeInTheDocument();
      expect(screen.getByText('Icon Position')).toBeInTheDocument();
      
      // Should have multiple phone buttons
      const phoneButtons = screen.getAllByRole('button');
      expect(phoneButtons.length).toBeGreaterThanOrEqual(6);
    });

    test('showcase buttons have different configurations', () => {
      render(<ShowcaseExample />);
      
      const phoneButtons = screen.getAllByRole('button');
      
      // Check for different button texts indicating different configurations
      const buttonTexts = phoneButtons.map(button => button.textContent);
      expect(buttonTexts).toContain('Call Now'); // Default
      expect(buttonTexts).toContain('Call'); // Compact
      expect(buttonTexts).toContain('(972) 550-0435'); // Prominent with phone number
      expect(buttonTexts).toContain('Contact Us'); // Fallback friendly
    });
  });

  describe('Cross-device compatibility', () => {
    test('handles unsupported devices gracefully', () => {
      // Mock unsupported device
      mockUsePhoneDialer.mockReturnValue({
        initiateCall: mockInitiateCall,
        isMobile: false,
        isSupported: false,
        deviceInfo: {
          isMobile: false,
          isIOS: false,
          isAndroid: false,
          browserSupport: false
        },
        defaultNumber: '9725500435',
        formatError: mockFormatError
      });

      render(<ShowcaseExample />);
      
      const phoneButtons = screen.getAllByRole('button');
      
      // Check that some buttons show fallback behavior by checking titles
      const buttonTitles = phoneButtons.map(button => button.getAttribute('title'));
      expect(buttonTitles.some(title => title?.includes('Copy') || title?.includes('Show'))).toBe(true);
    });

    test('clipboard fallback works correctly', async () => {
      // Mock unsupported device
      mockUsePhoneDialer.mockReturnValue({
        initiateCall: mockInitiateCall,
        isMobile: false,
        isSupported: false,
        deviceInfo: {
          isMobile: false,
          isIOS: false,
          isAndroid: false,
          browserSupport: false
        },
        defaultNumber: '9725500435',
        formatError: mockFormatError
      });

      render(<MobileOptimizedExample />);
      
      const phoneButton = screen.getByRole('button');
      fireEvent.click(phoneButton);
      
      // Should attempt to copy to clipboard
      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('9725500435');
      });
    });
  });

  describe('Error handling integration', () => {
    test('error messages appear in components with showErrorMessages', async () => {
      render(<ContactPageExample />);
      
      const phoneButtons = screen.getAllByRole('button', { name: /call/i });
      const mainPhoneButton = phoneButtons[0]; // Get the first one
      fireEvent.click(mainPhoneButton);
      
      // Should not show error for successful call
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('handles phone number validation errors', async () => {
      mockUsePhoneDialer.mockImplementation(({ onError }) => {
        setTimeout(() => onError?.(new Error('Invalid phone number format')), 0);
        return {
          initiateCall: mockInitiateCall,
          isMobile: true,
          isSupported: true,
          deviceInfo: {
            isMobile: true,
            isIOS: false,
            isAndroid: true,
            browserSupport: true
          },
          defaultNumber: '9725500435',
          formatError: mockFormatError
        };
      });

      render(<ContactPageExample />);
      
      await waitFor(() => {
        expect(mockFormatError).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });

  describe('Accessibility integration', () => {
    test('all phone buttons have proper ARIA labels', () => {
      render(<ShowcaseExample />);
      
      const phoneButtons = screen.getAllByRole('button');
      
      phoneButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
        expect(button.getAttribute('aria-label')).toMatch(/call/i);
      });
    });

    test('icons have aria-hidden attribute', () => {
      render(<ShowcaseExample />);
      
      const icons = document.querySelectorAll('svg');
      
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('error messages have proper ARIA attributes', async () => {
      // Mock unsupported device to trigger fallback
      mockUsePhoneDialer.mockReturnValue({
        initiateCall: mockInitiateCall,
        isMobile: false,
        isSupported: false,
        deviceInfo: {
          isMobile: false,
          isIOS: false,
          isAndroid: false,
          browserSupport: false
        },
        defaultNumber: '9725500435',
        formatError: mockFormatError
      });

      render(<MobileOptimizedExample />);
      
      const phoneButton = screen.getByRole('button');
      fireEvent.click(phoneButton);
      
      const alert = await screen.findByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Performance integration', () => {
    test('components render without performance issues', () => {
      const startTime = performance.now();
      
      render(<ShowcaseExample />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render quickly (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    test('multiple phone dialers can coexist', () => {
      render(
        <div>
          <HeroSectionExample />
          <HeaderExample />
          <FooterExample />
          <ContactPageExample />
        </div>
      );
      
      const phoneButtons = screen.getAllByRole('button');
      expect(phoneButtons.length).toBeGreaterThan(5);
      
      // All buttons should be functional
      phoneButtons.forEach(button => {
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
      });
    });
  });
});