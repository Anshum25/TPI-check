import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar, MapPin, Phone, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Admissions = () => {
  const admissionSteps = [
    {
      step: "1",
      title: "Contact Us",
      description: "Call us at 9725500435 or visit our institute to learn about available batches and course details"
    },
    {
      step: "2",
      title: "Counseling",
      description: "Discuss your goals with our founders. We'll help you understand the course structure and choose the right program"
    },
    {
      step: "3",
      title: "Select Batch",
      description: "Choose a batch timing that suits your schedule - morning, afternoon, or evening options available"
    },
    {
      step: "4",
      title: "Enrollment",
      description: "Complete the simple enrollment process and start your journey with the next available batch"
    }
  ];

  const courseDetails = {
    duration: "2 Months",
    schedule: "Monday to Friday",
    sessionLength: "90 minutes per session",
    seminars: "Personality Development & GK seminars twice a month",
    batchSize: "Small batches for personalized attention",
    location: "Satellite, Ahmedabad"
  };

  const forWhom = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Working Professionals",
      benefits: [
        "Improve presentation and communication skills",
        "Enhance written business communication",
        "Boost career growth opportunities",
        "Read faster and understand better"
      ]
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Students",
      benefits: [
        "Build strong foundation in English",
        "Excel in higher education",
        "Develop confident personality",
        "Improve academic performance"
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Homemakers",
      benefits: [
        "Support children's English education",
        "Communicate confidently in social circles",
        "Become fluent like native speakers",
        "Be the best teacher for your child"
      ]
    }
  ];

  const whyChoose = [
    "Coaching by Founders - 25+ years experience",
    "No Franchises, No Branches - Quality maintained",
    "10,000+ students trained since 1999",
    "Highly interactive and practical method",
    "Personal support to every student",
    "Small batch sizes",
    "Flexible timing options",
    "Lifetime alumni support"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admissions Open</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-8">
              Join us and bring a Turning Point in your life
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:9725500435">
                <Button size="lg" variant="secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  Call: 9725500435
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Request Callback
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Admission Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {admissionSteps.map((item, index) => (
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
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Course Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Duration</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.duration}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Schedule</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.schedule}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Session Length</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.sessionLength}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Seminars</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.seminars}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <Users className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Batch Size</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.batchSize}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Location</h3>
                    <p className="text-muted-foreground text-sm">{courseDetails.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Who Should Join?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {forWhom.map((item, index) => (
                <Card key={index} className="shadow-medium">
                  <CardHeader>
                    <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-accent-foreground mb-4">
                      {item.icon}
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
            <Card className="max-w-4xl mx-auto shadow-medium">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {whyChoose.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="gradient-hero rounded-2xl p-12 text-center shadow-medium max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-6">
                From basic to the advance level - Be fluent and confident in English!
              </p>
              <p className="text-xl font-bold text-primary-foreground mb-8">
                Your Performance is Our Responsibility!!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:9725500435">
                  <Button size="lg" variant="secondary">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now: 9725500435
                  </Button>
                </a>
                <a 
                  href="https://www.google.com/maps/place/Turning+Point+Institute/@23.0131818,72.518835,17z/data=!3m1!4b1!4m6!3m5!1s0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e!8m2!3d23.0131818!4d72.5210237!16s%2Fg%2F1v42d5nt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                    <MapPin className="mr-2 h-5 w-5" />
                    Get Directions
                  </Button>
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

export default Admissions;
