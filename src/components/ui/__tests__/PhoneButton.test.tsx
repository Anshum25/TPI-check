/**
 * Unit tests for PhoneButton component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneButton } from '../PhoneButton';
import * as usePhoneDialerHook from '@/hooks/usePhoneDialer';

// Mock the usePhoneDialer hook
const mockInitiateCall = vi.fn();
const mockFormatError = vi.fn();

vi.mock('@/hooks/usePhoneDialer', () => ({
  usePhoneDialer: vi.fn()
}));

const mockUsePhoneDialer = vi.mocked(usePhoneDialerHook.usePhoneDialer);

describe('PhoneButton', () => {
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

  describe('rendering', () => {
    test('renders with default props', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Call Now');
      expect(button).toHaveAttribute('aria-label', 'Call (972) 550-0435');
    });

    test('renders with custom children', () => {
      render(<PhoneButton>Contact Us</PhoneButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Contact Us');
    });

    test('renders with phone number displayed', () => {
      render(<PhoneButton showPhoneNumber />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(972) 550-0435');
    });

    test('renders with custom phone number', () => {
      render(<PhoneButton phoneNumber="1234567890" showPhoneNumber />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(123) 456-7890');
      expect(button).toHaveAttribute('aria-label', 'Call (123) 456-7890');
    });

    test('renders with custom aria label', () => {
      render(<PhoneButton ariaLabel="Custom call button" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom call button');
    });
  });

  describe('icon rendering', () => {
    test('renders with phone icon by default', () => {
      render(<PhoneButton />);
      
      const icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('renders without icon when showIcon is false', () => {
      render(<PhoneButton showIcon={false} />);
      
      const icon = screen.getByRole('button').querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });

    test('renders with custom icon', () => {
      const CustomIcon = () => <span data-testid="custom-icon">📞</span>;
      render(<PhoneButton icon={<CustomIcon />} />);
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    test('renders icon on the right when iconPosition is right', () => {
      render(<PhoneButton iconPosition="right">Call</PhoneButton>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex-row-reverse');
    });
  });

  describe('button variants and styling', () => {
    test('applies default variant and size', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    test('applies custom variant', () => {
      render(<PhoneButton variant="outline" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-input');
    });

    test('applies custom size', () => {
      render(<PhoneButton size="lg" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-8');
    });

    test('applies custom className', () => {
      render(<PhoneButton className="custom-class" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('click handling', () => {
    test('initiates call when clicked', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockInitiateCall).toHaveBeenCalledWith('9725500435');
    });

    test('initiates call with custom phone number', () => {
      render(<PhoneButton phoneNumber="1234567890" />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockInitiateCall).toHaveBeenCalledWith('1234567890');
    });

    test('calls additional onClick handler', () => {
      const onClick = vi.fn();
      render(<PhoneButton onClick={onClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(onClick).toHaveBeenCalled();
      expect(mockInitiateCall).toHaveBeenCalled();
    });

    test('prevents default event behavior', () => {
      const onClick = vi.fn();
      render(<PhoneButton onClick={onClick} />);
      
      const button = screen.getByRole('button');
      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      fireEvent(button, event);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    test('is disabled when explicitly disabled', () => {
      render(<PhoneButton disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    test('is disabled when device is not supported', () => {
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

      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    test('shows appropriate title for unsupported device', () => {
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

      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Phone dialing not supported on this device');
    });

    test('does not initiate call when disabled', () => {
      render(<PhoneButton disabled />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockInitiateCall).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    test('handles onError callback', () => {
      const onError = vi.fn();
      const error = new Error('Test error');
      
      mockUsePhoneDialer.mockImplementation(({ onError: hookOnError }) => {
        // Simulate error in hook
        setTimeout(() => hookOnError?.(error), 0);
        
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

      render(<PhoneButton onError={onError} />);
      
      // Wait for async error handling
      setTimeout(() => {
        expect(onError).toHaveBeenCalledWith(error);
        expect(mockFormatError).toHaveBeenCalledWith(error);
      }, 10);
    });

    test('handles onSuccess callback', () => {
      const onSuccess = vi.fn();
      
      mockUsePhoneDialer.mockImplementation(({ onSuccess: hookOnSuccess }) => {
        // Simulate success in hook
        setTimeout(() => hookOnSuccess?.('9725500435'), 0);
        
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

      render(<PhoneButton onSuccess={onSuccess} />);
      
      // Wait for async success handling
      setTimeout(() => {
        expect(onSuccess).toHaveBeenCalledWith('9725500435');
      }, 10);
    });
  });

  describe('accessibility', () => {
    test('has proper button role', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    test('has proper type attribute', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    test('icon has aria-hidden attribute', () => {
      render(<PhoneButton />);
      
      const icon = screen.getByRole('button').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('supports keyboard navigation', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });
  });

  describe('forwarded ref', () => {
    test('forwards ref to button element', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<PhoneButton ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});