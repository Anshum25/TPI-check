import { useContent } from "@/lib/content";

const Marquee = () => {
  const { content } = useContent();
  const marquee = content.home.marquee;

  const marqueeItems = Array.from({ length: 12 }, (_, index) => (
    <span
      key={index}
      className="marquee-item text-sm md:text-base font-medium text-foreground dark:text-slate-100"
    >
      {marquee?.text}
    </span>
  ));

  if (!marquee?.isVisible) {
    return null;
  }

  return (
    <section className="w-full mt-6 py-3 md:py-4 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 dark:from-primary/25 dark:via-accent/25 dark:to-primary/25 border-y border-primary/30 dark:border-primary/40 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }
        .marquee-item {
          flex-shrink: 0;
          white-space: nowrap;
          padding-right: 48px;
        }
      `}</style>
      <div className="w-full overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-group">{marqueeItems}</div>
          <div className="marquee-group" aria-hidden="true">{marqueeItems}</div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
