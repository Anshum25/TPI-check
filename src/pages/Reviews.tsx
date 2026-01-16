import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { DEFAULT_CONTENT, useContent } from "@/lib/content";
import googleLogo from "@/assets/google.svg";
import facebookLogo from "@/assets/facebook.svg";
import justdialLogo from "@/assets/justdial.svg";

const Reviews = () => {
  const { content } = useContent();
  const reviews = content.reviews ?? DEFAULT_CONTENT.reviews;

  const testimonials = reviews.testimonials ?? [];
  const videoReviews = reviews.videoReviews ?? [];

  // Group testimonials by source (google / facebook / justdial) with sensible fallbacks
  const googleTestimonials = (() => {
    const filtered = testimonials.filter((t) => t.source === "google");
    return filtered.length ? filtered : testimonials.slice(0, 3);
  })();

  const facebookTestimonials = (() => {
    const filtered = testimonials.filter((t) => t.source === "facebook");
    return filtered.length ? filtered : testimonials.slice(3, 6);
  })();

  const justdialTestimonials = (() => {
    const filtered = testimonials.filter((t) => t.source === "justdial");
    return filtered.length ? filtered : testimonials.slice(6, 9);
  })();

  // Small helper for section header with icon
  const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-9 w-9 rounded-lg bg-card border border-border/60 grid place-items-center shadow-soft">
        {icon}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
  );

  const googleSection = reviews.sections?.google;
  const facebookSection = reviews.sections?.facebook;
  const justdialSection = reviews.sections?.justdial;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{reviews.hero.title}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              {reviews.hero.subtitle}
            </p>
          </div>
        </section>

       

        {/* Google Reviews */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-rose-50/60 via-blue-50/50 to-purple-50/60 dark:from-rose-950/15 dark:via-blue-950/10 dark:to-purple-950/15">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <SectionHeader
                title={googleSection?.title || "Google Reviews"}
                icon={<img src={googleLogo} alt="Google" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">{googleSection?.description || "Highlights from our latest Google reviews"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {googleTestimonials.length ? googleTestimonials.map((t, i) => (
                <TestimonialCard
                  key={`g-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              )) : testimonials.slice(0, 3).map((t, i) => (
                <TestimonialCard
                  key={`g-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="px-6">
                <a href={googleSection?.watchMoreUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Watch More
                </a>
              </Button>
            </div>
          </div>
        </section>
          {/* JustDial Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <SectionHeader
                title={justdialSection?.title || "JustDial Reviews"}
                icon={<img src={justdialLogo} alt="JustDial" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">{justdialSection?.description || "Ratings and feedback from JustDial"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {justdialTestimonials.length ? justdialTestimonials.map((t, i) => (
                <TestimonialCard
                  key={`j-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              )) : testimonials.slice(6, 9).map((t, i) => (
                <TestimonialCard
                  key={`j-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="px-6">
                <a href={justdialSection?.watchMoreUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Watch More
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Facebook Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <SectionHeader
                title={facebookSection?.title || "Facebook Reviews"}
                icon={<img src={facebookLogo} alt="Facebook" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">{facebookSection?.description || "Stories shared by our community on Facebook"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facebookTestimonials.length ? facebookTestimonials.map((t, i) => (
                <TestimonialCard
                  key={`f-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              )) : testimonials.slice(3, 6).map((t, i) => (
                <TestimonialCard
                  key={`f-${i}`}
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating ?? 5}
                  expandable
                  hideRole
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="px-6">
                <a href={facebookSection?.watchMoreUrl || "#"} target="_blank" rel="noopener noreferrer">
                  Watch More
                </a>
              </Button>
            </div>
          </div>
        </section>

         {videoReviews.length > 0 && (
          <section className="py-16 bg-secondary/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Video Reviews</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear directly from our students and parents in their own words.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoReviews.map((video, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-video w-full bg-black/80">
                      <iframe
                        className="w-full h-full"
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground text-sm md:text-base truncate" title={video.title}>
                        {video.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      

        {/* Submit review stays at the bottom */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">{reviews.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {reviews.cta.description}
            </p>
            <a
              href="https://www.google.com/search?q=turning+point+institute#lrd=0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                asChild
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <span>{reviews.cta.buttonText}</span>
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
