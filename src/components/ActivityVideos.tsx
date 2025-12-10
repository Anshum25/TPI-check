import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";

const ActivityVideos = () => {
  const { content } = useContent();
  const activityVideos = content?.home?.activityVideos;

  if (!activityVideos) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {activityVideos.title}
          </h2>
          <p className="text-muted-foreground">
            {activityVideos.subtitle}
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {activityVideos.videos.map((activity, index) => (
            <div
              key={index}
              className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video w-full bg-muted">
                <iframe
                  src={activity.videoUrl}
                  title={activity.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Watch More Button */}
        <div className="flex justify-center">
          <Link to="/gallery?tab=videos">
            <Button variant="outline">Watch More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityVideos;
