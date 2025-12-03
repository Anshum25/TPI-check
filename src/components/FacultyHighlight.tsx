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
  const { faculty } = content;
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
            Core Faculty
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Owners are the Teachers!!</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Meet the founders and core faculty who personally mentor every student at Turning Point.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlighted.map((member, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(member.name)}
              className="text-left"
            >
              <Card className="w-full h-full rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 border border-border/60 bg-card/95">
                <div className="p-6 flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover border border-primary/30"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xl font-bold">
                        {member.imageInitials}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">Ahmedabad</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-[11px] font-semibold text-primary border border-primary/20">
                      Core Faculty
                    </span>
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
