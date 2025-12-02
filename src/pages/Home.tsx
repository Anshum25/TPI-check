import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Differentiators from "@/components/Differentiators";
import JoinUsSection from "@/components/JoinUsSection";
import ActivityVideos from "@/components/ActivityVideos";
import FacultyHighlight from "@/components/FacultyHighlight";
import CourseDetails from "@/components/CourseDetails";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, BookOpen } from "lucide-react";
import { useContent } from "@/lib/content";

const Home = () => {
  const location = useLocation();
  const { content } = useContent();
  const { home, admissions } = content;

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
        <JoinUsSection />

        <FacultyHighlight />

        {/* Achievements Section */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">What You'll Achieve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master English through our proven methodology
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-card/80 border border-border/60 rounded-2xl shadow-soft px-6 py-4 md:px-8 md:py-6 space-y-4">
              {[
                {
                  title: "Achieve Clarity",
                  description: "from Basic to most Advance sentence structures"
                },
                {
                  title: "Achieve Fluency",
                  description: "with complete understanding of grammar concepts and flow of language"
                },
                {
                  title: "Achieve Confidence",
                  description: "through numerous stage activities and public speaking sessions"
                },
                {
                  title: "Achieve Perfection",
                  description: "by mastering all aspects of the language"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 py-3 border-b border-border/40 last:border-b-0 pl-5 border-l-4 ${
                    index % 2 === 1 ? 'border-accent' : 'border-primary'
                  }`}
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

        

        {/* Learn English + Director's Desk */}
        <section className="py-20 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                    Our Methodology
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {home.heroTitle}
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {home.heroSubtitle}
                </p>
                <div className="pt-6 border-t border-border">
                  <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Key Point</p>
                  <p className="text-foreground font-semibold text-lg">
                    Direct mentorship from the institute founders with proven teaching methods
                  </p>
                </div>
              </div>

              {/* Right - Video */}
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-3xl blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-3xl blur-3xl" />

                <div className="relative bg-white dark:bg-slate-950 rounded-2xl shadow-medium overflow-hidden border border-border/50 hover:shadow-lg transition-shadow duration-300">
                  <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur px-3 py-1 rounded-full">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Director's Desk</p>
                  </div>
                  <div className="aspect-video w-full bg-muted">
                    <iframe
                      src={home.directorVideoUrl}
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

        <ActivityVideos />

        {/* Courses Section */}
        {/* <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our specialized programs designed to enhance your skills
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/courses">
                <Button size="lg" variant="outline">View All Courses</Button>
              </Link>
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        {/* <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Success Stories</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from our students who transformed their careers and lives
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {home.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/reviews">
                <Button size="lg" variant="outline">Read More Reviews</Button>
              </Link>
            </div>
          </div>
        </section> */}

        {/* CTA Section - removed from home page */}
        {/**
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="gradient-hero rounded-2xl p-12 text-center shadow-medium">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {home.ctaTitle}
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                {home.ctaText}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" variant="secondary">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* Secondary CTA Section (Ready to Get Started?) - shown below the gradient CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{admissions.cta.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">{admissions.cta.subtitle}</p>
            <p className="text-sm text-muted-foreground mb-6">{admissions.cta.tagline}</p>
            <div className="inline-flex items-center gap-3 bg-secondary/30 rounded-full p-2">
              <a href={`tel:${admissions.cta.phoneNumber}`}>
                <Button size="lg" className="gradient-accent">{admissions.cta.phoneLabel}</Button>
              </a>
              <a href={admissions.cta.directionsUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">{admissions.cta.directionsLabel}</Button>
              </a>
            </div>
          </div>
        </section>
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
