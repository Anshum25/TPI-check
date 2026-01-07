/**
 * Main PhoneDialer component with default configuration
 */

import * as React from "react";
import { PhoneButton, type PhoneButtonProps } from "./ui/PhoneButton";
import { PHONE_CONFIG } from "@/lib/phone-utils";

export interface PhoneDialerProps extends Omit<PhoneButtonProps, 'phoneNumber' | 'defaultPhoneNumber'> {
  /** Override the default phone number */
  phoneNumber?: string;
  /** Configuration preset to use */
  preset?: 'default' | 'compact' | 'prominent' | 'fallback-friendly';
}

/**
 * Pre-configured phone dialer component with sensible defaults
 * Uses the default phone number from PHONE_CONFIG unless overridden
 */
const PhoneDialer = React.forwardRef<HTMLButtonElement, PhoneDialerProps>(
  ({ 
    phoneNumber = PHONE_CONFIG.defaultNumber,
    preset = 'default',
    variant,
    size,
    showIcon,
    showPhoneNumber,
    fallbackBehavior,
    showErrorMessages,
    children,
    ...props 
  }, ref) => {
    
    // Apply preset configurations
    const getPresetConfig = () => {
      switch (preset) {
        case 'compact':
          return {
            variant: variant || 'outline' as const,
            size: size || 'sm' as const,
            showIcon: showIcon ?? true,
            showPhoneNumber: showPhoneNumber ?? false,
            fallbackBehavior: fallbackBehavior || 'copy' as const,
            showErrorMessages: showErrorMessages ?? false,
            children: children || 'Call'
          };
          
        case 'prominent':
          return {
            variant: variant || 'default' as const,
            size: size || 'lg' as const,
            showIcon: showIcon ?? true,
            showPhoneNumber: showPhoneNumber ?? true,
            fallbackBehavior: fallbackBehavior || 'display' as const,
            showErrorMessages: showErrorMessages ?? true,
            children: children
          };
          
        case 'fallback-friendly':
          return {
            variant: variant || 'outline' as const,
            size: size || 'default' as const,
            showIcon: showIcon ?? true,
            showPhoneNumber: showPhoneNumber ?? false,
            fallbackBehavior: fallbackBehavior || 'copy' as const,
            showErrorMessages: showErrorMessages ?? true,
            children: children || 'Contact Us'
          };
          
        case 'default':
        default:
          return {
            variant: variant || 'default' as const,
            size: size || 'default' as const,
            showIcon: showIcon ?? true,
            showPhoneNumber: showPhoneNumber ?? false,
            fallbackBehavior: fallbackBehavior || 'display' as const,
            showErrorMessages: showErrorMessages ?? false,
            children: children || 'Call Now'
          };
      }
    };

    const config = getPresetConfig();

    return (
      <PhoneButton
        ref={ref}
        phoneNumber={phoneNumber}
        variant={config.variant}
        size={config.size}
        showIcon={config.showIcon}
        showPhoneNumber={config.showPhoneNumber}
        fallbackBehavior={config.fallbackBehavior}
        showErrorMessages={config.showErrorMessages}
        ariaLabel={`Call ${PHONE_CONFIG.displayFormat}`}
        {...props}
      >
        {children || config.children}
      </PhoneButton>
    );
  }
);

PhoneDialer.displayName = "PhoneDialer";

export { PhoneDialer };

/**
 * Quick access components for common use cases
 */

/**
 * Compact phone dialer for headers, footers, or tight spaces
 */
export const CompactPhoneDialer = React.forwardRef<HTMLButtonElement, Omit<PhoneDialerProps, 'preset'>>(
  (props, ref) => (
    <PhoneDialer ref={ref} preset="compact" {...props} />
  )
);
CompactPhoneDialer.displayName = "CompactPhoneDialer";

/**
 * Prominent phone dialer for hero sections or main call-to-action areas
 */
export const ProminentPhoneDialer = React.forwardRef<HTMLButtonElement, Omit<PhoneDialerProps, 'preset'>>(
  (props, ref) => (
    <PhoneDialer ref={ref} preset="prominent" {...props} />
  )
);
ProminentPhoneDialer.displayName = "ProminentPhoneDialer";

/**
 * Fallback-friendly phone dialer optimized for cross-device compatibility
 */
export const FallbackFriendlyPhoneDialer = React.forwardRef<HTMLButtonElement, Omit<PhoneDialerProps, 'preset'>>(
  (props, ref) => (
    <PhoneDialer ref={ref} preset="fallback-friendly" {...props} />
  )
);
FallbackFriendlyPhoneDialer.displayName = "FallbackFriendlyPhoneDialer";