import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Target, Users, Award, BookOpen } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Expert Training",
      description: "Learn from experienced professionals with proven teaching methods",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "10,000+ Students",
      description: "Join our successful alumni network since 1999",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Certified Programs",
      description: "Receive recognized certificates upon course completion",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Practical Approach",
      description: "Real-world scenarios and interactive learning methods",
    },
  ];

  const directorsDeskVideoUrl = "https://www.youtube.com/embed/sLMm9trcZYc";

  

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "This institute transformed my communication skills completely. I'm now confident in presentations and team meetings.",
      rating: 5,
    },
    {
      name: "Rahul Patel",
      role: "Business Owner",
      content: "The personality development course helped me become a better leader. Highly recommend to everyone!",
      rating: 5,
    },
    {
      name: "Anjali Desai",
      role: "HR Manager",
      content: "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-hero text-primary-foreground mb-4">
                    {feature.icon}
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
              Learn English the way never experienced before
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3 ">
                  Learn English the way never
                  <br className="hidden md:block" /> experienced before
                </h3>
                <p className="text-base md:text-lg text-muted-foreground">
                  Your Performance is Our Responsibility!!
                </p>
              </div>
              <div>
                <div className="text-right text-sm md:text-base font-medium text-muted-foreground mb-2">Director's desk</div>
                <div className="rounded-2xl overflow-hidden bg-card shadow-soft">
                  <div className="aspect-video w-full">
                    <iframe
                      src={directorsDeskVideoUrl}
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
              {testimonials.map((testimonial, index) => (
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
                Ready to Transform Your Future?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of successful students and start your journey towards excellence today
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
