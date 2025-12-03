import { useState, useEffect } from "react";

interface AmenitiesProps {
  title?: string;
  description?: string;
  amenitiesList?: string[];
  carouselImages?: string[];
}

const Amenities = ({
  title = "Amenities",
  description = "We are functioning at a spacious premises in posh area of Satellite with all the amenities to facilitate our students with the best environment to sharpen their communication skills and gain self confidence along with positive personality traits.",
  amenitiesList = [
    "Precious AC class rooms with comfortable sitting arrangement",
    "Hall with stage, mic and projector",
    "Course material with detailed explanation and practice material",
    "Recorded videos of all the lectures if student misses any lecture",
    "Library with numerous reading materials along with take home facility",
    "Reading room where you can utilize for quality time",
  ],
  carouselImages = [
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
  ],
}: AmenitiesProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="py-0 md:py-0 overflow-hidden">
      <div className="relative w-full min-h-96 md:min-h-screen lg:min-h-[600px] flex items-center">
        {/* Full-width Carousel Background */}
        <div className="absolute inset-0 w-full h-full">
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
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
        </div>

        {/* Content Overlay on Right */}
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Empty space for carousel */}
            <div className="hidden lg:block" />

            {/* Right - Header and Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {title}
              </h2>

              <p className="text-sm md:text-base text-foreground/90 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Amenities List */}
              <ul className="space-y-3 md:space-y-4">
                {amenitiesList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent font-bold text-lg leading-none flex-shrink-0 mt-1">•</span>
                    <span className="text-sm md:text-base text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Image Counter Badge */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-foreground/85 text-background px-3 py-1.5 rounded text-xs font-semibold z-20">
          {currentSlide + 1} / {carouselImages.length}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
