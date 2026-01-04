import { useState, useEffect, useRef } from "react";
import type { ReactNode, ChangeEvent, FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { useContent, DEFAULT_CONTENT } from "@/lib/content";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent } from "@/lib/content";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";
import LivePreview from "@/components/LivePreview";
import SiteContentManager from "@/components/SiteContentManager";
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
  ClipboardCheck,
  Star,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Phone,
  Users,
  OctagonAlert,
  PenLine,
  ExternalLink,
  X,
  Lock,
  Eye,
  EyeOff,
  LogOut,
} from "lucide-react";

export type AdminSection = {
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
    id: "footer",
    label: "Footer",
    description: "Footer text and lists.",
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
    id: "change-password",
    label: "Change Password",
    description: "Update the admin access password for this panel.",
    icon: Lock,
    type: "static",
    route: "/admin",
  },
];

// Image mapping for default images (for preview in admin)
const imageMap: Record<string, string> = {
  "/src/assets/hero-classroom.jpg": heroClassroom,
  "/src/assets/speaking-confidence.jpg": speakingConfidence,
  "/src/assets/student-success.jpg": studentSuccess,
};

const resolveGalleryImageSrc = (src: string) => {
  if (!src) return "";
  if (src.startsWith("data:") || src.startsWith("http")) return src;
  return imageMap[src] || src;
};

