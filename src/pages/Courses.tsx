import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/lib/content";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <CoursesHero />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <CoursesGrid />
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Course Benefits</h2>
              <CourseBenefits />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What You'll Learn</h2>
              <div className="space-y-6">
                <LearningSections />
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

const useCoursesContent = () => {
  const { content } = useContent();
  return content.courses;
};

const CoursesHero = () => {
  const { hero } = useCoursesContent();
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
      <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{hero.subtitle}</p>
    </>
  );
};

const CoursesGrid = () => {
  const { courses } = useCoursesContent();
  return (
    <>
      {courses.map((course, index) => (
        <CourseCard key={index} {...course} />
      ))}
    </>
  );
};

const CourseBenefits = () => {
  const { benefits } = useCoursesContent();
  return (
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
  );
};

const LearningSections = () => {
  const { learningSections } = useCoursesContent();
  return (
    <>
      {learningSections.map((section, index) => (
        <div key={index} className="p-6 bg-card rounded-lg shadow-soft">
          <h3 className="text-xl font-bold mb-3">{section.title}</h3>
          <ul className="space-y-2 text-muted-foreground list-disc list-inside">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
