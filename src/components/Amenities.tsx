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
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header Bar */}
        <div className="bg-primary text-primary-foreground py-4 px-8 rounded-t-lg mb-0">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-b-lg shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Carousel (Larger) */}
            <div className="relative w-full bg-gray-300 min-h-96 lg:min-h-full">
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

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentSlide + 1} / {carouselImages.length}
              </div>
            </div>

            {/* Right Side - Description and Amenities List */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <p className="text-base text-foreground/80 mb-8 leading-relaxed">
                {description}
              </p>

              {/* Amenities List */}
              <ul className="space-y-4">
                {amenitiesList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <span className="text-primary font-bold mt-1 text-lg">•</span>
                    <span className="text-sm leading-relaxed">{item}</span>
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
