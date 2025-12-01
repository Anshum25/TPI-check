import { useRef, useEffect, useState } from "react";
import { useContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, Award, BookOpen, Phone, Menu, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Clock, Calendar, CheckCircle, TrendingUp, Heart, Star, Image as ImageIcon, HelpCircle, Briefcase } from "lucide-react";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";

const imageMap: Record<string, string> = {
  "/src/assets/hero-classroom.jpg": heroClassroom,
  "/src/assets/speaking-confidence.jpg": speakingConfidence,
  "/src/assets/student-success.jpg": studentSuccess,
};

interface LivePreviewProps {
  selectedSectionId: string;
  activeSubSection: string | null;
}

const LivePreview = ({ selectedSectionId, activeSubSection }: LivePreviewProps) => {
  const { content } = useContent();
  const previewRef = useRef<HTMLDivElement>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);
  
  // Home page refs
  const heroCarouselRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // About page refs
  const aboutHeroRef = useRef<HTMLDivElement>(null);
  const aboutStatsRef = useRef<HTMLDivElement>(null);
  const aboutStoryRef = useRef<HTMLDivElement>(null);
  const aboutCoreValuesRef = useRef<HTMLDivElement>(null);
  const aboutDifferentiatorsRef = useRef<HTMLDivElement>(null);
  
  // Courses page refs
  const coursesHeroRef = useRef<HTMLDivElement>(null);
  const coursesGridRef = useRef<HTMLDivElement>(null);
  const coursesBenefitsRef = useRef<HTMLDivElement>(null);
  const coursesLearningRef = useRef<HTMLDivElement>(null);
  
  // Admissions page refs
  const admissionsHeroRef = useRef<HTMLDivElement>(null);
  const admissionsStepsRef = useRef<HTMLDivElement>(null);
  const admissionsDetailsRef = useRef<HTMLDivElement>(null);
  const admissionsTargetGroupsRef = useRef<HTMLDivElement>(null);
  const admissionsWhyChooseRef = useRef<HTMLDivElement>(null);
  const admissionsCtaRef = useRef<HTMLDivElement>(null);
  
  // Success Stories page refs
  const successHeroRef = useRef<HTMLDivElement>(null);
  const successStatsRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);
  const successAchievementsRef = useRef<HTMLDivElement>(null);
  const successVideoRef = useRef<HTMLDivElement>(null);
  const successCtaRef = useRef<HTMLDivElement>(null);
  
  // Gallery page refs
  const galleryHeroRef = useRef<HTMLDivElement>(null);
  const galleryGridRef = useRef<HTMLDivElement>(null);
  
  // Reviews page refs
  const reviewsHeroRef = useRef<HTMLDivElement>(null);
  const reviewsTestimonialsRef = useRef<HTMLDivElement>(null);
  const reviewsCtaRef = useRef<HTMLDivElement>(null);
  
  // FAQ page refs
  const faqHeroRef = useRef<HTMLDivElement>(null);
  const faqCategoriesRef = useRef<HTMLDivElement>(null);
  const faqSupportRef = useRef<HTMLDivElement>(null);
  
  // Contact page refs
  const contactHeroRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactMapRef = useRef<HTMLDivElement>(null);
  
  // Faculty page refs
  const facultyHeroRef = useRef<HTMLDivElement>(null);
  const facultyMembersRef = useRef<HTMLDivElement>(null);
  const facultyMethodologyRef = useRef<HTMLDivElement>(null);
  const facultyPromiseRef = useRef<HTMLDivElement>(null);
  
  // Header/Footer refs
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Scroll preview to active subsection
  useEffect(() => {
    if (!activeSubSection) return;
    
    // Find the preview container for the current page
    const currentPreviewContainer = previewRef.current;
    if (!currentPreviewContainer) return;
    
    const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
      // Home page
      'hero-carousel': heroCarouselRef,
      'hero-video': heroVideoRef,
      'features': featuresRef,
      'testimonials': testimonialsRef,
      'cta': ctaRef,
      // About page
      'about-hero': aboutHeroRef,
      'about-stats': aboutStatsRef,
      'about-story': aboutStoryRef,
      'about-core-values': aboutCoreValuesRef,
      'about-differentiators': aboutDifferentiatorsRef,
      // Courses page
      'courses-hero': coursesHeroRef,
      'courses-grid': coursesGridRef,
      'courses-benefits': coursesBenefitsRef,
      'courses-learning': coursesLearningRef,
      // Admissions page
      'admissions-hero': admissionsHeroRef,
      'admissions-steps': admissionsStepsRef,
      'admissions-details': admissionsDetailsRef,
      'admissions-target-groups': admissionsTargetGroupsRef,
      'admissions-why-choose': admissionsWhyChooseRef,
      'admissions-cta': admissionsCtaRef,
      // Success Stories page
      'success-hero': successHeroRef,
      'success-stats': successStatsRef,
      'success-stories': successStoriesRef,
      'success-achievements': successAchievementsRef,
      'success-video': successVideoRef,
      'success-cta': successCtaRef,
      // Gallery page
      'gallery-hero': galleryHeroRef,
      'gallery-grid': galleryGridRef,
      // Reviews page
      'reviews-hero': reviewsHeroRef,
      'reviews-testimonials': reviewsTestimonialsRef,
      'reviews-cta': reviewsCtaRef,
      // FAQ page
      'faq-hero': faqHeroRef,
      'faq-categories': faqCategoriesRef,
      'faq-support': faqSupportRef,
      // Contact page
      'contact-hero': contactHeroRef,
      'contact-form': contactFormRef,
      'contact-map': contactMapRef,
      // Faculty page
      'faculty-hero': facultyHeroRef,
      'faculty-members': facultyMembersRef,
      'faculty-methodology': facultyMethodologyRef,
      'faculty-promise': facultyPromiseRef,
      // Header/Footer
      'header': headerRef,
      'footer': footerRef,
    };

    const targetRef = sectionMap[activeSubSection];
    if (targetRef?.current && currentPreviewContainer) {
      const targetElement = targetRef.current;
      
      // Scroll to the section with smooth behavior
      setTimeout(() => {
        // Find the offset relative to the preview container
        let offsetTop = 0;
        let element: HTMLElement | null = targetElement;
        while (element && element !== currentPreviewContainer) {
          offsetTop += element.offsetTop;
          element = element.offsetParent as HTMLElement | null;
        }
        
        currentPreviewContainer.scrollTo({
          top: offsetTop - 20, // Add some padding from top
          behavior: 'smooth',
        });
      }, 150);
    }
  }, [activeSubSection, selectedSectionId]);

  const resolveImageSrc = (src?: string) => {
    if (!src) return "";
    if (src.startsWith("data:") || src.startsWith("http")) return src;
    return imageMap[src] || src;
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

      switch (selectedSectionId) {
        case "home":
          // Preview-safe Hero component (using <a> instead of Link)
          const heroSlides = home.heroCarousel.slides.map((slide) => ({
            ...slide,
            image: slide.imageUrl.startsWith('data:') || slide.imageUrl.startsWith('http') 
              ? slide.imageUrl 
              : (imageMap[slide.imageUrl] || slide.imageUrl),
          }));
          
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
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
              <RequestCallbackDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
            </div>
          );
        case "header":
          // Preview-safe Header component (using <a> instead of Link)
          const { header } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div ref={headerRef} className="w-full max-w-full min-w-0">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="w-full max-w-full min-w-0 px-2 sm:px-4">
                  <div className="flex h-16 items-center justify-between gap-2">
                    <a href="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 min-w-0">
                      <div className="flex items-center min-w-0">
                        <img
                          src="https://turningpointinstitute.in/wp-content/uploads/2022/07/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1.png"
                          alt="Logo"
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="ml-1 sm:ml-3 min-w-0">
                          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-tight truncate">
                            {header.siteTitle || "TURNING POINT INSTITUTE"}
                          </h1>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">THE ONE TO TURN TO</p>
                        </div>
                      </div>
                    </a>

                    <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 flex-shrink-0">
                      {header.nav.map((link) => (
                        <a
                          key={link.to}
                          href={link.to}
                          className="text-xs sm:text-sm font-medium transition-colors hover:text-primary whitespace-nowrap text-foreground/60"
                        >
                          {link.label}
                        </a>
                      ))}
                      <Button size="sm" className="gradient-accent flex-shrink-0 text-xs sm:text-sm" type="button" onClick={() => setCallbackOpen(true)}>
                        <Phone className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden lg:inline">Request Callback</span>
                        <span className="lg:hidden">Callback</span>
                      </Button>
                    </nav>

                    <button
                      className="md:hidden"
                      aria-label="Toggle menu"
                    >
                      <Menu className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </header>
              </div>
            </div>
          );
        case "footer":
          // Preview-safe Footer component (using <a> instead of Link)
          const { footer } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0 flex flex-col min-h-full">
                <footer ref={footerRef} className="bg-secondary/30 border-t mt-auto">
                  <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                      <div>
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                            <span className="text-sm sm:text-xl font-bold text-primary-foreground">TP</span>
                          </div>
                          <span className="ml-2 font-bold text-sm sm:text-base lg:text-lg truncate">{footer.instituteName}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                          {footer.tagline}
                        </p>
                        <div className="flex space-x-2 sm:space-x-3">
                          <a href={footer.socialMedia.facebook} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                          <a href={footer.socialMedia.twitter} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                          <a href={footer.socialMedia.instagram} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                          <a href={footer.socialMedia.linkedin} className="text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                          </a>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          {footer.quickLinks.map((link, index) => (
                            <li key={index}>
                              <a href={link.to} className="text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Courses</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          {footer.courses.map((course, index) => (
                            <li key={index} className="text-muted-foreground">{course}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                          <li className="flex items-start space-x-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                            <span className="break-words">{footer.contact.address}</span>
                          </li>
                          <li className="flex items-center space-x-2 text-muted-foreground">
                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="break-words">{footer.contact.phone}</span>
                          </li>
                          <li className="flex items-center space-x-2 text-muted-foreground">
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="break-words">{footer.contact.email}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
                      <p>{footer.copyright}</p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          );
        case "about":
          // Preview-safe About page
          const { about } = content;
          const statIcons = [Users, Award, TrendingUp, Heart];
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={aboutHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{about.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{about.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={aboutStatsRef} className="py-8 sm:py-16">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                      {about.stats.map((stat, index) => {
                        const Icon = statIcons[index] ?? Users;
                        return (
                          <div key={index} className="text-center p-4 sm:p-6 rounded-lg bg-secondary/30">
                            <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-3 sm:mb-4">
                              <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                            </div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section ref={aboutStoryRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Our Story</h2>
                      <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground">
                        {about.story.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section ref={aboutCoreValuesRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                      {about.coreValues.map((value, index) => (
                        <div key={index} className="bg-card p-6 sm:p-8 rounded-lg shadow-soft">
                          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{value.title}</h3>
                          <p className="text-sm sm:text-base text-muted-foreground">{value.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={aboutDifferentiatorsRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Why We're Different</h2>
                      <div className="space-y-3 sm:space-y-4 text-left">
                        {about.differentiators.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 sm:p-6 border-l-4 bg-secondary/30 rounded ${
                              index % 2 === 0 ? "border-primary" : "border-accent"
                            }`}
                          >
                            <h3 className="font-bold mb-2 text-sm sm:text-base">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "courses":
          // Preview-safe Courses page
          const { courses } = content;
          const courseIcons = [BookOpen, Users, Award, Target, Star, TrendingUp];
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={coursesHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{courses.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{courses.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={coursesGridRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {courses.courses.map((course, index) => {
                        const IconComponent = courseIcons[index % courseIcons.length] || BookOpen;
                        return (
                          <CourseCard
                            key={index}
                            title={course.title}
                            description={course.description}
                            duration={course.duration}
                            students={course.students}
                            level={course.level}
                            icon={<IconComponent className="h-6 w-6" />}
                          />
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section ref={coursesBenefitsRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Course Benefits</h2>
                      <Card className="shadow-medium">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            {courses.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-muted-foreground">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

                <section ref={coursesLearningRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">What You'll Learn</h2>
                      <div className="space-y-4 sm:space-y-6">
                        {courses.learningSections.map((section, index) => (
                          <div key={index} className="p-4 sm:p-6 bg-card rounded-lg shadow-soft">
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{section.title}</h3>
                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "admissions":
          // Preview-safe Admissions page
          const { admissions } = content;
          const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
            clock: Clock,
            calendar: Calendar,
            map: MapPin,
            award: Award,
            users: Users,
          };
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={admissionsHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{admissions.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-4 sm:mb-6">{admissions.hero.subtitle}</p>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                      <Button size="lg" className="gradient-accent" asChild>
                        <a href={`tel:${admissions.contactCtas.phoneNumber}`}>{admissions.contactCtas.phoneLabel}</a>
                      </Button>
                      <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary" asChild>
                        <a href={admissions.contactCtas.secondaryLink}>{admissions.contactCtas.secondaryText}</a>
                      </Button>
                    </div>
                  </div>
                </section>

                <section ref={admissionsStepsRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Admission Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
                      {admissions.steps.map((step, index) => (
                        <div key={index} className="text-center p-4 sm:p-6 rounded-lg bg-secondary/30">
                          <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
                            {step.step}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold mb-2">{step.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={admissionsDetailsRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Course Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
                      {admissions.courseDetails.map((detail, index) => {
                        const Icon = iconMap[detail.icon] || Clock;
                        return (
                          <Card key={index} className="shadow-soft">
                            <CardContent className="pt-6">
                              <div className="flex items-center space-x-3 mb-3">
                                <Icon className="h-5 w-5 text-primary" />
                                <h3 className="font-bold text-sm sm:text-base">{detail.label}</h3>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground">{detail.value}</p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section ref={admissionsTargetGroupsRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Who Should Join?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                      {admissions.targetGroups.map((group, index) => (
                        <Card key={index} className="shadow-soft">
                          <CardHeader>
                            <CardTitle className="text-base sm:text-lg">{group.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                              {group.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex}>{benefit}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={admissionsWhyChooseRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Why Choose Us?</h2>
                    <Card className="max-w-4xl mx-auto shadow-medium">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                          {admissions.whyChoose.map((reason, index) => (
                            <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-muted-foreground">{reason}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <section ref={admissionsCtaRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">{admissions.cta.title}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{admissions.cta.subtitle}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{admissions.cta.tagline}</p>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        <Button size="lg" className="gradient-accent" asChild>
                          <a href={`tel:${admissions.cta.phoneNumber}`}>{admissions.cta.phoneLabel}</a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <a href={admissions.cta.directionsUrl}>{admissions.cta.directionsLabel}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "success":
          // Preview-safe Success Stories page
          const { successStories } = content;
          const successStatIcons = [Users, Star, TrendingUp, Award];
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={successHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{successStories.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{successStories.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={successStatsRef} className="py-8 sm:py-16">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                      {successStories.stats.map((stat, index) => {
                        const Icon = successStatIcons[index] ?? Users;
                        return (
                          <div key={index} className="text-center p-4 sm:p-6 rounded-lg bg-secondary/30">
                            <div className="inline-flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-3 sm:mb-4">
                              <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                            </div>
                            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section ref={successStoriesRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {successStories.stories.map((story, index) => (
                        <TestimonialCard
                          key={index}
                          name={story.name}
                          role={story.role}
                          content={story.content}
                          rating={story.rating ?? 5}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={successAchievementsRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">Key Achievements</h2>
                      <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground list-disc list-inside">
                        {successStories.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section ref={successVideoRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">{successStories.video.description}</p>
                    <Button asChild>
                      <a href={successStories.video.linkUrl} target="_blank" rel="noopener noreferrer">{successStories.video.linkText}</a>
                    </Button>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-4">{successStories.video.note}</p>
                  </div>
                </section>

                <section ref={successCtaRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-4">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{successStories.cta.title}</h2>
                      <p className="text-sm sm:text-base text-muted-foreground">{successStories.cta.description}</p>
                      <a href={`tel:${successStories.cta.phoneNumber}`} className="text-lg sm:text-xl font-semibold text-primary hover:underline block">
                        {successStories.cta.phoneLabel}
                      </a>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {successStories.cta.reviewLinks.map((link, index) => (
                          <div key={index} className="p-4 bg-card rounded-lg shadow-soft hover:shadow-medium transition-all">
                            <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                            <p className="text-sm font-semibold">{link.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "gallery":
          // Preview-safe Gallery page
          const { gallery } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={galleryHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{gallery.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{gallery.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={galleryGridRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8 sm:mb-12">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="classroom">Classroom</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                      </TabsList>
                      {Object.entries(gallery.categories).map(([category, images]) => (
                        <TabsContent key={category} value={category}>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {images.length ? (
                              images.map((image, index) => {
                                const imgSrc = resolveImageSrc(image.src);
                                return (
                                  <Card key={`${category}-${index}`} className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                                    <div className="relative h-56 sm:h-64 overflow-hidden">
                                      {imgSrc ? (
                                        <img
                                          src={imgSrc}
                                          alt={image.title}
                                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                          onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = "none";
                                          }}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-secondary/30 flex items-center justify-center">
                                          <ImageIcon className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                      )}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                        <p className="text-white font-semibold p-4 text-sm sm:text-base">{image.title}</p>
                                      </div>
                                    </div>
                                  </Card>
                                );
                              })
                            ) : (
                              <div className="col-span-full py-12 text-center text-muted-foreground">
                                No images added yet.
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </section>
              </div>
            </div>
          );
        case "reviews":
          // Preview-safe Reviews page
          const { reviews } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                {/* Hero section */}
                <section ref={reviewsHeroRef} className="gradient-hero py-20 text-primary-foreground">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{reviews.hero.title}</h1>
                    <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
                      {reviews.hero.subtitle}
                    </p>
                  </div>
                </section>

                {/* Rating summary bar */}
                <section className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center space-x-2 bg-accent/10 px-6 py-3 rounded-full">
                        <span className="text-3xl font-bold text-accent">{reviews.ratingSummary.score}</span>
                        <span className="text-muted-foreground">{reviews.ratingSummary.label}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{reviews.ratingSummary.count}</span>
                      </div>
                    </div>

                    <section ref={reviewsTestimonialsRef}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.testimonials.map((testimonial, index) => (
                          <TestimonialCard
                            key={index}
                            name={testimonial.name}
                            role={testimonial.role}
                            content={testimonial.content}
                            rating={testimonial.rating ?? 5}
                          />
                        ))}
                      </div>
                    </section>
                  </div>
                </section>

                {/* CTA section */}
                <section ref={reviewsCtaRef} className="py-20 bg-secondary/30">
                  <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">{reviews.cta.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      {reviews.cta.description}
                    </p>
                    <a
                      href={`mailto:${reviews.cta.mailTo}`}
                      className="inline-flex items-center justify-center px-8 py-3 rounded-lg gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                    >
                      {reviews.cta.buttonText}
                    </a>
                  </div>
                </section>
              </div>
            </div>
          );
        case "faq":
          // Preview-safe FAQ page
          const { faq } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={faqHeroRef} className="gradient-hero py-20 text-primary-foreground">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{faq.hero.title}</h1>
                    <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{faq.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={faqCategoriesRef} className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8">
                      {faq.categories.map((category, categoryIndex) => (
                        <Card key={categoryIndex} className="shadow-soft">
                          <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
                            <Accordion type="single" collapsible className="w-full">
                              {category.questions.map((question, questionIndex) => (
                                <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                                  <AccordionTrigger className="text-left">
                                    {question.q}
                                  </AccordionTrigger>
                                  <AccordionContent className="text-muted-foreground">
                                    {question.a}
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

                <section ref={faqSupportRef} className="py-20 bg-secondary/30">
                  <div className="container mx-auto px-4">
                    <Card className="max-w-2xl mx-auto shadow-medium">
                      <CardContent className="pt-6 text-center space-y-4">
                        <h2 className="text-2xl font-bold">{faq.support.title}</h2>
                        <p className="text-muted-foreground">{faq.support.description}</p>
                        <div className="flex flex-col items-center space-y-2 text-lg">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-accent" />
                            <a href={`tel:${faq.support.phoneNumber}`} className="font-bold text-primary hover:underline">
                              {faq.support.phoneNumber}
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground">{faq.support.note}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            </div>
          );
        case "contact":
          // Live-editable Contact page using content.contact
          const { contact } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={contactHeroRef} className="gradient-hero py-20 text-primary-foreground">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{contact.hero.title || "Contact Us"}</h1>
                    <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{contact.hero.subtitle || "Get in touch with us to start your learning journey"}</p>
                  </div>
                </section>

                <section ref={contactFormRef} className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                        <Card className="shadow-medium">
                          <CardHeader>
                            <CardTitle>Enquiry Form</CardTitle>
                            <CardDescription>
                              Fill out the form and we'll respond within 24 hours
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <form className="space-y-6">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input id="name" name="name" placeholder="Enter your name" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input id="email" name="email" type="email" placeholder="your.email@example.com" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="course">Interested Course</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a course" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {contact.courseOptions.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="message" rows={4} placeholder="Tell us about your requirements..." />
                              </div>

                              <Button type="button" className="w-full gradient-accent">
                                Submit Enquiry
                              </Button>
                            </form>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                        <div className="space-y-6">
                          {contact.cards.map((c, i) => {
                            const Icon = c.type === "address" ? MapPin : c.type === "phone" ? Phone : c.type === "email" ? Mail : Clock;
                            return (
                              <Card key={i} className="shadow-soft">
                                <CardContent className="pt-6">
                                  <div className="flex items-start space-x-4">
                                    <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                                      <Icon className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                      <h3 className="font-bold mb-2">{c.title}</h3>
                                      <p className="text-muted-foreground">
                                        {c.lines.map((line, li) => (
                                          <span key={li}>
                                            {line}
                                            {li < c.lines.length - 1 ? <><br /></> : null}
                                          </span>
                                        ))}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section ref={contactMapRef} className="py-20 bg-secondary/30">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
                    <div className="max-w-4xl mx-auto">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">{contact.mapNote || "Map would be embedded here"}</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "faculty":
          // Mirror the actual Faculty page layout using content.faculty
          const { faculty } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={facultyHeroRef} className="gradient-hero py-20 text-primary-foreground">
                  <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{faculty.hero.title}</h1>
                    <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">{faculty.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={facultyMembersRef} className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="space-y-12">
                      {faculty.members.map((member, index) => (
                        <Card key={index} className="shadow-medium overflow-hidden">
                          <CardContent className="p-8">
                            <div className="grid md:grid-cols-[200px,1fr] gap-8">
                              <div className="flex flex-col items-center md:items-start">
                                {member.imageUrl ? (
                                  <img src={member.imageUrl} alt={member.name} className="h-40 w-40 rounded-full object-cover mb-4 border" />
                                ) : (
                                  <div className="h-40 w-40 rounded-full gradient-hero flex items-center justify-center text-primary-foreground mb-4">
                                    <span className="text-5xl font-bold">{member.imageInitials}</span>
                                  </div>
                                )}
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                  {member.specialization.map((spec, idx) => (
                                    <Badge key={idx} variant="secondary">{spec}</Badge>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h2 className="text-3xl font-bold mb-1">{member.name}</h2>
                                  <p className="text-lg text-muted-foreground mb-2">{member.role}</p>
                                  <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Award className="h-4 w-4 text-accent" />
                                      <span>{member.experience} Experience</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <BookOpen className="h-4 w-4 text-accent" />
                                      <span>{member.education}</span>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                  {member.description}
                                </p>

                                {member.achievements.length > 0 && (
                                  <div>
                                    <h3 className="font-bold mb-3">Key Achievements:</h3>
                                    <ul className="space-y-2">
                                      {member.achievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <span className="text-accent mt-1">•</span>
                                          <span className="text-muted-foreground">{achievement}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={facultyMethodologyRef} className="py-20 bg-secondary/30">
                  <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Teaching Methodology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {faculty.methodology.map((method, index) => (
                        <div key={index} className="bg-card p-8 rounded-lg shadow-soft">
                          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-foreground mb-4">
                            {index === 0 ? <BookOpen className="h-6 w-6" /> : index === 1 ? <Users className="h-6 w-6" /> : index === 2 ? <Award className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
                          </div>
                          <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                          <p className="text-muted-foreground">{method.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={facultyPromiseRef} className="py-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-primary/5 border-l-4 border-primary p-8 rounded-lg">
                      <h2 className="text-2xl font-bold mb-4">{faculty.promise.title}</h2>
                      <div className="space-y-4 text-muted-foreground">
                        {faculty.promise.paragraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          );
        case "not-found":
          // Preview-safe 404 page
          const { notFound } = content;
          return (
            <div className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0 flex items-center justify-center min-h-full">
                <div className="text-center p-4 sm:p-8">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">404</h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 sm:mb-6">{notFound.title}</p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{notFound.description}</p>
                  <Button asChild>
                    <a href="/">{notFound.linkLabel}</a>
                  </Button>
                </div>
              </div>
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

  return (
    <div className="w-1/2 border-l bg-background overflow-hidden flex flex-col h-full min-w-0 flex-shrink-0">
      <div className="border-b px-4 py-2 flex-shrink-0">
        <p className="text-sm  font-semibold">Live Preview</p>
        <p className="text-xs text-muted-foreground">See your changes in real-time</p>
      </div>
      <div 
        className="flex-1 overflow-hidden relative"
        style={{ height: 0 }} // Force flex-1 to work properly
      >
        {renderPreview()}
      </div>
    </div>
  );
};

export default LivePreview;

