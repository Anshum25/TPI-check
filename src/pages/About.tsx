import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, TrendingUp, Heart } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "10,000+", label: "Students Trained" },
    { icon: <Award className="h-8 w-8" />, value: "25+", label: "Years Experience" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "95%", label: "Success Rate" },
    { icon: <Heart className="h-8 w-8" />, value: "4.9/5", label: "Student Rating" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Excellence Institute</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Empowering individuals through quality education since 1999
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-secondary/30">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in 1999, Excellence Institute began with a simple mission: to help individuals
                  overcome language barriers and build confidence in their personal and professional lives.
                  What started as a small coaching center has grown into one of the most trusted names in
                  personality development and English language training.
                </p>
                <p>
                  Our founders, with decades of combined experience in education and corporate training,
                  recognized the need for practical, results-oriented programs that focus on real-world
                  application rather than just theoretical knowledge. This philosophy continues to guide
                  everything we do.
                </p>
                <p>
                  Over the years, we've had the privilege of training over 10,000 students from diverse
                  backgrounds, helping them achieve their dreams of career advancement, academic success,
                  and personal growth. Our commitment to quality education and individual attention has
                  remained unwavering.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card p-8 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in everything we do, from curriculum design to student support,
                  ensuring the highest quality education.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-4">Integrity</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards of integrity in our teaching methods and relationships
                  with students and partners.
                </p>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-soft">
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve our teaching methods to incorporate the latest educational research
                  and technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why We're Different</h2>
              <div className="space-y-4 text-left">
                <div className="p-6 border-l-4 border-primary bg-secondary/30 rounded">
                  <h3 className="font-bold mb-2">Coaching by Founders</h3>
                  <p className="text-muted-foreground">
                    Unlike many institutes, our founders personally conduct classes, bringing decades of
                    expertise directly to you.
                  </p>
                </div>
                <div className="p-6 border-l-4 border-accent bg-secondary/30 rounded">
                  <h3 className="font-bold mb-2">No Franchises or Branches</h3>
                  <p className="text-muted-foreground">
                    We maintain quality by operating from a single location, ensuring consistent standards
                    and personalized attention.
                  </p>
                </div>
                <div className="p-6 border-l-4 border-primary bg-secondary/30 rounded">
                  <h3 className="font-bold mb-2">Practical, Results-Oriented Approach</h3>
                  <p className="text-muted-foreground">
                    Our curriculum focuses on real-world applications, preparing you for actual situations
                    you'll face in life and career.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
