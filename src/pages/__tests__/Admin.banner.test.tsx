import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Admin from '../Admin';
import { useContent } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';

// Mock dependencies
vi.mock('@/lib/content', () => ({
  useContent: vi.fn(),
  DEFAULT_CONTENT: {
    home: {
      informationBanner: {
        isVisible: false,
        content: '',
        imageUrl: undefined,
      },
    },
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(),
}));

vi.mock('@/components/LivePreview', () => ({
  default: () => <div data-testid="live-preview">Live Preview</div>,
}));

vi.mock('@/components/SiteContentManager', () => ({
  default: () => <div data-testid="site-content-manager">Site Content Manager</div>,
}));

const mockUseContent = useContent as vi.MockedFunction<typeof useContent>;
const mockUseToast = useToast as vi.MockedFunction<typeof useToast>;

describe('Admin Banner Management', () => {
  const mockSetContent = vi.fn();
  const mockToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseToast.mockReturnValue({
      toast: mockToast,
    });

    mockUseContent.mockReturnValue({
      content: {
        home: {
          informationBanner: {
            isVisible: false,
            content: '',
            imageUrl: undefined,
          },
          heroCarousel: { slides: [] },
          features: [],
          testimonials: [],
          methodologyHeading: 'Test',
          methodologyTitle: 'Test',
          methodologySections: [],
          gainHeading: 'Test',
          gainTitle: 'Test',
          ctaTitle: 'Test',
          ctaText: 'Test',
        },
        header: { siteTitle: 'Test', nav: [] },
        footer: {
          instituteName: 'Test',
          subHeader: 'Test',
          tagline: 'Test',
          socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '' },
          quickLinks: [],
          courses: [],
          contact: { address: '', phone: '', email: '' },
          copyright: 'Test',
        },
      },
      setContent: mockSetContent,
      resetContent: vi.fn(),
      exportJSON: vi.fn(),
      importJSON: vi.fn(),
    } as any);

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  const loginToAdmin = async () => {
    const user = userEvent.setup();
    
    // Find and fill password input
    const passwordInput = screen.getByLabelText(/password/i);
    await user.type(passwordInput, 'tpi-admin');
    
    // Submit login form
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);
  };

  it('should display banner management section in admin panel', async () => {
    render(<Admin />);
    
    await loginToAdmin();
    
    // Should show Information Banner section
    expect(screen.getByText('Information Banner')).toBeInTheDocument();
    expect(screen.getByText('Manage the announcement banner displayed between methodology and gain sections.')).toBeInTheDocument();
  });

  it('should toggle banner visibility', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Find the toggle button (should show "OFF" initially)
    const toggleButton = screen.getByRole('button', { name: 'OFF' });
    expect(toggleButton).toBeInTheDocument();
    
    // Click to turn on
    await user.click(toggleButton);
    
    // Verify setContent was called with correct data
    expect(mockSetContent).toHaveBeenCalledWith(expect.any(Function));
    
    // Get the function that was passed to setContent and test it
    const updateFunction = mockSetContent.mock.calls[0][0];
    const mockPrevState = {
      home: {
        informationBanner: { isVisible: false, content: '', imageUrl: undefined },
      },
    };
    
    const result = updateFunction(mockPrevState);
    expect(result.home.informationBanner.isVisible).toBe(true);
  });

  it('should update banner content', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Find the content textarea
    const contentTextarea = screen.getByPlaceholderText(/enter your announcement/i);
    
    // Type content
    await user.type(contentTextarea, 'New announcement content');
    
    // Verify setContent was called
    expect(mockSetContent).toHaveBeenCalled();
  });

  it('should validate content length', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Find the content textarea
    const contentTextarea = screen.getByPlaceholderText(/enter your announcement/i);
    
    // Type content that exceeds 500 characters
    const longContent = 'a'.repeat(501);
    await user.type(contentTextarea, longContent);
    
    // Should show error toast
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Content too long',
      description: 'Banner content should be 500 characters or less for optimal display.',
      variant: 'destructive',
    });
  });

  it('should show character count', async () => {
    mockUseContent.mockReturnValue({
      ...mockUseContent(),
      content: {
        ...mockUseContent().content,
        home: {
          ...mockUseContent().content.home,
          informationBanner: {
            isVisible: true,
            content: 'Test content',
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<Admin />);
    await loginToAdmin();
    
    // Should show character count
    expect(screen.getByText('12/500 characters')).toBeInTheDocument();
  });

  it('should show warning for long content', async () => {
    mockUseContent.mockReturnValue({
      ...mockUseContent(),
      content: {
        ...mockUseContent().content,
        home: {
          ...mockUseContent().content.home,
          informationBanner: {
            isVisible: true,
            content: 'a'.repeat(450), // Over 400 characters
            imageUrl: undefined,
          },
        },
      },
    } as any);

    render(<Admin />);
    await loginToAdmin();
    
    // Should show warning
    expect(screen.getByText(/consider keeping content concise/i)).toBeInTheDocument();
  });

  it('should handle image upload', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Create a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    // Find the hidden file input
    const fileInput = document.getElementById('banner-image-upload') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();
    
    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      onloadend: null as any,
      onerror: null as any,
      result: 'data:image/jpeg;base64,test-data',
    };
    
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);
    
    // Upload file
    await user.upload(fileInput, file);
    
    // Simulate FileReader onloadend
    if (mockFileReader.onloadend) {
      mockFileReader.onloadend();
    }
    
    // Should show success toast
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Image uploaded',
      description: 'Banner image has been successfully uploaded.',
    });
  });

  it('should validate image file type', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Create a mock file with invalid type
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    // Find the hidden file input
    const fileInput = document.getElementById('banner-image-upload') as HTMLInputElement;
    
    // Upload invalid file
    await user.upload(fileInput, file);
    
    // Should show error toast
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Invalid file type',
      description: 'Please upload a valid image file (JPG, PNG, GIF, or WebP).',
      variant: 'destructive',
    });
  });

  it('should validate image file size', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Create a mock file that's too large (6MB)
    const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    // Find the hidden file input
    const fileInput = document.getElementById('banner-image-upload') as HTMLInputElement;
    
    // Upload large file
    await user.upload(fileInput, largeFile);
    
    // Should show error toast
    expect(mockToast).toHaveBeenCalledWith({
      title: 'File too large',
      description: 'Please upload an image smaller than 5MB.',
      variant: 'destructive',
    });
  });

  it('should remove uploaded image', async () => {
    const user = userEvent.setup();
    
    // Mock content with existing image
    mockUseContent.mockReturnValue({
      ...mockUseContent(),
      content: {
        ...mockUseContent().content,
        home: {
          ...mockUseContent().content.home,
          informationBanner: {
            isVisible: true,
            content: 'Test content',
            imageUrl: 'data:image/jpeg;base64,test-data',
          },
        },
      },
    } as any);

    render(<Admin />);
    await loginToAdmin();
    
    // Should show image preview
    expect(screen.getByAltText('Banner preview')).toBeInTheDocument();
    
    // Find and click remove button
    const removeButton = screen.getByRole('button', { name: '' }); // X button
    await user.click(removeButton);
    
    // Verify setContent was called to remove image
    expect(mockSetContent).toHaveBeenCalledWith(expect.any(Function));
    
    const updateFunction = mockSetContent.mock.calls[mockSetContent.mock.calls.length - 1][0];
    const mockPrevState = {
      home: {
        informationBanner: { isVisible: true, content: 'Test', imageUrl: 'data:image/jpeg;base64,test-data' },
      },
    };
    
    const result = updateFunction(mockPrevState);
    expect(result.home.informationBanner.imageUrl).toBeUndefined();
  });

  it('should trigger upload when upload button is clicked', async () => {
    const user = userEvent.setup();
    render(<Admin />);
    
    await loginToAdmin();
    
    // Mock click on hidden input
    const clickSpy = vi.spyOn(HTMLElement.prototype, 'click');
    
    // Find and click upload button
    const uploadButton = screen.getByRole('button', { name: /upload image/i });
    await user.click(uploadButton);
    
    // Should trigger click on hidden input
    expect(clickSpy).toHaveBeenCalled();
    
    clickSpy.mockRestore();
  });
});