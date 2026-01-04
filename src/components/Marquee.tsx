import { useContent } from "@/lib/content";

const Marquee = () => {
  const { content } = useContent();
  const marquee = content.home.marquee;

  if (!marquee?.isVisible) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 dark:from-primary/20 dark:via-accent/20 dark:to-primary/20 border-y border-primary/20 dark:border-primary/30 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee-content {
          animation: marquee 40s linear infinite;
          white-space: nowrap;
          display: inline-block;
          padding-right: 100%;
        }
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="marquee-wrapper flex items-center justify-start overflow-hidden">
          <div className="marquee-content text-lg md:text-xl font-semibold text-foreground">
            {marquee.text}
          </div>
          <div className="marquee-content text-lg md:text-xl font-semibold text-foreground">
            {marquee.text}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
