import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar, MapPin, Phone, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "@/lib/content";

const iconMap = {
  clock: Clock,
  calendar: Calendar,
  map: MapPin,
  award: Award,
  users: Users,
} as const;

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

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Course Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <CourseDetailsGrid />
            </div>
          </div>
        </section>

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
  const { hero, contactCtas } = useAdmissionsContent();
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
      <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-8">{hero.subtitle}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href={`tel:${contactCtas.phoneNumber}`}>
          <Button size="lg" variant="secondary">
            <Phone className="mr-2 h-5 w-5" />
            {contactCtas.phoneLabel}
          </Button>
        </a>
        <Link to={contactCtas.secondaryLink}>
          <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
            {contactCtas.secondaryText}
          </Button>
        </Link>
      </div>
    </>
  );
};

const StepsGrid = () => {
  const { steps } = useAdmissionsContent();
  return (
    <>
      {steps.map((item, index) => (
        <Card key={index} className="shadow-soft text-center">
          <CardContent className="pt-6">
            <div className="h-16 w-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
              {item.step}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

const CourseDetailsGrid = () => {
  const { courseDetails } = useAdmissionsContent();
  return (
    <>
      {courseDetails.map((detail, index) => {
        const Icon = iconMap[detail.icon];
        return (
          <Card key={index} className="shadow-soft">
            <CardContent className="pt-6 flex items-start space-x-4">
              <Icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">{detail.label}</h3>
                <p className="text-muted-foreground text-sm">{detail.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

const TargetGroups = () => {
  const { targetGroups } = useAdmissionsContent();
  const icons = [Users, Award, Users];
  return (
    <>
      {targetGroups.map((group, index) => {
        const Icon = icons[index] ?? Users;
        return (
          <Card key={index} className="shadow-medium">
            <CardHeader>
              <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-accent-foreground mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {group.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
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
    <div className="gradient-hero rounded-2xl p-12 text-center shadow-medium max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{cta.title}</h2>
      <p className="text-lg text-primary-foreground/90 mb-6">{cta.subtitle}</p>
      <p className="text-xl font-bold text-primary-foreground mb-8">{cta.tagline}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href={`tel:${cta.phoneNumber}`}>
          <Button size="lg" variant="secondary">
            <Phone className="mr-2 h-5 w-5" />
            {cta.phoneLabel}
          </Button>
        </a>
        <a href={cta.directionsUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
            <MapPin className="mr-2 h-5 w-5" />
            {cta.directionsLabel}
          </Button>
        </a>
      </div>
    </div>
  );
};
