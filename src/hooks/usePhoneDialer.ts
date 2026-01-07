/**
 * Custom hook for phone dialing functionality
 */

import { useCallback, useMemo } from 'react';
import {
  getDeviceInfo,
  initiatePhoneCall,
  validatePhoneNumber,
  PHONE_CONFIG,
  type DeviceInfo
} from '@/lib/phone-utils';

export interface UsePhoneDialerReturn {
  initiateCall: (phoneNumber?: string) => void;
  isMobile: boolean;
  isSupported: boolean;
  deviceInfo: DeviceInfo;
  defaultNumber: string;
  formatError: (error: Error) => string;
}

export interface UsePhoneDialerOptions {
  defaultPhoneNumber?: string;
  onError?: (error: Error) => void;
  onSuccess?: (phoneNumber: string) => void;
}

/**
 * Custom hook for managing phone dialing functionality
 * @param options - Configuration options for the hook
 * @returns Object with dialing functions and device information
 */
export const usePhoneDialer = (options: UsePhoneDialerOptions = {}): UsePhoneDialerReturn => {
  const {
    defaultPhoneNumber = PHONE_CONFIG.defaultNumber,
    onError,
    onSuccess
  } = options;

  // Get device information (memoized to avoid recalculation)
  const deviceInfo = useMemo(() => getDeviceInfo(), []);

  // Extract commonly used device properties
  const { isMobile, browserSupport } = deviceInfo;

  /**
   * Formats error messages for user-friendly display
   */
  const formatError = useCallback((error: Error): string => {
    switch (error.message) {
      case 'Invalid phone number format':
        return 'Please provide a valid phone number.';
      case 'Tel URI scheme not supported on this device':
        return 'Phone dialing is not supported on this device. Please call manually.';
      default:
        return 'Unable to initiate phone call. Please try again.';
    }
  }, []);

  /**
   * Initiates a phone call with error handling and callbacks
   */
  const initiateCall = useCallback((phoneNumber?: string) => {
    const numberToCall = phoneNumber || defaultPhoneNumber;

    try {
      // Validate the phone number first
      if (!validatePhoneNumber(numberToCall)) {
        const error = new Error('Invalid phone number format');
        onError?.(error);
        return;
      }

      // Check if device supports phone dialing
      if (!browserSupport) {
        const error = new Error('Tel URI scheme not supported on this device');
        onError?.(error);
        return;
      }

      // Attempt to initiate the call
      initiatePhoneCall(numberToCall);
      onSuccess?.(numberToCall);

    } catch (error) {
      const phoneError = error instanceof Error ? error : new Error('Unknown error occurred');
      onError?.(phoneError);
    }
  }, [defaultPhoneNumber, browserSupport, onError, onSuccess]);

  return {
    initiateCall,
    isMobile,
    isSupported: browserSupport,
    deviceInfo,
    defaultNumber: defaultPhoneNumber,
    formatError
  };
};

/**
 * Simplified hook for basic phone dialing without configuration
 * @param phoneNumber - Optional phone number to call (uses default if not provided)
 * @returns Function to initiate the call
 */
export const useSimplePhoneDialer = (phoneNumber?: string) => {
  const { initiateCall } = usePhoneDialer({
    defaultPhoneNumber: phoneNumber
  });

  return initiateCall;
};