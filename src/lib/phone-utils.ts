/**
 * Phone utility functions for handling phone numbers and device detection
 */

export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  browserSupport: boolean;
}

export interface PhoneConfig {
  defaultNumber: string;
  displayFormat: string;
  ariaLabel: string;
}

export const PHONE_CONFIG: PhoneConfig = {
  defaultNumber: "9725500435",
  displayFormat: "(972) 550-0435",
  ariaLabel: "Call us at (972) 550-0435"
};

/**
 * Validates if a phone number is in a valid format
 * @param phoneNumber - The phone number to validate
 * @returns boolean indicating if the number is valid
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }
  
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid US phone number (10 digits) or international format
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

/**
 * Formats a phone number for display
 * @param phoneNumber - The raw phone number
 * @returns formatted phone number string
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Format as US phone number if 10 digits
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  }
  
  // Return original if not standard US format
  return phoneNumber;
};

/**
 * Creates a tel: URI for phone dialing
 * @param phoneNumber - The phone number to create URI for
 * @returns tel: URI string
 */
export const createTelUri = (phoneNumber: string): string => {
  if (!validatePhoneNumber(phoneNumber)) {
    throw new Error('Invalid phone number format');
  }
  
  // Remove all non-digit characters for the tel: URI
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  return `tel:${digitsOnly}`;
};

/**
 * Detects if the current device is mobile
 * @returns boolean indicating if device is mobile
 */
export const detectMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  // Check user agent for mobile indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android', 'webos', 'iphone', 'ipad', 'ipod', 
    'blackberry', 'windows phone', 'mobile'
  ];
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
};

/**
 * Detects if the current device is iOS
 * @returns boolean indicating if device is iOS
 */
export const detectIOSDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

/**
 * Detects if the current device is Android
 * @returns boolean indicating if device is Android
 */
export const detectAndroidDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  
  const userAgent = navigator.userAgent.toLowerCase();
  return /android/.test(userAgent);
};

/**
 * Checks if the browser supports tel: URI scheme
 * @returns boolean indicating tel: URI support
 */
export const checkTelUriSupport = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Most modern mobile browsers support tel: URI
  // Desktop browsers may support it but won't have a dialer
  return detectMobileDevice();
};

/**
 * Gets comprehensive device information
 * @returns DeviceInfo object with device details
 */
export const getDeviceInfo = (): DeviceInfo => {
  return {
    isMobile: detectMobileDevice(),
    isIOS: detectIOSDevice(),
    isAndroid: detectAndroidDevice(),
    browserSupport: checkTelUriSupport()
  };
};

/**
 * Initiates a phone call using tel: URI
 * @param phoneNumber - The phone number to call
 * @throws Error if phone number is invalid or tel: URI is not supported
 */
export const initiatePhoneCall = (phoneNumber: string): void => {
  if (!validatePhoneNumber(phoneNumber)) {
    throw new Error('Invalid phone number format');
  }
  
  if (!checkTelUriSupport()) {
    throw new Error('Tel URI scheme not supported on this device');
  }
  
  const telUri = createTelUri(phoneNumber);
  window.location.href = telUri;
};