import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Users, Briefcase } from "lucide-react";

const Faculty = () => {
  const { content } = useContent();
  const faculty = content.faculty;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{faculty.hero.title}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{faculty.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {faculty.members.map((member, index) => (
                <Card key={index} className="shadow-medium overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-[200px,1fr] gap-8">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="h-40 w-40 rounded-full gradient-hero flex items-center justify-center text-primary-foreground mb-4">
                          <span className="text-5xl font-bold">{member.imageInitials}</span>
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
              {faculty.methodology.map((method, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-soft">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                    {index === 0 ? <BookOpen className="h-6 w-6" /> : index === 1 ? <Users className="h-6 w-6" /> : index === 2 ? <Award className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
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
              <h2 className="text-2xl font-bold mb-4">{faculty.promise.title}</h2>
              {faculty.promise.paragraphs.map((p, i) => (
                <p key={i} className={`text-muted-foreground ${i === 0 ? 'mb-4' : ''}`}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Faculty;
