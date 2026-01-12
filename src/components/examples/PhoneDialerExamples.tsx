/**
 * Integration examples for PhoneDialer components
 * This file demonstrates various usage patterns and integration scenarios
 */

import React from 'react';
import { 
  PhoneDialer, 
  CompactPhoneDialer, 
  ProminentPhoneDialer, 
  FallbackFriendlyPhoneDialer 
} from '../PhoneDialer';
import { PhoneButton } from '../ui/PhoneButton';

/**
 * Example 1: Basic usage in a hero section
 */
export const HeroSectionExample: React.FC = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Need Help? Call Us Now!
        </h1>
        <p className="text-xl mb-8">
          Our expert team is ready to assist you
        </p>
        
        {/* Prominent phone dialer for main call-to-action */}
        <ProminentPhoneDialer 
          variant="secondary"
          className="mx-auto"
          onSuccess={(number) => {
            console.log('Call initiated from hero section:', number);
            // Track analytics event
          }}
          onError={(error) => {
            console.error('Call failed from hero section:', error);
            // Show user-friendly error message
          }}
        />
      </div>
    </section>
  );
};

/**
 * Example 2: Header/Navigation usage
 */
export const HeaderExample: React.FC = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl font-bold">Your Company</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <a href="/about" className="text-foreground hover:text-primary">About</a>
          <a href="/services" className="text-foreground hover:text-primary">Services</a>
          <a href="/contact" className="text-foreground hover:text-primary">Contact</a>
          
          {/* Compact phone dialer for header */}
          <CompactPhoneDialer 
            className="ml-4"
            showErrorMessages={false}
          />
        </nav>
      </div>
    </header>
  );
};

/**
 * Example 3: Footer usage
 */
export const FooterExample: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p>123 Business St</p>
              <p>City, State 12345</p>
              
              {/* Fallback-friendly dialer for footer */}
              <FallbackFriendlyPhoneDialer 
                size="sm"
                className="mt-4"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/consulting">Consulting</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Emergency Contact</h3>
            <p className="mb-2">24/7 Support Available</p>
            
            {/* Custom phone button for emergency line */}
            <PhoneButton
              phoneNumber="911"
              variant="destructive"
              size="sm"
              fallbackBehavior="display"
              showErrorMessages
            >
              Emergency: 911
            </PhoneButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Example 4: Contact page integration
 */
export const ContactPageExample: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Call us during business hours for immediate assistance
                  </p>
                  
                  {/* Default phone dialer */}
                  <PhoneDialer 
                    showErrorMessages
                    onSuccess={() => {
                      // Track successful call initiation
                      console.log('Contact page call initiated');
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  📧
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-muted-foreground">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <a 
                    href="mailto:support@company.com" 
                    className="text-primary hover:underline"
                  >
                    support@company.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-input rounded-md"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 border border-input rounded-md"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full p-3 border border-input rounded-md"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-md hover:bg-primary/90"
                >
                  Send Message
                </button>
                
                {/* Alternative: Call instead */}
                <CompactPhoneDialer>
                  Or Call
                </CompactPhoneDialer>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 5: Mobile-optimized usage
 */
export const MobileOptimizedExample: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Need Immediate Help?</h2>
        <p className="text-muted-foreground mb-6">
          Our support team is available to assist you right away.
        </p>
        
        {/* Mobile-optimized phone dialer */}
        <div className="space-y-3">
          <PhoneDialer 
            preset="prominent"
            className="w-full"
            showErrorMessages
            fallbackBehavior="copy"
          />
          
          <p className="text-xs text-muted-foreground text-center">
            Tap to call directly, or copy number if calling is not supported
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Example 6: Custom styling and theming
 */
export const CustomStyledExample: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Premium Support</h2>
        <p className="text-xl mb-8 opacity-90">
          Get expert help from our certified professionals
        </p>
        
        {/* Custom styled phone button */}
        <PhoneButton
          phoneNumber="8005551234"
          variant="outline"
          size="lg"
          className="bg-white text-blue-600 border-white hover:bg-blue-50 shadow-lg"
          showPhoneNumber
          showErrorMessages
          fallbackBehavior="display"
          onSuccess={(number) => {
            console.log('Premium support call:', number);
          }}
        />
        
        <p className="text-sm mt-4 opacity-75">
          Available 24/7 for premium customers
        </p>
      </div>
    </div>
  );
};

/**
 * Example 7: Integration with existing components
 */
export const IntegrationExample: React.FC = () => {
  const [showCallOptions, setShowCallOptions] = React.useState(false);
  
  return (
    <div className="p-6">
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Customer Support Options</h3>
        
        <div className="space-y-4">
          <button
            onClick={() => setShowCallOptions(!showCallOptions)}
            className="w-full text-left p-4 border rounded-lg hover:bg-secondary/50"
          >
            <div className="flex justify-between items-center">
              <span>📞 Phone Support</span>
              <span>{showCallOptions ? '−' : '+'}</span>
            </div>
          </button>
          
          {showCallOptions && (
            <div className="pl-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">General Support:</span>
                <CompactPhoneDialer />
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Technical Support:</span>
                <PhoneButton
                  phoneNumber="8005551235"
                  size="sm"
                  variant="outline"
                  fallbackBehavior="copy"
                >
                  Tech Support
                </PhoneButton>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sales:</span>
                <PhoneButton
                  phoneNumber="8005551236"
                  size="sm"
                  variant="outline"
                  fallbackBehavior="copy"
                >
                  Sales Team
                </PhoneButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Example component that demonstrates all phone dialer variants
 */
export const ShowcaseExample: React.FC = () => {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Phone Dialer Components Showcase</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default PhoneDialer */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Default PhoneDialer</h3>
            <PhoneDialer />
            <p className="text-sm text-muted-foreground mt-2">
              Standard phone dialer with default settings
            </p>
          </div>
          
          {/* Compact PhoneDialer */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Compact PhoneDialer</h3>
            <CompactPhoneDialer />
            <p className="text-sm text-muted-foreground mt-2">
              Smaller size, perfect for headers and tight spaces
            </p>
          </div>
          
          {/* Prominent PhoneDialer */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Prominent PhoneDialer</h3>
            <ProminentPhoneDialer />
            <p className="text-sm text-muted-foreground mt-2">
              Large size with phone number displayed
            </p>
          </div>
          
          {/* Fallback Friendly PhoneDialer */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Fallback Friendly</h3>
            <FallbackFriendlyPhoneDialer />
            <p className="text-sm text-muted-foreground mt-2">
              Optimized for cross-device compatibility
            </p>
          </div>
          
          {/* Custom PhoneButton */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Custom PhoneButton</h3>
            <PhoneButton
              variant="destructive"
              showPhoneNumber
              fallbackBehavior="external"
            >
              Emergency
            </PhoneButton>
            <p className="text-sm text-muted-foreground mt-2">
              Fully customizable phone button
            </p>
          </div>
          
          {/* Icon Position Example */}
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-4">Icon Position</h3>
            <PhoneButton
              iconPosition="right"
              variant="outline"
            >
              Call Us
            </PhoneButton>
            <p className="text-sm text-muted-foreground mt-2">
              Icon on the right side
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};