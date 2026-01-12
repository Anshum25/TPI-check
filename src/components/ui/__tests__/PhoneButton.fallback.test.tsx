/**
 * Tests for PhoneButton fallback mechanisms and error handling
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PhoneButton } from '../PhoneButton';
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
    writeText: vi.fn()
  }
});

// Mock window.open
Object.assign(window, {
  open: vi.fn()
});

describe('PhoneButton Fallback Mechanisms', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockFormatError.mockReturnValue('Formatted error message');
    
    // Mock for unsupported device by default
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
  });

  describe('copy fallback behavior', () => {
    test('shows copy button text for unsupported device', () => {
      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Copy Number');
      expect(button).toHaveAttribute('aria-label', 'Copy phone number (972) 550-0435');
    });

    test('shows copy icon for unsupported device', () => {
      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    test('copies phone number to clipboard when clicked', async () => {
      const mockWriteText = vi.mocked(navigator.clipboard.writeText);
      mockWriteText.mockResolvedValue();
      
      render(<PhoneButton fallbackBehavior="copy" showErrorMessages />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockWriteText).toHaveBeenCalledWith('9725500435');
      
      await waitFor(() => {
        expect(screen.getByText('Phone number copied to clipboard')).toBeInTheDocument();
      });
    });

    test('handles clipboard copy failure', async () => {
      const mockWriteText = vi.mocked(navigator.clipboard.writeText);
      mockWriteText.mockRejectedValue(new Error('Clipboard failed'));
      
      render(<PhoneButton fallbackBehavior="copy" showErrorMessages />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Unable to copy phone number')).toBeInTheDocument();
      });
    });
  });

  describe('display fallback behavior', () => {
    test('shows appropriate button text for display fallback', () => {
      render(<PhoneButton fallbackBehavior="display" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Show Number');
      expect(button).toHaveAttribute('aria-label', 'Show phone number (972) 550-0435');
    });

    test('displays phone number when clicked', async () => {
      render(<PhoneButton fallbackBehavior="display" showErrorMessages />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Please call: (972) 550-0435')).toBeInTheDocument();
      });
    });
  });

  describe('external fallback behavior', () => {
    test('shows appropriate button text for external fallback', () => {
      render(<PhoneButton fallbackBehavior="external" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Call Now');
      expect(button).toHaveAttribute('aria-label', 'Call (972) 550-0435');
    });

    test('opens external app when clicked', () => {
      const mockOpen = vi.mocked(window.open);
      
      render(<PhoneButton fallbackBehavior="external" />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(mockOpen).toHaveBeenCalledWith('tel:9725500435', '_blank');
    });

    test('shows external link icon', () => {
      render(<PhoneButton fallbackBehavior="external" />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('disabled fallback behavior', () => {
    test('disables button for unsupported device', () => {
      render(<PhoneButton fallbackBehavior="disabled" />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    test('shows appropriate title for disabled state', () => {
      render(<PhoneButton fallbackBehavior="disabled" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Phone dialing not supported on this device');
    });
  });

  describe('custom fallback text', () => {
    test('uses custom fallback text when provided', () => {
      render(<PhoneButton fallbackBehavior="copy" fallbackText="Custom Text" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Custom Text');
    });
  });

  describe('error message display', () => {
    test('shows error messages when enabled', async () => {
      const onError = vi.fn();
      const error = new Error('Test error');
      
      // Mock supported device that will have an error
      mockUsePhoneDialer.mockImplementation(({ onError: hookOnError }) => {
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

      render(<PhoneButton showErrorMessages onError={onError} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent('Formatted error message');
      });
    });

    test('hides error messages when disabled', async () => {
      const onError = vi.fn();
      const error = new Error('Test error');
      
      mockUsePhoneDialer.mockImplementation(({ onError: hookOnError }) => {
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

      render(<PhoneButton showErrorMessages={false} onError={onError} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Wait a bit to ensure no error message appears
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    test('error message has proper accessibility attributes', async () => {
      render(<PhoneButton fallbackBehavior="copy" showErrorMessages />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const errorElement = screen.getByRole('alert');
        expect(errorElement).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('loading state', () => {
    test('shows loading text when initiating call', () => {
      // Mock supported device
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

      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(button).toHaveTextContent('Calling...');
      expect(button).toBeDisabled();
    });
  });

  describe('variant changes for unsupported devices', () => {
    test('changes to outline variant for non-disabled fallbacks', () => {
      render(<PhoneButton fallbackBehavior="copy" variant="default" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-input');
    });

    test('keeps original variant for disabled fallback', () => {
      render(<PhoneButton fallbackBehavior="disabled" variant="default" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });
  });

  describe('title attributes for different fallback behaviors', () => {
    test('shows copy title for copy fallback', () => {
      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Copy phone number (972) 550-0435 to clipboard');
    });

    test('shows external title for external fallback', () => {
      render(<PhoneButton fallbackBehavior="external" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Try to open (972) 550-0435 in external app');
    });

    test('shows display title for display fallback', () => {
      render(<PhoneButton fallbackBehavior="display" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Show phone number (972) 550-0435');
    });
  });
});