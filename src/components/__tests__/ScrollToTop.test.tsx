import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// Mock the hook
jest.mock('@/hooks/useScrollToTop');

const mockUseScrollToTop = useScrollToTop as jest.MockedFunction<typeof useScrollToTop>;

describe('ScrollToTop Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );

    expect(mockUseScrollToTop).toHaveBeenCalledWith({
      behavior: 'smooth',
      enabled: true,
      excludePatterns: [],
      timeout: 1000,
      debounceMs: 50
    });
  });

  it('should pass custom props to useScrollToTop hook', () => {
    const props = {
      behavior: 'auto' as ScrollBehavior,
      enabled: false,
      excludePatterns: ['/admin/*'],
      timeout: 2000,
      debounceMs: 100
    };

    render(
      <BrowserRouter>
        <ScrollToTop {...props} />
      </BrowserRouter>
    );

    expect(mockUseScrollToTop).toHaveBeenCalledWith(props);
  });

  it('should not render any DOM elements', () => {
    const { container } = render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should work with different router contexts', () => {
    // Test that it works within BrowserRouter context
    render(
      <BrowserRouter>
        <ScrollToTop />
      </BrowserRouter>
    );

    expect(mockUseScrollToTop).toHaveBeenCalled();
  });
});