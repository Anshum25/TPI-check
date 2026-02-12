import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { contentAPI } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

const FAQ = () => {
  const [faq, setFaq] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchFaq = async () => {
      try {
        const data = await contentAPI.get("faq");
        if (mounted) setFaq(data);
      } catch {
        if (mounted) setFaq(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFaq();

    const onFocus = () => {
      setLoading(true);
      fetchFaq();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      mounted = false;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, []);

  const heroTitle = faq?.hero?.title || "Frequently Asked Questions";
  const heroSubtitle = faq?.hero?.subtitle || "Find answers to common questions about our courses and methodology";
  const categories = Array.isArray(faq?.categories) ? faq.categories : [];
  const supportTitle = faq?.support?.title || "Still Have Questions?";
  const supportDescription = faq?.support?.description || "Can't find the answer you're looking for? Our friendly team is here to help!";
  const supportPhone = faq?.support?.phoneNumber || "9725500435";
  const supportNote = faq?.support?.note || "Call us during business hours for immediate assistance";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              {heroSubtitle}
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl  mx-auto space-y-8">
              {loading ? (
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold text-muted-foreground">Loading...</h2>
                  </CardContent>
                </Card>
              ) : (
                categories.map((category: any, index: number) => (
                  <Card key={index} className="shadow-soft">
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-bold mb-4 text-primary">{category?.category || category?.name || ""}</h2>
                      <Accordion type="single" collapsible className="w-full">
                        {(category?.questions || []).map((faqItem: any, qIndex: number) => (
                          <AccordionItem
                            key={qIndex}
                            value={`item-${index}-${qIndex}`}

                          >
                            <AccordionTrigger className="text-left hover:no-underline hover:text-primary data-[state=open]:text-primary transition-colors py-5">
                              {faqItem?.q || faqItem?.question || ""}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed md:leading-7 text-[15px] md:text-base transition-all duration-100">
                              {faqItem?.a || faqItem?.answer || ""}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto shadow-medium">
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">{supportTitle}</h2>
                <p className="text-muted-foreground mb-6">{supportDescription}</p>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-2 text-lg">
                    <Phone className="h-5 w-5 text-accent" />
                    <a href={`tel:${supportPhone}`} className="font-bold text-primary hover:underline">
                      {supportPhone}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {supportNote}
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
