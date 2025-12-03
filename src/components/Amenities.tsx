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
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Carousel with rounded corners and shadow */}
            <div className="relative w-full h-72 md:h-96 lg:h-96 rounded-2xl overflow-hidden shadow-medium bg-muted">
              {/* Carousel Images */}
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

            {/* Right Side - Description and Amenities List */}
            <div className="flex flex-col justify-center">
              <p className="text-sm md:text-base text-muted-foreground mb-8 leading-relaxed">
                {description}
              </p>

              {/* Amenities List */}
              <ul className="space-y-4 md:space-y-5">
                {amenitiesList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary font-bold text-lg leading-none flex-shrink-0 mt-1">•</span>
                    <span className="text-sm md:text-base text-foreground/90 leading-relaxed">{item}</span>
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
