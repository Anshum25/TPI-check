import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import InformationBanner from '../InformationBanner';
import { useContent } from '@/lib/content';

// Mock the useContent hook
vi.mock('@/lib/content', () => ({
  useContent: vi.fn(),
}));

const mockUseContent = useContent as vi.MockedFunction<typeof useContent>;

describe('InformationBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render when banner is not visible', () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: false,
            content: 'Test content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();
  });

  it('should not render when content is empty', () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: '',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    expect(screen.queryByRole('section')).not.toBeInTheDocument();
  });

  it('should render banner with text only when visible and has content', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Important announcement here',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByText('Important announcement here')).toBeInTheDocument();
    });

    // Should not render image section
    expect(screen.queryByAltText('Information banner')).not.toBeInTheDocument();
  });

  it('should render banner with image and text when both are provided', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Announcement with image',
            imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByText('Announcement with image')).toBeInTheDocument();
      expect(screen.getByAltText('Information banner')).toBeInTheDocument();
    });
  });

  it('should handle image load errors gracefully', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Content with broken image',
            imageUrl: 'invalid-image-url',
          },
        },
      },
    } as any);

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    render(<InformationBanner />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      expect(screen.getByText('Content with broken image')).toBeInTheDocument();
    });

    const image = screen.getByAltText('Information banner');
    
    // Simulate image error
    act(() => {
      image.dispatchEvent(new Event('error'));
    });

    expect(consoleSpy).toHaveBeenCalledWith('Information banner image failed to load:', 'invalid-image-url');
    
    consoleSpy.mockRestore();
  });

  it('should apply custom className', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Test content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<InformationBanner className="custom-class" />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      const section = screen.getByRole('section');
      expect(section).toHaveClass('custom-class');
    });
  });

  it('should animate in when becoming visible', async () => {
    const { rerender } = render(<InformationBanner />);

    // Initially not visible
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: false,
            content: 'Test content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    rerender(<InformationBanner />);
    expect(screen.queryByText('Test content')).not.toBeInTheDocument();

    // Make visible
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Test content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    rerender(<InformationBanner />);

    // Should start with opacity-0 and translate-y-4
    await waitFor(() => {
      const section = screen.getByRole('section');
      expect(section).toHaveClass('opacity-0', 'translate-y-4');
    });

    // After animation delay, should have opacity-100 and translate-y-0
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      const section = screen.getByRole('section');
      expect(section).toHaveClass('opacity-100', 'translate-y-0');
    });
  });

  it('should center text when no image is provided', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Centered text content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      const contentDiv = screen.getByText('Centered text content').closest('div');
      expect(contentDiv).toHaveClass('text-center');
    });
  });

  it('should not center text when image is provided', async () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: true,
            content: 'Text with image',
            imageUrl: 'data:image/jpeg;base64,test',
          },
        },
      },
    } as any);

    render(<InformationBanner />);
    
    // Wait for animation to start
    act(() => {
      vi.advanceTimersByTime(100);
    });

    await waitFor(() => {
      const contentDiv = screen.getByText('Text with image').closest('div');
      expect(contentDiv).not.toHaveClass('text-center');
    });
  });

  it('should handle missing banner data gracefully', () => {
    mockUseContent.mockReturnValue({
      content: {
        home: {},
      },
    } as any);

    render(<InformationBanner />);
    
    expect(screen.queryByRole('section')).not.toBeInTheDocument();
  });

  it('should handle missing content data gracefully', () => {
    mockUseContent.mockReturnValue({
      content: null,
    } as any);

    render(<InformationBanner />);
    
    expect(screen.queryByRole('section')).not.toBeInTheDocument();
  });
});