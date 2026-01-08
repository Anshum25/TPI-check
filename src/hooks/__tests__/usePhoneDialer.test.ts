/**
 * Unit tests for usePhoneDialer hook
 */

import { renderHook, act } from '@testing-library/react';
import { usePhoneDialer, useSimplePhoneDialer } from '../usePhoneDialer';
import * as phoneUtils from '@/lib/phone-utils';

// Mock the phone-utils module
vi.mock('@/lib/phone-utils', () => ({
  getDeviceInfo: vi.fn(),
  initiatePhoneCall: vi.fn(),
  validatePhoneNumber: vi.fn(),
  PHONE_CONFIG: {
    defaultNumber: '9725500435',
    displayFormat: '(972) 550-0435',
    ariaLabel: 'Call us at (972) 550-0435'
  }
}));

const mockGetDeviceInfo = vi.mocked(phoneUtils.getDeviceInfo);
const mockInitiatePhoneCall = vi.mocked(phoneUtils.initiatePhoneCall);
const mockValidatePhoneNumber = vi.mocked(phoneUtils.validatePhoneNumber);

describe('usePhoneDialer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementations
    mockGetDeviceInfo.mockReturnValue({
      isMobile: true,
      isIOS: false,
      isAndroid: true,
      browserSupport: true
    });
    
    mockValidatePhoneNumber.mockReturnValue(true);
    mockInitiatePhoneCall.mockImplementation(() => {});
  });

  describe('basic functionality', () => {
    test('returns correct device information', () => {
      const { result } = renderHook(() => usePhoneDialer());

      expect(result.current.isMobile).toBe(true);
      expect(result.current.isSupported).toBe(true);
      expect(result.current.deviceInfo).toEqual({
        isMobile: true,
        isIOS: false,
        isAndroid: true,
        browserSupport: true
      });
    });

    test('returns default phone number', () => {
      const { result } = renderHook(() => usePhoneDialer());

      expect(result.current.defaultNumber).toBe('9725500435');
    });

    test('uses custom default phone number', () => {
      const { result } = renderHook(() => 
        usePhoneDialer({ defaultPhoneNumber: '1234567890' })
      );

      expect(result.current.defaultNumber).toBe('1234567890');
    });
  });

  describe('initiateCall function', () => {
    test('successfully initiates call with default number', () => {
      const onSuccess = vi.fn();
      const { result } = renderHook(() => 
        usePhoneDialer({ onSuccess })
      );

      act(() => {
        result.current.initiateCall();
      });

      expect(mockValidatePhoneNumber).toHaveBeenCalledWith('9725500435');
      expect(mockInitiatePhoneCall).toHaveBeenCalledWith('9725500435');
      expect(onSuccess).toHaveBeenCalledWith('9725500435');
    });

    test('successfully initiates call with custom number', () => {
      const onSuccess = vi.fn();
      const { result } = renderHook(() => 
        usePhoneDialer({ onSuccess })
      );

      act(() => {
        result.current.initiateCall('1234567890');
      });

      expect(mockValidatePhoneNumber).toHaveBeenCalledWith('1234567890');
      expect(mockInitiatePhoneCall).toHaveBeenCalledWith('1234567890');
      expect(onSuccess).toHaveBeenCalledWith('1234567890');
    });

    test('handles invalid phone number', () => {
      mockValidatePhoneNumber.mockReturnValue(false);
      const onError = vi.fn();
      
      const { result } = renderHook(() => 
        usePhoneDialer({ onError })
      );

      act(() => {
        result.current.initiateCall('invalid');
      });

      expect(mockInitiatePhoneCall).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Invalid phone number format'
        })
      );
    });

    test('handles unsupported device', () => {
      mockGetDeviceInfo.mockReturnValue({
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        browserSupport: false
      });

      const onError = vi.fn();
      const { result } = renderHook(() => 
        usePhoneDialer({ onError })
      );

      act(() => {
        result.current.initiateCall();
      });

      expect(mockInitiatePhoneCall).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Tel URI scheme not supported on this device'
        })
      );
    });

    test('handles phone call initiation error', () => {
      mockInitiatePhoneCall.mockImplementation(() => {
        throw new Error('Phone call failed');
      });

      const onError = vi.fn();
      const { result } = renderHook(() => 
        usePhoneDialer({ onError })
      );

      act(() => {
        result.current.initiateCall();
      });

      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Phone call failed'
        })
      );
    });
  });

  describe('formatError function', () => {
    test('formats invalid phone number error', () => {
      const { result } = renderHook(() => usePhoneDialer());

      const error = new Error('Invalid phone number format');
      const formattedError = result.current.formatError(error);

      expect(formattedError).toBe('Please provide a valid phone number.');
    });

    test('formats unsupported device error', () => {
      const { result } = renderHook(() => usePhoneDialer());

      const error = new Error('Tel URI scheme not supported on this device');
      const formattedError = result.current.formatError(error);

      expect(formattedError).toBe('Phone dialing is not supported on this device. Please call manually.');
    });

    test('formats unknown error', () => {
      const { result } = renderHook(() => usePhoneDialer());

      const error = new Error('Some unknown error');
      const formattedError = result.current.formatError(error);

      expect(formattedError).toBe('Unable to initiate phone call. Please try again.');
    });
  });

  describe('device state changes', () => {
    test('updates when device info changes', () => {
      mockGetDeviceInfo.mockReturnValue({
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        browserSupport: false
      });

      const { result } = renderHook(() => usePhoneDialer());

      expect(result.current.isMobile).toBe(false);
      expect(result.current.isSupported).toBe(false);
    });
  });

  describe('callback stability', () => {
    test('initiateCall function is stable across re-renders', () => {
      const { result, rerender } = renderHook(() => usePhoneDialer());

      const firstInitiateCall = result.current.initiateCall;
      
      rerender();
      
      const secondInitiateCall = result.current.initiateCall;

      expect(firstInitiateCall).toBe(secondInitiateCall);
    });

    test('formatError function is stable across re-renders', () => {
      const { result, rerender } = renderHook(() => usePhoneDialer());

      const firstFormatError = result.current.formatError;
      
      rerender();
      
      const secondFormatError = result.current.formatError;

      expect(firstFormatError).toBe(secondFormatError);
    });
  });
});

