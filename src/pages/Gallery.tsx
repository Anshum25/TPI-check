import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContent } from "@/lib/content";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { content } = useContent();
  const { gallery } = content;

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = params.get("tab") === "videos" ? "videos" : "images";

  const videos = (gallery.videos && gallery.videos.length > 0
    ? gallery.videos
    : [
        {
          title: "Speaking activities done in the later part of the course",
          url: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Turning Point Institute student presentation",
          url: "https://www.youtube.com/embed/0oCurzqfzXQ",
        },
        {
          title: "Group discussion and public speaking practice",
          url: "https://www.youtube.com/embed/3YB4pYCOZkQ",
        },
      ]);

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
            <Tabs defaultValue={initialTab} className="w-full">
              <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>

              {/* Images Tab */}
              <TabsContent value="images">
                {gallery.categories?.all && gallery.categories.all.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.categories.all.map((image, index) => (
                      <Card
                        key={`image-${index}`}
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
                ) : (
                  <p className="text-center text-muted-foreground">No images found.</p>
                )}
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos">
                {videos && videos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                      <Card
                        key={`video-${index}`}
                        className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
                      >
                        <div className="aspect-video w-full bg-muted">
                          <iframe
                            src={video.url}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>
                        {video.title && (
                          <div className="p-4">
                            <p className="text-sm font-semibold text-foreground line-clamp-2">{video.title}</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No videos found.</p>
                )}
              </TabsContent>
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
