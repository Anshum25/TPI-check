import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";

const Reviews = () => {
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

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-6 py-3 rounded-full">
                <span className="text-3xl font-bold text-accent">4.9</span>
                <span className="text-muted-foreground">out of 5 stars</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Based on 500+ reviews</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Want to Share Your Experience?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We'd love to hear about your journey with us. Your feedback helps us improve and inspires others to take the first step.
            </p>
            <a
              href="mailto:info@excellence.edu?subject=My Review"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              Submit Your Review
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
