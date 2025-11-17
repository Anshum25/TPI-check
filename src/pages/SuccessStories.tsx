import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Star } from "lucide-react";
import { useContent } from "@/lib/content";

const SuccessStories = () => {
  const { content } = useContent();
  const { successStories } = content;
  const statIcons = [Trophy, Star, Target, TrendingUp];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{successStories.hero.title}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{successStories.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {successStories.stats.map((stat, index) => {
                const Icon = statIcons[index] ?? Trophy;
                return (
                  <div key={index} className="text-center p-6 rounded-lg bg-card shadow-soft">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Student Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.stories.map((story, index) => (
                <div key={index} className="space-y-2">
                  <TestimonialCard {...story} />
                  <Badge variant="secondary" className="w-full justify-center">
                    {story.achievement}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Notable Achievements</h2>
            <Card className="max-w-4xl mx-auto shadow-medium">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {successStories.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Video Testimonials</h2>
              <Card className="shadow-medium">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="aspect-video bg-secondary/30 rounded-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <p className="text-muted-foreground mb-4">{successStories.video.description}</p>
                        <a href={successStories.video.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">
                          {successStories.video.linkText}
                        </a>
                      </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">{successStories.video.note}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{successStories.cta.title}</h2>
              <p className="text-lg text-muted-foreground mb-8">{successStories.cta.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`tel:${successStories.cta.phoneNumber}`} className="text-2xl font-bold text-primary hover:underline">
                  {successStories.cta.phoneLabel}
                </a>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {successStories.cta.reviewLinks.map((link, index) => (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all">
                    <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold">{link.label}</p>
                  </a>
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

export default SuccessStories;
