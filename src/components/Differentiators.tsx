import { useContent } from "@/lib/content";
import { Award, Users } from "lucide-react";

const iconMap = {
  award: Award,
  users: Users,
} as const;

const Differentiators = () => {
  const { content } = useContent();

  const cards = content.home.differentiators?.cards;

  if (!cards || cards.length === 0) {
    // Fallback to previous static UI if not configured yet
    return (
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-hero text-primary-foreground flex-shrink-0">
                  <Award className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">An Institute Exclusively for</h3>
                </div>
              </div>
              <div className="space-y-3 ml-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-lg font-semibold text-foreground">Spoken English</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <p className="text-lg font-semibold text-foreground">Personality Development</p>
                </div>
              </div>
              <p className="mt-6 text-muted-foreground">Specialized training designed specifically for these core areas of transformation</p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground flex-shrink-0">
                  <Users className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Trained 10,000+ Students Since 1999</h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-foreground">Coaching by Founders</p>
                    <p className="text-sm text-muted-foreground">Direct mentorship from institute founders with 25+ years experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <div>
                    <p className="font-semibold text-foreground">No Franchises/No Branches</p>
                    <p className="text-sm text-muted-foreground">Single location ensures consistent quality and personalized attention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap] || (idx === 0 ? Award : Users);
            return (
              <div key={idx} className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-full ${idx === 0 ? "gradient-hero text-primary-foreground" : "gradient-accent text-accent-foreground"} flex-shrink-0`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">{card.title}</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {card.items.map((it, i) => (
                    <div key={i} className={`flex ${it.description ? "items-start" : "items-center"} gap-3`}>
                      <div className={`w-2 h-2 rounded-full bg-accent flex-shrink-0 ${it.description ? "mt-2" : ""}`} />
                      <div>
                        <p className={`font-semibold text-foreground ${it.description ? "" : "text-lg"}`}>{it.title}</p>
                        {it.description && <p className="text-sm text-muted-foreground">{it.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                {card.footerText && (
                  <p className="mt-6 text-muted-foreground">{card.footerText}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
