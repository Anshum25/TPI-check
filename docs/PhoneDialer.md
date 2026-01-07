# PhoneDialer Components Documentation

The PhoneDialer component library provides a comprehensive solution for adding phone calling functionality to React applications. It includes multiple components optimized for different use cases, with built-in accessibility, error handling, and cross-device compatibility.

## Table of Contents

- [Quick Start](#quick-start)
- [Components Overview](#components-overview)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Accessibility](#accessibility)
- [Device Compatibility](#device-compatibility)
- [Customization](#customization)
- [Best Practices](#best-practices)

## Quick Start

### Installation

The PhoneDialer components are already included in your project. Simply import and use them:

```tsx
import { PhoneDialer } from '@/components/PhoneDialer';

function App() {
  return (
    <div>
      <h1>Contact Us</h1>
      <PhoneDialer />
    </div>
  );
}
```

### Basic Usage

```tsx
// Default phone dialer (uses configured phone number)
<PhoneDialer />

// Custom phone number
<PhoneDialer phoneNumber="1234567890" />

// With custom text
<PhoneDialer>Call Support</PhoneDialer>
```

## Components Overview

### PhoneDialer
The main component with preset configurations for common use cases.

```tsx
<PhoneDialer preset="default" />
<PhoneDialer preset="compact" />
<PhoneDialer preset="prominent" />
<PhoneDialer preset="fallback-friendly" />
```

### Specialized Components

#### CompactPhoneDialer
Optimized for headers, navigation bars, and tight spaces.

```tsx
<CompactPhoneDialer />
```

#### ProminentPhoneDialer
Large, attention-grabbing dialer for hero sections and main CTAs.

```tsx
<ProminentPhoneDialer />
```

#### FallbackFriendlyPhoneDialer
Cross-device compatible with enhanced error handling.

```tsx
<FallbackFriendlyPhoneDialer />
```

#### PhoneButton
Low-level component for maximum customization.

```tsx
<PhoneButton
  phoneNumber="1234567890"
  variant="outline"
  size="lg"
  fallbackBehavior="copy"
  showErrorMessages
/>
```

## API Reference

### PhoneDialer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneNumber` | `string` | `"9725500435"` | Phone number to call |
| `preset` | `"default" \| "compact" \| "prominent" \| "fallback-friendly"` | `"default"` | Preset configuration |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | Varies by preset | Button style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | Varies by preset | Button size |
| `children` | `React.ReactNode` | Varies by preset | Button text content |

### PhoneButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `phoneNumber` | `string` | `"9725500435"` | Phone number to call |
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Button style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `showIcon` | `boolean` | `true` | Whether to show phone icon |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon position |
| `showPhoneNumber` | `boolean` | `false` | Show formatted phone number in button |
| `fallbackBehavior` | `"copy" \| "display" \| "external" \| "disabled"` | `"display"` | Behavior for unsupported devices |
| `showErrorMessages` | `boolean` | `false` | Show error messages to users |
| `ariaLabel` | `string` | Auto-generated | Custom ARIA label |
| `onSuccess` | `(phoneNumber: string) => void` | - | Success callback |
| `onError` | `(error: Error) => void` | - | Error callback |

### Fallback Behaviors

| Behavior | Description | Use Case |
|----------|-------------|----------|
| `"copy"` | Copies phone number to clipboard | Desktop users, mobile apps |
| `"display"` | Shows phone number in a message | General fallback |
| `"external"` | Attempts to open in external app | Desktop with phone apps |
| `"disabled"` | Disables button on unsupported devices | Strict mobile-only scenarios |

## Usage Examples

### Hero Section

```tsx
function HeroSection() {
  return (
    <section className="text-center py-20">
      <h1>Need Help? Call Us Now!</h1>
      <ProminentPhoneDialer 
        onSuccess={(number) => {
          // Track analytics
          analytics.track('call_initiated', { number });
        }}
      />
    </section>
  );
}
```

### Header Navigation

```tsx
function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Logo />
      <nav className="flex items-center gap-4">
        <NavLinks />
        <CompactPhoneDialer />
      </nav>
    </header>
  );
}
```

### Contact Page

```tsx
function ContactPage() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2>Contact Information</h2>
        <div className="space-y-4">
          <div>
            <h3>Phone Support</h3>
            <PhoneDialer showErrorMessages />
          </div>
          <div>
            <h3>Emergency Line</h3>
            <PhoneButton
              phoneNumber="911"
              variant="destructive"
              fallbackBehavior="display"
            >
              Emergency: 911
            </PhoneButton>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
```

### Mobile-Optimized

```tsx
function MobileCallToAction() {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden">
      <FallbackFriendlyPhoneDialer 
        className="w-full"
        showErrorMessages
      />
    </div>
  );
}
```

## Accessibility

The PhoneDialer components are built with comprehensive accessibility support:

### ARIA Attributes
- Proper `aria-label` for screen readers
- `role="button"` for semantic meaning
- `aria-hidden="true"` on decorative icons
- `role="alert"` and `aria-live="polite"` for error messages

### Keyboard Navigation
- Full keyboard accessibility with Tab navigation
- Enter and Space key activation
- Focus management and visual indicators

### Screen Reader Support
- Descriptive labels for all interactive elements
- Clear communication of fallback behaviors
- Announced error messages and status updates

### Visual Accessibility
- High contrast mode support
- Adequate touch target sizes (minimum 44px)
- Clear visual indicators for disabled states
- Respects `prefers-reduced-motion`

## Device Compatibility

### Mobile Devices
- **iOS Safari**: Full `tel:` URI support
- **Android Chrome**: Full `tel:` URI support
- **Other mobile browsers**: Generally supported

### Desktop Browsers
- **Chrome/Firefox/Safari**: Limited support (depends on system)
- **Fallback behaviors**: Copy to clipboard, display number, external app

### Detection Logic
The components automatically detect:
- Mobile vs desktop devices
- `tel:` URI scheme support
- Browser capabilities

## Customization

### Styling

```tsx
// Custom CSS classes
<PhoneDialer className="bg-blue-500 text-white rounded-full" />

// Tailwind utilities
<PhoneButton className="shadow-lg hover:shadow-xl transition-shadow" />
```

### Theming

The components use CSS custom properties and can be themed through your design system:

```css
:root {
  --primary: 220 14% 96%;
  --primary-foreground: 220 9% 46%;
  /* ... other theme variables */
}
```

### Custom Icons

```tsx
import { MessageCircle } from 'lucide-react';

<PhoneButton icon={<MessageCircle />}>
  Chat Support
</PhoneButton>
```

### Phone Number Configuration

```tsx
// In your configuration file
export const PHONE_CONFIG = {
  defaultNumber: "9725500435",
  displayFormat: "(972) 550-0435",
  ariaLabel: "Call us at (972) 550-0435"
};
```

## Best Practices

### 1. Choose the Right Component

- **PhoneDialer**: General use, good defaults
- **CompactPhoneDialer**: Headers, navigation, tight spaces
- **ProminentPhoneDialer**: Hero sections, main CTAs
- **FallbackFriendlyPhoneDialer**: Cross-device compatibility priority
- **PhoneButton**: Maximum customization needed

### 2. Handle Errors Gracefully

```tsx
<PhoneDialer
  showErrorMessages
  onError={(error) => {
    // Log error for debugging
    console.error('Phone call failed:', error);
    
    // Show user-friendly message
    toast.error('Unable to initiate call. Please try again.');
  }}
/>
```

### 3. Track Analytics

```tsx
<PhoneDialer
  onSuccess={(number) => {
    analytics.track('phone_call_initiated', {
      number,
      source: 'hero_section',
      timestamp: new Date().toISOString()
    });
  }}
/>
```

### 4. Provide Context

```tsx
// Good: Clear context
<div>
  <h3>Customer Support</h3>
  <p>Available Monday-Friday, 9 AM - 5 PM EST</p>
  <PhoneDialer />
</div>

// Better: Include fallback information
<div>
  <h3>Customer Support</h3>
  <p>Available Monday-Friday, 9 AM - 5 PM EST</p>
  <FallbackFriendlyPhoneDialer showErrorMessages />
  <p className="text-sm text-muted-foreground mt-2">
    If calling is not available, the number will be copied to your clipboard
  </p>
</div>
```

### 5. Test Across Devices

- Test on actual mobile devices
- Verify fallback behaviors on desktop
- Check accessibility with screen readers
- Validate with different phone number formats

### 6. Consider International Users

```tsx
// Support international numbers
<PhoneButton phoneNumber="+44 20 7946 0958" />

// Provide multiple contact options
<div className="space-y-2">
  <PhoneButton phoneNumber="+1-555-0123">US: +1-555-0123</PhoneButton>
  <PhoneButton phoneNumber="+44-20-7946-0958">UK: +44-20-7946-0958</PhoneButton>
</div>
```

### 7. Performance Considerations

```tsx
// Lazy load for better performance
const PhoneDialer = React.lazy(() => import('@/components/PhoneDialer'));

function ContactSection() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PhoneDialer />
    </React.Suspense>
  );
}
```

## Troubleshooting

### Common Issues

1. **Phone dialer not working on desktop**
   - Expected behavior - use fallback options
   - Consider `fallbackBehavior="copy"` for desktop users

2. **Button appears disabled**
   - Check device compatibility
   - Verify phone number format
   - Review fallback behavior settings

3. **Accessibility warnings**
   - Ensure proper ARIA labels
   - Check color contrast ratios
   - Verify keyboard navigation

4. **Styling issues**
   - Check CSS class conflicts
   - Verify Tailwind CSS configuration
   - Review component prop overrides

### Debug Mode

```tsx
<PhoneDialer
  showErrorMessages
  onError={(error) => {
    console.error('Debug info:', {
      error: error.message,
      deviceInfo: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }}
/>
```

## Migration Guide

If upgrading from a previous version or migrating from another phone component:

### From Basic Button

```tsx
// Before
<button onClick={() => window.location.href = 'tel:9725500435'}>
  Call Us
</button>

// After
<PhoneDialer />
```

### From Custom Implementation

```tsx
// Before
const handleCall = () => {
  if (isMobile) {
    window.location.href = 'tel:9725500435';
  } else {
    alert('Please call: (972) 550-0435');
  }
};

// After
<PhoneDialer fallbackBehavior="display" />
```

## Support

For issues, questions, or contributions:

1. Check the examples in `src/components/examples/PhoneDialerExamples.tsx`
2. Review the test files for usage patterns
3. Consult the TypeScript definitions for prop details
4. Test with the showcase component for visual reference