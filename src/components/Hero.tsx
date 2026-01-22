import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent, DEFAULT_CONTENT } from "@/lib/content";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";

// Image mapping for default images
const imageMap: Record<string, string> = {
  "/src/assets/hero-classroom.jpg": heroClassroom,
  "/src/assets/speaking-confidence.jpg": speakingConfidence,
  "/src/assets/student-success.jpg": studentSuccess,
};

const Hero = () => {
  const { content } = useContent();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCallbackDialogOpen, setIsCallbackDialogOpen] = useState(false);

  const home = content.home ?? DEFAULT_CONTENT.home;
  const cta = home.finalCta ?? DEFAULT_CONTENT.home.finalCta;

  // Use admin-configured buttons from content
  const heroButtons = [
    {
      key: "callNow" as const,
      text: home.heroButtons.callNow.text,
      action: home.heroButtons.callNow.action,
      target: home.heroButtons.callNow.target,
      variant: home.heroButtons.callNow.variant,
      enabled: home.heroButtons.callNow.enabled,
    },
    {
      key: "getDirections" as const,
      text: home.heroButtons.getDirections.text,
      action: home.heroButtons.getDirections.action,
      target: home.heroButtons.getDirections.target,
      variant: home.heroButtons.getDirections.variant,
      enabled: home.heroButtons.getDirections.enabled,
    },
    {
      key: "requestCallback" as const,
      text: home.heroButtons.requestCallback.text,
      action: home.heroButtons.requestCallback.action,
      target: home.heroButtons.requestCallback.target,
      variant: home.heroButtons.requestCallback.variant,
      enabled: home.heroButtons.requestCallback.enabled,
    }
  ].filter(button => button.enabled); // Only show enabled buttons

  const slides = content.home.heroCarousel.slides.map((slide) => ({
    ...slide,
    image: imageMap[slide.imageUrl] || slide.imageUrl,
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Button action handlers
  const handleCallNow = () => {
    if (!cta.phoneNumber) return;
    window.location.href = `tel:${cta.phoneNumber}`;
  };

  const handleGetDirection = () => {
    if (!cta.directionsUrl) return;
    window.open(cta.directionsUrl, "_blank", "noopener,noreferrer");
  };

  const handleRequestCallback = () => {
    setIsCallbackDialogOpen(true);
  };

  const handleButtonClick = (button: (typeof heroButtons)[number]) => {
    if (button.key === "callNow") {
      handleCallNow();
      return;
    }

    if (button.key === "getDirections") {
      handleGetDirection();
      return;
    }

    if (button.key === "requestCallback" || button.action === "modal") {
      handleRequestCallback();
      return;
    }

    if (button.action === "navigate") {
      navigate(button.target);
    }
  };

  return (
    <div className="relative h-[400px] md:h-[630px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                  {/* Mobile Layout: Dynamic button arrangement based on enabled buttons */}
                  <div className="flex flex-col items-center gap-3 md:hidden">
                    {heroButtons.length > 0 && (
                      <>
                        {/* First button - full width on top */}
                        <Button
                          size="sm"
                          variant={heroButtons[0].variant as any}
                          onClick={() => handleButtonClick(heroButtons[0])}
                          className={`text-xs sm:text-sm font-semibold px-4 py-2 min-w-[200px] transition-all duration-200 ease-in-out ${
                            heroButtons[0].variant === 'default' ? 'gradient-accent' : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary hover:border-primary'
                          }`}
                        >
                          {heroButtons[0].text}
                        </Button>
                        
                        {/* Remaining buttons - side by side if more than one */}
                        {heroButtons.length > 1 && (
                          <div className="flex gap-3 items-center">
                            {heroButtons.slice(1).map((button, index) => (
                              <Button
                                key={index + 1}
                                size="sm"
                                variant={button.variant as any}
                                onClick={() => handleButtonClick(button)}
                                className={`text-xs sm:text-sm font-semibold px-4 py-2 min-w-[140px] transition-all duration-200 ease-in-out ${
                                  button.variant === 'default' ? 'gradient-accent' : 'bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary hover:border-primary'
                                }`}
                              >
                                {button.text}
                              </Button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Desktop Layout: All buttons in one line */}
                  <div className="hidden md:flex items-center gap-4 justify-start">
                    {heroButtons.map((button, buttonIndex) => (
                      <Button
                        key={buttonIndex}
                        size="sm"
                        variant={button.variant as any}
                        onClick={() => handleButtonClick(button)}
                        className={`text-sm font-semibold px-6 py-3 min-w-[140px] transition-all duration-200 ease-in-out ${
                          button.variant === 'default'
                            ? "gradient-accent"
                            : "bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary hover:border-primary"
                        }`}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-3 bg-white"
                : "w-3 h-3 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <RequestCallbackDialog 
        open={isCallbackDialogOpen} 
        onOpenChange={setIsCallbackDialogOpen} 
      />
    </div>
  );
};

export default Hero;
