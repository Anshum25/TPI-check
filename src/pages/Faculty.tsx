import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Users, Briefcase } from "lucide-react";

const Faculty = () => {
  const faculty = [
    {
      name: "Ashish Bhatt",
      role: "Founder & Core Faculty",
      image: "AB",
      education: "MBA from reputed business school, Gujarati Medium School graduate",
      experience: "25+ years",
      specialization: ["Spoken English", "Grammar Training", "Public Speaking"],
      description: "Ashish Bhatt is the founder and core faculty of Turning Point Institute. His energetic and jolly method of teaching English helps students grasp even the most complicated concepts very easily. Having studied in Gujarati Medium School and then pursuing MBA from a reputed business school, he deeply understands students' difficulties. His corporate experience with MNCs gives him insights into the skills required for professional environments.",
      achievements: [
        "Trained 10,000+ students since 1999",
        "Expert in converting Gujarati/Hindi thoughts to English",
        "Developed unique visualization techniques for grammar",
        "Personal coaching by founder - No franchises/No branches"
      ]
    },
    {
      name: "Pragna Bhatt",
      role: "Co-Founder & Core Faculty",
      image: "PB",
      education: "M.Sc. with University Rank",
      experience: "25+ years",
      specialization: ["Personality Development", "Speaking Activities", "Group Discussions"],
      description: "Pragna Bhatt is the soul of Turning Point Institute. She has nurtured the institute with great care and ensures every student gets full support to achieve their goals. She has complemented the teaching of Mr. Ashish Bhatt by designing variety of speaking activities and competitions to bring out positive energy from students.",
      achievements: [
        "Won prizes in Elocution and Debate at University and State level",
        "Expert in conducting Public Speaking, Debates, Group Discussions",
        "Designed innovative speaking activities and competitions",
        "Specialized in Extempore Speech, Presentations, and Drama activities"
      ]
    },
    {
      name: "Aditya Bhatt",
      role: "Faculty & Founder of Turning Point Community",
      image: "AD",
      education: "National-level Debater",
      experience: "10+ years",
      specialization: ["Public Speaking", "Personality Development", "Model United Nations"],
      description: "Apart from being the Founder of Turning Point Community, Aditya is a national-level debater with extensive experience in public speaking. He has chaired over 100 Model United Nations conferences and judged numerous debates at premier colleges across India.",
      achievements: [
        "Chaired 100+ Model United Nations conferences",
        "Mentored students from IIT Gandhinagar, IIM Shillong, Nirma University",
        "Connected thousands of students fostering debate culture in Gujarat",
        "Expert in simulation debates and political discourse"
      ]
    }
  ];

  const teachingMethod = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Interactive Grammar Sessions",
      description: "Speak thousands of sentences during grammar sessions with questions asked in Hindi/Gujarati, building your foundation step by step"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Practical Speaking Activities",
      description: "Public Speaking, Role-Plays, Group Discussions, Debates, Presentations, and small Dramas - all spontaneous and highly interactive"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Personal Support",
      description: "Continuous monitoring of performance with personal support to weak students. Missed a lecture? We'll help you cover up"
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Professional Skills",
      description: "Reading and writing modules for professional growth, learning to read at double speed with perfect understanding"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Faculty</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Learn from the founders with 25+ years of experience - No Franchises, No Branches
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {faculty.map((member, index) => (
                <Card key={index} className="shadow-medium overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-[200px,1fr] gap-8">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="h-40 w-40 rounded-full gradient-hero flex items-center justify-center text-primary-foreground mb-4">
                          <span className="text-5xl font-bold">{member.image}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {member.specialization.map((spec, idx) => (
                            <Badge key={idx} variant="secondary">{spec}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-3xl font-bold mb-1">{member.name}</h2>
                          <p className="text-lg text-muted-foreground mb-2">{member.role}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-accent" />
                              <span>{member.experience} Experience</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-4 w-4 text-accent" />
                              <span>{member.education}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {member.description}
                        </p>

                        <div>
                          <h3 className="font-bold mb-3">Key Achievements:</h3>
                          <ul className="space-y-2">
                            {member.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-accent mt-1">•</span>
                                <span className="text-muted-foreground">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Teaching Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {teachingMethod.map((method, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-soft">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                  <p className="text-muted-foreground">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-primary/5 border-l-4 border-primary p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Your Performance is Our Responsibility!</h2>
              <p className="text-muted-foreground mb-4">
                When you join our institute, you become part of the Turning Point Family. We continuously monitor the performance of all students through various parameters and provide personal support to ensure everyone achieves their goals.
              </p>
              <p className="text-muted-foreground">
                The only condition for our support is regular attendance and completing daily homework of around 30 minutes. We're here to help you succeed!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Faculty;