const Admin = () => {
    const { content, setContent, resetContent, exportJSON, importJSON } = useContent();
  const { toast } = useToast();
    const [jsonValue, setJsonValue] = useState("");
    const [importError, setImportError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<AdminSection["id"]>("home");
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasExistingPassword, setHasExistingPassword] = useState(false);
  const selectedSection = adminSections.find((section) => section.id === activeSection) ?? adminSections[0];

  // Hide webkit scrollbar for sidebar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .sidebar-content-hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    // Lock window scroll for admin page
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      // Restore window scroll
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleAdminLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Frontend-only check against a hardcoded demo password.
    const demoPassword = "tpi-admin";
    if (loginPassword === demoPassword) {
      setIsAuthed(true);
      setLoginPassword("");
      toast({ title: "Access granted", description: "You can now edit the site content." });
    } else {
      toast({ title: "Incorrect password", description: "Please try again.", variant: "destructive" as any });
    }
  };

  const handleChangePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Frontend-only validation; does not persist anywhere.
    if (!newPassword) {
      toast({ title: "New password required", description: "Please enter a new password.", variant: "destructive" as any });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "New password and confirmation must match.", variant: "destructive" as any });
      return;
    }
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setHasExistingPassword(true);
    toast({ title: "Password updated (demo only)", description: "This change is not persisted; backend logic is not yet implemented." });
  };

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
      if (typeof window !== "undefined") {
      if (selectedSection.id === "footer") {
        window.open(`/${"?scroll=footer"}`, "_blank", "noopener,noreferrer");
        return;
      }
      if (selectedSection.id === "header") {
        window.open(`/`, "_blank", "noopener,noreferrer");
      return;
    }
      window.open(selectedSection.route, "_blank", "noopener,noreferrer");
    }
  };

  const getSectionKey = (id: string): keyof SiteContent | "header" | "footer" | "home" | "successStories" | "notFound" => {
    switch (id) {
      case "home":
        return "home";
      case "header":
        return "header";
      case "footer":
        return "footer";
      case "about":
        return "about";
      case "courses":
        return "courses";
      case "admissions":
        return "admissions";
      case "success":
        return "successStories";
      case "gallery":
        return "gallery";
      case "reviews":
        return "reviews";
      case "faq":
        return "faq";
      case "contact":
        return "contact";
      case "faculty":
        return "faculty";
      case "not-found":
        return "notFound";
      default:
        return "home";
    }
  };

  const handleSaveChanges = () => {
    try {
      const key = getSectionKey(selectedSection.id);
      const storedRaw = localStorage.getItem("site_content");
      let stored: Partial<SiteContent> = {};
      if (storedRaw) {
        try { stored = JSON.parse(storedRaw); } catch {}
      }
      const slice = (content as any)[key];
      const next = { ...stored, [key]: slice } as SiteContent;
      localStorage.setItem("site_content", JSON.stringify(next));
      toast({ title: "Changes saved", description: `${selectedSection.label} content updated.` });
    } catch (e) {
      toast({ title: "Save failed", description: "Could not persist changes.", variant: "destructive" as any });
    }
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
          className="gradient-accent"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
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
        onMouseEnter={() => setActiveSubSection('features')}
        onFocus={() => setActiveSubSection('features')}
      >
        <CardHeader>
          <CardTitle>Institute Highlights</CardTitle>
          <CardDescription>Manage the two highlight cards shown under the hero on the Home page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {content.home.differentiators?.cards.map((card, cIdx) => (
              <div key={cIdx} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Card {cIdx + 1}</Label>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      setContent((prev) => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          differentiators: {
                            cards: (prev.home.differentiators?.cards || []).filter((_, i) => i !== cIdx),
                          },
                        },
                      }));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-1">
                    <Label>Title</Label>
                    <Input
                      value={card.title}
                                        onChange={(e) =>
                                            setContent((prev) => ({
                                                ...prev,
                          home: {
                            ...prev.home,
                            differentiators: {
                              cards: (prev.home.differentiators?.cards || []).map((c, i) => (i === cIdx ? { ...c, title: e.target.value } : c)),
                            },
                          },
                                            }))
                                        }
                                    />
                                </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Items</Label>
                  {(card.items || []).map((it, iIdx) => (
                    <div
                      key={iIdx}
                    >
                                <div className="space-y-2">
                        <Label>Item Title</Label>
                                    <Input
                          value={it.title}
                                        onChange={(e) =>
                                            setContent((prev) => ({
                                                ...prev,
                              home: {
                                ...prev.home,
                                differentiators: {
                                  cards: (prev.home.differentiators?.cards || []).map((c, x) =>
                                    x === cIdx
                                      ? {
                                          ...c,
                                          items: (c.items || []).map((y, yi) => (yi === iIdx ? { ...y, title: e.target.value } : y)),
                                        }
                                      : c,
                                  ),
                                },
                              },
                                            }))
                                        }
                                    />
                                </div>
                      {cIdx !== 0 && (
                        <div className="space-y-2 md:col-span-2">
                          <Label>Item Description (optional)</Label>
                                    <Input
                            value={it.description || ""}
                                        onChange={(e) =>
                                            setContent((prev) => ({
                                                ...prev,
                                home: {
                                  ...prev.home,
                                  differentiators: {
                                    cards: (prev.home.differentiators?.cards || []).map((c, x) =>
                                      x === cIdx
                                        ? {
                                            ...c,
                                            items: (c.items || []).map((y, yi) => (yi === iIdx ? { ...y, description: e.target.value } : y)),
                                          }
                                        : c,
                                    ),
                                  },
                                },
                                            }))
                                        }
                                    />
                                </div>
                      )}
                      <div className="flex justify-end md:col-start-3 md:row-start-1 self-start">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setContent((prev) => ({
                              ...prev,
                              home: {
                                ...prev.home,
                                differentiators: {
                                  cards: (prev.home.differentiators?.cards || []).map((c, x) =>
                                    x === cIdx ? { ...c, items: (c.items || []).filter((_, yi) => yi !== iIdx) } : c,
                                  ),
                                },
                              },
                            }))
                          }
                        >
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  ))}
                  {/* Add Item button removed as per requirements */}
                </div>

                {cIdx === 0 && (
                  <div className="space-y-2">
                    <Label>Footer Text</Label>
                    <Textarea
                      value={card.footerText || ""}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            differentiators: {
                              cards: (prev.home.differentiators?.cards || []).map((c, i) => (i === cIdx ? { ...c, footerText: e.target.value } : c)),
                            },
                          },
                        }))
                      }
                      rows={2}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Add Card button intentionally removed as per requirements */}
                            </CardContent>
                        </Card>
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('hero-video')}
        onFocus={() => setActiveSubSection('hero-video')}
      >
        <CardHeader>
          <CardTitle>Start Your Journey (Join Us)</CardTitle>
          <CardDescription>Control the Home Join Us texts: header, steps, reasons, highlight cards, and bottom message.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Kicker</Label>
              <Input
                value={content.home.joinUs?.kicker || ""}
                onChange={(e) => setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), kicker: e.target.value } },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Title (before highlight)</Label>
              <Input
                value={content.home.joinUs?.titleBefore || ""}
                onChange={(e) => setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), titleBefore: e.target.value } },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Title Highlight</Label>
              <Input
                value={content.home.joinUs?.titleHighlight || ""}
                onChange={(e) => setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), titleHighlight: e.target.value } },
                }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Title After</Label>
            <Input
              value={content.home.joinUs?.titleAfter || ""}
              onChange={(e) => setContent((prev) => ({
                ...prev,
                home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), titleAfter: e.target.value } },
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Textarea
              value={content.home.joinUs?.subtitle || ""}
              onChange={(e) => setContent((prev) => ({
                ...prev,
                home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), subtitle: e.target.value } },
              }))}
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Steps</Label>
            <div className="grid gap-3 md:grid-cols-3">
              {(content.home.joinUs?.steps || [{label:"Basics"},{label:"Intermediate"},{label:"Fluent"}]).map((s, i) => (
                <div key={i} className="space-y-2">
                  <Label>Step {i+1} Label</Label>
                  <Input
                    value={s.label}
                    onChange={(e) => setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        joinUs: { ...(prev.home.joinUs||{}), steps: (prev.home.joinUs?.steps||[{label:"Basics"},{label:"Intermediate"},{label:"Fluent"}]).map((x, xi)=> xi===i? {...x, label: e.target.value}: x) },
                      },
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Reasons (Left)</Label>
            <div className="space-y-2">
              <Label>Reasons Heading</Label>
              <Input
                value={content.home.joinUs?.reasonsHeading || ""}
                onChange={(e) => setContent((prev) => ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), reasonsHeading: e.target.value } },
                }))}
              />
            </div>
            {(content.home.joinUs?.reasons || []).map((r, i) => (
              <div key={i} className="grid gap-3 md:grid-cols-2 p-3 border rounded">
                <div className="space-y-2">
                  <Label>Reason {i+1} Title</Label>
                  <Input
                    value={r.title}
                    onChange={(e) => setContent((prev)=>({
                      ...prev,
                      home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), reasons: (prev.home.joinUs?.reasons||[]).map((x,xi)=> xi===i? {...x, title: e.target.value}: x) } },
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reason {i+1} Description</Label>
                  <Textarea
                    value={r.description}
                    onChange={(e) => setContent((prev)=>({
                      ...prev,
                      home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), reasons: (prev.home.joinUs?.reasons||[]).map((x,xi)=> xi===i? {...x, description: e.target.value}: x) } },
                    }))}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Stat Metric</Label>
              <Input
                value={content.home.joinUs?.statCard.metric || ""}
                onChange={(e)=> setContent((prev)=> ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), statCard: { ...(prev.home.joinUs?.statCard||{ metric:"", heading:"", description:""}), metric: e.target.value } } },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Stat Heading</Label>
              <Input
                value={content.home.joinUs?.statCard.heading || ""}
                onChange={(e)=> setContent((prev)=> ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), statCard: { ...(prev.home.joinUs?.statCard||{ metric:"", heading:"", description:""}), heading: e.target.value } } },
                }))}
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label>Stat Description</Label>
              <Textarea
                value={content.home.joinUs?.statCard.description || ""}
                onChange={(e)=> setContent((prev)=> ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), statCard: { ...(prev.home.joinUs?.statCard||{ metric:"", heading:"", description:""}), description: e.target.value } } },
                }))}
                rows={2}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Info Card Title</Label>
              <Input
                value={content.home.joinUs?.infoCard.title || ""}
                onChange={(e)=> setContent((prev)=> ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), infoCard: { ...(prev.home.joinUs?.infoCard||{ title:"", description:""}), title: e.target.value } } },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Info Card Description</Label>
              <Textarea
                value={content.home.joinUs?.infoCard.description || ""}
                onChange={(e)=> setContent((prev)=> ({
                  ...prev,
                  home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), infoCard: { ...(prev.home.joinUs?.infoCard||{ title:"", description:""}), description: e.target.value } } },
                }))}
                rows={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bottom Title</Label>
            <Input
              value={content.home.joinUs?.bottom.title || ""}
              onChange={(e)=> setContent((prev)=> ({
                ...prev,
                home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), bottom: { ...(prev.home.joinUs?.bottom||{ title:"", description:""}), title: e.target.value } } },
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Bottom Description</Label>
            <Textarea
              value={content.home.joinUs?.bottom.description || ""}
              onChange={(e)=> setContent((prev)=> ({
                ...prev,
                home: { ...prev.home, joinUs: { ...(prev.home.joinUs||{}), bottom: { ...(prev.home.joinUs?.bottom||{ title:"", description:""}), description: e.target.value } } },
              }))}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('testimonials')}
        onFocus={() => setActiveSubSection('testimonials')}
      >
                            <CardHeader>
          <CardTitle>Course Overview</CardTitle>
          <CardDescription>Edit the batch schedule, key details, and CTA shown in the Course section.</CardDescription>
                            </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Kicker</Label>
              <Input
                value={content.home.courseOverview?.kicker || ""}
                onChange={(e)=> setContent(prev=> ({
                  ...prev,
                  home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), kicker: e.target.value } },
                }))}
              />
            </div>
            <div className="space-y-2 md:col-span-3">
              <Label>Title </Label>
              <Input
                value={content.home.courseOverview?.title || ""}
                onChange={(e)=> setContent(prev=> ({
                  ...prev,
                  home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), title: e.target.value } },
                }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Schedule - Morning</Label>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="space-y-2 md:col-span-4">
                <Label>Heading</Label>
                <Input
                  value={content.home.courseOverview?.schedule?.[0]?.heading || ""}
                  onChange={(e)=> setContent(prev=> ({
                    ...prev,
                    home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), schedule: [
                      { ...(prev.home.courseOverview?.schedule?.[0]||{ heading:"", color:"primary", items:[] }), heading: e.target.value },
                      ...(prev.home.courseOverview?.schedule?.slice(1) || [{ heading:"", color:"accent", items:[] }]),
                    ] } },
                  }))}
                />
              </div>

              {(content.home.courseOverview?.schedule?.[0]?.items || []).map((item, ii)=> (
                <div key={ii} className="md:col-span-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Item {ii+1} Label</Label>
                      <Input
                        value={item.label || ""}
                        onChange={(e)=> {
                          setContent(prev => {
                            const prevSchedule = prev.home.courseOverview?.schedule || [
                              { heading:"", color:"primary", items:[] as {label:string; time:string}[] },
                              { heading:"", color:"accent", items:[] as {label:string; time:string}[] },
                            ];
                            const morning = prevSchedule[0] || { heading:"", color:"primary", items:[] as {label:string; time:string}[] };
                            const evening = prevSchedule[1] || { heading:"", color:"accent", items:[] as {label:string; time:string}[] };
                            const updatedMorningItems = (morning.items || []).map((it, j) =>
                              j === ii ? { ...it, label: e.target.value } : it,
                            );
                            return {
                              ...prev,
                              home: {
                                ...prev.home,
                                courseOverview: {
                                  ...(prev.home.courseOverview || {}),
                                  schedule: [
                                    { ...morning, items: updatedMorningItems },
                                    evening,
                                  ],
                                },
                              },
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Item {ii+1} Time</Label>
                      <Input
                        value={item.time || ""}
                        onChange={(e)=> {
                          setContent(prev => {
                            const prevSchedule = prev.home.courseOverview?.schedule || [
                              { heading:"", color:"primary", items:[] as {label:string; time:string}[] },
                              { heading:"", color:"accent", items:[] as {label:string; time:string}[] },
                            ];
                            const morning = prevSchedule[0] || { heading:"", color:"primary", items:[] as {label:string; time:string}[] };
                            const evening = prevSchedule[1] || { heading:"", color:"accent", items:[] as {label:string; time:string}[] };
                            const updatedMorningItems = (morning.items || []).map((it, j) =>
                              j === ii ? { ...it, time: e.target.value } : it,
                            );
                            return {
                              ...prev,
                              home: {
                                ...prev.home,
                                courseOverview: {
                                  ...(prev.home.courseOverview || {}),
                                  schedule: [
                                    { ...morning, items: updatedMorningItems },
                                    evening,
                                  ],
                                },
                              },
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-4 flex justify-start">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setContent(prev => {
                      const prevSchedule = prev.home.courseOverview?.schedule || [
                        { heading:"Morning", color:"primary", items:[] as {label:string; time:string}[] },
                        { heading:"Evening", color:"accent", items:[] as {label:string; time:string}[] },
                      ];
                      const morning = prevSchedule[0] || { heading:"Morning", color:"primary", items:[] as {label:string; time:string}[] };
                      const evening = prevSchedule[1] || { heading:"Evening", color:"accent", items:[] as {label:string; time:string}[] };
                      const nextIndex = (morning.items?.length || 0) + 1;
                      const updatedMorningItems = [...(morning.items || []), { label: `Batch ${nextIndex}`, time: "" }];
                      return {
                        ...prev,
                        home: {
                          ...prev.home,
                          courseOverview: {
                            ...(prev.home.courseOverview || {}),
                            schedule: [
                              { ...morning, items: updatedMorningItems },
                              evening,
                            ],
                          },
                        },
                      };
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add Morning Batch
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Schedule - Evening</Label>
            <div className="grid gap-3 md:grid-cols-4">
              <div className="space-y-2 md:col-span-4">
                <Label>Heading</Label>
                <Input
                  value={content.home.courseOverview?.schedule?.[1]?.heading || ""}
                  onChange={(e)=> setContent(prev=> ({
                    ...prev,
                    home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), schedule: [
                      ...(prev.home.courseOverview?.schedule?.slice(0,1) || [{ heading:"", color:"primary", items:[] }]),
                      { ...(prev.home.courseOverview?.schedule?.[1]||{ heading:"", color:"accent", items:[] }), heading: e.target.value },
                    ] } },
                  }))}
                />
              </div>

              {(content.home.courseOverview?.schedule?.[1]?.items || []).map((item, ii)=> (
                <div key={ii} className="md:col-span-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Item {ii+1} Label</Label>
                      <Input
                        value={item.label || ""}
                        onChange={(e)=> {
                          setContent(prev => {
                            const prevSchedule = prev.home.courseOverview?.schedule || [
                              { heading:"", color:"primary", items:[] as {label:string; time:string}[] },
                              { heading:"", color:"accent", items:[] as {label:string; time:string}[] },
                            ];
                            const morning = prevSchedule[0] || { heading:"", color:"primary", items:[] as {label:string; time:string}[] };
                            const evening = prevSchedule[1] || { heading:"", color:"accent", items:[] as {label:string; time:string}[] };
                            const updatedEveningItems = (evening.items || []).map((it, j) =>
                              j === ii ? { ...it, label: e.target.value } : it,
                            );
                            return {
                              ...prev,
                              home: {
                                ...prev.home,
                                courseOverview: {
                                  ...(prev.home.courseOverview || {}),
                                  schedule: [
                                    morning,
                                    { ...evening, items: updatedEveningItems },
                                  ],
                                },
                              },
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Item {ii+1} Time</Label>
                      <Input
                        value={item.time || ""}
                        onChange={(e)=> {
                          setContent(prev => {
                            const prevSchedule = prev.home.courseOverview?.schedule || [
                              { heading:"", color:"primary", items:[] as {label:string; time:string}[] },
                              { heading:"", color:"accent", items:[] as {label:string; time:string}[] },
                            ];
                            const morning = prevSchedule[0] || { heading:"", color:"primary", items:[] as {label:string; time:string}[] };
                            const evening = prevSchedule[1] || { heading:"", color:"accent", items:[] as {label:string; time:string}[] };
                            const updatedEveningItems = (evening.items || []).map((it, j) =>
                              j === ii ? { ...it, time: e.target.value } : it,
                            );
                            return {
                              ...prev,
                              home: {
                                ...prev.home,
                                courseOverview: {
                                  ...(prev.home.courseOverview || {}),
                                  schedule: [
                                    morning,
                                    { ...evening, items: updatedEveningItems },
                                  ],
                                },
                              },
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-4 flex justify-start">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    setContent(prev => {
                      const prevSchedule = prev.home.courseOverview?.schedule || [
                        { heading:"Morning", color:"primary", items:[] as {label:string; time:string}[] },
                        { heading:"Evening", color:"accent", items:[] as {label:string; time:string}[] },
                      ];
                      const morning = prevSchedule[0] || { heading:"Morning", color:"primary", items:[] as {label:string; time:string}[] };
                      const evening = prevSchedule[1] || { heading:"Evening", color:"accent", items:[] as {label:string; time:string}[] };
                      const nextIndex = (evening.items?.length || 0) + 1;
                      const updatedEveningItems = [...(evening.items || []), { label: `Batch ${nextIndex + (morning.items?.length || 0)}`, time: "" }];
                      return {
                        ...prev,
                        home: {
                          ...prev.home,
                          courseOverview: {
                            ...(prev.home.courseOverview || {}),
                            schedule: [
                              morning,
                              { ...evening, items: updatedEveningItems },
                            ],
                          },
                        },
                      };
                    });
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add Evening Batch
                </Button>
              </div>
            </div>
          </div>

          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>CTA Text</Label>
              <Input
                value={content.home.courseOverview?.ctaText || ""}
                onChange={(e)=> setContent(prev=> ({
                  ...prev,
                  home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), ctaText: e.target.value } },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>CTA Button</Label>
              <Input
                value={content.home.courseOverview?.ctaButton || ""}
                onChange={(e)=> setContent(prev=> ({
                  ...prev,
                  home: { ...prev.home, courseOverview: { ...(prev.home.courseOverview||{}), ctaButton: e.target.value } },
                }))}
              />
            </div>
          
          </div>
        </CardContent>
      </Card>

       <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('methodology-video')}
        onFocus={() => setActiveSubSection('methodology-video')}
      >
        <CardHeader>
          <CardTitle>Our Methodology Section</CardTitle>
          <CardDescription>Edit the badge, title, subtitle, key point, and YouTube video URL for the "Our Methodology" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Badge Text</Label>
            <Input
              value={content.home.methodologyBadge || ''}
              onChange={(e) => setContent(prev => ({
                ...prev,
                home: {
                  ...prev.home,
                  methodologyBadge: e.target.value,
                },
              }))}
              placeholder="Our Methodology"
            />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={content.home.heroTitle}
              onChange={(e) => setContent(prev => ({
                ...prev,
                home: {
                  ...prev.home,
                  heroTitle: e.target.value,
                },
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Textarea
              value={content.home.heroSubtitle}
              onChange={(e) => setContent(prev => ({
                ...prev,
                home: {
                  ...prev.home,
                  heroSubtitle: e.target.value,
                },
              }))}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Key Point</Label>
            <Textarea
              value={content.home.methodologyKeyPoint || ''}
              onChange={(e) => setContent(prev => ({
                ...prev,
                home: {
                  ...prev.home,
                  methodologyKeyPoint: e.target.value,
                },
              }))}
              rows={2}
              placeholder="Direct mentorship from the institute founders with proven teaching methods"
            />
          </div>
          <div className="space-y-2">
            <Label>YouTube Video URL (Embed URL)</Label>
            <Input
              value={content.home.directorVideoUrl}
              onChange={(e) => setContent(prev => ({
                ...prev,
                home: {
                  ...prev.home,
                  directorVideoUrl: e.target.value,
                },
              }))}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
            />
           
           
                                </div>
                            </CardContent>
                        </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('methodology')}
        onFocus={() => setActiveSubSection('methodology')}
      >
        <CardHeader>
          <CardTitle>Methodology (Home)</CardTitle>
          <CardDescription>Edit all texts in the Teaching Methodology section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Heading (small)</Label>
              <Input
                value={content.home.methodologyHeading}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: { ...prev.home, methodologyHeading: e.target.value },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.methodologyTitle}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: { ...prev.home, methodologyTitle: e.target.value },
                }))}
              />
            </div>
          </div>
                                <div className="space-y-4">
            {content.home.methodologySections.map((section, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Section {index + 1}</Label>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setContent(prev => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          methodologySections: prev.home.methodologySections.filter((_, i) => i !== index),
                        },
                      }))
                    }
                  >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                <div className="grid gap-3 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) =>
                        setContent(prev => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            methodologySections: prev.home.methodologySections.map((s, i) =>
                              i === index ? { ...s, title: e.target.value } : s
                            ),
                          },
                        }))
                      }
                    />
                                            </div>
                </div>

                                            <div className="space-y-2">
                                                <Label>Description</Label>
                                                <Textarea
                    rows={4}
                    value={section.description || section.intro || ''}
                    onChange={(e) =>
                      setContent(prev => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          methodologySections: prev.home.methodologySections.map((s, i) =>
                            i === index ? { ...s, description: e.target.value } : s
                          ),
                        },
                      }))
                    }
                                                />
                                            </div>

                {index === 1 && (
                  <div className="space-y-2">
                    <Label>Objectives Title (Section 2)</Label>
                    <Input
                      value={section.objectivesTitle || ''}
                      onChange={(e) =>
                        setContent(prev => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            methodologySections: prev.home.methodologySections.map((s, i) =>
                              i === index ? { ...s, objectivesTitle: e.target.value } : s
                            ),
                          },
                        }))
                      }
                    />
                  </div>
                )}

                {index === 1 && (
                  <div className="space-y-2">
                    <Label>Objectives (Section 2)</Label>
                    <div className="space-y-2">
                      {(section.objectives || []).map((obj, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <Input
                            className="flex-1"
                            value={obj}
                            onChange={(e) =>
                              setContent(prev => ({
                                ...prev,
                                home: {
                                  ...prev.home,
                                  methodologySections: prev.home.methodologySections.map((s, i) =>
                                    i === index ? { ...s, objectives: (s.objectives || []).map((o, j) => (j === oi ? e.target.value : o)) } : s
                                  ),
                                },
                              }))
                            }
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setContent(prev => ({
                                ...prev,
                                home: {
                                  ...prev.home,
                                  methodologySections: prev.home.methodologySections.map((s, i) =>
                                    i === index ? { ...s, objectives: (s.objectives || []).filter((_, j) => j !== oi) } : s
                                  ),
                                },
                              }))
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                                        </div>
                                    ))}
                                </div>
                    
                  </div>
                )}
              </div>
            ))}
          </div>

                            </CardContent>
                        </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('gain-from-course')}
        onFocus={() => setActiveSubSection('gain-from-course')}
      >
                            <CardHeader>
          <CardTitle>What You Will Gain</CardTitle>
          <CardDescription>Edit the heading, title, and accordion content for the "What you would gain from the course!" section.</CardDescription>
                            </CardHeader>
        <CardContent className="space-y-6">
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2">
              <Label>Heading (small)</Label>
              <Input
                value={content.home.gainHeading}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    gainHeading: e.target.value,
                  },
                }))}
              />
                                                </div>
                                                <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.gainTitle}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    gainTitle: e.target.value,
                  },
                }))}
              />
                                                </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Accordion Groups</Label>
            {(content.home.gainGroups || []).map((group, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Group {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        gainGroups: (prev.home.gainGroups || []).filter((_, i) => i !== index),
                      },
                    }))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                                            </div>
                                            <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={group.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        gainGroups: (prev.home.gainGroups || []).map((g, i) =>
                          i === index ? { ...g, title: e.target.value } : g
                        ),
                      },
                    }))}
                                                />
                                            </div>
                                            <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Textarea
                    value={group.subtitle}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        gainGroups: (prev.home.gainGroups || []).map((g, i) =>
                          i === index ? { ...g, subtitle: e.target.value } : g
                        ),
                      },
                    }))}
                    rows={2}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Items</Label>
                  {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2 rounded border p-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-muted-foreground">Item {itemIndex + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setContent(prev => ({
                            ...prev,
                            home: {
                              ...prev.home,
                              gainGroups: (prev.home.gainGroups || []).map((g, i) =>
                                i === index ? { ...g, items: g.items.filter((_, j) => j !== itemIndex) } : g
                              ),
                            },
                          }))}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                                                <Input
                        placeholder="Item Title"
                        value={item.title}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            gainGroups: (prev.home.gainGroups || []).map((g, i) =>
                              i === index ? {
                                ...g,
                                items: g.items.map((it, j) =>
                                  j === itemIndex ? { ...it, title: e.target.value } : it
                                ),
                              } : g
                            ),
                          },
                        }))}
                      />
                      <Textarea
                        placeholder="Item Description"
                        value={item.description}
                        onChange={(e) => setContent(prev => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            gainGroups: (prev.home.gainGroups || []).map((g, i) =>
                              i === index ? {
                                ...g,
                                items: g.items.map((it, j) =>
                                  j === itemIndex ? { ...it, description: e.target.value } : it
                                ),
                              } : g
                            ),
                          },
                        }))}
                        rows={2}
                                                />
                    </div>
                  ))}
                 
                                            </div>
                                        </div>
                                    ))}
           
                                </div>

         
                            </CardContent>
                        </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection("faculty-highlight")}
        onFocus={() => setActiveSubSection("faculty-highlight")}
      >
                            <CardHeader>
          <CardTitle>Core Faculty Section</CardTitle>
          <CardDescription>
            Edit the badge, heading and description shown above the three owner cards on the Home page.
          </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
            <Label>Badge Label</Label>
                                    <Input
              value={content.home.facultyHighlight?.badgeLabel || ""}
                                        onChange={(e) =>
                                            setContent((prev) => ({
                                                ...prev,
                  home: {
                    ...prev.home,
                    facultyHighlight: {
                      ...(prev.home.facultyHighlight || {
                        badgeLabel: "",
                        title: "",
                        description: "",
                      }),
                      badgeLabel: e.target.value,
                    },
                  },
                                            }))
                                        }
                                    />
            
                                </div>

                                <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={content.home.facultyHighlight?.title || ""}
                                        onChange={(e) =>
                                            setContent((prev) => ({
                                                ...prev,
                  home: {
                    ...prev.home,
                    facultyHighlight: {
                      ...(prev.home.facultyHighlight || {
                        badgeLabel: "",
                        title: "",
                        description: "",
                      }),
                      title: e.target.value,
                    },
                  },
                                            }))
                                        }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
                                        rows={3}
              value={content.home.facultyHighlight?.description || ""}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    facultyHighlight: {
                      ...(prev.home.facultyHighlight || {
                        badgeLabel: "",
                        title: "",
                        description: "",
                      }),
                      description: e.target.value,
                    },
                  },
                }))
              }
            />
             <div className="rounded-lg border border-border/50 bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The Cards are editable in the <strong>Faculty</strong> page.
            </p>
          </div>
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('home-achievements')}
        onFocus={() => setActiveSubSection('home-achievements')}
      >
        <CardHeader>
          <CardTitle>What You'll Achieve</CardTitle>
          <CardDescription>Edit the heading and each achievement row in the "What You'll Achieve" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.achievementsSection?.title || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    achievementsSection: {
                      ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
                      title: e.target.value,
                    },
                  },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={content.home.achievementsSection?.subtitle || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    achievementsSection: {
                      ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
                      subtitle: e.target.value,
                    },
                  },
                }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            {(content.home.achievementsSection?.items || []).map((item, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Row {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAchievementItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        achievementsSection: {
                          ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
                          items: (prev.home.achievementsSection?.items || []).map((it, i) =>
                            i === index ? { ...it, title: e.target.value } : it,
                          ),
                        },
                      },
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        achievementsSection: {
                          ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
                          items: (prev.home.achievementsSection?.items || []).map((it, i) =>
                            i === index ? { ...it, description: e.target.value } : it,
                          ),
                        },
                      },
                    }))}
                  />
                </div>
              </div>
            ))}
          </div>
          
        </CardContent>
      </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('activity-videos')}
        onFocus={() => setActiveSubSection('activity-videos')}
      >
        <CardHeader>
          <CardTitle>Student Activities</CardTitle>
          <CardDescription>Edit the title, subtitle, and video content for the "Student Activities" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.activityVideos?.title || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    activityVideos: {
                      ...(prev.home.activityVideos || { title: '', subtitle: '', videos: [] }),
                      title: e.target.value,
                    },
                  },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={content.home.activityVideos?.subtitle || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    activityVideos: {
                      ...(prev.home.activityVideos || { title: '', subtitle: '', videos: [] }),
                      subtitle: e.target.value,
                    },
                  },
                }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Videos</Label>
            {(content.home.activityVideos?.videos || []).map((video, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Video {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        activityVideos: {
                          ...(prev.home.activityVideos || { title: '', subtitle: '', videos: [] }),
                          videos: (prev.home.activityVideos?.videos || []).filter((_, i) => i !== index),
                        },
                      },
                    }))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={video.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        activityVideos: {
                          ...(prev.home.activityVideos || { title: '', subtitle: '', videos: [] }),
                          videos: (prev.home.activityVideos?.videos || []).map((v, i) =>
                            i === index ? { ...v, title: e.target.value } : v
                          ),
                        },
                      },
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>YouTube Video URL (Embed URL)</Label>
                  <Input
                    value={video.videoUrl}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        activityVideos: {
                          ...(prev.home.activityVideos || { title: '', subtitle: '', videos: [] }),
                          videos: (prev.home.activityVideos?.videos || []).map((v, i) =>
                            i === index ? { ...v, videoUrl: e.target.value } : v
                          ),
                        },
                      },
                    }))}
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  />
                  
                </div>
              </div>
            ))}
           
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('activity-images')}
        onFocus={() => setActiveSubSection('activity-images')}
      >
        <CardHeader>
          <CardTitle>Moments that Matter</CardTitle>
          <CardDescription>Edit the title, subtitle, and image content for the "Moments that Matter" section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.activityImages?.title || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    activityImages: {
                      ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                      title: e.target.value,
                    },
                  },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={content.home.activityImages?.subtitle || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    activityImages: {
                      ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                      subtitle: e.target.value,
                    },
                  },
                }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold">Images</Label>
            {(content.home.activityImages?.images || []).map((image, index) => (
              <div key={index} className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">Image {index + 1}</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        activityImages: {
                          ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                          images: (prev.home.activityImages?.images || []).filter((_, i) => i !== index),
                        },
                      },
                    }))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={image.title}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        activityImages: {
                          ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                          images: (prev.home.activityImages?.images || []).map((img, i) =>
                            i === index ? { ...img, title: e.target.value } : img
                          ),
                        },
                      },
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  {image.src && (
                    <div className="relative mb-2">
                      <img
                        src={image.src.startsWith('data:') || image.src.startsWith('http') ? image.src : imageMap[image.src] || image.src}
                        alt={image.title || `Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      {image.src.startsWith('data:') && (
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => setContent(prev => ({
                            ...prev,
                            home: {
                              ...prev.home,
                              activityImages: {
                                ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                                images: (prev.home.activityImages?.images || []).map((img, i) =>
                                  i === index ? { ...img, src: '' } : img
                                ),
                              },
                            },
                          }))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const result = reader.result as string;
                        setContent(prev => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            activityImages: {
                              ...(prev.home.activityImages || { title: '', subtitle: '', images: [] }),
                              images: (prev.home.activityImages?.images || []).map((img, i) =>
                                i === index ? { ...img, src: result } : img
                              ),
                            },
                          },
                        }));
                      };
                      reader.readAsDataURL(file);
                      e.target.value = '';
                    }}
                  />
                </div>
              </div>
            ))}
            
            
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('home-reviews')}
        onFocus={() => setActiveSubSection('home-reviews')}
      >
        <CardHeader>
          <CardTitle>Review from our achievers</CardTitle>
          <CardDescription>Edit the title and subtitle for the "Review from our achievers" section. The review links are editable in the Success Stories section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.home.homeReviews?.title || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    homeReviews: {
                      ...(prev.home.homeReviews || { title: '', subtitle: '' }),
                      title: e.target.value,
                    },
                  },
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={content.home.homeReviews?.subtitle || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    homeReviews: {
                      ...(prev.home.homeReviews || { title: '', subtitle: '' }),
                      subtitle: e.target.value,
                    },
                  },
                }))}
              />
            </div>
          </div>
          
        </CardContent>
      </Card>

      {/* Information Banner Management */}
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('information-banner')}
        onFocus={() => setActiveSubSection('information-banner')}
      >
        <CardHeader>
          <CardTitle>Information Banner</CardTitle>
          <CardDescription>Manage the announcement banner displayed between methodology and gain sections.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <Label className="text-sm font-medium">Banner Visibility</Label>
                <p className="text-xs text-muted-foreground">Show or hide the banner on the home page</p>
              </div>
              <Button
                type="button"
                variant={content.home.informationBanner?.isVisible ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      informationBanner: {
                        ...(prev.home.informationBanner || { isVisible: false, content: "", imageUrl: undefined }),
                        isVisible: !prev.home.informationBanner?.isVisible,
                      },
                    },
                  }));
                }}
                aria-label={`Turn banner ${content.home.informationBanner?.isVisible ? 'off' : 'on'}`}
                aria-pressed={content.home.informationBanner?.isVisible}
              >
                {content.home.informationBanner?.isVisible ? "ON" : "OFF"}
              </Button>
            </div>

            {/* Banner Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="banner-content">Banner Content</Label>
                <span 
                  className="text-xs text-muted-foreground"
                  aria-live="polite"
                  aria-label={`Character count: ${(content.home.informationBanner?.content || "").length} of 500`}
                >
                  {(content.home.informationBanner?.content || "").length}/500 characters
                </span>
              </div>
              <Textarea
                id="banner-content"
                placeholder="Enter your announcement, event details, or important information..."
                value={content.home.informationBanner?.content || ""}
                onChange={(e) => {
                  const newContent = e.target.value;
                  if (newContent.length > 500) {
                    toast({ 
                      title: "Content too long", 
                      description: "Banner content should be 500 characters or less for optimal display.", 
                      variant: "destructive" as any 
                    });
                    return;
                  }
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      informationBanner: {
                        ...(prev.home.informationBanner || { isVisible: false, content: "", imageUrl: undefined }),
                        content: newContent,
                      },
                    },
                  }));
                }}
                rows={3}
                maxLength={500}
                aria-describedby="banner-content-help"
              />
              <div id="banner-content-help" className="text-xs text-muted-foreground">
                This content will be displayed prominently on the home page between sections.
              </div>
              {(content.home.informationBanner?.content || "").length > 400 && (
                <p className="text-xs text-amber-600" role="alert">
                  ⚠️ Consider keeping content concise for better readability
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="banner-image-upload">Banner Image (Optional)</Label>
              {content.home.informationBanner?.imageUrl && (
                <div className="relative mb-2">
                  <img
                    src={content.home.informationBanner.imageUrl}
                    alt="Banner preview - will be displayed alongside the banner content"
                    className="w-full h-32 object-cover rounded-md border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
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
                          informationBanner: {
                            ...(prev.home.informationBanner || { isVisible: false, content: "", imageUrl: undefined }),
                            imageUrl: undefined,
                          },
                        },
                      }));
                    }}
                    aria-label="Remove banner image"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="banner-image-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Validate file type
                      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                      if (!validTypes.includes(file.type)) {
                        toast({ 
                          title: "Invalid file type", 
                          description: "Please upload a valid image file (JPG, PNG, GIF, or WebP).", 
                          variant: "destructive" as any 
                        });
                        return;
                      }

                      // Validate file size (5MB limit)
                      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                      if (file.size > maxSize) {
                        toast({ 
                          title: "File too large", 
                          description: "Please upload an image smaller than 5MB.", 
                          variant: "destructive" as any 
                        });
                        return;
                      }

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result as string;
                        setContent((prev) => ({
                          ...prev,
                          home: {
                            ...prev.home,
                            informationBanner: {
                              ...(prev.home.informationBanner || { isVisible: false, content: "", imageUrl: undefined }),
                              imageUrl: base64String,
                            },
                          },
                        }));
                        toast({ 
                          title: "Image uploaded", 
                          description: "Banner image has been successfully uploaded." 
                        });
                      };
                      reader.onerror = () => {
                        toast({ 
                          title: "Upload failed", 
                          description: "Failed to read the image file. Please try again.", 
                          variant: "destructive" as any 
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                    // Reset input
                    e.target.value = '';
                  }}
                  aria-describedby="image-upload-help"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => {
                    document.getElementById('banner-image-upload')?.click();
                  }}
                  aria-label="Upload banner image"
                >
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
              <div id="image-upload-help" className="text-xs text-muted-foreground">
                Supported formats: JPG, PNG, GIF, WebP. Maximum size: 5MB. Image will be displayed on the left side of the banner on desktop.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

     
    </>
  );

  const handleAddAchievementItem = () => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        achievementsSection: {
          ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
          items: [...(prev.home.achievementsSection?.items || []), { title: '', description: '' }],
        },
      },
    }));
  };

  const handleRemoveAchievementItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        achievementsSection: {
          ...(prev.home.achievementsSection || { title: '', subtitle: '', items: [] }),
          items: (prev.home.achievementsSection?.items || []).filter((_, i) => i !== index),
        },
      },
    }));
  };

  const renderHeaderEditor = () => (
    <>
                        <Card 
                            className="shadow-soft"
                            onMouseEnter={() => setActiveSubSection('header')}
                            onFocus={() => setActiveSubSection('header')}
                        >
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

                        <Card 
                            className="shadow-soft"
                            onMouseEnter={() => setActiveSubSection('header')}
                            onFocus={() => setActiveSubSection('header')}
                        >
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
    <div className="overflow-x-auto overflow-y-hidden scroll-smooth" style={{ scrollbarWidth: 'auto', scrollbarColor: '#64748b #e2e8f0' }}>
      <div className="flex gap-8 pb-4" style={{ minWidth: '2500px', width: 'max-content' }}>
    <Card
      className="shadow-soft flex-shrink-0"
      style={{ width: '450px', minWidth: '450px' }}
      onMouseEnter={() => setActiveSubSection('footer-institute')}
      onFocus={() => setActiveSubSection('footer-institute')}
    >
                            <CardHeader>
        <CardTitle>Footer - Institute Info</CardTitle>
        <CardDescription>Main footer institute name, sub header line, and tagline.</CardDescription>
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
          <Label htmlFor="footerSubHeader">Sub Header (small line under the name)</Label>
          <Textarea
            id="footerSubHeader"
            value={content.footer.subHeader}
            onChange={(e) =>
              setContent((prev) => ({
                ...prev,
                footer: { ...prev.footer, subHeader: e.target.value },
              }))
            }
            rows={2}
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

   

    <Card
      className="shadow-soft flex-shrink-0"
      style={{ width: '400px', minWidth: '400px' }}
      onMouseEnter={() => setActiveSubSection('footer-quick-links')}
      onFocus={() => setActiveSubSection('footer-quick-links')}
    >
                            <CardHeader>
        <CardTitle>Quick Links</CardTitle>
        <CardDescription>Navigation link labels displayed in the footer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {content.footer.quickLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="flex-1"
                placeholder="Label"
                value={link.label}
                onChange={(e) => {
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      quickLinks: prev.footer.quickLinks.map((l, i) =>
                        i === index ? { ...l, label: e.target.value } : l
                      ),
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
                      quickLinks: prev.footer.quickLinks.filter((_, i) => i !== index),
                    },
                  }));
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
       
      </CardContent>
    </Card>

    <Card
      className="shadow-soft flex-shrink-0"
      style={{ width: '400px', minWidth: '400px' }}
      onMouseEnter={() => setActiveSubSection('footer-what-we-do')}
      onFocus={() => setActiveSubSection('footer-what-we-do')}
    >
      <CardHeader>
        <CardTitle>What We Do</CardTitle>
        <CardDescription>Items shown under the “What We Do” column in the footer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {(content.footer.whatWeDo || []).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="flex-1"
                value={item}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    footer: {
                      ...prev.footer,
                      whatWeDo: (prev.footer.whatWeDo || []).map((w, i) => (i === index ? e.target.value : w)),
                    },
                  }))
                }
              />
              
            </div>
          ))}
        </div>
       
      </CardContent>
    </Card>

    <Card
      className="shadow-soft flex-shrink-0"
      style={{ width: '450px', minWidth: '450px' }}
      onMouseEnter={() => setActiveSubSection('footer-contact')}
      onFocus={() => setActiveSubSection('footer-contact')}
    >
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

    <Card
      className="shadow-soft flex-shrink-0"
      style={{ width: '350px', minWidth: '350px' }}
      onMouseEnter={() => setActiveSubSection('footer-copyright')}
      onFocus={() => setActiveSubSection('footer-copyright')}
    >
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
      </div>
    </div>
  );

  const renderAboutEditor = () => (
    <>
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('about-hero')}
        onFocus={() => setActiveSubSection('about-hero')}
      >
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

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('about-highlight')}
        onFocus={() => setActiveSubSection('about-highlight')}
      >
        <CardHeader>
          <CardTitle>About Highlight</CardTitle>
          <CardDescription>Edit the heading and paragraphs in the highlight section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading (Primary)</Label>
            <Input
              value={content.about.highlight?.headingPrimary || ""}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    highlight: { ...(prev.about.highlight || { headingPrimary: "", headingSecondary: "", paragraphs: [] }), headingPrimary: e.target.value },
                  },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Heading (Secondary)</Label>
            <Input
              value={content.about.highlight?.headingSecondary || ""}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    highlight: { ...(prev.about.highlight || { headingPrimary: "", headingSecondary: "", paragraphs: [] }), headingSecondary: e.target.value },
                  },
                }))
              }
            />
          </div>
          <div className="space-y-3">
            <Label>Paragraphs</Label>
            {(content.about.highlight?.paragraphs || []).map((p, index) => (
              <div key={index} className="space-y-2 rounded border p-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Paragraph {index + 1}</Label>
                </div>
                <Textarea
                  rows={3}
                  value={p}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        highlight: {
                          ...(prev.about.highlight || { headingPrimary: "", headingSecondary: "", paragraphs: [] }),
                          paragraphs: (prev.about.highlight?.paragraphs || []).map((val, i) =>
                            i === index ? e.target.value : val,
                          ),
                        },
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('about-story')}
        onFocus={() => setActiveSubSection('about-story')}
      >
        <CardHeader>
          <CardTitle>Our Story</CardTitle>
          <CardDescription>Edit each paragraph of the story section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.about.story.map((paragraph, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Paragraph {index + 1}</Label>
              </div>
              <Textarea
                rows={3}
                value={paragraph}
                onChange={(e) => handleAboutStoryChange(index, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('about-amenities')}
        onFocus={() => setActiveSubSection('about-amenities')}
      >
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <CardDescription>Edit the amenities title, description, list, and images.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={content.about.amenities?.title || ""}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    about: {
                      ...prev.about,
                      amenities: { ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }), title: e.target.value },
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={content.about.amenities?.description || ""}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    about: {
                      ...prev.about,
                      amenities: { ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }), description: e.target.value },
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Amenities List</Label>
            {(content.about.amenities?.amenitiesList || []).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  className="flex-1"
                  value={item}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        amenities: {
                          ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }),
                          amenitiesList: (prev.about.amenities?.amenitiesList || []).map((a, i) => (i === index ? e.target.value : a)),
                        },
                      },
                    }))
                  }
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        amenities: {
                          ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }),
                          amenitiesList: (prev.about.amenities?.amenitiesList || []).filter((_, i) => i !== index),
                        },
                      },
                    }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label>Carousel Images (upload)</Label>
            {(content.about.amenities?.carouselImages || []).map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 h-16 rounded overflow-hidden border bg-muted flex-shrink-0">
                  {item ? (
                    <img src={item} alt={`Amenity ${index + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    className="flex-1"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const result = reader.result as string;
                        setContent((prev) => ({
                          ...prev,
                          about: {
                            ...prev.about,
                            amenities: {
                              ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }),
                              carouselImages: (prev.about.amenities?.carouselImages || []).map((a, i) =>
                                i === index ? result : a
                              ),
                            },
                          },
                        }));
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        about: {
                          ...prev.about,
                          amenities: {
                            ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }),
                            carouselImages: (prev.about.amenities?.carouselImages || []).filter((_, i) => i !== index),
                          },
                        },
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() =>
                setContent((prev) => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    amenities: {
                      ...(prev.about.amenities || { title: "", description: "", amenitiesList: [], carouselImages: [] }),
                      carouselImages: [...(prev.about.amenities?.carouselImages || []), ""],
                    },
                  },
                }))
              }
            >
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </div>
        </CardContent>
      </Card>

        <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('about-community')}
        onFocus={() => setActiveSubSection('about-community')}
      >
        <CardHeader>
          <CardTitle>Serving the Community</CardTitle>
          <CardDescription>Edit the heading and description for the community section.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Heading</Label>
            <Input
              value={content.about.community?.title || ""}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    community: { ...(prev.about.community || { title: "", description: "" }), title: e.target.value },
                  },
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              rows={4}
              value={content.about.community?.description || ""}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    community: { ...(prev.about.community || { title: "", description: "" }), description: e.target.value },
                  },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {renderCardListEditor("Core Values", content.about.coreValues, (next) =>
        setContent((prev) => ({
          ...prev,
          about: { ...prev.about, coreValues: next },
        })),
        'about-core-values'
      )}

      {renderCardListEditor("Why We're Different", content.about.differentiators, (next) =>
        setContent((prev) => ({
          ...prev,
          about: { ...prev.about, differentiators: next },
        })),
        'about-differentiators'
      )}

    </>
  );

  

  const renderCardListEditor = (
    title: string,
    list: { title: string; description: string }[],
    onChange: (next: { title: string; description: string }[]) => void,
    subsectionId?: string,
  ) => (
    <Card 
      className="shadow-soft"
      onMouseEnter={subsectionId ? () => setActiveSubSection(subsectionId) : undefined}
      onFocus={subsectionId ? () => setActiveSubSection(subsectionId) : undefined}
    >
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
        
      </CardContent>
    </Card>
  );

  const handleAboutStoryChange = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, story: prev.about.story.map((paragraph, i) => (i === index ? value : paragraph)) },
    }));
  };



  const renderCoursesEditor = () => (
    <>
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('courses-hero')}
        onFocus={() => setActiveSubSection('courses-hero')}
      >
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

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('courses-grid')}
        onFocus={() => setActiveSubSection('courses-grid')}
      >
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

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('courses-benefits')}
        onFocus={() => setActiveSubSection('courses-benefits')}
      >
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

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('courses-learning')}
        onFocus={() => setActiveSubSection('courses-learning')}
      >
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
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('admissions-hero')}
        onFocus={() => setActiveSubSection('admissions-hero')}
      >
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
              placeholder="Call Button Text"
              value={content.admissions.contactCtas.phoneLabel}
              onChange={(e) => handleAdmissionsCtaChange("phoneLabel", e.target.value)}
            />
            <Input
              placeholder="Request Callback Button Text"
              value={content.admissions.contactCtas.secondaryText}
              onChange={(e) => handleAdmissionsCtaChange("secondaryText", e.target.value)}
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
        subsectionId: 'admissions-steps',
        disableAddButton: true,
      })}

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('admissions-details')}
        onFocus={() => setActiveSubSection('admissions-details')}
      >
        <CardHeader>
          <CardTitle>The Course (Preview Only)</CardTitle>
          <CardDescription>This section is rendered from the Home page “The Course” content. Edit it in Home.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            The Course layout and data are shared with the Home page. Update it in Home &gt; The Course to see changes here.
          </p>
        </CardContent>
      </Card>

      {renderListEditor("Who Should Join", content.admissions.targetGroups, {
        fieldRender: (group, groupIndex) => (
          <>
            <div className="space-y-2">
              <Label>Card Title</Label>
              <Input
                value={group.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    admissions: {
                      ...prev.admissions,
                      targetGroups: prev.admissions.targetGroups.map((g, i) =>
                        i === groupIndex ? { ...g, title: e.target.value } : g,
                      ),
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label>Benefits</Label>
              {group.benefits.map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        admissions: {
                          ...prev.admissions,
                          targetGroups: prev.admissions.targetGroups.map((g, i) =>
                            i === groupIndex
                              ? {
                                  ...g,
                                  benefits: g.benefits.map((b, bi) =>
                                    bi === benefitIndex ? e.target.value : b,
                                  ),
                                }
                              : g,
                          ),
                        },
                      }))
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        admissions: {
                          ...prev.admissions,
                          targetGroups: prev.admissions.targetGroups.map((g, i) =>
                            i === groupIndex
                              ? {
                                  ...g,
                                  benefits: g.benefits.filter((_, bi) => bi !== benefitIndex),
                                }
                              : g,
                          ),
                        },
                      }))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
             
            </div>
          </>
        ),
        onAdd: () =>
          setContent((prev) => ({
            ...prev,
            admissions: {
              ...prev.admissions,
              targetGroups: [
                ...prev.admissions.targetGroups,
                { title: "New Group", benefits: [""] },
              ],
            },
          })),
        onRemove: (groupIndex) =>
          setContent((prev) => ({
            ...prev,
            admissions: {
              ...prev.admissions,
              targetGroups: prev.admissions.targetGroups.filter((_, i) => i !== groupIndex),
            },
          })),
        subsectionId: 'admissions-target-groups',
      })}

      {renderSimpleStringList(
        "Why Choose Us",
        "Reasons shown in the highlighted list.",
        content.admissions.whyChoose,
        (next) =>
          setContent((prev) => ({
            ...prev,
            admissions: { ...prev.admissions, whyChoose: next },
          })),
        'admissions-why-choose',
        true
      )}

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('admissions-cta')}
        onFocus={() => setActiveSubSection('admissions-cta')}
      >
        <CardHeader>
          <CardTitle>Final CTA Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Title" value={content.admissions.cta.title} onChange={(e) => handleAdmissionBannerChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.admissions.cta.subtitle} onChange={(e) => handleAdmissionBannerChange("subtitle", e.target.value)} />
          <Input placeholder="Tagline" value={content.admissions.cta.tagline} onChange={(e) => handleAdmissionBannerChange("tagline", e.target.value)} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Call Button Text"
              value={content.admissions.cta.phoneLabel}
              onChange={(e) => handleAdmissionBannerChange("phoneLabel", e.target.value)}
            />
            <Input
              placeholder="Directions Button Text"
              value={content.admissions.cta.directionsLabel}
              onChange={(e) => handleAdmissionBannerChange("directionsLabel", e.target.value)}
            />
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
      subsectionId?: string;
      disableAddButton?: boolean;
    },
  ) => (
    <Card 
      className="shadow-soft"
      onMouseEnter={opts.subsectionId ? () => setActiveSubSection(opts.subsectionId!) : undefined}
      onFocus={opts.subsectionId ? () => setActiveSubSection(opts.subsectionId!) : undefined}
    >
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
        
      </CardContent>
    </Card>
  );

  const renderSimpleStringList = (
    title: string,
    description: string,
    list: string[],
    onChange: (next: string[]) => void,
    subsectionId?: string,
    disableAddButton?: boolean,
  ) => (
    <Card 
      className="shadow-soft"
      onMouseEnter={subsectionId ? () => setActiveSubSection(subsectionId) : undefined}
      onFocus={subsectionId ? () => setActiveSubSection(subsectionId) : undefined}
    >
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
        {!disableAddButton && (
          <Button variant="outline" className="flex items-center gap-2" onClick={() => onChange([...list, ""])}>
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        )}
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



  const renderGalleryEditor = () => {
    const categoryKeys = Object.keys(content.gallery.categories) as Array<keyof typeof content.gallery.categories>;

    return (
      <>
        <Card 
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection('gallery-hero')}
          onFocus={() => setActiveSubSection('gallery-hero')}
        >
          <CardHeader>
            <CardTitle>Gallery Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Title" value={content.gallery.hero.title} onChange={(e) => handleGalleryHeroChange("title", e.target.value)} />
            <Textarea rows={2} placeholder="Subtitle" value={content.gallery.hero.subtitle} onChange={(e) => handleGalleryHeroChange("subtitle", e.target.value)} />
          </CardContent>
        </Card>

        {categoryKeys.map((key) => (
          <Card 
            key={key} 
            className="shadow-soft"
            onMouseEnter={() => setActiveSubSection('gallery-grid')}
            onFocus={() => setActiveSubSection('gallery-grid')}
          >
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
                  <div className="space-y-3">
                    <Label>Preview</Label>
                    <div className="aspect-video rounded-lg border bg-muted/20 flex items-center justify-center overflow-hidden">
                      {resolveGalleryImageSrc(item.src) ? (
                        <img
                          src={resolveGalleryImageSrc(item.src)}
                          alt={item.title || `Gallery image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground">No image selected</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <label className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold cursor-pointer hover:bg-accent/10">
                        <Upload className="h-4 w-4" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleGalleryImageUpload(key, index, e)}
                        />
                      </label>
                      {resolveGalleryImageSrc(item.src) && (
                        <Button type="button" variant="ghost" onClick={() => handleClearGalleryImage(key, index)}>
                          Remove Image
                        </Button>
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => handleGalleryImageChange(key, index, "title", e.target.value)}
                  />
                </div>
              ))}
              <Button variant="outline" className="flex items-center gap-2" onClick={() => handleAddGalleryImage(key)}>
                <Plus className="h-4 w-4" />
                Add Image
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection('gallery-videos')}
          onFocus={() => setActiveSubSection('gallery-videos')}
        >
          <CardHeader>
            <CardTitle>Gallery Videos</CardTitle>
            <CardDescription>Videos shown under the Videos tab on the Gallery page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.gallery.videos?.map((video, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Video {index + 1}</Label>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => {
                      setContent(prev => ({
                        ...prev,
                        gallery: {
                          ...prev.gallery,
                          videos: (prev.gallery.videos || []).filter((_, i) => i !== index),
                        },
                      }));
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={video.title}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContent(prev => ({
                        ...prev,
                        gallery: {
                          ...prev.gallery,
                          videos: (prev.gallery.videos || []).map((v, i) =>
                            i === index ? { ...v, title: value } : v,
                          ),
                        },
                      }));
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Video URL (YouTube embed)</Label>
                  <Input
                    value={video.url}
                    onChange={(e) => {
                      const value = e.target.value;
                      setContent(prev => ({
                        ...prev,
                        gallery: {
                          ...prev.gallery,
                          videos: (prev.gallery.videos || []).map((v, i) =>
                            i === index ? { ...v, url: value } : v,
                          ),
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                setContent(prev => ({
                  ...prev,
                  gallery: {
                    ...prev.gallery,
                    videos: [
                      ...(prev.gallery.videos || []),
                      { title: "", url: "" },
                    ],
                  },
                }));
              }}
            >
              <Plus className="h-4 w-4" />
              Add Video
            </Button>
          </CardContent>
        </Card>
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

  const handleGalleryImageUpload = (
    category: keyof typeof content.gallery.categories,
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setContent((prev) => ({
        ...prev,
        gallery: {
          ...prev.gallery,
          categories: {
            ...prev.gallery.categories,
            [category]: prev.gallery.categories[category].map((item, i) =>
              i === index ? { ...item, src: result } : item,
            ),
          },
        },
      }));
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleClearGalleryImage = (
    category: keyof typeof content.gallery.categories,
    index: number,
  ) => {
    setContent((prev) => ({
      ...prev,
      gallery: {
        ...prev.gallery,
        categories: {
          ...prev.gallery.categories,
          [category]: prev.gallery.categories[category].map((item, i) =>
            i === index ? { ...item, src: "" } : item,
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

    const renderReviewsEditor = () => {
    const googleTestimonials = content.reviews.testimonials
      .map((testimonial, index) => ({ testimonial, index }))
      .filter(({ testimonial }) => (testimonial.source || "google") === "google");

    const facebookTestimonials = content.reviews.testimonials
      .map((testimonial, index) => ({ testimonial, index }))
      .filter(({ testimonial }) => testimonial.source === "facebook");

    const justdialTestimonials = content.reviews.testimonials
      .map((testimonial, index) => ({ testimonial, index }))
      .filter(({ testimonial }) => testimonial.source === "justdial");

    return (
      <>
        {/* Reviews Hero */}
        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection("reviews-hero")}
          onFocus={() => setActiveSubSection("reviews-hero")}
        >
          <CardHeader>
            <CardTitle>Reviews Hero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Title"
              value={content.reviews.hero.title}
              onChange={(e) => handleReviewsHeroChange("title", e.target.value)}
            />
            <Textarea
              rows={2}
              placeholder="Subtitle"
              value={content.reviews.hero.subtitle}
              onChange={(e) => handleReviewsHeroChange("subtitle", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Google section + testimonials */}
        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection("reviews-google")}
          onFocus={() => setActiveSubSection("reviews-google")}
        >
          <CardHeader>
            <CardTitle>Google Reviews Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Section Title"
                value={content.reviews.sections?.google.title || ""}
                onChange={(e) => handleReviewsSectionChange("google", "title", e.target.value)}
              />
              <Textarea
                rows={2}
                placeholder="Section Description"
                value={content.reviews.sections?.google.description || ""}
                onChange={(e) => handleReviewsSectionChange("google", "description", e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {googleTestimonials.map(({ testimonial, index }) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Testimonial {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveReviewTestimonial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Name"
                    value={testimonial.name}
                    onChange={(e) => handleReviewTestimonialChange(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Role"
                    value={testimonial.role}
                    onChange={(e) => handleReviewTestimonialChange(index, "role", e.target.value)}
                  />
                  <Textarea
                    rows={3}
                    placeholder="Content"
                    value={testimonial.content}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "content", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Rating"
                    value={testimonial.rating}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "rating", Number(e.target.value))
                    }
                  />
                </div>
              ))}
              
            </div>
          </CardContent>
        </Card>

        {/* Facebook section + testimonials */}
        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection("reviews-facebook")}
          onFocus={() => setActiveSubSection("reviews-facebook")}
        >
          <CardHeader>
            <CardTitle>Facebook Reviews Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Section Title"
                value={content.reviews.sections?.facebook.title || ""}
                onChange={(e) => handleReviewsSectionChange("facebook", "title", e.target.value)}
              />
              <Textarea
                rows={2}
                placeholder="Section Description"
                value={content.reviews.sections?.facebook.description || ""}
                onChange={(e) => handleReviewsSectionChange("facebook", "description", e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {facebookTestimonials.map(({ testimonial, index }) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Testimonial {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveReviewTestimonial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Name"
                    value={testimonial.name}
                    onChange={(e) => handleReviewTestimonialChange(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Role"
                    value={testimonial.role}
                    onChange={(e) => handleReviewTestimonialChange(index, "role", e.target.value)}
                  />
                  <Textarea
                    rows={3}
                    placeholder="Content"
                    value={testimonial.content}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "content", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Rating"
                    value={testimonial.rating}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "rating", Number(e.target.value))
                    }
                  />
                </div>
              ))}
             
            </div>
          </CardContent>
        </Card>

        {/* JustDial section + testimonials */}
        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection("reviews-justdial")}
          onFocus={() => setActiveSubSection("reviews-justdial")}
        >
          <CardHeader>
            <CardTitle>JustDial Reviews Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Section Title"
                value={content.reviews.sections?.justdial.title || ""}
                onChange={(e) => handleReviewsSectionChange("justdial", "title", e.target.value)}
              />
              <Textarea
                rows={2}
                placeholder="Section Description"
                value={content.reviews.sections?.justdial.description || ""}
                onChange={(e) => handleReviewsSectionChange("justdial", "description", e.target.value)}
              />
            </div>
            <div className="space-y-4">
              {justdialTestimonials.map(({ testimonial, index }) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Testimonial {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveReviewTestimonial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Name"
                    value={testimonial.name}
                    onChange={(e) => handleReviewTestimonialChange(index, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Role"
                    value={testimonial.role}
                    onChange={(e) => handleReviewTestimonialChange(index, "role", e.target.value)}
                  />
                  <Textarea
                    rows={3}
                    placeholder="Content"
                    value={testimonial.content}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "content", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    placeholder="Rating"
                    value={testimonial.rating}
                    onChange={(e) =>
                      handleReviewTestimonialChange(index, "rating", Number(e.target.value))
                    }
                  />
                </div>
              ))}
              
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card
          className="shadow-soft"
          onMouseEnter={() => setActiveSubSection("reviews-cta")}
          onFocus={() => setActiveSubSection("reviews-cta")}
        >
          <CardHeader>
            <CardTitle>Call to Action</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Title"
              value={content.reviews.cta.title}
              onChange={(e) => handleReviewsCtaChange("title", e.target.value)}
            />
            <Textarea
              rows={2}
              placeholder="Description"
              value={content.reviews.cta.description}
              onChange={(e) => handleReviewsCtaChange("description", e.target.value)}
            />
            <Input
              placeholder="Button Text"
              value={content.reviews.cta.buttonText}
              onChange={(e) => handleReviewsCtaChange("buttonText", e.target.value)}
            />
          </CardContent>
        </Card>
      </>
    );
  };
  

  const handleReviewsHeroChange = (field: "title" | "subtitle", value: string) => {
    setContent((prev) => ({
      ...prev,
      reviews: { ...prev.reviews, hero: { ...prev.reviews.hero, [field]: value } },
    }));
  };

  const handleReviewsSectionChange = (
    section: "google" | "facebook" | "justdial",
    field: "title" | "description",
    value: string,
  ) => {
    setContent((prev) => {
      const existing = prev.reviews.sections || {
        google: { title: "Google Reviews", description: "" },
        facebook: { title: "Facebook Reviews", description: "" },
        justdial: { title: "JustDial Reviews", description: "" },
      };
      return {
        ...prev,
        reviews: {
          ...prev.reviews,
          sections: {
            ...existing,
            [section]: {
              ...(existing as any)[section],
              [field]: value,
            },
          },
        },
      };
    });
  };

  const handleReviewTestimonialChange = (
    index: number,
    field: "name" | "role" | "content" | "rating" | "source",
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
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faq-hero')}
        onFocus={() => setActiveSubSection('faq-hero')}
      >
        <CardHeader>
          <CardTitle>FAQ Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.faq.hero.title} onChange={(e) => handleFaqHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.faq.hero.subtitle} onChange={(e) => handleFaqHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faq-categories')}
        onFocus={() => setActiveSubSection('faq-categories')}
      >
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

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faq-support')}
        onFocus={() => setActiveSubSection('faq-support')}
      >
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
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('contact-hero')}
        onFocus={() => setActiveSubSection('contact-hero')}
      >
        <CardHeader>
          <CardTitle>Contact Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.contact.hero.title} onChange={(e) => handleContactHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.contact.hero.subtitle} onChange={(e) => handleContactHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('contact-form')}
        onFocus={() => setActiveSubSection('contact-form')}
      >
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
        cards: prev.contact.cards.map((card, i) => {
          if (i !== index) return card;
          const updated = { ...card, [field]: value } as typeof card;
          if (field === "type") {
            const cap = value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
            updated.title = cap;
          }
          return updated;
        }),
      },
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

  const handleAddContactCard = () => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: [
          ...prev.contact.cards,
          {
            type: "address",
            title: "Address",
            lines: [""],
          },
        ],
      },
    }));
  };

  const handleRemoveContactCard = (index: number) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        cards: prev.contact.cards.filter((_, i) => i !== index),
      },
    }));
  };

  const renderFacultyEditor = () => (
    <>
      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faculty-hero')}
        onFocus={() => setActiveSubSection('faculty-hero')}
      >
        <CardHeader>
          <CardTitle>Faculty Hero</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={content.faculty.hero.title} onChange={(e) => handleFacultyHeroChange("title", e.target.value)} />
          <Textarea rows={2} placeholder="Subtitle" value={content.faculty.hero.subtitle} onChange={(e) => handleFacultyHeroChange("subtitle", e.target.value)} />
        </CardContent>
      </Card>

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faculty-members')}
        onFocus={() => setActiveSubSection('faculty-members')}
      >
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

              {/* Display picture controls first */}
              <div className="space-y-2">
                <Label>Display Picture</Label>
                <div className="flex items-center gap-4">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name || `Member ${index + 1}`} className="h-16 w-16 rounded-full object-cover border" />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-sm text-muted-foreground border">No Image</div>
                  )}
                  <input id={`faculty-image-${index}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleFacultyMemberImageChange(index, e.currentTarget.files && e.currentTarget.files[0] ? e.currentTarget.files[0] : null)} />
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" type="button" onClick={() => document.getElementById(`faculty-image-${index}`)?.click()}>
                      Upload Image
                    </Button>
                    {member.imageUrl && (
                      <Button variant="ghost" size="sm" type="button" onClick={() => handleFacultyMemberChange(index, "imageUrl", "")}>
                        Remove Image
                      </Button>
                    )}
                  </div>
                </div>
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
        'faculty-methodology'
      )}

      <Card 
        className="shadow-soft"
        onMouseEnter={() => setActiveSubSection('faculty-promise')}
        onFocus={() => setActiveSubSection('faculty-promise')}
      >
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
    field: "name" | "role" | "imageInitials" | "education" | "experience" | "description" | "imageUrl",
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

  const handleFacultyMemberImageChange = (index: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setContent((prev) => ({
        ...prev,
        faculty: {
          ...prev.faculty,
          members: prev.faculty.members.map((m, i) => (i === index ? { ...m, imageUrl: (reader.result as string) } : m)),
        },
      }));
    };
    reader.readAsDataURL(file);
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

  const handleFacultyMemberStringItemRemove = (
    index: number,
    field: "specialization" | "achievements",
    itemIndex: number,
  ) => {
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
        <Input
          placeholder="Title"
          value={content.notFound.title}
          onChange={(e) => handleNotFoundChange("title", e.target.value)}
        />
        <Textarea
          rows={2}
          placeholder="Description"
          value={content.notFound.description}
          onChange={(e) => handleNotFoundChange("description", e.target.value)}
        />
        <Input
          placeholder="Link Label"
          value={content.notFound.linkLabel}
          onChange={(e) => handleNotFoundChange("linkLabel", e.target.value)}
        />
      </CardContent>
    </Card>
  );

  const handleNotFoundChange = (field: "title" | "description" | "linkLabel", value: string) => {
    setContent((prev) => ({
      ...prev,
      notFound: { ...prev.notFound, [field]: value },
    }));
  };

  const renderChangePasswordEditor = () => (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle>Change Admin Password</CardTitle>
        <CardDescription>Update the password required to access this admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleChangePasswordSubmit}>
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <div className="flex items-center gap-2">
              <Input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowOldPassword((v) => !v)}
              >
                {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="flex items-center gap-2">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowNewPassword((v) => !v)}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="flex items-center gap-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );

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
        return renderStaticOverview(selectedSection);
      case "gallery":
        return renderGalleryEditor();
      case "reviews":
        return renderReviewsEditor();
      case "faq":
        return renderFaqEditor();
      case "contact":
        return renderContactEditor();
      case "change-password":
        return renderChangePasswordEditor();
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

  // Gate the admin UI behind a simple login screen
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Access
            </CardTitle>
            <CardDescription>Enter the admin password to access this panel.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="adminPassword"
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowLoginPassword((v) => !v)}
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background overflow-x-hidden w-full max-w-full">
        <Sidebar className="border-r flex-shrink-0">
          <SidebarHeader className="border-b px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-sidebar-foreground/60">Turning Point Institute</p>
              <p className="text-sm font-semibold text-sidebar-foreground">Admin Navigation</p>
            </div>
          </SidebarHeader>
          <SidebarContent 
            className="space-y-4 sidebar-content-hide-scrollbar" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
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
          <div className="px-4 pb-4 mt-auto">
            <Button
              className="w-full justify-center gradient-accent"
              type="button"
              onClick={() => {
                setIsAuthed(false);
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </Sidebar>
        <SidebarInset className="flex-1 overflow-hidden min-w-0">
          <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Editing: <span className="font-medium text-foreground">{selectedSection.label}</span></div>
            <div className="flex gap-2">
              <Button className="gradient-accent" onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="outline" onClick={handleEditAction} className="hidden md:inline-flex">
                <ExternalLink className="h-4 w-4 mr-2" /> Open live page
                </Button>
              </div>
              </div>
          <div className="flex h-[calc(100vh-44px)] w-full max-w-full overflow-x-hidden">
            <SiteContentManager
              selectedSection={selectedSection}
              onEditAction={handleEditAction}
              onResetContent={() => resetContent()}
              onExport={handleExport}
              renderSectionContent={renderSectionContent}
            />
            <LivePreview
              selectedSectionId={selectedSection.id}
              activeSubSection={activeSubSection}
            />
            </div>
        </SidebarInset>
        </div>
    </SidebarProvider>
    );
};

export default Admin;
