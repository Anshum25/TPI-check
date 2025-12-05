import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHighlightSection from "@/components/AboutHighlightSection";
import AboutServingCommunity from "@/components/AboutServingCommunity";
import Amenities from "@/components/Amenities";
import { useContent } from "@/lib/content";

const About = () => {
  const { content } = useContent();
  const { about } = content;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{about.hero.title}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{about.hero.subtitle}</p>
          </div>
        </section>

        <AboutHighlightSection />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                {about.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Amenities />

        <AboutServingCommunity />

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.coreValues.map((value, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-soft">
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why We're Different</h2>
              <div className="space-y-4 text-left">
                {about.differentiators.map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 border-l-4 bg-secondary/30 rounded ${
                      index % 2 === 0 ? "border-primary" : "border-accent"
                    }`}
                  >
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
