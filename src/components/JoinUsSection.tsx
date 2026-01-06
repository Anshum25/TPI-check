import { useContent } from "@/lib/content";

interface JoinUsSectionProps {
  showJourney?: boolean;
}

const JoinUsSection = ({ showJourney = true }: JoinUsSectionProps) => {
  const { content } = useContent();
  const j = content.home.joinUs;
  return (
    <section className="py-8 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-14 md:mb-16">
            <div className="inline-block mb-3">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">{j?.kicker || "Start Your Journey"}</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground mb-3">
              {(j?.titleBefore)} <span className="text-primary">{j?.titleHighlight || "Turning Point"}</span> {j?.titleAfter || "in your life"}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{j?.subtitle || "Be fluent and confident in English, from basic to advanced level"}</p>
          </div>

          {/* Transformation Journey */}
          {showJourney && (
            <div className="mb-14 md:mb-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
                <p className="text-sm font-medium text-foreground hidden md:block">{j?.steps?.[0]?.label || "Basics"}</p>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent rounded-full" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">2</div>
                <p className="text-sm font-medium text-foreground hidden md:block">{j?.steps?.[1]?.label || "Intermediate"}</p>
              </div>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary via-accent to-transparent rounded-full" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-sm font-bold text-white">3</div>
                <p className="text-sm font-medium text-foreground hidden md:block">{j?.steps?.[2]?.label || "Fluent"}</p>
              </div>
            </div>
          )}

          {/* Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch mb-16">
            {/* Left - Main Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">{j?.reasonsHeading || "Why Turning Point?"}</h3>

                {/* Mobile: video directly below heading */}
                <div className="mt-4 md:hidden">
                  <div className="w-full rounded-2xl overflow-hidden shadow-soft bg-black/80">
                    <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={j?.videoUrl || "https://www.youtube.com/embed/sLMm9trcZYc"}
                        title="Introduction to the course"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mt-6 md:mt-0">
                  {(j?.reasons || [
                    { title: "Established Since 1999", description: "Founded by Ashish Bhatt and Pragna Bhatt, we've been the ultimate solution for effective English communication skills in Ahmedabad for over 25 years." },
                    { title: "Learn Directly from Founders", description: "Study with Mr Ashish Bhatt and Mrs Pragna Bhatt themselves. Their rich experience in making students fluent and confident is unmatched." },
                    { title: "Out of the Box Teaching", description: "Our unique approach is completely unconventional and highly effective. You'll find learning Spoken English easy and genuinely interesting." },
                  ]).map((r, i) => (
                    <div key={i} className={`border-l-4 ${i % 2 === 0 ? 'border-primary' : 'border-accent'} pl-6 py-2`}>
                      <p className="font-semibold text-foreground mb-2">{r.title}</p>
                      <p className="text-muted-foreground text-sm">{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Intro Video */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full md:w-[115%] max-w-[840px] rounded-2xl overflow-hidden shadow-soft bg-black/80 group transition-transform">
                <div
                  className="relative w-full origin-center transform transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={j?.videoUrl || "https://www.youtube.com/embed/sLMm9trcZYc"}
                    title="Introduction to the course"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Full Width Message - text only */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border border-primary/20 rounded-xl p-6 md:p-12">
            <div className="w-full">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">{j?.bottom?.title || "You belong here."}</h3>
              <p className="text-muted-foreground leading-relaxed">{j?.bottom?.description || "The real strength of any institute is its teachers. At Turning Point, you're not just a student – you're part of a community led by the founders themselves. Your success is our responsibility. You'll experience a teaching method that's proven effective for making students fluent, confident, and genuinely interested in learning English."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
