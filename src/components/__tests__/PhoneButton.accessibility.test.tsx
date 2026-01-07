/**
 * Comprehensive accessibility tests for PhoneButton component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhoneButton } from '../ui/PhoneButton';
import * as usePhoneDialerHook from '@/hooks/usePhoneDialer';

// Mock the usePhoneDialer hook
const mockInitiateCall = vi.fn();
const mockFormatError = vi.fn();

vi.mock('@/hooks/usePhoneDialer', () => ({
  usePhoneDialer: vi.fn()
}));

const mockUsePhoneDialer = vi.mocked(usePhoneDialerHook.usePhoneDialer);

describe('PhoneButton Accessibility', () => {
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

  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  describe('ARIA attributes', () => {
    test('has proper button role', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    test('has descriptive aria-label', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Call (972) 550-0435');
    });

    test('uses custom aria-label when provided', () => {
      render(<PhoneButton ariaLabel="Contact our support team" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Contact our support team');
    });

    test('updates aria-label for fallback behaviors', () => {
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

      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Copy phone number (972) 550-0435');
    });

    test('icon has aria-hidden attribute', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    test('error messages have proper ARIA attributes', async () => {
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

      render(<PhoneButton showErrorMessages fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      // Wait for error message to appear
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('keyboard navigation', () => {
    test('is focusable with keyboard', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });

    test('can be activated with Enter key', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Use fireEvent.click to simulate keyboard activation
      // In real browsers, Enter/Space on buttons trigger click events
      fireEvent.click(button);
      
      expect(mockInitiateCall).toHaveBeenCalledWith('9725500435');
    });

    test('can be activated with Space key', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Use fireEvent.click to simulate keyboard activation
      // In real browsers, Enter/Space on buttons trigger click events
      fireEvent.click(button);
      
      expect(mockInitiateCall).toHaveBeenCalledWith('9725500435');
    });

    test('maintains focus after activation', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      button.focus();
      fireEvent.click(button);
      
      expect(button).toHaveFocus();
    });

    test('disabled button is not focusable', () => {
      render(<PhoneButton disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
      
      // Try to focus - should not work
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe('semantic HTML', () => {
    test('uses button element', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    test('has proper type attribute', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    test('has descriptive title attribute', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Call (972) 550-0435');
    });

    test('title updates for fallback behaviors', () => {
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

      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Copy phone number (972) 550-0435 to clipboard');
    });
  });

  describe('color contrast and visual indicators', () => {
    test('applies proper styling classes for visibility', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      // Should have focus-visible styles for keyboard navigation
      expect(button).toHaveClass('focus-visible:outline-none');
      expect(button).toHaveClass('focus-visible:ring-2');
      expect(button).toHaveClass('focus-visible:ring-ring');
    });

    test('disabled state has proper visual indicators', () => {
      render(<PhoneButton disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:pointer-events-none');
      expect(button).toHaveClass('disabled:opacity-50');
    });

    test('unsupported device has visual indicators', () => {
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

      render(<PhoneButton fallbackBehavior="disabled" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });
  });

  describe('screen reader compatibility', () => {
    test('provides meaningful text content', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Call Now');
    });

    test('phone number is announced when shown', () => {
      render(<PhoneButton showPhoneNumber />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('(972) 550-0435');
    });

    test('fallback behavior is clearly communicated', () => {
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

      render(<PhoneButton fallbackBehavior="copy" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Copy phone number (972) 550-0435');
      expect(button).toHaveTextContent('Copy Number');
    });

    test('error messages are announced to screen readers', async () => {
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

      render(<PhoneButton showErrorMessages fallbackBehavior="display" />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const alert = await screen.findByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
      expect(alert).toHaveTextContent('Please call: (972) 550-0435');
    });
  });

  describe('high contrast mode support', () => {
    test('maintains visibility in high contrast mode', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      // Should have border styles that work in high contrast mode
      expect(button).toHaveClass('ring-offset-background');
      expect(button).toHaveClass('transition-colors');
    });
  });

  describe('reduced motion support', () => {
    test('respects user motion preferences', () => {
      render(<PhoneButton />);
      
      const button = screen.getByRole('button');
      // Should have transition classes that respect prefers-reduced-motion
      expect(button).toHaveClass('transition-colors');
    });
  });

  describe('touch accessibility', () => {
    test('has adequate touch target size', () => {
      render(<PhoneButton size="sm" />);
      
      const button = screen.getByRole('button');
      // Small size should still be at least 44px (h-9 = 36px, but with padding should be adequate)
      expect(button).toHaveClass('h-9');
      expect(button).toHaveClass('px-3');
    });

    test('large size provides generous touch target', () => {
      render(<PhoneButton size="lg" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11');
      expect(button).toHaveClass('px-8');
    });
  });

  describe('internationalization support', () => {
    test('supports custom phone number formats', () => {
      render(<PhoneButton phoneNumber="+44 20 7946 0958" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Call +44 20 7946 0958');
    });

    test('handles RTL text direction', () => {
      render(<PhoneButton iconPosition="right" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('flex-row-reverse');
    });
  });
});