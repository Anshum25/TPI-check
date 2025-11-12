import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Star } from "lucide-react";

const SuccessStories = () => {
  const stats = [
    { icon: <Trophy className="h-8 w-8" />, value: "10,000+", label: "Students Trained" },
    { icon: <Star className="h-8 w-8" />, value: "4.9/5", label: "Average Rating" },
    { icon: <Target className="h-8 w-8" />, value: "95%", label: "Success Rate" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "25+", label: "Years of Excellence" },
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Tech Corp",
      content: "I joined as a shy Gujarati medium student. Today, I confidently lead presentations and meetings. The transformation has been incredible. Thank you Ashish sir and Pragna ma'am!",
      rating: 5,
      achievement: "Promoted to Team Lead"
    },
    {
      name: "Rahul Patel",
      role: "Business Owner",
      content: "My business communication improved dramatically. I can now negotiate confidently with international clients. The personality development sessions were life-changing.",
      rating: 5,
      achievement: "Expanded Business Internationally"
    },
    {
      name: "Anjali Desai",
      role: "HR Manager at MNC",
      content: "The course not only improved my English but also boosted my confidence. I can now conduct interviews, give presentations, and write professional emails effortlessly.",
      rating: 5,
      achievement: "Landed Dream Job"
    },
    {
      name: "Karan Shah",
      role: "MBA Student",
      content: "From struggling with basic sentences to winning debate competitions! The interactive teaching method made learning fun. Group discussions really built my confidence.",
      rating: 5,
      achievement: "Won University Debate"
    },
    {
      name: "Meera Joshi",
      role: "Homemaker",
      content: "I can now help my children with their English homework and communicate fluently with their teachers. The support from faculty was amazing throughout the journey.",
      rating: 5,
      achievement: "Supporting Children's Education"
    },
    {
      name: "Vishal Mehta",
      role: "Sales Manager",
      content: "My presentation skills improved tremendously. The practical activities and stage performances removed my stage fear completely. Highly recommended for working professionals!",
      rating: 5,
      achievement: "Top Sales Performer"
    },
    {
      name: "Neha Trivedi",
      role: "Content Writer",
      content: "The reading and writing modules were exceptional. I learned to write with clarity and read at double speed. This opened up new career opportunities for me.",
      rating: 5,
      achievement: "Published Author"
    },
    {
      name: "Amit Patel",
      role: "Entrepreneur",
      content: "Being a Gujarati medium student, I always struggled with English. Today I conduct business meetings in English fluently. The teaching methodology is truly unique!",
      rating: 5,
      achievement: "Started Own Venture"
    },
    {
      name: "Riya Shah",
      role: "Bank Officer",
      content: "The course exceeded my expectations. Grammar became so easy with their visualization technique. The personal attention from founders made all the difference.",
      rating: 5,
      achievement: "Cleared Bank PO Interview"
    },
    {
      name: "Dhruv Desai",
      role: "IT Professional",
      content: "From basic English to confidently speaking in corporate meetings - this journey was amazing. The activities like role-plays and group discussions were really effective.",
      rating: 5,
      achievement: "Got US Assignment"
    },
    {
      name: "Kavita Pandya",
      role: "Teacher",
      content: "I wanted to improve my English to be a better teacher. The course not only improved my language but also taught me effective communication techniques.",
      rating: 5,
      achievement: "Became English HOD"
    },
    {
      name: "Harsh Rao",
      role: "Engineering Student",
      content: "The public speaking activities removed all my hesitation. Now I participate actively in college events and Model UN conferences. Thank you for the transformation!",
      rating: 5,
      achievement: "Won MUN Best Delegate"
    }
  ];

  const achievements = [
    "Students placed in top MNCs",
    "Alumni working in international companies",
    "Multiple students won debate competitions",
    "Several entrepreneurs expanded globally",
    "Students cleared IAS/UPSC interviews",
    "Alumni became successful teachers",
    "Many got promotions after course",
    "Students excelling in higher education"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Real transformations from our 10,000+ students trained since 1999
            </p>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-card shadow-soft">
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
            <h2 className="text-3xl font-bold mb-12 text-center">Student Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="space-y-2">
                  <TestimonialCard {...story} />
                  <Badge variant="secondary" className="w-full justify-center">
                    {story.achievement}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Notable Achievements</h2>
            <Card className="max-w-4xl mx-auto shadow-medium">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Video Testimonials</h2>
              <Card className="shadow-medium">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-muted-foreground mb-4">
                          Watch our students share their transformation journey
                        </p>
                        <a 
                          href="https://www.youtube.com/channel/UC224YnLHAQ7R03mwvEmpaJQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-semibold"
                        >
                          Visit Our YouTube Channel →
                        </a>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      See real students speaking fluently in group discussions, debates, and presentations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Be Our Next Success Story!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of successful students who transformed their lives with us. Your journey to fluent English and confident personality starts here!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:9725500435" className="text-2xl font-bold text-primary hover:underline">
                  Call: 9725500435
                </a>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <a 
                  href="https://www.google.com/search?q=turning+point+institute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all"
                >
                  <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="font-semibold">Google Reviews</p>
                </a>
                <a 
                  href="https://www.facebook.com/TurningPointInstitute/reviews/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all"
                >
                  <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="font-semibold">Facebook Reviews</p>
                </a>
                <a 
                  href="https://www.justdial.com/Ahmedabad/Turning-Point-Institute-Near-Seema-Hall-Beside-Manglya-Party-Plot-Satellite/079PF007391_BZDET"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all"
                >
                  <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="font-semibold">JustDial Reviews</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessStories;