describe('useSimplePhoneDialer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockGetDeviceInfo.mockReturnValue({
      isMobile: true,
      isIOS: false,
      isAndroid: true,
      browserSupport: true
    });
    
    mockValidatePhoneNumber.mockReturnValue(true);
    mockInitiatePhoneCall.mockImplementation(() => {});
  });

  test('returns a function that initiates calls', () => {
    const { result } = renderHook(() => useSimplePhoneDialer());

    expect(typeof result.current).toBe('function');
  });

  test('uses default phone number when none provided', () => {
    const { result } = renderHook(() => useSimplePhoneDialer());

    act(() => {
      result.current();
    });

    expect(mockValidatePhoneNumber).toHaveBeenCalledWith('9725500435');
    expect(mockInitiatePhoneCall).toHaveBeenCalledWith('9725500435');
  });

  test('uses custom phone number when provided', () => {
    const { result } = renderHook(() => useSimplePhoneDialer('1234567890'));

    act(() => {
      result.current();
    });

    expect(mockValidatePhoneNumber).toHaveBeenCalledWith('1234567890');
    expect(mockInitiatePhoneCall).toHaveBeenCalledWith('1234567890');
  });

  test('function is stable across re-renders', () => {
    const { result, rerender } = renderHook(() => useSimplePhoneDialer());

    const firstFunction = result.current;
    
    rerender();
    
    const secondFunction = result.current;

    expect(firstFunction).toBe(secondFunction);
  });
});