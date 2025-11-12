import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { MessageSquare, Sparkles, Briefcase, Mic, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Courses = () => {
  const courses = [
    {
      title: "Spoken English - Basic",
      description: "Build a strong foundation in English grammar, vocabulary, and basic conversation skills",
      duration: "2 Months",
      students: "2000+ Students",
      level: "Beginner",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Spoken English - Advanced",
      description: "Master fluent communication, advanced grammar, and professional English skills",
      duration: "3 Months",
      students: "3000+ Students",
      level: "Intermediate to Advanced",
      icon: <MessageSquare className="h-6 w-6" />,
    },
    {
      title: "Personality Development",
      description: "Build confidence, leadership skills, body language, and professional etiquette",
      duration: "2 Months",
      students: "3000+ Students",
      level: "All Levels",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: "Business Communication",
      description: "Learn professional email writing, presentations, and corporate communication skills",
      duration: "1.5 Months",
      students: "1500+ Students",
      level: "Intermediate",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Interview Preparation",
      description: "Ace your job interviews with expert guidance on common questions and techniques",
      duration: "1 Month",
      students: "2000+ Students",
      level: "All Levels",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Public Speaking",
      description: "Overcome stage fear and become a confident public speaker with practical training",
      duration: "1.5 Months",
      students: "1000+ Students",
      level: "All Levels",
      icon: <Mic className="h-6 w-6" />,
    },
  ];

  const benefits = [
    "Small batch sizes for personalized attention",
    "Interactive group discussions and activities",
    "Real-world practice scenarios",
    "Experienced instructors with proven methods",
    "Flexible timing options",
    "Certificate upon completion",
    "Lifetime alumni support",
    "Regular progress assessments",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Comprehensive programs designed to transform your communication and personality
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Course Benefits</h2>
              <Card className="shadow-medium">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What You'll Learn</h2>
              <div className="space-y-6">
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <h3 className="text-xl font-bold mb-3">Spoken English Programs</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Grammar fundamentals and advanced concepts</li>
                    <li>Vocabulary building and contextual usage</li>
                    <li>Pronunciation and accent training</li>
                    <li>Conversation skills for various situations</li>
                    <li>Writing skills - emails, letters, essays</li>
                  </ul>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <h3 className="text-xl font-bold mb-3">Personality Development</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Confidence building techniques</li>
                    <li>Body language and non-verbal communication</li>
                    <li>Leadership and team management skills</li>
                    <li>Time management and goal setting</li>
                    <li>Professional etiquette and grooming</li>
                  </ul>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <h3 className="text-xl font-bold mb-3">Business Communication</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Professional email writing</li>
                    <li>Business presentation skills</li>
                    <li>Meeting etiquette and participation</li>
                    <li>Negotiation and persuasion techniques</li>
                    <li>Corporate communication protocols</li>
                  </ul>
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

export default Courses;
