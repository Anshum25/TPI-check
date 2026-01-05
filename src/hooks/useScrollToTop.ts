import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UseScrollToTopOptions {
  behavior?: ScrollBehavior;
  enabled?: boolean;
  excludePatterns?: string[];
  timeout?: number;
  debounceMs?: number;
}

/**
 * Custom hook that automatically scrolls to the top of the page on route changes
 * 
 * @param options Configuration options for scroll behavior
 * @param options.behavior Scroll behavior - 'auto' or 'smooth' (default: 'smooth')
 * @param options.enabled Whether the scroll-to-top is enabled (default: true)
 * @param options.excludePatterns Array of pathname patterns to exclude from scroll-to-top
 * @param options.timeout Timeout for scroll operations in ms (default: 1000)
 * @param options.debounceMs Debounce delay for rapid navigation in ms (default: 50)
 */
export const useScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const {
    behavior = 'smooth',
    enabled = true,
    excludePatterns = [],
    timeout = 1000,
    debounceMs = 50
  } = options;

  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const debounceRef = useRef<NodeJS.Timeout>();
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    // Clear any existing debounce timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce rapid navigation changes
    debounceRef.current = setTimeout(() => {
      // Check if current pathname should be excluded
      const shouldExclude = excludePatterns.some(pattern => {
        if (pattern.includes('*')) {
          // Simple wildcard matching
          const regex = new RegExp(pattern.replace(/\*/g, '.*'));
          return regex.test(location.pathname);
        }
        return location.pathname === pattern;
      });

      if (shouldExclude) return;

      // Don't scroll to top if navigating to a hash anchor
      if (location.hash) return;

      const scrollToTop = () => {
        try {
          // Check for reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const scrollBehavior = prefersReducedMotion ? 'auto' : behavior;

          // Clear any existing scroll timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Set timeout for scroll operation
          scrollTimeoutRef.current = setTimeout(() => {
            console.warn('Scroll operation timed out, using fallback');
            window.scrollTo(0, 0);
          }, timeout);

          window.scrollTo({
            top: 0,
            left: 0,
            behavior: scrollBehavior
          });

          // Clear timeout on successful scroll
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = undefined;
          }

        } catch (error) {
          // Clear timeout on error
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = undefined;
          }

          // Fallback for browsers that don't support smooth scrolling
          console.warn('Smooth scroll failed, using fallback:', error);
          try {
            window.scrollTo(0, 0);
          } catch (fallbackError) {
            console.error('Scroll to top failed completely:', fallbackError);
          }
        }
      };

      // Use requestAnimationFrame to ensure DOM is ready
      timeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(scrollToTop);
        });
      }, 0);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname, location.search, behavior, enabled, excludePatterns, timeout, debounceMs]);
};