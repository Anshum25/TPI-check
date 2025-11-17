import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useContent, DEFAULT_CONTENT } from "@/lib/content";
import type { SiteContent } from "@/lib/content";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TestimonialCard from "@/components/TestimonialCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Plus,
  Trash2,
  RefreshCw,
  Upload,
  Download,
  Home as HomeIcon,
  PanelsTopLeft,
  LayoutTemplate,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Star,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Phone,
  Users,
  Target,
  Award,
  OctagonAlert,
  PenLine,
  ExternalLink,
  X,
} from "lucide-react";

type AdminSection = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  type: "home" | "header" | "footer" | "static";
  route: string;
  summary?: string[];
  filePath?: string;
};

const adminSections: AdminSection[] = [
  {
    id: "home",
    label: "Home",
    description: "Hero, features, testimonials, and CTA content.",
    icon: HomeIcon,
    type: "home",
    route: "/",
    filePath: "src/pages/Home.tsx",
  },
  {
    id: "header",
    label: "Header & Navigation",
    description: "Site title plus primary navigation links.",
    icon: PanelsTopLeft,
    type: "header",
    route: "/",
  },
  {
    id: "footer",
    label: "Footer & JSON",
    description: "Footer text along with import/export utilities.",
    icon: LayoutTemplate,
    type: "footer",
    route: "/",
  },
  {
    id: "about",
    label: "About Us",
    description: "Story, stats, core values, and differentiators.",
    icon: BookOpen,
    type: "static",
    route: "/about",
    filePath: "src/pages/About.tsx",
    summary: [
      "Gradient hero introduces the institute mission with supporting subtitle.",
      "Stats grid highlights students trained, years of experience, success rate, and rating.",
      "Narrative story, core values cards, and 'Why we're different' highlights reinforce trust.",
    ],
  },
  {
    id: "courses",
    label: "Courses",
    description: "Program catalog and learning outcomes.",
    icon: GraduationCap,
    type: "static",
    route: "/courses",
    filePath: "src/pages/Courses.tsx",
    summary: [
      "Hero outlines the promise behind each program.",
      "Course cards showcase six flagship offerings with duration, level, and student counts.",
      "Benefits grid plus topic breakdown for Spoken English, Personality Development, and Business Communication.",
    ],
  },
  {
    id: "admissions",
    label: "Admissions",
    description: "Process overview and lead capture CTAs.",
    icon: ClipboardCheck,
    type: "static",
    route: "/admissions",
    filePath: "src/pages/Admissions.tsx",
    summary: [
      "Hero includes tap-to-call and request-callback actions.",
      "Four-step admission journey and detailed cards for duration, schedule, seminars, and location.",
      "Audience-specific benefits, reasons to choose us, and final CTA banner with phone + map links.",
    ],
  },
  {
    id: "success",
    label: "Success Stories",
    description: "Long-form testimonials, stats, and achievements.",
    icon: Star,
    type: "static",
    route: "/success-stories",
    filePath: "src/pages/SuccessStories.tsx",
    summary: [
      "Hero plus stats grid reinforcing results (students, rating, success rate, years).",
      "Large testimonial grid with achievement badges sourced from `TestimonialCard`.",
      "Achievements list, video testimonial prompt, and link to YouTube channel.",
    ],
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Image tabs with lightbox experience.",
    icon: ImageIcon,
    type: "static",
    route: "/gallery",
    filePath: "src/pages/Gallery.tsx",
    summary: [
      "Tabs allow filtering by All, Classroom, Events, and Students.",
      "Responsive cards show hover overlays with titles.",
      "Full-screen modal/lightbox displays the selected image.",
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    description: "Ratings showcase and testimonial wall.",
    icon: MessageSquare,
    type: "static",
    route: "/reviews",
    filePath: "src/pages/Reviews.tsx",
    summary: [
      "Hero communicates average rating and number of reviews.",
      "Grid of testimonial cards with role, quote, and rating.",
      "Email CTA invites alumni to send long-form feedback.",
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    description: "Accordion-based answers to common questions.",
    icon: HelpCircle,
    type: "static",
    route: "/faq",
    filePath: "src/pages/FAQ.tsx",
    summary: [
      "Hero clarifies purpose of the FAQ resource.",
      "Each category renders an accordion list powered by shadcn/ui components.",
      "Support card reiterates helpline number for unresolved questions.",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    description: "Enquiry form, contact cards, and map.",
    icon: Phone,
    type: "static",
    route: "/contact",
    filePath: "src/pages/Contact.tsx",
    summary: [
      "Two-column layout with enquiry form (inputs, select, textarea) and toast feedback.",
      "Card stack lists address, phone, email, and office hours.",
      "Map placeholder section ready for embed.",
    ],
  },
  {
    id: "faculty",
    label: "Faculty",
    description: "Founder bios and teaching methodology.",
    icon: Users,
    type: "static",
    route: "/faculty",
    filePath: "src/pages/Faculty.tsx",
    summary: [
      "Hero spotlights founder-led approach (no franchises, no branches).",
      "Detailed cards for Ashish, Pragna, and Aditya with badges and achievements.",
      "Teaching methodology grid plus promise block describing support expectations.",
    ],
  },
  {
    id: "not-found",
    label: "404 Page",
    description: "Fallback screen for unknown routes.",
    icon: OctagonAlert,
    type: "static",
    route: "/404",
    filePath: "src/pages/NotFound.tsx",
    summary: [
      "Minimal centered layout with 404 headline and return-to-home link.",
      "Logs the broken path in the console for debugging.",
    ],
  },
];

// Image mapping for default images (for preview in admin)
const imageMap: Record<string, string> = {
  "/src/assets/hero-classroom.jpg": heroClassroom,
  "/src/assets/speaking-confidence.jpg": speakingConfidence,
  "/src/assets/student-success.jpg": studentSuccess,
};

const Admin = () => {
  const { content, setContent, resetContent, exportJSON, importJSON } = useContent();
  const [jsonValue, setJsonValue] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<AdminSection["id"]>("home");
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const heroCarouselRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const courseDetailIconOptions = ["clock", "calendar", "map", "award", "users"] as const;

  const selectedSection = adminSections.find((section) => section.id === activeSection) ?? adminSections[0];

  // Scroll preview to active subsection
  useEffect(() => {
    if (!activeSubSection || !previewRef.current) return;
    
    const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
      'hero-carousel': heroCarouselRef,
      'hero-video': heroVideoRef,
      'features': featuresRef,
      'testimonials': testimonialsRef,
      'cta': ctaRef,
    };

    const targetRef = sectionMap[activeSubSection];
    if (targetRef?.current && previewRef.current) {
      const previewContainer = previewRef.current;
      const targetElement = targetRef.current;
      
      // Scroll to the section with smooth behavior
      setTimeout(() => {
        // Find the offset relative to the preview container
        let offsetTop = 0;
        let element: HTMLElement | null = targetElement;
        while (element && element !== previewContainer) {
          offsetTop += element.offsetTop;
          element = element.offsetParent as HTMLElement | null;
        }
        
        previewContainer.scrollTo({
          top: offsetTop - 20, // Add some padding from top
          behavior: 'smooth',
        });
      }, 150);
    }
  }, [activeSubSection]);

  const handleFeatureChange = (index: number, field: "title" | "description", value: string) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        features: prev.home.features.map((feature, i) => (i === index ? { ...feature, [field]: value } : feature)),
      },
    }));
  };

  const addFeature = () => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        features: [...prev.home.features, { title: "", description: "" }],
      },
    }));
  };

  const removeFeature = (index: number) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        features: prev.home.features.filter((_, i) => i !== index),
      },
    }));
  };

  const handleTestimonialChange = (index: number, field: "name" | "role" | "content" | "rating", value: string) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        testimonials: prev.home.testimonials.map((testimonial, i) =>
          i === index
            ? {
              ...testimonial,
              [field]: field === "rating" ? Number(value) || undefined : value,
            }
            : testimonial,
        ),
      },
    }));
  };

  const addTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        testimonials: [...prev.home.testimonials, { name: "", role: "", content: "", rating: 5 }],
      },
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        testimonials: prev.home.testimonials.filter((_, i) => i !== index),
      },
    }));
  };

  const handleNavChange = (index: number, field: "label" | "to", value: string) => {
    setContent((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        nav: prev.header.nav.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
      },
    }));
  };

  const addNavItem = () => {
    setContent((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        nav: [...prev.header.nav, { label: "New Link", to: "/" }],
      },
    }));
  };

  const removeNavItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        nav: prev.header.nav.filter((_, i) => i !== index),
      },
    }));
  };

  const handleExport = () => {
    setJsonValue(exportJSON());
    setImportError(null);
  };

  const handleImport = () => {
    try {
      importJSON(jsonValue);
      setImportError(null);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON";
      setImportError(message);
    }
  };

  const handleEditAction = () => {
    if (!selectedSection) return;

    if (selectedSection.type === "static") {
      if (typeof window !== "undefined") {
        window.open(selectedSection.route, "_blank", "noopener,noreferrer");
      }
      return;
    }
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const renderStaticOverview = (section: AdminSection) => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{section.label} Page Overview</CardTitle>
        <CardDescription>{section.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.summary?.length ? (
          <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            {section.summary.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No structured summary available yet.</p>
        )}
        {section.filePath && (
          <p className="text-xs text-muted-foreground">
            Source file: <code>{section.filePath}</code>
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          asChild
        >
          <a href={section.route} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Open live page
          </a>
        </Button>
      </CardFooter>
    </Card>
  );

  const renderHomeEditor = () => (
    <>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('hero-carousel')}
        onFocus={() => setActiveSubSection('hero-carousel')}
      >
        <CardHeader>
          <CardTitle>Hero Carousel</CardTitle>
          <CardDescription>Slides displayed in the hero carousel at the top of the home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.home.heroCarousel.slides.map((slide, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Slide {index + 1}</Label>
                  <Button type="button" size="icon" variant="ghost" onClick={() => {
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        heroCarousel: {
                          ...prev.home.heroCarousel,
                          slides: prev.home.heroCarousel.slides.filter((_, i) => i !== index),
                        },
                      },
                    }));
                  }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  {slide.imageUrl && (
                    <div className="relative mb-2">
                      <img
                        src={slide.imageUrl.startsWith('data:') || slide.imageUrl.startsWith('http') ? slide.imageUrl : imageMap[slide.imageUrl] || slide.imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-md border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {slide.imageUrl.startsWith('data:') && (
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => {
                            setContent((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                heroCarousel: {
                                  ...prev.home.heroCarousel,
                                  slides: prev.home.heroCarousel.slides.map((s, i) =>
                                    i === index ? { ...s, imageUrl: "" } : s,
                                  ),
                                },
                              },
                            }));
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`carousel-image-upload-${index}`}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            setContent((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                heroCarousel: {
                                  ...prev.home.heroCarousel,
                                  slides: prev.home.heroCarousel.slides.map((s, i) =>
                                    i === index ? { ...s, imageUrl: base64String } : s,
                                  ),
                                },
                              },
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                        // Reset input
                        e.target.value = '';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => {
                        document.getElementById(`carousel-image-upload-${index}`)?.click();
                      }}
                    >
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Or enter image URL:
                  </div>
                  <Input
                    value={slide.imageUrl.startsWith('data:') ? '' : slide.imageUrl}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          heroCarousel: {
                            ...prev.home.heroCarousel,
                            slides: prev.home.heroCarousel.slides.map((s, i) =>
                              i === index ? { ...s, imageUrl: e.target.value } : s,
                            ),
                          },
                        },
                      }));
                    }}
                    placeholder="/src/assets/image.jpg or https://..."
                    disabled={slide.imageUrl.startsWith('data:')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          heroCarousel: {
                            ...prev.home.heroCarousel,
                            slides: prev.home.heroCarousel.slides.map((s, i) =>
                              i === index ? { ...s, title: e.target.value } : s,
                            ),
                          },
                        },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={slide.subtitle}
                    onChange={(e) => {
                      setContent((prev) => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          heroCarousel: {
                            ...prev.home.heroCarousel,
                            slides: prev.home.heroCarousel.slides.map((s, i) =>
                              i === index ? { ...s, subtitle: e.target.value } : s,
                            ),
                          },
                        },
                      }));
                    }}
                    rows={2}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Primary Button Text</Label>
                    <Input
                      value={slide.primaryButtonText}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            heroCarousel: {
                              ...prev.home.heroCarousel,
                              slides: prev.home.heroCarousel.slides.map((s, i) =>
                                i === index ? { ...s, primaryButtonText: e.target.value } : s,
                              ),
                            },
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Button Link</Label>
                    <Input
                      value={slide.primaryButtonLink}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            heroCarousel: {
                              ...prev.home.heroCarousel,
                              slides: prev.home.heroCarousel.slides.map((s, i) =>
                                i === index ? { ...s, primaryButtonLink: e.target.value } : s,
                              ),
                            },
                          },
                        }));
                      }}
                      placeholder="/admissions"
                    />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Secondary Button Text</Label>
                    <Input
                      value={slide.secondaryButtonText}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            heroCarousel: {
                              ...prev.home.heroCarousel,
                              slides: prev.home.heroCarousel.slides.map((s, i) =>
                                i === index ? { ...s, secondaryButtonText: e.target.value } : s,
                              ),
                            },
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Button Link</Label>
                    <Input
                      value={slide.secondaryButtonLink}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            heroCarousel: {
                              ...prev.home.heroCarousel,
                              slides: prev.home.heroCarousel.slides.map((s, i) =>
                                i === index ? { ...s, secondaryButtonLink: e.target.value } : s,
                              ),
                            },
                          },
                        }));
                      }}
                      placeholder="/about"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => {
            setContent((prev) => ({
              ...prev,
              home: {
                ...prev.home,
                heroCarousel: {
                  ...prev.home.heroCarousel,
                  slides: [
                    ...prev.home.heroCarousel.slides,
                    {
                      imageUrl: "",
                      title: "",
                      subtitle: "",
                      primaryButtonText: "Enroll Now",
                      primaryButtonLink: "/admissions",
                      secondaryButtonText: "Learn More",
                      secondaryButtonLink: "/about",
                    },
                  ],
                },
              },
            }));
          }}>
            <Plus className="h-4 w-4" />
            Add Slide
          </Button>
        </CardContent>
      </Card>
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('hero-video')}
        onFocus={() => setActiveSubSection('hero-video')}
      >
        <CardHeader>
          <CardTitle>Home Hero &amp; Video</CardTitle>
          <CardDescription>
            Main heading and subheading used in the Home "Learn English" section and director&apos;s desk video.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={content.home.heroTitle}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, heroTitle: e.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
            <Input
              id="heroSubtitle"
              value={content.home.heroSubtitle}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, heroSubtitle: e.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="directorVideoUrl">Director&apos;s Desk Video URL</Label>
            <Input
              id="directorVideoUrl"
              value={content.home.directorVideoUrl}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, directorVideoUrl: e.target.value },
                }))
              }
              placeholder="https://www.youtube.com/embed/..."
            />
          </div>
        </CardContent>
      </Card>



      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('features')}
        onFocus={() => setActiveSubSection('features')}
      >
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Cards shown in the "Why Choose Us?" section on the home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.home.features.map((feature, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Feature {index + 1}</Label>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeFeature(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={feature.title} onChange={(e) => handleFeatureChange(index, "title", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addFeature}>
            <Plus className="h-4 w-4" />
            Add Feature
          </Button>
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('testimonials')}
        onFocus={() => setActiveSubSection('testimonials')}
      >
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Items shown in the home page "Student Success Stories" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.home.testimonials.map((testimonial, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Testimonial {index + 1}</Label>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeTestimonial(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={testimonial.name} onChange={(e) => handleTestimonialChange(index, "name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input value={testimonial.role} onChange={(e) => handleTestimonialChange(index, "role", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) => handleTestimonialChange(index, "content", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={testimonial.rating ?? ""}
                    onChange={(e) => handleTestimonialChange(index, "rating", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addTestimonial}>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('cta')}
        onFocus={() => setActiveSubSection('cta')}
      >
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
          <CardDescription>Text shown in the "Ready to Transform Your Future?" section at the bottom of the home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ctaTitle">CTA Title</Label>
            <Input
              id="ctaTitle"
              value={content.home.ctaTitle}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, ctaTitle: e.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaText">CTA Text</Label>
            <Textarea
              id="ctaText"
              value={content.home.ctaText}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, ctaText: e.target.value },
                }))
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderHeaderEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Header</CardTitle>
          <CardDescription>Control the site title shown next to the logo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              value={content.header.siteTitle}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  header: { ...prev.header, siteTitle: e.target.value },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Navigation Links</CardTitle>
          <CardDescription>Links shown in the main navigation bar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.header.nav.map((item, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Link {index + 1}</Label>
                  <Button type="button" size="icon" variant="ghost" onClick={() => removeNavItem(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={item.label} onChange={(e) => handleNavChange(index, "label", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Path</Label>
                    <Input
                      value={item.to}
                      onChange={(e) => handleNavChange(index, "to", e.target.value)}
                      placeholder="/about"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addNavItem}>
            <Plus className="h-4 w-4" />
            Add Nav Item
          </Button>
        </CardContent>
      </Card>
    </>
  );

  const renderFooterEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Footer - Institute Info</CardTitle>
          <CardDescription>Main footer institute name and tagline.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footerInstituteName">Institute Name</Label>
            <Input
              id="footerInstituteName"
              value={content.footer.instituteName}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, instituteName: e.target.value },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerTagline">Tagline</Label>
            <Textarea
              id="footerTagline"
              value={content.footer.tagline}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, tagline: e.target.value },
                }))
              }
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Social media profile URLs for the footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footerFacebook">Facebook URL</Label>
            <Input
              id="footerFacebook"
              value={content.footer.socialMedia.facebook}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    socialMedia: { ...prev.footer.socialMedia, facebook: e.target.value },
                  },
                }))
              }
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerTwitter">Twitter URL</Label>
            <Input
              id="footerTwitter"
              value={content.footer.socialMedia.twitter}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    socialMedia: { ...prev.footer.socialMedia, twitter: e.target.value },
                  },
                }))
              }
              placeholder="https://twitter.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerInstagram">Instagram URL</Label>
            <Input
              id="footerInstagram"
              value={content.footer.socialMedia.instagram}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    socialMedia: { ...prev.footer.socialMedia, instagram: e.target.value },
                  },
                }))
              }
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerLinkedin">LinkedIn URL</Label>
            <Input
              id="footerLinkedin"
              value={content.footer.socialMedia.linkedin}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    socialMedia: { ...prev.footer.socialMedia, linkedin: e.target.value },
                  },
                }))
              }
              placeholder="https://linkedin.com/..."
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Navigation links shown in the footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.footer.quickLinks.map((link, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Link {index + 1}</Label>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setContent((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          quickLinks: prev.footer.quickLinks.filter((_, i) => i !== index),
                        },
                      }));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            quickLinks: prev.footer.quickLinks.map((l, i) =>
                              i === index ? { ...l, label: e.target.value } : l,
                            ),
                          },
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL Path</Label>
                    <Input
                      value={link.to}
                      onChange={(e) => {
                        setContent((prev) => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            quickLinks: prev.footer.quickLinks.map((l, i) =>
                              i === index ? { ...l, to: e.target.value } : l,
                            ),
                          },
                        }));
                      }}
                      placeholder="/about"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                footer: {
                  ...prev.footer,
                  quickLinks: [...prev.footer.quickLinks, { label: "", to: "" }],
                },
              }));
            }}
          >
            <Plus className="h-4 w-4" />
            Add Quick Link
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Courses List</CardTitle>
          <CardDescription>Course names displayed in the footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {content.footer.courses.map((course, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={course}
                  onChange={(e) => {
                    setContent((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        courses: prev.footer.courses.map((c, i) => (i === index ? e.target.value : c)),
                      },
                    }));
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setContent((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        courses: prev.footer.courses.filter((_, i) => i !== index),
                      },
                    }));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setContent((prev) => ({
                ...prev,
                footer: {
                  ...prev.footer,
                  courses: [...prev.footer.courses, ""],
                },
              }));
            }}
          >
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Contact details displayed in the footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footerAddress">Address</Label>
            <Textarea
              id="footerAddress"
              value={content.footer.contact.address}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    contact: { ...prev.footer.contact, address: e.target.value },
                  },
                }))
              }
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerPhone">Phone</Label>
            <Input
              id="footerPhone"
              value={content.footer.contact.phone}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    contact: { ...prev.footer.contact, phone: e.target.value },
                  },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="footerEmail">Email</Label>
            <Input
              id="footerEmail"
              type="email"
              value={content.footer.contact.email}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    contact: { ...prev.footer.contact, email: e.target.value },
                  },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Copyright</CardTitle>
          <CardDescription>Copyright text displayed at the bottom of the footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footerCopy">Copyright Text</Label>
            <Input
              id="footerCopy"
              value={content.footer.copyright}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, copyright: e.target.value },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Advanced JSON</CardTitle>
          <CardDescription>Export or import the entire site content JSON. Useful for backups or migrating content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jsonContent">Site Content JSON</Label>
            <Textarea
              id="jsonContent"
              value={jsonValue}
              onChange={(e) => setJsonValue(e.target.value)}
              rows={10}
              placeholder="Click Export JSON to view the current configuration..."
            />
            {importError && <p className="mt-1 text-sm text-destructive">{importError}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
            <Button type="button" className="flex items-center gap-2" onClick={handleImport}>
              <Upload className="h-4 w-4" />
              Import JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderAboutEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>About Hero</CardTitle>
          <CardDescription>Title and subtitle shown in the about hero section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Hero Title"
            value={content.about.hero.title}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, hero: { ...prev.about.hero, title: e.target.value } },
              }))
            }
          />
          <Textarea
            rows={2}
            placeholder="Hero Subtitle"
            value={content.about.hero.subtitle}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, hero: { ...prev.about.hero, subtitle: e.target.value } },
              }))
            }
          />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Stats</CardTitle>
          <CardDescription>Metrics displayed under the about hero.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.about.stats.map((stat, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Stat {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveAboutStat(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder="Value"
                value={stat.value}
                onChange={(e) => handleAboutStatChange(index, "value", e.target.value)}
              />
              <Input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => handleAboutStatChange(index, "label", e.target.value)}
              />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddAboutStat}>
            <Plus className="h-4 w-4" />
            Add Stat
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
          <CardDescription>Edit each paragraph of the story section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.about.story.map((paragraph, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Paragraph {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveAboutStory(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                rows={3}
                value={paragraph}
                onChange={(e) => handleAboutStoryChange(index, e.target.value)}
              />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddAboutStory}>
            <Plus className="h-4 w-4" />
            Add Paragraph
          </Button>
        </CardContent>
      </Card>

      {renderCardListEditor("Core Values", content.about.coreValues, (next) =>
        setContent((prev) => ({
          ...prev,
          about: { ...prev.about, coreValues: next },
        })),
      )}

      {renderCardListEditor("Why We're Different", content.about.differentiators, (next) =>
        setContent((prev) => ({
          ...prev,
          about: { ...prev.about, differentiators: next },
        })),
      )}
    </>
  );

  const renderCardListEditor = (
    title: string,
    list: { title: string; description: string }[],
    onChange: (next: { title: string; description: string }[]) => void,
  ) => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.map((item, index) => (
          <div key={index} className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Card {index + 1}</Label>
              <Button variant="ghost" size="icon" onClick={() => onChange(list.filter((_, i) => i !== index))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Title"
              value={item.title}
              onChange={(e) =>
                onChange(
                  list.map((entry, i) => (i === index ? { ...entry, title: e.target.value } : entry)),
                )
              }
            />
            <Textarea
              rows={2}
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                onChange(
                  list.map((entry, i) => (i === index ? { ...entry, description: e.target.value } : entry)),
                )
              }
            />
          </div>
        ))}
        <Button variant="outline" className="flex items-center gap-2" onClick={() => onChange([...list, { title: "", description: "" }])}>
          <Plus className="h-4 w-4" />
          Add Card
        </Button>
      </CardContent>
    </Card>
  );

  const handleAboutStatChange = (index: number, field: "value" | "label", value: string) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)),
      },
    }));
  };

  const handleAddAboutStat = () => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: [...prev.about.stats, { value: "", label: "" }] },
    }));
  };

  const handleRemoveAboutStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, stats: prev.about.stats.filter((_, i) => i !== index) },
    }));
  };

  const handleAboutStoryChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, story: prev.about.story.map((paragraph, i) => (i === index ? value : paragraph)) },
    }));
  };

  const handleAddAboutStory = () => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, story: [...prev.about.story, ""] },
    }));
  };

  const handleRemoveAboutStory = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, story: prev.about.story.filter((_, i) => i !== index) },
    }));
  };

  const renderCoursesEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Courses Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Hero Title"
            value={content.courses.hero.title}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                courses: { ...prev.courses, hero: { ...prev.courses.hero, title: e.target.value } },
              }))
            }
          />
          <Textarea
            rows={2}
            placeholder="Hero Subtitle"
            value={content.courses.hero.subtitle}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                courses: { ...prev.courses, hero: { ...prev.courses.hero, subtitle: e.target.value } },
              }))
            }
          />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.courses.courses.map((course, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Course {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveCourse(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Title" value={course.title} onChange={(e) => handleCourseChange(index, "title", e.target.value)} />
              <Textarea rows={2} placeholder="Description" value={course.description} onChange={(e) => handleCourseChange(index, "description", e.target.value)} />
              <Input placeholder="Duration" value={course.duration} onChange={(e) => handleCourseChange(index, "duration", e.target.value)} />
              <Input placeholder="Students" value={course.students} onChange={(e) => handleCourseChange(index, "students", e.target.value)} />
              <Input placeholder="Level" value={course.level} onChange={(e) => handleCourseChange(index, "level", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddCourse}>
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.courses.benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input value={benefit} onChange={(e) => handleCourseBenefitChange(index, e.target.value)} />
              <Button variant="ghost" size="icon" onClick={() => handleRemoveCourseBenefit(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddCourseBenefit}>
            <Plus className="h-4 w-4" />
            Add Benefit
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Learning Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.courses.learningSections.map((section, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Section {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveLearningSection(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Title" value={section.title} onChange={(e) => handleLearningSectionChange(index, "title", e.target.value)} />
              <Textarea
                rows={4}
                placeholder="Enter each item on a new line"
                value={section.items.join("\n")}
                onChange={(e) => handleLearningSectionChange(index, "items", e.target.value.split("\n"))}
              />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddLearningSection}>
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </CardContent>
      </Card>
    </>
  );

  const handleCourseChange = (
    index: number,
    field: "title" | "description" | "duration" | "students" | "level",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        courses: prev.courses.courses.map((course, i) => (i === index ? { ...course, [field]: value } : course)),
      },
    }));
  };

  const handleAddCourse = () => {
    setContent((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        courses: [...prev.courses.courses, { title: "", description: "", duration: "", students: "", level: "" }],
      },
    }));
  };

  const handleRemoveCourse = (index: number) => {
    setContent((prev) => ({
      ...prev,
      courses: { ...prev.courses, courses: prev.courses.courses.filter((_, i) => i !== index) },
    }));
  };

  const handleCourseBenefitChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        benefits: prev.courses.benefits.map((benefit, i) => (i === index ? value : benefit)),
      },
    }));
  };

  const handleAddCourseBenefit = () => {
    setContent((prev) => ({
      ...prev,
      courses: { ...prev.courses, benefits: [...prev.courses.benefits, ""] },
    }));
  };

  const handleRemoveCourseBenefit = (index: number) => {
    setContent((prev) => ({
      ...prev,
      courses: { ...prev.courses, benefits: prev.courses.benefits.filter((_, i) => i !== index) },
    }));
  };

  const handleLearningSectionChange = (index: number, field: "title" | "items", value: string | string[]) => {
    setContent((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        learningSections: prev.courses.learningSections.map((section, i) =>
          i === index ? { ...section, [field]: value } : section,
        ),
      },
    }));
  };

  const handleAddLearningSection = () => {
    setContent((prev) => ({
      ...prev,
      courses: { ...prev.courses, learningSections: [...prev.courses.learningSections, { title: "", items: [""] }] },
    }));
  };

  const handleRemoveLearningSection = (index: number) => {
    setContent((prev) => ({
      ...prev,
      courses: { ...prev.courses, learningSections: prev.courses.learningSections.filter((_, i) => i !== index) },
    }));
  };

  const renderAdmissionsEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Admissions Hero & CTA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Hero Title"
            value={content.admissions.hero.title}
            onChange={(e) => handleAdmissionsHeroChange("title", e.target.value)}
          />
          <Textarea
            rows={2}
            placeholder="Hero Subtitle"
            value={content.admissions.hero.subtitle}
            onChange={(e) => handleAdmissionsHeroChange("subtitle", e.target.value)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Primary CTA Label"
              value={content.admissions.contactCtas.phoneLabel}
              onChange={(e) => handleAdmissionsCtaChange("phoneLabel", e.target.value)}
            />
            <Input
              placeholder="Primary CTA Number"
              value={content.admissions.contactCtas.phoneNumber}
              onChange={(e) => handleAdmissionsCtaChange("phoneNumber", e.target.value)}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Secondary Text"
              value={content.admissions.contactCtas.secondaryText}
              onChange={(e) => handleAdmissionsCtaChange("secondaryText", e.target.value)}
            />
            <Input
              placeholder="Secondary Label"
              value={content.admissions.contactCtas.secondaryLabel}
              onChange={(e) => handleAdmissionsCtaChange("secondaryLabel", e.target.value)}
            />
            <Input
              placeholder="Secondary Link"
              value={content.admissions.contactCtas.secondaryLink}
              onChange={(e) => handleAdmissionsCtaChange("secondaryLink", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {renderListEditor("Admission Steps", content.admissions.steps, {
        fieldRender: (step, index) => (
          <>
            <Input placeholder="Step Number" value={step.step} onChange={(e) => handleAdmissionStepChange(index, "step", e.target.value)} />
            <Input placeholder="Title" value={step.title} onChange={(e) => handleAdmissionStepChange(index, "title", e.target.value)} />
            <Textarea rows={2} placeholder="Description" value={step.description} onChange={(e) => handleAdmissionStepChange(index, "description", e.target.value)} />
          </>
        ),
        onAdd: () =>
          setContent((prev) => ({
            ...prev,
            admissions: { ...prev.admissions, steps: [...prev.admissions.steps, { step: "", title: "", description: "" }] },
          })),
        onRemove: (index) =>
          setContent((prev) => ({
            ...prev,
            admissions: { ...prev.admissions, steps: prev.admissions.steps.filter((_, i) => i !== index) },
          })),
      })}

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.admissions.courseDetails.map((detail, index) => (
            <div key={index} className="rounded border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Detail {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveCourseDetail(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Label" value={detail.label} onChange={(e) => handleCourseDetailChange(index, "label", e.target.value)} />
              <Textarea rows={2} placeholder="Value" value={detail.value} onChange={(e) => handleCourseDetailChange(index, "value", e.target.value)} />
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={detail.icon} onValueChange={(value: typeof detail.icon) => handleCourseDetailChange(index, "icon", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseDetailIconOptions.map((key) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddCourseDetail}>
            <Plus className="h-4 w-4" />
            Add Detail
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Target Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.admissions.targetGroups.map((group, index) => (
            <div key={index} className="rounded border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Group {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveTargetGroup(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Title" value={group.title} onChange={(e) => handleTargetGroupChange(index, e.target.value)} />
              <Textarea rows={4} placeholder="Benefits (one per line)" value={group.benefits.join("\n")} onChange={(e) => handleTargetGroupBenefitsChange(index, e.target.value.split("\n"))} />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddTargetGroup}>
            <Plus className="h-4 w-4" />
            Add Group
          </Button>
        </CardContent>
      </Card>

      {renderSimpleStringList(
        "Why Choose Us",
        "Reasons shown in the highlighted list.",
        content.admissions.whyChoose,
        (next) =>
          setContent((prev) => ({
            ...prev,
            admissions: { ...prev.admissions, whyChoose: next },
          })),
      )}

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Final CTA Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={content.admissions.cta.title} onChange={(e) => handleAdmissionBannerChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.admissions.cta.subtitle} onChange={(e) => handleAdmissionBannerChange("subtitle", e.target.value)} />
          <Input placeholder="Tagline" value={content.admissions.cta.tagline} onChange={(e) => handleAdmissionBannerChange("tagline", e.target.value)} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Phone Label" value={content.admissions.cta.phoneLabel} onChange={(e) => handleAdmissionBannerChange("phoneLabel", e.target.value)} />
            <Input placeholder="Phone Number" value={content.admissions.cta.phoneNumber} onChange={(e) => handleAdmissionBannerChange("phoneNumber", e.target.value)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Directions Label" value={content.admissions.cta.directionsLabel} onChange={(e) => handleAdmissionBannerChange("directionsLabel", e.target.value)} />
            <Input placeholder="Directions URL" value={content.admissions.cta.directionsUrl} onChange={(e) => handleAdmissionBannerChange("directionsUrl", e.target.value)} />
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderListEditor = <T,>(
    title: string,
    list: T[],
    opts: {
      fieldRender: (item: T, index: number) => ReactNode;
      onAdd: () => void;
      onRemove: (index: number) => void;
    },
  ) => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>
                {title} {index + 1}
              </Label>
              <Button variant="ghost" size="icon" onClick={() => opts.onRemove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {opts.fieldRender(item, index)}
          </div>
        ))}
        <Button variant="outline" className="flex items-center gap-2" onClick={opts.onAdd}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </CardContent>
    </Card>
  );

  const renderSimpleStringList = (
    title: string,
    description: string,
    list: string[],
    onChange: (next: string[]) => void,
  ) => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {list.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input value={item} onChange={(e) => onChange(list.map((entry, i) => (i === index ? e.target.value : entry)))} />
            <Button variant="ghost" size="icon" onClick={() => onChange(list.filter((_, i) => i !== index))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" className="flex items-center gap-2" onClick={() => onChange([...list, ""])}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </CardContent>
    </Card>
  );

  const handleAdmissionsHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      admissions: { ...prev.admissions, hero: { ...prev.admissions.hero, [field]: value } },
    }));
  };

  const handleAdmissionsCtaChange = (
    field: keyof typeof content.admissions.contactCtas,
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      admissions: { ...prev.admissions, contactCtas: { ...prev.admissions.contactCtas, [field]: value } },
    }));
  };

  const handleAdmissionBannerChange = (
    field: keyof typeof content.admissions.cta,
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      admissions: { ...prev.admissions, cta: { ...prev.admissions.cta, [field]: value } },
    }));
  };

  const handleAdmissionStepChange = (index: number, field: "step" | "title" | "description", value: string) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        steps: prev.admissions.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
      },
    }));
  };

  const handleCourseDetailChange = (
    index: number,
    field: "label" | "value" | "icon",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        courseDetails: prev.admissions.courseDetails.map((detail, i) =>
          i === index ? { ...detail, [field]: value } : detail,
        ),
      },
    }));
  };

  const handleAddCourseDetail = () => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        courseDetails: [
          ...prev.admissions.courseDetails,
          { label: "", value: "", icon: courseDetailIconOptions[0] },
        ],
      },
    }));
  };

  const handleRemoveCourseDetail = (index: number) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        courseDetails: prev.admissions.courseDetails.filter((_, i) => i !== index),
      },
    }));
  };

  const handleTargetGroupChange = (index: number, title: string) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        targetGroups: prev.admissions.targetGroups.map((group, i) =>
          i === index ? { ...group, title } : group,
        ),
      },
    }));
  };

  const handleTargetGroupBenefitsChange = (index: number, benefits: string[]) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        targetGroups: prev.admissions.targetGroups.map((group, i) =>
          i === index ? { ...group, benefits } : group,
        ),
      },
    }));
  };

  const handleAddTargetGroup = () => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        targetGroups: [...prev.admissions.targetGroups, { title: "", benefits: [""] }],
      },
    }));
  };

  const handleRemoveTargetGroup = (index: number) => {
    setContent((prev) => ({
      ...prev,
      admissions: {
        ...prev.admissions,
        targetGroups: prev.admissions.targetGroups.filter((_, i) => i !== index),
      },
    }));
  };

  const renderSuccessStoriesEditor = () => {
    const successStories = content.successStories ?? DEFAULT_CONTENT.successStories;

    return (
      <>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Success Stories Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Title" value={successStories.hero.title} onChange={(e) => handleSuccessHeroChange("title", e.target.value)} />
            <Textarea rows={2} placeholder="Subtitle" value={successStories.hero.subtitle} onChange={(e) => handleSuccessHeroChange("subtitle", e.target.value)} />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {successStories.stats.map((stat, index) => (
              <div key={index} className="rounded border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Stat {index + 1}</Label>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSuccessStat(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="Value" value={stat.value} onChange={(e) => handleSuccessStatChange(index, "value", e.target.value)} />
                <Input placeholder="Label" value={stat.label} onChange={(e) => handleSuccessStatChange(index, "label", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2" onClick={handleAddSuccessStat}>
              <Plus className="h-4 w-4" />
              Add Stat
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {successStories.stories.map((story, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Story {index + 1}</Label>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSuccessStory(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input placeholder="Name" value={story.name} onChange={(e) => handleSuccessStoryChange(index, "name", e.target.value)} />
                <Input placeholder="Role" value={story.role} onChange={(e) => handleSuccessStoryChange(index, "role", e.target.value)} />
                <Textarea rows={3} placeholder="Content" value={story.content} onChange={(e) => handleSuccessStoryChange(index, "content", e.target.value)} />
                <Input type="number" min={1} max={5} placeholder="Rating" value={story.rating} onChange={(e) => handleSuccessStoryChange(index, "rating", Number(e.target.value))} />
                <Input placeholder="Achievement" value={story.achievement ?? ""} onChange={(e) => handleSuccessStoryChange(index, "achievement", e.target.value)} />
              </div>
            ))}
            <Button variant="outline" className="flex items-center gap-2" onClick={handleAddSuccessStory}>
              <Plus className="h-4 w-4" />
              Add Story
            </Button>
          </CardContent>
        </Card>

        {renderSimpleStringList(
          "Achievements",
          "Bullets shown in the notable achievements list.",
          successStories.achievements,
          (next) =>
            setContent((prev) => ({
              ...prev,
              successStories: { ...prev.successStories, achievements: next },
            })),
        )}

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Video Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea rows={2} placeholder="Description" value={successStories.video.description} onChange={(e) => handleSuccessVideoChange("description", e.target.value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Link Text" value={successStories.video.linkText} onChange={(e) => handleSuccessVideoChange("linkText", e.target.value)} />
              <Input placeholder="Link URL" value={successStories.video.linkUrl} onChange={(e) => handleSuccessVideoChange("linkUrl", e.target.value)} />
            </div>
            <Textarea rows={2} placeholder="Note" value={successStories.video.note} onChange={(e) => handleSuccessVideoChange("note", e.target.value)} />
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Title" value={successStories.cta.title} onChange={(e) => handleSuccessCtaChange("title", e.target.value)} />
            <Textarea rows={2} placeholder="Description" value={successStories.cta.description} onChange={(e) => handleSuccessCtaChange("description", e.target.value)} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Phone Label" value={successStories.cta.phoneLabel} onChange={(e) => handleSuccessCtaChange("phoneLabel", e.target.value)} />
              <Input placeholder="Phone Number" value={successStories.cta.phoneNumber} onChange={(e) => handleSuccessCtaChange("phoneNumber", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Review Links</Label>
              {successStories.cta.reviewLinks.map((link, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr,2fr,auto] items-center">
                  <Input placeholder="Label" value={link.label} onChange={(e) => handleSuccessReviewLinkChange(index, "label", e.target.value)} />
                  <Input placeholder="URL" value={link.url} onChange={(e) => handleSuccessReviewLinkChange(index, "url", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSuccessReviewLink(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="flex items-center gap-2" onClick={handleAddSuccessReviewLink}>
                <Plus className="h-4 w-4" />
                Add Link
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  };

  const handleSuccessHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, hero: { ...prev.successStories.hero, [field]: value } },
    }));
  };

  const handleSuccessStatChange = (index: number, field: "value" | "label", value: string) => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        stats: prev.successStories.stats.map((stat, i) => (i === index ? { ...stat, [field]: value } : stat)),
      },
    }));
  };

  const handleAddSuccessStat = () => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, stats: [...prev.successStories.stats, { value: "", label: "" }] },
    }));
  };

  const handleRemoveSuccessStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, stats: prev.successStories.stats.filter((_, i) => i !== index) },
    }));
  };

  const handleSuccessStoryChange = (
    index: number,
    field: "name" | "role" | "content" | "rating" | "achievement",
    value: string | number,
  ) => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        stories: prev.successStories.stories.map((story, i) => (i === index ? { ...story, [field]: value } : story)),
      },
    }));
  };

  const handleAddSuccessStory = () => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        stories: [...prev.successStories.stories, { name: "", role: "", content: "", rating: 5, achievement: "" }],
      },
    }));
  };

  const handleRemoveSuccessStory = (index: number) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, stories: prev.successStories.stories.filter((_, i) => i !== index) },
    }));
  };

  const handleSuccessVideoChange = (field: "description" | "linkText" | "linkUrl" | "note", value: string) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, video: { ...prev.successStories.video, [field]: value } },
    }));
  };

  const handleSuccessCtaChange = (
    field: "title" | "description" | "phoneLabel" | "phoneNumber",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, cta: { ...prev.successStories.cta, [field]: value } },
    }));
  };

  const handleSuccessAchievementChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        achievements: prev.successStories.achievements.map((achievement, i) => (i === index ? value : achievement)),
      },
    }));
  };

  const handleAddSuccessAchievement = () => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, achievements: [...prev.successStories.achievements, ""] },
    }));
  };

  const handleRemoveSuccessAchievement = (index: number) => {
    setContent((prev) => ({
      ...prev,
      successStories: { ...prev.successStories, achievements: prev.successStories.achievements.filter((_, i) => i !== index) },
    }));
  };

  const handleSuccessReviewLinkChange = (index: number, field: "label" | "url", value: string) => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        cta: {
          ...prev.successStories.cta,
          reviewLinks: prev.successStories.cta.reviewLinks.map((link, i) =>
            i === index ? { ...link, [field]: value } : link,
          ),
        },
      },
    }));
  };

  const handleAddSuccessReviewLink = () => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        cta: {
          ...prev.successStories.cta,
          reviewLinks: [...prev.successStories.cta.reviewLinks, { label: "", url: "" }],
        },
      },
    }));
  };

  const handleRemoveSuccessReviewLink = (index: number) => {
    setContent((prev) => ({
      ...prev,
      successStories: {
        ...prev.successStories,
        cta: {
          ...prev.successStories.cta,
          reviewLinks: prev.successStories.cta.reviewLinks.filter((_, i) => i !== index),
        },
      },
    }));
  };

  const renderGalleryEditor = () => {
    const categoryKeys = Object.keys(content.gallery.categories) as Array<keyof typeof content.gallery.categories>;

    return (
      <>
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Gallery Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Title" value={content.gallery.hero.title} onChange={(e) => handleGalleryHeroChange("title", e.target.value)} />
            <Textarea rows={2} placeholder="Subtitle" value={content.gallery.hero.subtitle} onChange={(e) => handleGalleryHeroChange("subtitle", e.target.value)} />
          </CardContent>
        </Card>

        {categoryKeys.map((key) => (
          <Card key={key} className="shadow-soft">
            <CardHeader>
              <CardTitle className="capitalize">{key} Images</CardTitle>
              <CardDescription>Entries shown in the {key} tab.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.gallery.categories[key].map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Image {index + 1}</Label>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveGalleryImage(key, index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input placeholder="Image URL" value={item.src} onChange={(e) => handleGalleryImageChange(key, index, "src", e.target.value)} />
                  <Input placeholder="Title" value={item.title} onChange={(e) => handleGalleryImageChange(key, index, "title", e.target.value)} />
                  <Input placeholder="Category Label" value={item.category} onChange={(e) => handleGalleryImageChange(key, index, "category", e.target.value)} />
                </div>
              ))}
              <Button variant="outline" className="flex items-center gap-2" onClick={() => handleAddGalleryImage(key)}>
                <Plus className="h-4 w-4" />
                Add Image
              </Button>
            </CardContent>
          </Card>
        ))}
      </>
    );
  };

  const handleGalleryHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: { ...prev.gallery, hero: { ...prev.gallery.hero, [field]: value } },
    }));
  };

  const handleGalleryImageChange = (
    category: keyof typeof content.gallery.categories,
    index: number,
    field: "src" | "title" | "category",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: {
          ...prev.gallery.categories,
          [category]: prev.gallery.categories[category].map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
          ),
        },
      },
    }));
  };

  const handleAddGalleryImage = (category: keyof typeof content.gallery.categories) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: {
          ...prev.gallery.categories,
          [category]: [...prev.gallery.categories[category], { src: "", title: "", category }],
        },
      },
    }));
  };

  const handleRemoveGalleryImage = (category: keyof typeof content.gallery.categories, index: number) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: {
          ...prev.gallery.categories,
          [category]: prev.gallery.categories[category].filter((_, i) => i !== index),
        },
      },
    }));
  };

  const renderReviewsEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Reviews Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.reviews.hero.title} onChange={(e) => handleReviewsHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.reviews.hero.subtitle} onChange={(e) => handleReviewsHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Rating Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Input placeholder="Score" value={content.reviews.ratingSummary.score} onChange={(e) => handleRatingSummaryChange("score", e.target.value)} />
          <Input placeholder="Label" value={content.reviews.ratingSummary.label} onChange={(e) => handleRatingSummaryChange("label", e.target.value)} />
          <Input placeholder="Count" value={content.reviews.ratingSummary.count} onChange={(e) => handleRatingSummaryChange("count", e.target.value)} />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.reviews.testimonials.map((testimonial, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Testimonial {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveReviewTestimonial(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Name" value={testimonial.name} onChange={(e) => handleReviewTestimonialChange(index, "name", e.target.value)} />
              <Input placeholder="Role" value={testimonial.role} onChange={(e) => handleReviewTestimonialChange(index, "role", e.target.value)} />
              <Textarea rows={3} placeholder="Content" value={testimonial.content} onChange={(e) => handleReviewTestimonialChange(index, "content", e.target.value)} />
              <Input type="number" min={1} max={5} placeholder="Rating" value={testimonial.rating} onChange={(e) => handleReviewTestimonialChange(index, "rating", Number(e.target.value))} />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddReviewTestimonial}>
            <Plus className="h-4 w-4" />
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Call to Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={content.reviews.cta.title} onChange={(e) => handleReviewsCtaChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Description" value={content.reviews.cta.description} onChange={(e) => handleReviewsCtaChange("description", e.target.value)} />
          <Input placeholder="Button Text" value={content.reviews.cta.buttonText} onChange={(e) => handleReviewsCtaChange("buttonText", e.target.value)} />
          <Input placeholder="Mailto Link" value={content.reviews.cta.mailTo} onChange={(e) => handleReviewsCtaChange("mailTo", e.target.value)} />
        </CardContent>
      </Card>
    </>
  );

  const handleReviewsHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, hero: { ...prev.reviews.hero, [field]: value } },
    }));
  };

  const handleRatingSummaryChange = (field: "score" | "label" | "count", value: string) => {
    setContent((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, ratingSummary: { ...prev.reviews.ratingSummary, [field]: value } },
    }));
  };

  const handleReviewTestimonialChange = (
    index: number,
    field: "name" | "role" | "content" | "rating",
    value: string | number,
  ) => {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        testimonials: prev.reviews.testimonials.map((testimonial, i) =>
          i === index ? { ...testimonial, [field]: value } : testimonial,
        ),
      },
    }));
  };

  const handleAddReviewTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      reviews: {
        ...prev.reviews,
        testimonials: [...prev.reviews.testimonials, { name: "", role: "", content: "", rating: 5 }],
      },
    }));
  };

  const handleRemoveReviewTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, testimonials: prev.reviews.testimonials.filter((_, i) => i !== index) },
    }));
  };

  const handleReviewsCtaChange = (
    field: "title" | "description" | "buttonText" | "mailTo",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, cta: { ...prev.reviews.cta, [field]: value } },
    }));
  };

  const renderFaqEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>FAQ Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.faq.hero.title} onChange={(e) => handleFaqHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.faq.hero.subtitle} onChange={(e) => handleFaqHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>FAQ Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.faq.categories.map((category, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Category {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveFaqCategory(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Category Title" value={category.category} onChange={(e) => handleFaqCategoryChange(index, e.target.value)} />
              <div className="space-y-2">
                <Label>Questions</Label>
                {category.questions.map((question, qIndex) => (
                  <div key={qIndex} className="rounded border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Question {qIndex + 1}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveFaqQuestion(index, qIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input placeholder="Question" value={question.q} onChange={(e) => handleFaqQuestionChange(index, qIndex, "q", e.target.value)} />
                    <Textarea rows={3} placeholder="Answer" value={question.a} onChange={(e) => handleFaqQuestionChange(index, qIndex, "a", e.target.value)} />
                  </div>
                ))}
                <Button variant="outline" className="flex items-center gap-2" onClick={() => handleAddFaqQuestion(index)}>
                  <Plus className="h-4 w-4" />
                  Add Question
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddFaqCategory}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Support Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={content.faq.support.title} onChange={(e) => handleFaqSupportChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Description" value={content.faq.support.description} onChange={(e) => handleFaqSupportChange("description", e.target.value)} />
          <Input placeholder="Phone Number" value={content.faq.support.phoneNumber} onChange={(e) => handleFaqSupportChange("phoneNumber", e.target.value)} />
          <Input placeholder="Note" value={content.faq.support.note} onChange={(e) => handleFaqSupportChange("note", e.target.value)} />
        </CardContent>
      </Card>
    </>
  );

  const handleFaqHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, hero: { ...prev.faq.hero, [field]: value } },
    }));
  };

  const handleFaqCategoryChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        categories: prev.faq.categories.map((category, i) =>
          i === index ? { ...category, category: value } : category,
        ),
      },
    }));
  };

  const handleAddFaqCategory = () => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        categories: [...prev.faq.categories, { category: "", questions: [{ q: "", a: "" }] }],
      },
    }));
  };

  const handleRemoveFaqCategory = (index: number) => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, categories: prev.faq.categories.filter((_, i) => i !== index) },
    }));
  };

  const handleFaqQuestionChange = (
    categoryIndex: number,
    questionIndex: number,
    field: "q" | "a",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        categories: prev.faq.categories.map((category, i) =>
          i === categoryIndex
            ? {
              ...category,
              questions: category.questions.map((question, qi) =>
                qi === questionIndex ? { ...question, [field]: value } : question,
              ),
            }
            : category,
        ),
      },
    }));
  };

  const handleAddFaqQuestion = (categoryIndex: number) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        categories: prev.faq.categories.map((category, i) =>
          i === categoryIndex
            ? { ...category, questions: [...category.questions, { q: "", a: "" }] }
            : category,
        ),
      },
    }));
  };

  const handleRemoveFaqQuestion = (categoryIndex: number, questionIndex: number) => {
    setContent((prev) => ({
      ...prev,
      faq: {
        ...prev.faq,
        categories: prev.faq.categories.map((category, i) =>
          i === categoryIndex
            ? { ...category, questions: category.questions.filter((_, qi) => qi !== questionIndex) }
            : category,
        ),
      },
    }));
  };

  const handleFaqSupportChange = (field: "title" | "description" | "phoneNumber" | "note", value: string) => {
    setContent((prev) => ({
      ...prev,
      faq: { ...prev.faq, support: { ...prev.faq.support, [field]: value } },
    }));
  };

  const renderContactEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Contact Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.contact.hero.title} onChange={(e) => handleContactHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.contact.hero.subtitle} onChange={(e) => handleContactHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Course Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.contact.courseOptions.map((option, index) => (
            <div key={index} className="rounded border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Label>Option {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveCourseOption(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Value (e.g. slug)" value={option.value} onChange={(e) => handleCourseOptionChange(index, "value", e.target.value)} />
              <Input placeholder="Label" value={option.label} onChange={(e) => handleCourseOptionChange(index, "label", e.target.value)} />
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddCourseOption}>
            <Plus className="h-4 w-4" />
            Add Option
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Contact Cards</CardTitle>
          <CardDescription>Address, phone, email, and hours information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.contact.cards.map((card, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Card {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveContactCard(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Type (address, phone, email, hours)" value={card.type} onChange={(e) => handleContactCardChange(index, "type", e.target.value)} />
              <Input placeholder="Title" value={card.title} onChange={(e) => handleContactCardChange(index, "title", e.target.value)} />
              <div className="space-y-2">
                <Label>Lines</Label>
                {card.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex gap-2">
                    <Input value={line} onChange={(e) => handleContactCardLineChange(index, lineIndex, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveContactCardLine(index, lineIndex)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="flex items-center gap-2" onClick={() => handleAddContactCardLine(index)}>
                  <Plus className="h-4 w-4" />
                  Add Line
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddContactCard}>
            <Plus className="h-4 w-4" />
            Add Card
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Map Note</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea rows={2} value={content.contact.mapNote} onChange={(e) => setContent((prev) => ({ ...prev, contact: { ...prev.contact, mapNote: e.target.value } }))} />
        </CardContent>
      </Card>
    </>
  );

  const handleContactHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, hero: { ...prev.contact.hero, [field]: value } },
    }));
  };

  const handleCourseOptionChange = (index: number, field: "value" | "label", value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        courseOptions: prev.contact.courseOptions.map((option, i) => (i === index ? { ...option, [field]: value } : option)),
      },
    }));
  };

  const handleAddCourseOption = () => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, courseOptions: [...prev.contact.courseOptions, { value: "", label: "" }] },
    }));
  };

  const handleRemoveCourseOption = (index: number) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, courseOptions: prev.contact.courseOptions.filter((_, i) => i !== index) },
    }));
  };

  const handleContactCardChange = (index: number, field: "type" | "title", value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: prev.contact.cards.map((card, i) => (i === index ? { ...card, [field]: value } : card)),
      },
    }));
  };

  const handleAddContactCard = () => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, cards: [...prev.contact.cards, { type: "address", title: "", lines: [""] }] },
    }));
  };

  const handleRemoveContactCard = (index: number) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, cards: prev.contact.cards.filter((_, i) => i !== index) },
    }));
  };

  const handleContactCardLineChange = (cardIndex: number, lineIndex: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: prev.contact.cards.map((card, i) =>
          i === cardIndex
            ? { ...card, lines: card.lines.map((line, li) => (li === lineIndex ? value : line)) }
            : card,
        ),
      },
    }));
  };

  const handleAddContactCardLine = (cardIndex: number) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: prev.contact.cards.map((card, i) =>
          i === cardIndex ? { ...card, lines: [...card.lines, ""] } : card,
        ),
      },
    }));
  };

  const handleRemoveContactCardLine = (cardIndex: number, lineIndex: number) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: prev.contact.cards.map((card, i) =>
          i === cardIndex ? { ...card, lines: card.lines.filter((_, li) => li !== lineIndex) } : card,
        ),
      },
    }));
  };

  const renderFacultyEditor = () => (
    <>
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Faculty Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.faculty.hero.title} onChange={(e) => handleFacultyHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.faculty.hero.subtitle} onChange={(e) => handleFacultyHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Faculty Members</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.faculty.members.map((member, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Member {index + 1}</Label>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveFacultyMember(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input placeholder="Name" value={member.name} onChange={(e) => handleFacultyMemberChange(index, "name", e.target.value)} />
              <Input placeholder="Role" value={member.role} onChange={(e) => handleFacultyMemberChange(index, "role", e.target.value)} />
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Initials" value={member.imageInitials} onChange={(e) => handleFacultyMemberChange(index, "imageInitials", e.target.value)} />
                <Input placeholder="Experience" value={member.experience} onChange={(e) => handleFacultyMemberChange(index, "experience", e.target.value)} />
              </div>
              <Input placeholder="Education" value={member.education} onChange={(e) => handleFacultyMemberChange(index, "education", e.target.value)} />
              <Textarea rows={3} placeholder="Description" value={member.description} onChange={(e) => handleFacultyMemberChange(index, "description", e.target.value)} />
              <div className="space-y-2">
                <Label>Specializations</Label>
                {member.specialization.map((item, specIndex) => (
                  <div key={specIndex} className="flex gap-2">
                    <Input value={item} onChange={(e) => handleFacultyMemberStringValueChange(index, "specialization", specIndex, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => handleFacultyMemberStringItemRemove(index, "specialization", specIndex)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="flex items-center gap-2" onClick={() => handleFacultyMemberStringItemAdd(index, "specialization")}>
                  <Plus className="h-4 w-4" />
                  Add Specialization
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Achievements</Label>
                {member.achievements.map((item, achIndex) => (
                  <div key={achIndex} className="flex gap-2">
                    <Input value={item} onChange={(e) => handleFacultyMemberStringValueChange(index, "achievements", achIndex, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => handleFacultyMemberStringItemRemove(index, "achievements", achIndex)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="flex items-center gap-2" onClick={() => handleFacultyMemberStringItemAdd(index, "achievements")}>
                  <Plus className="h-4 w-4" />
                  Add Achievement
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="flex items-center gap-2" onClick={handleAddFacultyMember}>
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </CardContent>
      </Card>

      {renderCardListEditor(
        "Teaching Methodology",
        content.faculty.methodology,
        (next) =>
          setContent((prev) => ({
            ...prev,
            faculty: { ...prev.faculty, methodology: next },
          })),
      )}

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Promise Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={content.faculty.promise.title} onChange={(e) => handleFacultyPromiseTitleChange(e.target.value)} />
          {renderSimpleStringList(
            "Promise Paragraphs",
            "Detailed paragraphs describing the promise.",
            content.faculty.promise.paragraphs,
            (next) =>
              setContent((prev) => ({
                ...prev,
                faculty: { ...prev.faculty, promise: { ...prev.faculty.promise, paragraphs: next } },
              })),
          )}
        </CardContent>
      </Card>
    </>
  );

  const handleFacultyHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, hero: { ...prev.faculty.hero, [field]: value } },
    }));
  };

  const handleFacultyMemberChange = (
    index: number,
    field: "name" | "role" | "imageInitials" | "education" | "experience" | "description",
    value: string,
  ) => {
    setContent((prev) => ({
      ...prev,
      faculty: {
        ...prev.faculty,
        members: prev.faculty.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member,
        ),
      },
    }));
  };

  const handleFacultyMemberStringListChange = (
    index: number,
    field: "specialization" | "achievements",
    value: string[],
  ) => {
    setContent((prev) => ({
      ...prev,
      faculty: {
        ...prev.faculty,
        members: prev.faculty.members.map((member, i) =>
          i === index ? { ...member, [field]: value } : member,
        ),
      },
    }));
  };

  const handleAddFacultyMember = () => {
    setContent((prev) => ({
      ...prev,
      faculty: {
        ...prev.faculty,
        members: [
          ...prev.faculty.members,
          {
            name: "",
            role: "",
            imageInitials: "",
            education: "",
            experience: "",
            specialization: [""],
            description: "",
            achievements: [""],
          },
        ],
      },
    }));
  };

  const handleRemoveFacultyMember = (index: number) => {
    setContent((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, members: prev.faculty.members.filter((_, i) => i !== index) },
    }));
  };

  const handleFacultyPromiseTitleChange = (value: string) => {
    setContent((prev) => ({
      ...prev,
      faculty: { ...prev.faculty, promise: { ...prev.faculty.promise, title: value } },
    }));
  };

  const handleFacultyMemberStringValueChange = (
    index: number,
    field: "specialization" | "achievements",
    itemIndex: number,
    value: string,
  ) => {
    handleFacultyMemberStringListChange(
      index,
      field,
      content.faculty.members[index][field].map((item, i) => (i === itemIndex ? value : item)),
    );
  };

  const handleFacultyMemberStringItemAdd = (index: number, field: "specialization" | "achievements") => {
    handleFacultyMemberStringListChange(index, field, [...content.faculty.members[index][field], ""]);
  };

  const handleFacultyMemberStringItemRemove = (index: number, field: "specialization" | "achievements", itemIndex: number) => {
    handleFacultyMemberStringListChange(
      index,
      field,
      content.faculty.members[index][field].filter((_, i) => i !== itemIndex),
    );
  };

  const renderNotFoundEditor = () => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>404 Page</CardTitle>
        <CardDescription>Content displayed on the fallback page.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Title" value={content.notFound.title} onChange={(e) => handleNotFoundChange("title", e.target.value)} />
        <Textarea rows={2} placeholder="Description" value={content.notFound.description} onChange={(e) => handleNotFoundChange("description", e.target.value)} />
        <Input placeholder="Link Label" value={content.notFound.linkLabel} onChange={(e) => handleNotFoundChange("linkLabel", e.target.value)} />
      </CardContent>
    </Card>
  );

  const handleNotFoundChange = (field: "title" | "description" | "linkLabel", value: string) => {
    setContent((prev) => ({
      ...prev,
      notFound: { ...prev.notFound, [field]: value },
    }));
  };

  const renderPreview = () => {
    try {
      if (!content) {
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        );
      }

      const { home } = content;
      const featureIcons = [
        <Target key="icon-0" className="h-6 w-6" />,
        <Users key="icon-1" className="h-6 w-6" />,
        <Award key="icon-2" className="h-6 w-6" />,
        <BookOpen key="icon-3" className="h-6 w-6" />,
      ];

      switch (selectedSection.id) {
        case "home":
          // Preview-safe Hero component (using <a> instead of Link)
          const heroSlides = home.heroCarousel.slides.map((slide) => ({
            ...slide,
            image: slide.imageUrl.startsWith('data:') || slide.imageUrl.startsWith('http') 
              ? slide.imageUrl 
              : (imageMap[slide.imageUrl] || slide.imageUrl),
          }));
          
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-auto">
              <div className="w-full">
                {/* Hero Carousel Preview */}
                <div ref={heroCarouselRef} className="relative h-[400px] overflow-hidden">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === 0 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="relative h-full">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
                        <div className="absolute inset-0 flex items-center">
                          <div className="container mx-auto px-4">
                            <div className="max-w-2xl">
                              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                                {slide.title}
                              </h1>
                              <p className="text-lg md:text-xl text-white/90 mb-6">
                                {slide.subtitle}
                              </p>
                              <div className="flex flex-wrap gap-3">
                                <Button size="lg" className="gradient-accent" asChild>
                                  <a href={slide.primaryButtonLink}>
                                    {slide.primaryButtonText}
                                  </a>
                                </Button>
                                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary" asChild>
                                  <a href={slide.secondaryButtonLink}>
                                    {slide.secondaryButtonText}
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features Section */}
                <section ref={featuresRef} className="py-12 bg-secondary/30">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Choose Us?</h2>
                      <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                        We provide quality education with a focus on practical skills and real-world application
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {home.features.map((feature, index) => (
                        <div
                          key={index}
                          className="text-center p-4 rounded-lg bg-card shadow-soft hover:shadow-medium transition-all duration-300"
                        >
                          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full gradient-hero text-primary-foreground mb-3">
                            {featureIcons[index] ?? <Target className="h-5 w-5" />}
                          </div>
                          <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Learn English + Director's Desk */}
                <section ref={heroVideoRef} className="py-12">
                  <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
                      {home.heroTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                          {home.heroTitle}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {home.heroSubtitle}
                        </p>
                      </div>
                      <div>
                        <div className="text-right text-xs md:text-sm font-medium text-muted-foreground mb-2">Director's desk</div>
                        <div className="rounded-2xl overflow-hidden bg-card shadow-soft">
                          <div className="aspect-video w-full">
                            <iframe
                              src={home.directorVideoUrl}
                              title="Director's desk video"
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Testimonials Section */}
                <section ref={testimonialsRef} className="py-12 bg-secondary/30">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">Student Success Stories</h2>
                      <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                        Hear from our students who transformed their careers and lives
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {home.testimonials.map((testimonial, index) => (
                        <TestimonialCard 
                          key={index} 
                          name={testimonial.name}
                          role={testimonial.role}
                          content={testimonial.content}
                          rating={testimonial.rating ?? 5} 
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* CTA Section */}
                <section ref={ctaRef} className="py-12">
                  <div className="container mx-auto px-4">
                    <div className="gradient-hero rounded-2xl p-8 text-center shadow-medium">
                      <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                        {home.ctaTitle}
                      </h2>
                      <p className="text-base text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                        {home.ctaText}
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <Button size="lg" variant="secondary" asChild>
                          <a href="/contact">Get Started Now</a>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
                          <a href="/about">Learn About Us</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "header":
          return (
            <div className="h-full w-full bg-background">
              <Header />
            </div>
          );
        case "footer":
          return (
            <div className="h-full w-full bg-background flex items-end">
              <Footer />
            </div>
          );
        default:
          return (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">Preview not available for this section</p>
            </div>
          );
      }
    } catch (error) {
      console.error("Preview error:", error);
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-destructive">Preview error. Check console.</p>
        </div>
      );
    }
  };

  const renderSectionContent = () => {
    switch (selectedSection.id) {
      case "home":
        return renderHomeEditor();
      case "header":
        return renderHeaderEditor();
      case "footer":
        return renderFooterEditor();
      case "about":
        return renderAboutEditor();
      case "courses":
        return renderCoursesEditor();
      case "admissions":
        return renderAdmissionsEditor();
      case "success":
        return renderSuccessStoriesEditor();
      case "gallery":
        return renderGalleryEditor();
      case "reviews":
        return renderReviewsEditor();
      case "faq":
        return renderFaqEditor();
      case "contact":
        return renderContactEditor();
      case "faculty":
        return renderFacultyEditor();
      case "not-found":
        return renderNotFoundEditor();
      default:
        return renderStaticOverview(selectedSection);
    }
  };

  const editableSections = adminSections.filter((section) => section.type !== "static");
  const staticSections = adminSections.filter((section) => section.type === "static");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-sidebar-foreground/60">Turning Point Institute</p>
              <p className="text-sm font-semibold text-sidebar-foreground">Admin Navigation</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="space-y-4">
            <SidebarGroup className="space-y-2">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/60">
                Editable Sections
              </p>
              <SidebarMenu>
                {editableSections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton
                      isActive={section.id === selectedSection.id}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-2"
                      type="button"
                    >
                      <section.icon className="h-4 w-4" />
                      <span>{section.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="space-y-2">
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/60">Site Pages</p>
              <SidebarMenu>
                {staticSections.map((section) => (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton
                      isActive={section.id === selectedSection.id}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-2"
                      type="button"
                    >
                      <section.icon className="h-4 w-4" />
                      <span>{section.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t px-4 py-4 text-xs text-sidebar-foreground/70">
            Changes are stored locally in your browser.
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1">
          <div className="flex min-h-screen">
            {/* Editor Panel - Left Side */}
            <div className="flex-1 flex flex-col border-r overflow-hidden">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 flex-shrink-0">
                <div className="flex flex-1 flex-wrap items-center gap-4">
                  <SidebarTrigger className="md:hidden" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Admin Panel</p>
                    <h1 className="text-2xl font-bold tracking-tight">Site Content Manager</h1>
                    <p className="text-sm text-muted-foreground">Manage content blocks and preview every static page.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center gap-2" type="button" onClick={handleExport}>
                    <Download className="h-4 w-4" />
                    Export JSON
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    type="button"
                    onClick={() => resetContent()}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset to Defaults
                  </Button>
                </div>
              </header>

              <section className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 flex-shrink-0">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{selectedSection.label}</p>
                  <p className="text-sm text-muted-foreground">{selectedSection.description}</p>
                </div>
                <Button
                  className="flex items-center gap-2"
                  variant={selectedSection.type === "static" ? "outline" : "default"}
                  type="button"
                  onClick={handleEditAction}
                >
                  {selectedSection.type === "static" ? <ExternalLink className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
                  {selectedSection.type === "static" ? "Open Page" : "Edit Content"}
                </Button>
              </section>

              <div ref={contentRef} className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                {renderSectionContent()}
              </div>
            </div>

            {/* Preview Panel - Right Side */}
            <div className="w-1/2 border-l bg-background overflow-hidden flex flex-col">
              <div className="border-b px-4 py-2 flex-shrink-0">
                <p className="text-sm font-semibold">Live Preview</p>
                <p className="text-xs text-muted-foreground">See your changes in real-time</p>
              </div>
              <div className="flex-1 overflow-hidden relative">
                {renderPreview()}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
