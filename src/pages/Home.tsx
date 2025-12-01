import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide quality education with a focus on practical skills and real-world application
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {home.features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-hero text-primary-foreground mb-4">
                    {featureIcons[index] ?? <Target className="h-6 w-6" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        

        {/* Learn English + Director's Desk */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              {home.heroTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 ">
                  {home.heroTitle}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  {home.heroSubtitle}
                </p>
              </div>
              <div>
                <div className="text-right text-sm md:text-base font-medium text-muted-foreground mb-2">Director's desk</div>
                <div className="rounded-2xl overflow-hidden bg-card shadow-soft">
                  <div className="aspect-video w-full">
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
        <section className="py-20 bg-secondary/30">
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
        </section>

        {/* CTA Section */}
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
