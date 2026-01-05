import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";
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

  // Static button configuration
  const heroButtons = [
    {
      text: 'CALL NOW',
      action: 'navigate' as const,
      target: '/contact#phone',
      variant: 'default' as const
    },
    {
      text: 'GET DIRECTION',
      action: 'navigate' as const,
      target: '/contact#map',
      variant: 'outline' as const
    },
    {
      text: 'REQUEST CALL BACK',
      action: 'modal' as const,
      target: 'RequestCallbackDialog',
      variant: 'outline' as const
    }
  ];

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
    navigate('/contact#phone');
  };

  const handleGetDirection = () => {
    navigate('/contact#map');
  };

  const handleRequestCallback = () => {
    setIsCallbackDialogOpen(true);
  };

  const handleButtonClick = (button: typeof heroButtons[0]) => {
    if (button.action === 'navigate') {
      navigate(button.target);
    } else if (button.action === 'modal') {
      setIsCallbackDialogOpen(true);
    }
  };

  return (
    <div className="relative h-[400px] md:h-[630px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
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
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 md:gap-4">
                    {heroButtons.map((button, buttonIndex) => (
                      <Button
                        key={buttonIndex}
                        size="sm"
                        variant={button.variant}
                        onClick={() => handleButtonClick(button)}
                        className={`min-w-[110px] sm:min-w-[140px] md:min-w-[160px] text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 transition-all duration-200 ease-in-out ${button.variant === 'outline' 
                          ? "bg-white/10 backdrop-blur-sm border-white text-white hover:bg-accent hover:text-white hover:border-accent"
                          : "gradient-accent"
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
