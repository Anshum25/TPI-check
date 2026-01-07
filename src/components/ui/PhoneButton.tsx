/**
 * PhoneButton component for initiating phone calls
 */

import * as React from "react";
import { Phone, Copy, ExternalLink } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Button, type ButtonProps } from "./button";
import { usePhoneDialer, type UsePhoneDialerOptions } from "@/hooks/usePhoneDialer";
import { cn } from "@/lib/utils";
import { formatPhoneNumber } from "@/lib/phone-utils";

const phoneButtonVariants = cva(
  "inline-flex items-center justify-center gap-2",
  {
    variants: {
      iconPosition: {
        left: "flex-row",
        right: "flex-row-reverse",
      },
    },
    defaultVariants: {
      iconPosition: "left",
    },
  }
);

export interface PhoneButtonProps
  extends Omit<ButtonProps, 'onClick'>,
    VariantProps<typeof phoneButtonVariants>,
    UsePhoneDialerOptions {
  /** Phone number to call (uses default if not provided) */
  phoneNumber?: string;
  /** Whether to show the phone icon */
  showIcon?: boolean;
  /** Position of the phone icon */
  iconPosition?: "left" | "right";
  /** Custom icon to use instead of default phone icon */
  icon?: React.ReactNode;
  /** Whether to show the phone number in the button text */
  showPhoneNumber?: boolean;
  /** Custom aria label (auto-generated if not provided) */
  ariaLabel?: string;
  /** Additional click handler (called after phone dialing attempt) */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Fallback behavior for unsupported devices */
  fallbackBehavior?: "copy" | "display" | "external" | "disabled";
  /** Custom fallback text for unsupported devices */
  fallbackText?: string;
  /** Whether to show error messages to user */
  showErrorMessages?: boolean;
}

/**
 * PhoneButton component that handles phone dialing with proper accessibility and error handling
 */
const PhoneButton = React.forwardRef<HTMLButtonElement, PhoneButtonProps>(
  ({
    className,
    variant = "default",
    size = "default",
    phoneNumber,
    showIcon = true,
    iconPosition = "left",
    icon,
    showPhoneNumber = false,
    ariaLabel,
    children,
    defaultPhoneNumber,
    onError,
    onSuccess,
    onClick,
    disabled,
    fallbackBehavior = "display",
    fallbackText,
    showErrorMessages = false,
    ...props
  }, ref) => {
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);

    const { initiateCall, isMobile, isSupported, defaultNumber, formatError } = usePhoneDialer({
      defaultPhoneNumber: defaultPhoneNumber || phoneNumber,
      onError: (error) => {
        const formattedError = formatError(error);
        console.error('Phone dialing error:', formattedError);
        
        if (showErrorMessages) {
          setErrorMessage(formattedError);
          // Clear error message after 5 seconds
          setTimeout(() => setErrorMessage(""), 5000);
        }
        
        onError?.(error);
        setIsLoading(false);
      },
      onSuccess: (number) => {
        console.log('Phone call initiated:', number);
        setErrorMessage("");
        onSuccess?.(number);
        setIsLoading(false);
      }
    });

    const numberToCall = phoneNumber || defaultNumber;
    const formattedNumber = formatPhoneNumber(numberToCall);

    // Handle fallback behaviors for unsupported devices
    const handleFallback = async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      
      switch (fallbackBehavior) {
        case "copy":
          try {
            await navigator.clipboard.writeText(numberToCall);
            setErrorMessage("Phone number copied to clipboard");
            setTimeout(() => setErrorMessage(""), 3000);
          } catch (err) {
            setErrorMessage("Unable to copy phone number");
            setTimeout(() => setErrorMessage(""), 3000);
          }
          break;
          
        case "external":
          // Try to open in external app (may work on some desktop systems)
          window.open(`tel:${numberToCall}`, '_blank');
          break;
          
        case "display":
          setErrorMessage(`Please call: ${formattedNumber}`);
          setTimeout(() => setErrorMessage(""), 5000);
          break;
          
        case "disabled":
        default:
          // Do nothing - button remains disabled
          break;
      }
      
      onClick?.(event);
    };

    // Generate appropriate button text
    const getButtonText = () => {
      if (isLoading) return "Calling...";
      if (children) return children;
      if (showPhoneNumber) return formattedNumber;
      if (!isSupported && fallbackText) return fallbackText;
      if (!isSupported && fallbackBehavior === "copy") return "Copy Number";
      if (!isSupported && fallbackBehavior === "display") return "Show Number";
      return "Call Now";
    };

    // Generate appropriate aria label
    const getAriaLabel = () => {
      if (ariaLabel) return ariaLabel;
      if (!isSupported && fallbackBehavior === "copy") return `Copy phone number ${formattedNumber}`;
      if (!isSupported && fallbackBehavior === "display") return `Show phone number ${formattedNumber}`;
      return `Call ${formattedNumber}`;
    };

    // Handle button click
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsLoading(true);
      
      if (!isSupported) {
        handleFallback(event);
        return;
      }
      
      // Initiate the phone call
      initiateCall(numberToCall);
      
      // Call additional click handler if provided
      onClick?.(event);
    };

    // Determine if button should be disabled
    const isDisabled = disabled || (fallbackBehavior === "disabled" && !isSupported) || isLoading;

    // Get the appropriate icon based on state and fallback behavior
    const renderIcon = () => {
      if (!showIcon) return null;
      
      if (icon) return icon;
      
      if (!isSupported) {
        switch (fallbackBehavior) {
          case "copy":
            return <Copy className="h-4 w-4" aria-hidden="true" />;
          case "external":
            return <ExternalLink className="h-4 w-4" aria-hidden="true" />;
          case "display":
            return <Phone className="h-4 w-4" aria-hidden="true" />;
          default:
            return <Phone className="h-4 w-4" aria-hidden="true" />;
        }
      }
      
      return <Phone className="h-4 w-4" aria-hidden="true" />;
    };

    // Get appropriate title text
    const getTitleText = () => {
      if (isSupported) return `Call ${formattedNumber}`;
      
      switch (fallbackBehavior) {
        case "copy":
          return `Copy phone number ${formattedNumber} to clipboard`;
        case "external":
          return `Try to open ${formattedNumber} in external app`;
        case "display":
          return `Show phone number ${formattedNumber}`;
        default:
          return "Phone dialing not supported on this device";
      }
    };

    return (
      <div className="relative">
        <Button
          ref={ref}
          className={cn(
            phoneButtonVariants({ iconPosition }),
            !isSupported && fallbackBehavior === "disabled" && "opacity-50 cursor-not-allowed",
            className
          )}
          variant={!isSupported && fallbackBehavior !== "disabled" ? "outline" : variant}
          size={size}
          disabled={isDisabled}
          onClick={handleClick}
          aria-label={getAriaLabel()}
          title={getTitleText()}
          type="button"
          {...props}
        >
          {iconPosition === "left" && renderIcon()}
          <span>{getButtonText()}</span>
          {iconPosition === "right" && renderIcon()}
        </Button>
        
        {/* Error/Status Message Display */}
        {showErrorMessages && errorMessage && (
          <div 
            className="absolute top-full left-0 right-0 mt-1 p-2 text-xs bg-popover border border-border rounded-md shadow-md z-10"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

PhoneButton.displayName = "PhoneButton";

export { PhoneButton, phoneButtonVariants };