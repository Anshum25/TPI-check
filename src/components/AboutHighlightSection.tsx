import { useContent } from "@/lib/content";

const AboutHighlightSection = () => {
  const { content } = useContent();
  const { highlight } = content.about;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-5">
            <span className="text-primary">{highlight?.headingPrimary || "Your search for effective coaching"}</span> {highlight?.headingSecondary || "ENDS HERE..."}
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base">
            {(highlight?.paragraphs || []).filter(p => p && p.trim()).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHighlightSection;
