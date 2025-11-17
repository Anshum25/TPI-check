import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContent } from "@/lib/content";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { content } = useContent();
  const { gallery } = content;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{gallery.hero.title}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{gallery.hero.subtitle}</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="classroom">Classroom</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
              </TabsList>

              {Object.entries(gallery.categories).map(([category, categoryImages]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryImages.map((image, index) => (
                      <Card
                        key={`${category}-${index}`}
                        className="overflow-hidden cursor-pointer shadow-soft hover:shadow-medium transition-all duration-300"
                        onClick={() => setSelectedImage(image.src)}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                            <p className="text-white font-semibold p-4">{image.title}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh]">
              <button
                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors text-4xl"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img src={selectedImage} alt="Full size" className="max-w-full max-h-[90vh] object-contain" />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
