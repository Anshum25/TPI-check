import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";
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
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="relative h-[600px] overflow-hidden">
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
                  <div className="flex flex-wrap gap-4">
                    <Link to={slide.primaryButtonLink}>
                      <Button size="lg" className="gradient-accent">
                        {slide.primaryButtonText}
                      </Button>
                    </Link>
                    <Link to={slide.secondaryButtonLink}>
                      <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary">
                        {slide.secondaryButtonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
