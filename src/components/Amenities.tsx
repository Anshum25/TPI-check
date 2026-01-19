import { useState, useEffect, useRef } from "react";
import { useContent } from "@/lib/content";

const Amenities = () => {
  const { content } = useContent();
  const amenities = content.about.amenities || {};
  
  const title = amenities.title || "Amenities";
  const description = amenities.description || "We are functioning at a spacious premises in posh area of Satellite with all the amenities to facilitate our students with the best environment to sharpen their communication skills and gain self confidence along with positive personality traits.";
  const amenitiesList = amenities.amenitiesList || [];
  const carouselImages = amenities.carouselImages || [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497633762265-25c147778efd?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1516979187457-635ffe35ff81?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (!carouselImages.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselImages.length) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselImages.length) return;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const startX = touchStartXRef.current;
    const endX = touchEndXRef.current;
    if (startX === null || endX === null) return;

    const deltaX = endX - startX;
    const threshold = 40; // minimum px to count as a swipe

    if (deltaX > threshold) {
      // swipe right - previous slide
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    } else if (deltaX < -threshold) {
      // swipe left - next slide
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Side - Fading slideshow (all breakpoints, swipe-enabled on touch devices) */}
            <div
              className="lg:col-span-7 relative w-full h-80 md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-medium bg-muted"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Amenity ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 left-4 bg-foreground/85 text-background px-3 py-1.5 rounded text-xs font-semibold">
                {currentSlide + 1} / {carouselImages.length}
              </div>
            </div>

            {/* Right Side - Badge, Heading, Description and Amenities List (no card) */}
            <div className="lg:col-span-5 flex flex-col justify-start p-1 md:p-2">
              <span className="self-start text-[10px] md:text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                Our Facilities
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">{title}</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-prose">
                {description}
              </p>
              <ul className="space-y-3 list-disc pl-5">
                {amenitiesList.map((item, index) => (
                  <li key={index} className="text-sm md:text-base text-foreground/90 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
