import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/hero-classroom.jpg": heroClassroom,
  "/src/assets/speaking-confidence.jpg": speakingConfidence,
  "/src/assets/student-success.jpg": studentSuccess,
};

const ActivityImages = () => {
  const { content } = useContent();
  const activityImages = content?.home?.activityImages;

  if (!activityImages) return null;

  const resolveImageSrc = (src?: string) => {
    if (!src) return "";
    if (src.startsWith("data:") || src.startsWith("http")) return src;
    return imageMap[src] || src;
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {activityImages.title}
          </h2>
          <p className="text-muted-foreground">
            {activityImages.subtitle}
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {activityImages.images.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video w-full bg-muted">
                <img
                  src={resolveImageSrc(item.src)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <Link to="/gallery?tab=images">
            <Button variant="outline">View Gallery</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityImages;
