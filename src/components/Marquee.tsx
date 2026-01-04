import { useContent } from "@/lib/content";

const Marquee = () => {
  const { content } = useContent();
  const marquee = content.home.marquee;

  if (!marquee?.isVisible) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 dark:from-primary/20 dark:via-accent/20 dark:to-primary/20 border-y border-primary/20 dark:border-primary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
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
          `}