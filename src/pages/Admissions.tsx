import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useContent } from "@/lib/content";
import CourseDetails from "@/components/CourseDetails";

const Admissions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <HeroSection />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Admission Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <StepsGrid />
            </div>
          </div>
        </section>

        <CourseDetails />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Who Should Join?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <TargetGroups />
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
            <Card className="max-w-4xl mx-auto shadow-medium">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WhyChooseList />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <FinalCta />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admissions;

const useAdmissionsContent = () => {
  const { content } = useContent();
  return content.admissions;
};

const HeroSection = () => {
  const { hero } = useAdmissionsContent();
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
      <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{hero.subtitle}</p>
    </>
  );
};

const StepsGrid = () => {
  const { steps } = useAdmissionsContent();
  return (
    <>
      {steps.map((step, index) => (
        <div key={index} className="text-center p-6 rounded-lg bg-secondary/30">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4 text-2xl font-bold">
            {step.step}
          </div>
          <h3 className="text-lg font-bold mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </>
  );
};

// CourseDetailsGrid replaced by shared <CourseDetails /> component used on Home page.

const TargetGroups = () => {
  const { targetGroups } = useAdmissionsContent();
  return (
    <>
      {targetGroups.map((group, index) => (
        <Card key={index} className="shadow-soft">
          <CardHeader>
            <CardTitle>{group.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              {group.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

const WhyChooseList = () => {
  const { whyChoose } = useAdmissionsContent();
  return (
    <>
      {whyChoose.map((reason, index) => (
        <div key={index} className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <span className="text-muted-foreground">{reason}</span>
        </div>
      ))}
    </>
  );
};

const FinalCta = () => {
  const { cta } = useAdmissionsContent();
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
      <p className="text-lg text-muted-foreground mb-6">{cta.subtitle}</p>
      <p className="text-sm text-muted-foreground mb-6">{cta.tagline}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href={`tel:${cta.phoneNumber}`}>
          <Button size="lg" className="gradient-accent">{cta.phoneLabel}</Button>
        </a>
        <a href={cta.directionsUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline">{cta.directionsLabel}</Button>
        </a>
      </div>
    </div>
  );
};
