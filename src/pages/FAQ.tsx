import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "Course Details",
      questions: [
        {
          q: "What is the duration of the Spoken English course?",
          a: "Our main Spoken English course is 2 months long, with sessions Monday to Friday for 90 minutes each. We also conduct seminars on Personality Development and General Knowledge twice a month."
        },
        {
          q: "What are the class timings?",
          a: "We offer flexible batch timings to accommodate working professionals, students, and homemakers. Morning, afternoon, and evening batches are available. Contact us for current batch schedules."
        },
        {
          q: "Do you provide certificates?",
          a: "Yes, we provide certificates upon successful completion of the course. Our certificates are recognized and valued by employers."
        },
        {
          q: "What is the batch size?",
          a: "We maintain small batch sizes to ensure personalized attention to each student. This allows for maximum interaction and individual feedback."
        }
      ]
    },
    {
      category: "Eligibility & Admission",
      questions: [
        {
          q: "Who can join these courses?",
          a: "Our courses are designed for everyone - working professionals, students, homemakers, business owners, and anyone who wants to improve their English communication and personality. We have separate programs tailored for different groups."
        },
        {
          q: "Do I need any prior knowledge of English?",
          a: "No prior knowledge required! We start from basics and take you to advanced levels. Our founders understand the challenges faced by Gujarati/Hindi medium students as they have experienced it themselves."
        },
        {
          q: "What is the admission process?",
          a: "Simply contact us via phone or visit our institute. We'll discuss your goals, explain the course structure, and help you choose the right batch timing. You can start with the next available batch."
        },
        {
          q: "Do you have any branches?",
          a: "No, we deliberately have NO FRANCHISES and NO BRANCHES. All teaching is done personally by the founders at our single location to maintain the highest quality standards."
        }
      ]
    },
    {
      category: "Teaching Methodology",
      questions: [
        {
          q: "How is your teaching method different?",
          a: "Our method is highly interactive and practical. During grammar sessions, you'll speak thousands of sentences with questions asked in Hindi/Gujarati. We use logic and visualization to connect all structures, making you realize that every sentence follows just 4-5 basic rules!"
        },
        {
          q: "What kind of activities do you conduct?",
          a: "We conduct Public Speaking, Role-Plays, Group Discussions, Debates, Presentations, and small Dramas. All activities are spontaneous and highly interactive, designed to build your confidence and fluency gradually."
        },
        {
          q: "Will I get personal attention?",
          a: "Absolutely! You'll study directly with the founders - Mr. Ashish Bhatt and Mrs. Pragna Bhatt. We continuously monitor each student's performance and provide personal support to ensure everyone achieves their goals."
        },
        {
          q: "What if I miss a class?",
          a: "Don't worry! Our team will help you cover what you missed. We ensure no student is left behind as long as they maintain regular attendance and complete homework."
        }
      ]
    },
    {
      category: "For Different Groups",
      questions: [
        {
          q: "How will this course help working professionals?",
          a: "You'll gain correct written communication skills, excellent presentation abilities, confidence to speak fluently, and ability to read with double speed. This directly translates to better performance in emails, meetings, presentations, and career growth."
        },
        {
          q: "What benefits do students get?",
          a: "Students develop clarity to speak English everywhere, make higher education interesting with effective reading and writing skills, and transform into confident, outspoken individuals through numerous speaking activities."
        },
        {
          q: "How does it help homemakers?",
          a: "Homemakers gain the ability to be the best teacher for their children, communicate effectively with teachers, become fluent and confident in social circles, and support children studying in English medium schools."
        }
      ]
    },
    {
      category: "Results & Support",
      questions: [
        {
          q: "What results can I expect?",
          a: "You'll achieve: 1) Clarity from basic to most advanced sentence structures, 2) Fluency with complete grammar understanding, 3) Confidence through stage activities and public speaking, 4) Perfection by mastering all language aspects."
        },
        {
          q: "How much homework is required?",
          a: "Daily homework takes around 30 minutes. Regular homework completion is the only condition for our continuous support. It's essential for reinforcing what you learn in class."
        },
        {
          q: "Do you provide support after course completion?",
          a: "Yes! Once you join us, you become part of the Turning Point Family. We provide lifetime alumni support and you can always reach out to us."
        },
        {
          q: "What is your success rate?",
          a: "We have trained 10,000+ students since 1999 with a very high success rate. Our students consistently praise the transformation in their communication skills and confidence. Check our reviews on Google, Facebook, and JustDial!"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Find answers to common questions about our courses and methodology
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl  mx-auto space-y-8">
              {faqs.map((category, index) => (
                <Card key={index} className="shadow-soft">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, qIndex) => (
                        <AccordionItem
                          key={qIndex}
                          value={`item-${index}-${qIndex}`}
                       
                        >
                          <AccordionTrigger className="text-left hover:no-underline hover:text-primary data-[state=open]:text-primary transition-colors py-5">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed md:leading-7 text-[15px] md:text-base transition-all duration-100">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto shadow-medium">
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our friendly team is here to help!
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2 text-lg">
                    <Phone className="h-5 w-5 text-accent" />
                    <a href="tel:9725500435" className="font-bold text-primary hover:underline">
                      9725500435
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Call us during business hours for immediate assistance
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
