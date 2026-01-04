import { useContent } from "@/lib/content";

const Marquee = () => {
  const { content } = useContent();
  const marquee = content.home.marquee;

  if (!marquee?.isVisible) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-8 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 dark:from-primary/25 dark:via-accent/25 dark:to-primary/25 border-y border-primary/30 dark:border-primary/40 overflow-hidden">
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee-track {
          display: flex;
          animation: marquee-scroll 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex-shrink: 0;
          padding-right: 50px;
        }
      `}</style>
      <div className="w-full overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-item text-base md:text-lg font-semibold text-foreground dark:text-slate-100">
            {marquee.text}
          </div>
          <div className="marquee-item text-base md:text-lg font-semibold text-foreground dark:text-slate-100">
            {marquee.text}
          </div>
          <div className="marquee-item text-base md:text-lg font-semibold text-foreground dark:text-slate-100">
            {marquee.text}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
