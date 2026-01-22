import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Differentiators from "@/components/Differentiators";
import JoinUsSection from "@/components/JoinUsSection";
import ActivityVideos from "@/components/ActivityVideos";
import ActivityImages from "@/components/ActivityImages";
import FacultyHighlight from "@/components/FacultyHighlight";
import CourseDetails from "@/components/CourseDetails";
import Marquee from "@/components/Marquee";
import MethodologySection from "@/components/MethodologySection";
import GainFromCourse from "@/components/GainFromCourse";
import HomeReviewsSection from "@/components/HomeReviewsSection";
import TestimonialCard from "@/components/TestimonialCard";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Users, Award, BookOpen } from "lucide-react";
import { DEFAULT_CONTENT, useContent } from "@/lib/content";
import FinalCtaBanner from "@/components/FinalCtaBanner";

const toEmbedUrl = (url?: string) => {
  if (!url) return "";
  try {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?&#]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1]?.split(/[?&#]/)[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  } catch {
    return url;
  }
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { content, loading } = useContent();
  const home = content.home ?? DEFAULT_CONTENT.home;
  const joinUs = home.joinUs;
  const bottomTitle = joinUs?.bottom?.title || "You belong here.";
  const bottomDescription =
    joinUs?.bottom?.description ||
    "The real strength of any institute is its teachers. At Turning Point, you're not just a student – you're part of a community led by the founders themselves. Your success is our responsibility. You'll experience a teaching method that's proven effective for making students fluent, confident, and genuinely interested in learning English.";

  const rawBottomPoints = joinUs?.bottom?.points;
  const bottomItems =
    rawBottomPoints && rawBottomPoints.length > 0
      ? rawBottomPoints.map((p) =>
          typeof p === "string"
            ? { title: p, description: "" }
            : {
                title: p.title || p.description || "",
                description: p.description || "",
              }
        ).filter((item) => item.title.trim().length > 0 || item.description?.trim().length)
      : bottomDescription
          .split(".")
          .map((point) => point.trim())
          .filter(Boolean)
          .map((sentence) => ({ title: sentence, description: "" }));

  const hasSignalledReady = useRef(false);

  // Notify preloader when home content has finished loading from backend
  useEffect(() => {
    if (loading || hasSignalledReady.current) return;
    hasSignalledReady.current = true;

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("tpi-home-ready"));
    }
  }, [loading]);

  const featureIcons = [
    <Target key="icon-0" className="h-6 w-6" />,
    <Users key="icon-1" className="h-6 w-6" />,
    <Award key="icon-2" className="h-6 w-6" />,
    <BookOpen key="icon-3" className="h-6 w-6" />,
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HomeScrollEffect />
      <main className="flex-1">
        <Hero />
        <Differentiators />
        <JoinUsSection showJourney={false} />
        <CourseDetails />
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="mt-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border border-primary/20 rounded-xl p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {bottomTitle}
                </h3>
              </div>
              <Accordion
                type="single"
                collapsible
                defaultValue="you-belong-0"
                className="w-full"
              >
                {bottomItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`you-belong-${index}`}
                    className="group border-b last:border-b-0"
                  >
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary data-[state=open]:text-primary transition-colors py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary group-data-[state=open]:hidden">
                          +
                        </span>
                        <span className="text-lg font-bold text-primary hidden group-data-[state=open]:inline-block">
                          -
                        </span>
                        <span className="text-base md:text-lg font-semibold text-foreground">
                          {item.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words break-all">
                      {item.description || item.title}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        <Marquee />

        {/* Learn English + Director's Desk */}
        <section className="pt-12 pb-20 md:pt-16 md:pb-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div>
                  {home.methodologyBadge && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                      {home.methodologyBadge}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {home.heroTitle}
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {home.heroSubtitle}
                </p>
                {home.methodologyKeyPoint && (
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Key Point</p>
                    <p className="text-foreground font-semibold text-lg">
                      {home.methodologyKeyPoint}
                    </p>
                  </div>
                )}
              </div>

              {/* Right - Video */}
              <div className="relative overflow-hidden">
                <div className="hidden md:block absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-3xl blur-2xl" />
                <div className="hidden md:block absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-3xl blur-3xl" />

                <div className="relative bg-white dark:bg-slate-950 rounded-2xl shadow-medium overflow-hidden border border-border/50 hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Director's Desk</p>
                  </div>
                  <div className="aspect-video w-full bg-muted">
                    <iframe
                      src={toEmbedUrl(home.directorVideoUrl)}
                      title="Director's desk video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MethodologySection />
        <GainFromCourse />

        <FacultyHighlight />

        {/* Achievements Section */}
        {home.achievementsSection && (
          <section className="py-10 md:py-14">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                  {home.achievementsSection.title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {home.achievementsSection.subtitle}
                </p>
              </div>

              <div className="max-w-4xl mx-auto bg-card/80 border border-border/60 rounded-2xl shadow-soft px-6 py-4 md:px-8 md:py-6 space-y-4">
                {home.achievementsSection.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 py-3 border-b last:border-b pl-5 border-l-4 ${index === 1 || index === 3 ? 'border-accent' : 'border-primary'
                    }`}
                  style={{
                    borderLeftColor: index === 1 || index === 3 ? 'hsl(0 84% 50%)' : 'hsl(217 91% 28%)',
                    borderBottomColor: index === 1 || index === 3 ? 'hsl(0 84% 50%)' : 'hsl(217 91% 28%)'
                  }}
                >
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-[15px]">{item.description}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <ActivityVideos />

        {/* Reviews from achievers */}
        <HomeReviewsSection />

        <ActivityImages />

      
        {/* Secondary CTA Section (Ready to Get Started?) */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <FinalCtaBanner />
          </div>
        </section>

        <a
          href={`tel:${home.finalCta.phoneNumber}`}
          className="md:hidden fixed bottom-6 right-4 z-50 h-14 w-14 rounded-full gradient-accent shadow-lg flex items-center justify-center"
          aria-label={`Call ${home.finalCta.phoneNumber}`}
        >
          <i
            aria-hidden="true"
            className="fas fa-phone-volume inline-block text-white text-xl"
            style={{ transform: "scale(-1, -1)" }}
          />
        </a>
      </main>
      <Footer />
    </div>
  );
};

// Hook must be at component level
const HomeScrollEffect = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scroll") === "footer") {
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById("site-footer");
        if (el) {
          // Use rAF twice to ensure layout settles, then scroll to bottom
          requestAnimationFrame(() => requestAnimationFrame(() => {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
          }));
          return;
        }
        if (attempts < 30) {
          attempts += 1;
          setTimeout(tryScroll, 200);
        }
      };
      // Kick off after a short delay to allow initial render
      const t = setTimeout(tryScroll, 100);
      // Also attempt on full window load (assets ready)
      const onLoad = () => tryScroll();
      window.addEventListener('load', onLoad);
      return () => {
        clearTimeout(t);
        window.removeEventListener('load', onLoad);
      };
    }
  }, [location.search]);
  return null;
};

export default Home;
