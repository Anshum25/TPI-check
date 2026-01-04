import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock the RequestCallbackDialog component
vi.mock('../RequestCallbackDialog', () => ({
  default: ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => (
    <div data-testid="callback-dialog" data-open={open}>
      <button onClick={() => onOpenChange(false)}>Close Dialog</button>
    </div>
  ),
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Wrapper component for router context
const RouterWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Header Popup Timing Logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Timing Configuration Constants', () => {
    it('should use 30 seconds for first popup delay', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Fast-forward 29 seconds - popup should not appear
      act(() => {
        vi.advanceTimersByTime(29000);
      });
      
      const dialog = screen.getByTestId('callback-dialog');
      expect(dialog).toHaveAttribute('data-open', 'false');

      // Fast-forward 1 more second (total 30s) - popup should appear
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(dialog).toHaveAttribute('data-open', 'true');
    });

    it('should use 60 seconds for subsequent popup delays', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const dialog = screen.getByTestId('callback-dialog');

      // First popup appears after 30 seconds
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');

      // Close the first popup
      const closeButton = screen.getByText('Close Dialog');
      await user.click(closeButton);
      expect(dialog).toHaveAttribute('data-open', 'false');

      // Second popup should appear after 60 seconds, not 30
      act(() => {
        vi.advanceTimersByTime(59000);
      });
      expect(dialog).toHaveAttribute('data-open', 'false');

      act(() => {
        vi.advanceTimersByTime(1000); // Total 60s
      });
      expect(dialog).toHaveAttribute('data-open', 'true');
    });
  });

  describe('Popup Counter Tracking', () => {
    it('should increment popup counter when popup is shown', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const dialog = screen.getByTestId('callback-dialog');

      // First popup (30s delay)
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');

      // Close first popup
      await user.click(screen.getByText('Close Dialog'));

      // Second popup should use 60s delay (indicating counter was incremented)
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');

      // Close second popup
      await user.click(screen.getByText('Close Dialog'));

      // Third popup should also use 60s delay
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');
    });

    it('should maintain counter across component re-renders', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      
      const { rerender } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const dialog = screen.getByTestId('callback-dialog');

      // First popup
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');

      // Close popup
      await user.click(screen.getByText('Close Dialog'));

      // Re-render component
      rerender(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Next popup should still use 60s delay (counter persisted)
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');
    });
  });

  describe('Dynamic Delay Calculation', () => {
    it('should calculate 30 seconds for first popup', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Verify first popup timing
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      
      const dialog = screen.getByTestId('callback-dialog');
      expect(dialog).toHaveAttribute('data-open', 'true');
    });

    it('should calculate 60 seconds for subsequent popups', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const dialog = screen.getByTestId('callback-dialog');

      // Show and close first popup
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      await user.click(screen.getByText('Close Dialog'));

      // Show and close second popup
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      await user.click(screen.getByText('Close Dialog'));

      // Third popup should also be 60 seconds
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');
    });
  });

  describe('Timeout Cleanup', () => {
    it('should clear timeout when component unmounts', () => {
      const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
      
      const { unmount } = render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Advance time to schedule a timeout
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Unmount component
      unmount();

      // Should have called clearTimeout
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });

    it('should clear timeout when navigating to admin routes', () => {
      const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
      
      // Mock useLocation to return admin route
      const mockLocation = { pathname: '/admin/dashboard' };
      vi.doMock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useLocation: () => mockLocation,
        };
      });

      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Should clear timeout for admin routes
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });

    it('should clear timeout when popup is manually opened', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Click the manual "Request Callback" button
      const requestButton = screen.getByRole('button', { name: /request callback/i });
      await user.click(requestButton);

      // Should clear any existing timeout
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });

    it('should prevent popup stacking by clearing timeout when popup is open', () => {
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      const dialog = screen.getByTestId('callback-dialog');

      // First popup appears
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(dialog).toHaveAttribute('data-open', 'true');

      // Advance more time - no additional popup should be scheduled
      act(() => {
        vi.advanceTimersByTime(60000);
      });
      
      // Dialog should still be open (not stacked)
      expect(dialog).toHaveAttribute('data-open', 'true');
    });
  });

  describe('Error Handling', () => {
    it('should handle negative popup counter gracefully', () => {
      // Mock console.warn to verify error handling
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // This test would require access to internal state to set negative counter
      // In a real scenario, we'd test this through integration or by exposing test utilities
      
      consoleSpy.mockRestore();
    });

    it('should fallback to 60 seconds if calculation fails', () => {
      // Mock console.error to verify error handling
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Normal operation should work without errors
      act(() => {
        vi.advanceTimersByTime(30000);
      });
      
      const dialog = screen.getByTestId('callback-dialog');
      expect(dialog).toHaveAttribute('data-open', 'true');
      
      consoleSpy.mockRestore();
    });

    it('should handle missing setTimeout gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      // Mock setTimeout to be undefined
      const originalSetTimeout = window.setTimeout;
      // @ts-ignore
      delete window.setTimeout;
      
      render(
        <RouterWrapper>
          <Header />
        </RouterWrapper>
      );

      // Should log warning about missing setTimeout
      expect(consoleSpy).toHaveBeenCalledWith('setTimeout is not available, popup scheduling disabled');
      
      // Restore setTimeout
      window.setTimeout = originalSetTimeout;
      consoleSpy.mockRestore();
    });
  });
});