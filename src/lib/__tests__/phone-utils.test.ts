/**
 * Unit tests for phone utility functions
 */

import {
  validatePhoneNumber,
  formatPhoneNumber,
  createTelUri,
  detectMobileDevice,
  detectIOSDevice,
  detectAndroidDevice,
  checkTelUriSupport,
  getDeviceInfo,
  initiatePhoneCall,
  PHONE_CONFIG
} from '../phone-utils';

// Mock window and navigator for testing
const mockWindow = {
  location: { href: '' }
};

const mockNavigator = {
  userAgent: ''
};

// Store original values
const originalWindow = global.window;
const originalNavigator = global.navigator;

beforeEach(() => {
  // Reset mocks
  mockWindow.location.href = '';
  mockNavigator.userAgent = '';
  
  // Set up mocks
  Object.defineProperty(global, 'window', {
    value: mockWindow,
    writable: true
  });
  
  Object.defineProperty(global, 'navigator', {
    value: mockNavigator,
    writable: true
  });
});

afterAll(() => {
  // Restore original values
  global.window = originalWindow;
  global.navigator = originalNavigator;
});

describe('validatePhoneNumber', () => {
  test('validates correct US phone numbers', () => {
    expect(validatePhoneNumber('9725500435')).toBe(true);
    expect(validatePhoneNumber('(972) 550-0435')).toBe(true);
    expect(validatePhoneNumber('972-550-0435')).toBe(true);
    expect(validatePhoneNumber('972.550.0435')).toBe(true);
  });

  test('validates international phone numbers', () => {
    expect(validatePhoneNumber('+1234567890123')).toBe(true);
    expect(validatePhoneNumber('12345678901')).toBe(true);
  });

  test('rejects invalid phone numbers', () => {
    expect(validatePhoneNumber('')).toBe(false);
    expect(validatePhoneNumber('123')).toBe(false);
    expect(validatePhoneNumber('abc')).toBe(false);
    expect(validatePhoneNumber('123456789012345678')).toBe(false);
  });

  test('handles null and undefined inputs', () => {
    expect(validatePhoneNumber(null as any)).toBe(false);
    expect(validatePhoneNumber(undefined as any)).toBe(false);
  });
});

describe('formatPhoneNumber', () => {
  test('formats US phone numbers correctly', () => {
    expect(formatPhoneNumber('9725500435')).toBe('(972) 550-0435');
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
  });

  test('handles already formatted numbers', () => {
    expect(formatPhoneNumber('(972) 550-0435')).toBe('(972) 550-0435');
  });

  test('handles non-US format numbers', () => {
    expect(formatPhoneNumber('123456789012')).toBe('123456789012');
    expect(formatPhoneNumber('+123456789012')).toBe('+123456789012');
  });

  test('handles empty input', () => {
    expect(formatPhoneNumber('')).toBe('');
  });
});

describe('createTelUri', () => {
  test('creates correct tel URI for valid numbers', () => {
    expect(createTelUri('9725500435')).toBe('tel:9725500435');
    expect(createTelUri('(972) 550-0435')).toBe('tel:9725500435');
    expect(createTelUri('972-550-0435')).toBe('tel:9725500435');
  });

  test('throws error for invalid numbers', () => {
    expect(() => createTelUri('123')).toThrow('Invalid phone number format');
    expect(() => createTelUri('')).toThrow('Invalid phone number format');
    expect(() => createTelUri('abc')).toThrow('Invalid phone number format');
  });
});

describe('device detection functions', () => {
  test('detectMobileDevice identifies mobile devices', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    expect(detectMobileDevice()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    expect(detectMobileDevice()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    expect(detectMobileDevice()).toBe(false);
  });

  test('detectIOSDevice identifies iOS devices', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    expect(detectIOSDevice()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)';
    expect(detectIOSDevice()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    expect(detectIOSDevice()).toBe(false);
  });

  test('detectAndroidDevice identifies Android devices', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    expect(detectAndroidDevice()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    expect(detectAndroidDevice()).toBe(false);
  });

  test('handles missing window/navigator', () => {
    delete (global as any).window;
    delete (global as any).navigator;

    expect(detectMobileDevice()).toBe(false);
    expect(detectIOSDevice()).toBe(false);
    expect(detectAndroidDevice()).toBe(false);
  });
});

describe('checkTelUriSupport', () => {
  test('returns true for mobile devices', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    expect(checkTelUriSupport()).toBe(true);

    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    expect(checkTelUriSupport()).toBe(true);
  });

  test('returns false for desktop devices', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    expect(checkTelUriSupport()).toBe(false);
  });
});

describe('getDeviceInfo', () => {
  test('returns correct device info for iPhone', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    const deviceInfo = getDeviceInfo();

    expect(deviceInfo.isMobile).toBe(true);
    expect(deviceInfo.isIOS).toBe(true);
    expect(deviceInfo.isAndroid).toBe(false);
    expect(deviceInfo.browserSupport).toBe(true);
  });

  test('returns correct device info for Android', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G975F)';
    const deviceInfo = getDeviceInfo();

    expect(deviceInfo.isMobile).toBe(true);
    expect(deviceInfo.isIOS).toBe(false);
    expect(deviceInfo.isAndroid).toBe(true);
    expect(deviceInfo.browserSupport).toBe(true);
  });

  test('returns correct device info for desktop', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    const deviceInfo = getDeviceInfo();

    expect(deviceInfo.isMobile).toBe(false);
    expect(deviceInfo.isIOS).toBe(false);
    expect(deviceInfo.isAndroid).toBe(false);
    expect(deviceInfo.browserSupport).toBe(false);
  });
});

describe('initiatePhoneCall', () => {
  test('initiates call for valid number on mobile device', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    
    initiatePhoneCall('9725500435');
    expect(mockWindow.location.href).toBe('tel:9725500435');
  });

  test('throws error for invalid phone number', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    
    expect(() => initiatePhoneCall('123')).toThrow('Invalid phone number format');
  });

  test('throws error for unsupported device', () => {
    mockNavigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    
    expect(() => initiatePhoneCall('9725500435')).toThrow('Tel URI scheme not supported on this device');
  });
});

describe('PHONE_CONFIG', () => {
  test('contains correct default configuration', () => {
    expect(PHONE_CONFIG.defaultNumber).toBe('9725500435');
    expect(PHONE_CONFIG.displayFormat).toBe('(972) 550-0435');
    expect(PHONE_CONFIG.ariaLabel).toBe('Call us at (972) 550-0435');
  });
});