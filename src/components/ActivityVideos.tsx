import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActivityVideos = () => {
  const activities = [
    {
      id: 1,
      title: "Group Discussion Activity",
      videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
    },
    {
      id: 2,
      title: "Public Speaking & Confidence Building",
      videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
    },
    {
      id: 3,
      title: "Interactive Role Play Session",
      videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Student Activities
          </h2>
          <p className="text-muted-foreground">
            Watch real student activities and transformations in action
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {activities.map((activity) => (
            <div
              key={activity.id}
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
