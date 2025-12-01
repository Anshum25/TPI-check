import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActivityVideos = () => {
  const activities = [
    {
      id: 1,
      title: "Group Discussion Activity",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Public Speaking & Confidence Building",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Interactive Role Play Session",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Student Activities
          </h2>
          <p className="text-muted-foreground">
            Watch real student activities and transformations in action
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow">
              <img
                src={activity.thumbnail}
                alt={activity.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Watch More Button */}
        <div className="text-center">
          <Link to="/gallery">
            <Button variant="outline">Watch More</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityVideos;
