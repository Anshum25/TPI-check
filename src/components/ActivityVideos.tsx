import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const ActivityVideos = () => {
  const activities = [
    {
      id: 1,
      title: "Group Discussion Activity",
      category: "Speaking",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      duration: "12:45",
    },
    {
      id: 2,
      title: "Public Speaking & Confidence Building",
      category: "Presentation",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      duration: "15:30",
    },
    {
      id: 3,
      title: "Interactive Role Play Session",
      category: "Communication",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      duration: "18:20",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Watch & Learn
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            See Our <span className="text-accent">Students in Action</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch real student activities and transformations in our interactive learning environment
          </p>
        </div>

        {/* Activities Grid - Unique Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              {/* Video Card */}
              <div className="relative bg-muted h-64 md:h-96 overflow-hidden rounded-xl shadow-soft hover:shadow-medium transition-shadow">
                {/* Thumbnail */}
                <img
                  src={activity.thumbnail}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                  {/* Badge */}
                  <div className="flex items-start justify-between">
                    <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                      {activity.category}
                    </span>
                    <span className="text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                      {activity.duration}
                    </span>
                  </div>

                  {/* Title and Play Button */}
                  <div className="flex items-end justify-between">
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight max-w-xs">
                      {activity.title}
                    </h3>
                    <div className="w-12 h-12 rounded-full bg-accent/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-accent transition-colors translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play className="h-5 w-5 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary/30 rounded-xl p-8 md:p-10 border border-border/50">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Explore More Activities & Student Success
            </h3>
            <p className="text-muted-foreground">
              Visit our gallery to see more student activities, achievements, and learning moments
            </p>
          </div>
          <Link to="/gallery" className="flex-shrink-0">
            <Button size="lg" className="gradient-accent gap-2">
              Watch More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActivityVideos;
