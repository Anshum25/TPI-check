import { useContent } from "@/lib/content";

const AboutServingCommunity = () => {
  const { content } = useContent();
  const { community } = content.about;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-block">
            About Us
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            {community?.heading || "Serving the community for more than two decades"}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
            {community?.description || ""}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutServingCommunity;
