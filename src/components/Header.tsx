import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import tpLogo from "@/assets/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1-removebg-preview.png";

// Popup timing configuration
interface PopupTimingConfig {
  firstPopupDelay: number;      // Delay for the first popup (30 seconds)
  subsequentPopupDelay: number; // Delay for subsequent popups (60 seconds)
  maxPopups?: number;           // Optional: for future use
}

/**
 * Configuration object for popup timing behavior
 * - First popup appears after 30 seconds
 * - All subsequent popups appear after 60 seconds
 * - Easily configurable for future modifications
 */
const POPUP_TIMING_CONFIG: PopupTimingConfig = {
  firstPopupDelay: 30000,       // 30 seconds
  subsequentPopupDelay: 60000,  // 60 seconds
};

/**
 * Header component with dynamic popup timing system
 * 
 * Features:
 * - First popup appears after 30 seconds
 * - Subsequent popups appear after 60 seconds each
 * - No popup stacking - next popup only schedules after current is closed
 * - Automatic cleanup on admin routes and component unmount
 * - Error handling and graceful degradation
 * - Memory leak prevention through proper timeout management
 */

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const callbackTimerRef = useRef<number | null>(null);
  const popupCountRef = useRef<number>(0); // Track popup display count

  const isAdminRoute = location.pathname.startsWith("/admin");

  /**
   * Increments the popup counter to track how many popups have been shown
   * Used to determine timing for subsequent popups
   */
  const incrementPopupCounter = () => {
    popupCountRef.current += 1;
  };

  /**
   * Calculates the delay for the next popup based on how many have been shown
   * @returns {number} Delay in milliseconds (30000 for first popup, 60000 for subsequent)
   */
  const calculateNextPopupDelay = (): number => {
    try {
      const currentCount = popupCountRef.current;

      // Validate popup counter to prevent negative values
      if (currentCount < 0) {
        console.warn('Popup counter is negative, resetting to 0');
        popupCountRef.current = 0;
        return POPUP_TIMING_CONFIG.firstPopupDelay;
      }

      // First popup: 30 seconds, all subsequent: 60 seconds
      if (currentCount === 0) {
        return POPUP_TIMING_CONFIG.firstPopupDelay;
      }

      return POPUP_TIMING_CONFIG.subsequentPopupDelay;
    } catch (error) {
      console.error('Error calculating popup delay, using default:', error);
      // Fallback to subsequent popup delay (60 seconds)
      return POPUP_TIMING_CONFIG.subsequentPopupDelay;
    }
  };

  /**
   * Enhanced popup close/open handler that manages timing and prevents conflicts
   * @param {boolean} open - Whether the popup should be open or closed
   */
  const handlePopupClose = (open: boolean) => {
    try {
      // Clear timer when manually opening popup to prevent conflicts
      if (open) {
        clearPopupTimer();
      }

      setCallbackOpen(open);

      // When popup is closed (open = false), schedule the next popup
      if (!open && !isAdminRoute) {
        // Clear any existing timer first
        clearPopupTimer();

        // Schedule next popup with appropriate delay
        const nextDelay = calculateNextPopupDelay();

        // Graceful degradation if setTimeout is unavailable
        if (typeof window !== 'undefined' && window.setTimeout) {
          callbackTimerRef.current = window.setTimeout(() => {
            setCallbackOpen(true);
            incrementPopupCounter();
          }, nextDelay);
        } else {
          console.warn('setTimeout is not available, popup rescheduling disabled');
        }
      }
    } catch (error) {
      console.error('Error handling popup close:', error);
      // Ensure popup state is still updated even if scheduling fails
      setCallbackOpen(open);
    }
  };

  /**
   * Safely clears the popup timer and resets the timer reference
   * Includes error handling and graceful degradation
   */
  const clearPopupTimer = () => {
    try {
      if (callbackTimerRef.current !== null) {
        // Graceful degradation if clearTimeout is unavailable
        if (typeof window !== 'undefined' && window.clearTimeout) {
          window.clearTimeout(callbackTimerRef.current);
        }
        callbackTimerRef.current = null;
      }
    } catch (error) {
      console.error('Error clearing popup timer:', error);
      // Force reset the timer reference even if clearing failed
      callbackTimerRef.current = null;
    }
  };

  /**
   * Effect hook that manages popup timing logic
   * - Clears timers on admin routes
   * - Prevents popup stacking when popup is open
   * - Schedules popups with dynamic timing (30s first, 60s subsequent)
   * - Handles cleanup on component unmount
   */
  useEffect(() => {
    // Clear timer when accessing admin routes
    if (isAdminRoute) {
      clearPopupTimer();
      return;
    }

    // Clear timer when popup is currently open to prevent stacking
    if (callbackOpen) {
      clearPopupTimer();
      return;
    }

    // Clear any existing timer before setting new one
    clearPopupTimer();

    try {
      // Use dynamic delay calculation instead of fixed timing
      const nextDelay = calculateNextPopupDelay();

      // Graceful degradation if setTimeout is unavailable
      if (typeof window !== 'undefined' && window.setTimeout) {
        callbackTimerRef.current = window.setTimeout(() => {
          setCallbackOpen(true);
          incrementPopupCounter(); // Increment counter when popup is shown
        }, nextDelay);
      } else {
        console.warn('setTimeout is not available, popup scheduling disabled');
      }
    } catch (error) {
      console.error('Error scheduling popup:', error);
    }

    // Cleanup function for component unmount and dependency changes
    return () => {
      clearPopupTimer();
    };
  }, [isAdminRoute, callbackOpen]);

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 10);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    // { path: "/courses", label: "Courses" },
    { path: "/faculty", label: "Faculty" },
    { path: "/admissions", label: "Admissions" },
    { path: "/gallery", label: "Gallery" },
    { path: "/reviews", label: "Reviews" },
    { path: "/faq", label: "FAQ" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
          isScrolled
            ? "bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/20"
            : "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        }`}
      >
        <div className="container-flex mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <img src={tpLogo} alt="Turning Point Institute" className="h-10 w-10 object-contain" />
                <div className="ml-2">
                  <h1 className="text-sm font-bold leading-tight">TURNING POINT INSTITUTE</h1>
                  <p className="text-xs text-muted-foreground">THE ONE TO TURN TO</p>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="gradient-accent ml-4" type="button" onClick={() => handlePopupClose(true)}>
                <Phone className="mr-2 h-4 w-4" />
                Request Callback
              </Button>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-foreground/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button size="sm" className="gradient-accent w-full" type="button" onClick={() => handlePopupClose(true)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Request Callback
                </Button>
              </div>
            </nav>
          )}
        </div>
        <RequestCallbackDialog open={callbackOpen} onOpenChange={handlePopupClose} />
      </header>
      <div className="h-16" />
    </>
  );
};

export default Header;
