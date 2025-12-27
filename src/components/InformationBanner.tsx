import React, { useEffect, useState } from "react";
import { useContent } from "@/lib/content";

interface InformationBannerProps {
  className?: string;
}

const InformationBanner: React.FC<InformationBannerProps> = ({
  className = "",
}) => {
  const { content } = useContent();
  const bannerData = content?.home?.informationBanner;
  
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extract banner properties with fallbacks
  const isVisible = bannerData?.isVisible ?? false;
  const bannerContent = bannerData?.content ?? "";
  const imageUrl = bannerData?.imageUrl;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isVisible && bannerContent.trim()) {
      setShouldRender(true);
      // Reset image error state when banner becomes visible
      setImageError(false);
      // Trigger animation after render (respect reduced motion)
      const animationDelay = prefersReducedMotion ? 0 : 50;
      const timer = setTimeout(() => setIsAnimating(true), animationDelay);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Remove from DOM after animation completes (respect reduced motion)
      const animationDuration = prefersReducedMotion ? 0 : 300;
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, bannerContent, prefersReducedMotion]);

  // Don't render anything if not visible or no content
  if (!shouldRender) {
    return null;
  }

  const handleImageError = () => {
    setImageError(true);
    console.warn("Information banner image failed to load:", imageUrl);
  };

  const shouldShowImage = imageUrl && !imageError;

  // Generate descriptive alt text based on content
  const getImageAltText = () => {
    if (bannerContent.length > 0) {
      // Use first 50 characters of content as alt text context
      const contentPreview = bannerContent.substring(0, 50);
      return `Information banner image for: ${contentPreview}${bannerContent.length > 50 ? '...' : ''}`;
    }
    return "Information banner image";
  };

  return (
    <section 
      className={`py-8 md:py-12 ${
        prefersReducedMotion 
          ? '' 
          : `transition-all duration-300 ease-in-out ${
              isAnimating 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`
      } ${className}`}
      role="banner"
      aria-label="Information announcement"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-primary/5 via-background to-accent/5 border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden backdrop-blur-sm">
            {/* Desktop Layout: Image left, Text right */}
            <div className="flex flex-col md:flex-row items-center">
              {/* Image Section */}
              {shouldShowImage && (
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="aspect-video md:aspect-square p-4 md:p-6">
                    <img
                      src={imageUrl}
                      alt={getImageAltText()}
                      className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      onError={handleImageError}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}
              
              {/* Content Section */}
              <div 
                className={`flex-1 p-6 md:p-8 ${!shouldShowImage ? 'text-center' : ''}`}
                role="main"
              >
                <div className="prose prose-lg max-w-none">
                  <p 
                    className="text-foreground text-base md:text-lg leading-relaxed m-0 font-medium"
                    aria-live="polite"
                  >
                    {bannerContent}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationBanner;