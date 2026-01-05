import { renderHook } from '@testing-library/react';
import { useScrollToTop } from '../useScrollToTop';
import { useLocation } from 'react-router-dom';

// Mock React Router
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn()
}));

// Mock window.scrollTo
const mockScrollTo = jest.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));

describe('useScrollToTop', () => {
  const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollTo.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should scroll to top on route change', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/home',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop());

    // Wait for debounce and requestAnimationFrame
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  });

  it('should not scroll when disabled', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/home',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop({ enabled: false }));

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should not scroll when hash is present', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/home',
      search: '',
      hash: '#section',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop());

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should exclude patterns from scroll behavior', async () => {
    mockUseLocation.mockReturnValue({
      pathname: '/admin/dashboard',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop({ excludePatterns: ['/admin/*'] }));

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('should use auto behavior when prefers-reduced-motion is enabled', async () => {
    // Mock prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    mockUseLocation.mockReturnValue({
      pathname: '/home',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop());

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  });

  it('should handle scroll errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    mockScrollTo.mockImplementationOnce(() => {
      throw new Error('Scroll failed');
    });

    mockUseLocation.mockReturnValue({
      pathname: '/home',
      search: '',
      hash: '',
      state: null,
      key: 'test'
    });

    renderHook(() => useScrollToTop());

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(consoleSpy).toHaveBeenCalledWith('Smooth scroll failed, using fallback:', expect.any(Error));
    expect(mockScrollTo).toHaveBeenCalledTimes(2); // First call fails, second is fallback

    consoleSpy.mockRestore();
  });

  it('should debounce rapid navigation changes', async () => {
    const { rerender } = renderHook(
      ({ pathname }) => {
        mockUseLocation.mockReturnValue({
          pathname,
          search: '',
          hash: '',
          state: null,
          key: 'test'
        });
        return useScrollToTop({ debounceMs: 100 });
      },
      { initialProps: { pathname: '/home' } }
    );

    // Rapid navigation changes
    rerender({ pathname: '/about' });
    rerender({ pathname: '/contact' });
    rerender({ pathname: '/gallery' });

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 150));

    // Should only scroll once after debounce
    expect(mockScrollTo).toHaveBeenCalledTimes(1);
  });
});