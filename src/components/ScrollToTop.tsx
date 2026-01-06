import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopProps {
  /**
   * Scroll behavior - 'auto' for instant scroll, 'smooth' for animated scroll
   * @default 'smooth'
   */
  behavior?: ScrollBehavior;
  
  /**
   * Whether the scroll-to-top functionality is enabled
   * @default true
   */
  enabled?: boolean;
  
  /**
   * Array of pathname patterns to exclude from scroll-to-top behavior
   * Supports simple wildcard matching with '*'
   * @default []
   */
  excludePatterns?: string[];

  /**
   * Timeout for scroll operations in milliseconds
   * @default 1000
   */
  timeout?: number;

  /**
   * Debounce delay for rapid navigation in milliseconds
   * @default 50
   */
  debounceMs?: number;
}

/**
 * ScrollToTop component that automatically scrolls to the top of the page on route changes.
 * 
 * This component should be placed within a Router context (BrowserRouter, HashRouter, etc.)
 * and will automatically handle scroll-to-top behavior for all route navigations.
 * 
 * Features:
 * - Respects user's motion preferences (prefers-reduced-motion)
 * - Handles errors gracefully with fallback scroll behavior
 * - Supports exclusion patterns for specific routes
 * - Skips scroll-to-top for hash navigation (anchor links)
 * - Includes timeout mechanism to prevent hanging scroll operations
 * - Debounces rapid navigation to improve performance
 * 
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <ScrollToTop />
 *   <Routes>
 *     <Route path="/" element={<Home />} />
 *     <Route path="/about" element={<About />} />
 *   </Routes>
 * </BrowserRouter>
 * ```
 * 
 * @example With custom configuration
 * ```tsx
 * <ScrollToTop 
 *   behavior="auto" 
 *   excludePatterns={['/admin/*', '/dashboard']}
 *   timeout={2000}
 *   debounceMs={100}
 * />
 * ```
 */
export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  behavior = 'smooth',
  enabled = true,
  excludePatterns = [],
  timeout = 1000,
  debounceMs = 50
}) => {
  useScrollToTop({
    behavior,
    enabled,
    excludePatterns,
    timeout,
    debounceMs
  });

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;