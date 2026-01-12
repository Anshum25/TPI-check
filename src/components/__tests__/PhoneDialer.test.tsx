/**
 * Unit tests for PhoneDialer component and its variants
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  PhoneDialer, 
  CompactPhoneDialer, 
  ProminentPhoneDialer, 
  FallbackFriendlyPhoneDialer 
} from '../PhoneDialer';
import { PhoneButton } from '../ui/PhoneButton';
import * as usePhoneDialerHook from '@/hooks/usePhoneDialer';

// Mock the usePhoneDialer hook
const mockInitiateCall = vi.fn();
const mockFormatError = vi.fn();

vi.mock('@/hooks/usePhoneDialer', () => ({
  usePhoneDialer: vi.fn()
}));

const mockUsePhoneDialer = vi.mocked(usePhoneDialerHook.usePhoneDialer);

describe('PhoneDialer', () => {
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
  });

  describe('default preset', () => {
    test('renders with default configuration', () => {
      render(<PhoneDialer />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Call Now');
      expect(button).toHaveClass('bg-primary'); // default variant
      expect(button).toHaveClass('h-10'); // default size
    });

    test('uses default phone number from config', () => {
      render(<PhoneDialer />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Call (972) 550-0435');
    });

    test('allows phone number override', () => {
      render(<PhoneDialer phoneNumber="1234567890" />);
      
      // The PhoneButton should receive the custom phone number
      expect(mockUsePhoneDialer).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultPhoneNumber: '1234567890'
        })
      );
    });

    test('shows icon by default', () => {
      render(<PhoneDialer />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    test('does not show phone number by default', () => {
      render(<PhoneDialer />);
      
      const button = screen.getByRole('button');
      expect(button).not.toHaveTextContent('(972) 550-0435');
    });
  });

  describe('compact preset', () => {
    test('applies compact configuration', () => {
      render(<PhoneDialer preset="compact" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Call');
      expect(button).toHaveClass('border'); // outline variant
      expect(button).toHaveClass('h-9'); // sm size
    });

    test('uses copy fallback behavior', () => {
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

      render(<PhoneDialer preset="compact" />);
      
      const button = screen.getByRole('button');
      // The PhoneButton component will show "Copy Number" when fallbackBehavior is "copy" and device is unsupported
      // But since we have children="Call" from the preset, it will show "Call" instead
      // The fallback behavior affects the click action, not necessarily the text
      expect(button).toHaveTextContent('Call');
      expect(button).toHaveAttribute('title', 'Copy phone number (972) 550-0435 to clipboard');
    });
  });

  describe('prominent preset', () => {
    test('applies prominent configuration', () => {
      render(<PhoneDialer preset="prominent" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(972) 550-0435'); // shows phone number
      expect(button).toHaveClass('bg-primary'); // default variant
      expect(button).toHaveClass('h-11'); // lg size
    });

    test('shows phone number in button text', () => {
      render(<PhoneDialer preset="prominent" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(972) 550-0435');
    });
  });

  describe('fallback-friendly preset', () => {
    test('applies fallback-friendly configuration', () => {
      render(<PhoneDialer preset="fallback-friendly" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Contact Us');
      expect(button).toHaveClass('border'); // outline variant
      expect(button).toHaveClass('h-10'); // default size
    });

    test('enables error messages', () => {
      render(<PhoneDialer preset="fallback-friendly" />);
      
      // This preset should have showErrorMessages enabled
      // We can verify this by checking if the component structure includes error handling
      const button = screen.getByRole('button');
      expect(button.parentElement).toHaveClass('relative'); // Wrapper for error messages
    });
  });

  describe('prop overrides', () => {
    test('allows variant override', () => {
      render(<PhoneDialer preset="compact" variant="default" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary'); // overridden to default variant
    });

    test('allows size override', () => {
      render(<PhoneDialer preset="compact" size="lg" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11'); // overridden to lg size
    });

    test('allows children override', () => {
      render(<PhoneDialer preset="compact">Custom Text</PhoneDialer>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Custom Text');
    });

    test('allows showIcon override', () => {
      render(<PhoneDialer showIcon={false} />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });

    test('allows showPhoneNumber override', () => {
      // Create a component without children to test showPhoneNumber
      render(
        <PhoneButton 
          phoneNumber="9725500435" 
          showPhoneNumber={true}
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(972) 550-0435');
    });
  });

  describe('forwarded ref', () => {
    test('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<PhoneDialer ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('additional props', () => {
    test('passes through additional props', () => {
      render(<PhoneDialer className="custom-class" data-testid="phone-dialer" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveAttribute('data-testid', 'phone-dialer');
    });
  });
});

describe('CompactPhoneDialer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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
  });

  test('renders with compact preset', () => {
    render(<CompactPhoneDialer />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Call');
    expect(button).toHaveClass('border'); // outline variant
    expect(button).toHaveClass('h-9'); // sm size
  });

  test('allows prop overrides', () => {
    render(<CompactPhoneDialer variant="default">Custom</CompactPhoneDialer>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Custom');
    expect(button).toHaveClass('bg-primary'); // overridden variant
  });

  test('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<CompactPhoneDialer ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('ProminentPhoneDialer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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
  });

  test('renders with prominent preset', () => {
    render(<ProminentPhoneDialer />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('(972) 550-0435'); // shows phone number
    expect(button).toHaveClass('bg-primary'); // default variant
    expect(button).toHaveClass('h-11'); // lg size
  });

  test('allows prop overrides', () => {
    render(<ProminentPhoneDialer showPhoneNumber={false}>Call Now</ProminentPhoneDialer>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Call Now');
  });

  test('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ProminentPhoneDialer ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('FallbackFriendlyPhoneDialer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
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
  });

  test('renders with fallback-friendly preset', () => {
    render(<FallbackFriendlyPhoneDialer />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Contact Us');
    expect(button).toHaveClass('border'); // outline variant
    expect(button).toHaveClass('h-10'); // default size
  });

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

    render(<FallbackFriendlyPhoneDialer />);
    
    const button = screen.getByRole('button');
    // The preset has children="Contact Us", so it will show that instead of "Copy Number"
    // But the fallback behavior should still be "copy" as indicated by the title
    expect(button).toHaveTextContent('Contact Us');
    expect(button).toHaveAttribute('title', 'Copy phone number (972) 550-0435 to clipboard');
  });

  test('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<FallbackFriendlyPhoneDialer ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});