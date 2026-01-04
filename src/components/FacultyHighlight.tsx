import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "@/lib/content";
import { Card } from "@/components/ui/card";

const slugifyName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const FacultyHighlight = () => {
  const { content } = useContent();
  const { faculty, home } = content;
  const navigate = useNavigate();

  const highlighted = useMemo(() => faculty.members.slice(0, 3), [faculty.members]);

  const handleClick = (name: string) => {
    const slug = slugifyName(name);
    navigate(`/faculty?member=${encodeURIComponent(slug)}`);
  };

  if (!highlighted.length) return null;

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-primary/20 text-primary bg-primary/5 mb-3">
            {home.facultyHighlight?.badgeLabel || "Core Faculty"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {home.facultyHighlight?.title || "Owners are the Teachers!!"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {home.facultyHighlight?.description ||
              "Meet the founders and core faculty who personally mentor every student at Turning Point."}
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {highlighted.map((member, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(member.name)}
              className="w-full"
            >
              <Card className="w-full h-full rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 border border-border/60 bg-card/95">
                <div className="p-4 md:p-5 lg:p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-6">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full object-cover border border-primary/30 mx-auto"
                      />
                    ) : (
                      <div className="h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto">
                        {member.imageInitials}
                      </div>
                    )}
                  </div>
                  <div className="w-full flex flex-col items-center text-center flex-grow">
                    <div className="space-y-3 mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">{member.name}</h3>
                      <p className="text-sm font-medium text-primary leading-relaxed">{member.role}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Ahmedabad</p>
                    </div>
                    <div className="mt-auto">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-[11px] font-semibold text-primary border border-primary/20">
                        Core Faculty
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultyHighlight;
