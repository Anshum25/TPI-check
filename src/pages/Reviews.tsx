import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/content";
import googleLogo from "@/assets/google.svg";
import facebookLogo from "@/assets/facebook.svg";
import justdialLogo from "@/assets/justdial.svg";

const Reviews = () => {
  const { content } = useContent();
  const reviewLinks = content?.successStories?.cta?.reviewLinks || [];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "This institute transformed my communication skills completely. I'm now confident in presentations and team meetings. The practical approach really works!",
      rating: 5,
    },
    {
      name: "Rahul Patel",
      role: "Business Owner",
      content: "The personality development course helped me become a better leader. Highly recommend to everyone who wants to grow professionally!",
      rating: 5,
    },
    {
      name: "Anjali Desai",
      role: "HR Manager",
      content: "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth. The batch size is perfect for individual attention.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Marketing Executive",
      content: "I was hesitant about my English speaking skills, but after completing the course, I feel like a different person. Thank you for building my confidence!",
      rating: 5,
    },
    {
      name: "Neha Gupta",
      role: "Teacher",
      content: "The founders personally conduct classes which makes a huge difference. Their experience and dedication towards students is remarkable.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      role: "Student",
      content: "Best institute for spoken English in the city. The interactive sessions and group discussions helped me overcome my fear of speaking.",
      rating: 5,
    },
    {
      name: "Pooja Mehta",
      role: "Customer Service Executive",
      content: "My workplace communication improved significantly after joining here. The business communication module was especially helpful for my career.",
      rating: 5,
    },
    {
      name: "Karan Shah",
      role: "Entrepreneur",
      content: "I've attended many institutes before, but this one stands out. The practical tips for personality development are applicable in real life situations.",
      rating: 4,
    },
    {
      name: "Sneha Joshi",
      role: "Bank Manager",
      content: "Fantastic learning experience! The interview preparation course helped me crack multiple job interviews. Highly recommended!",
      rating: 5,
    },
  ];

  // Small helper for section header with icon
  const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="h-9 w-9 rounded-lg bg-card border border-border/60 grid place-items-center shadow-soft">
        {icon}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
  );

  // Resolve platform link by label
  const getLink = (labelIncludes: string) =>
    reviewLinks.find((l: any) => (l.label || "").toLowerCase().includes(labelIncludes))?.url || "#";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Reviews</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Read what our students have to say about their learning experience
            </p>
          </div>
        </section>

        {/* Google Reviews */}
        <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-rose-50/60 via-blue-50/50 to-purple-50/60 dark:from-rose-950/15 dark:via-blue-950/10 dark:to-purple-950/15">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <SectionHeader
                title="Google Reviews"
                icon={<img src={googleLogo} alt="Google" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">Highlights from our latest Google reviews</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <TestimonialCard key={`g-${i}`} {...t} hideRole />
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="https://www.google.com/search?q=turning+point+institute#lrd=0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e,1,,,," target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-6">Watch More</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Facebook Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <SectionHeader
                title="Facebook Reviews"
                icon={<img src={facebookLogo} alt="Facebook" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">Stories shared by our community on Facebook</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(3, 6).map((t, i) => (
                <TestimonialCard key={`f-${i}`} {...t} hideRole />
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={getLink("facebook")} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-6">Watch More</Button>
              </a>
            </div>
          </div>
        </section>

        {/* JustDial Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <SectionHeader
                title="JustDial Reviews"
                icon={<img src={justdialLogo} alt="JustDial" className="h-5 w-5" />}
              />
              <p className="text-muted-foreground mb-8">Ratings and feedback from JustDial</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(6, 9).map((t, i) => (
                <TestimonialCard key={`j-${i}`} {...t} hideRole />
              ))}
            </div>
            <div className="text-center mt-8">
              <a href={getLink("just")} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="px-6">Watch More</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Submit review stays at the bottom */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Want to Share Your Experience?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We'd love to hear about your journey with us. Please leave your review on Google so others can see your experience.
            </p>
            <a
              href="https://www.google.com/search?q=turning+point+institute#lrd=0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
                Submit Your Review
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
