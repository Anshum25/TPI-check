import { useRef, useEffect, useState } from "react";
import { useContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import CourseCard from "@/components/CourseCard";
import Hero from "@/components/Hero";
import Differentiators from "@/components/Differentiators";
import JoinUsSection from "@/components/JoinUsSection";
import CourseDetails from "@/components/CourseDetails";
import Marquee from "@/components/Marquee";
import MethodologySection from "@/components/MethodologySection";
import GainFromCourse from "@/components/GainFromCourse";
import FacultyHighlight from "@/components/FacultyHighlight";
import ActivityVideos from "@/components/ActivityVideos";
import ActivityImages from "@/components/ActivityImages";
import HomeReviewsSection from "@/components/HomeReviewsSection";
import Reviews from "@/pages/Reviews";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Users, Award, BookOpen, Phone, Menu, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Clock, Calendar, CheckCircle, TrendingUp, Heart, Star, Image as ImageIcon, HelpCircle, Briefcase } from "lucide-react";
import tpLogo from "@/assets/cropped-cropped-cropped-Blue-Dark-Minimalist-Initial-T-Letter-Logo-512-x-512-px-1-removebg-preview.png";
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
  const [amenitySlideIndex, setAmenitySlideIndex] = useState(0);
  
  // Home page refs
  const heroCarouselRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const facultyHighlightRef = useRef<HTMLDivElement>(null);
  const homeAchievementsRef = useRef<HTMLDivElement>(null);
  const methodologyVideoRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const gainFromCourseRef = useRef<HTMLDivElement>(null);
  const activityVideosRef = useRef<HTMLDivElement>(null);
  const activityImagesRef = useRef<HTMLDivElement>(null);
  const homeReviewsRef = useRef<HTMLDivElement>(null);
  
  // About page refs
  const aboutHeroRef = useRef<HTMLDivElement>(null);
  const aboutHighlightRef = useRef<HTMLDivElement>(null);
  const aboutStoryRef = useRef<HTMLDivElement>(null);
  const aboutAmenitiesRef = useRef<HTMLDivElement>(null);
  const aboutCommunityRef = useRef<HTMLDivElement>(null);
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

  // Auto-slide amenities carousel
  useEffect(() => {
    const images = content.about?.amenities?.carouselImages || [];
    if (!images.length || images.length === 1) return;

    const interval = setInterval(() => {
      setAmenitySlideIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [content.about?.amenities?.carouselImages]);

  // Hide the header and footer inside the reviews preview only (keeps website layout unchanged)
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `.reviews-preview header, .reviews-preview footer { display: none !important; }`;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .live-preview .preview-hero-carousel > div { height: 280px !important; }
      @media (min-width: 768px) {
        .live-preview .preview-hero-carousel > div { height: 420px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

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
      'faculty-highlight': facultyHighlightRef,
      'home-achievements': homeAchievementsRef,
      'methodology-video': methodologyVideoRef,
      'marquee': marqueeRef,
      'gain-from-course': gainFromCourseRef,
      'activity-videos': activityVideosRef,
      'activity-images': activityImagesRef,
      'home-reviews': homeReviewsRef,
      // About page
      'about-hero': aboutHeroRef,
      'about-highlight': aboutHighlightRef,
      'about-story': aboutStoryRef,
      'about-amenities': aboutAmenitiesRef,
      'about-community': aboutCommunityRef,
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
      'footer-social': footerRef,
      'footer-quick-links': footerRef,
      'footer-courses': footerRef,
      'footer-contact': footerRef,
      'footer-copyright': footerRef,
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
          return (
            <div ref={previewRef} className="live-preview relative h-full w-full bg-background overflow-y-auto overflow-x-auto">
              <div className="w-full max-w-full min-w-0">
                <div ref={heroCarouselRef}>
                  <div className="preview-hero-carousel">
                    <Hero />
                  </div>
                </div>
                <div ref={featuresRef}>
                  <Differentiators />
                </div>
                <div ref={heroVideoRef}>
                  <JoinUsSection showJourney={false} />
                </div>
                <div ref={testimonialsRef}>
                  <CourseDetails />
                </div>

                <div ref={marqueeRef}>
                  <Marquee />
                </div>

                {/* Our Methodology Section with Video */}
                <div ref={methodologyVideoRef}>
                  <section className="pt-12 pb-20 md:pt-16 md:pb-24 relative">
                    <div className="container mx-auto px-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                          <div>
                            {home.methodologyBadge && (
                              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                                {home.methodologyBadge}
                              </span>
                            )}
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                              {home.heroTitle}
                            </h2>
                          </div>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {home.heroSubtitle}
                          </p>
                          {home.methodologyKeyPoint && (
                            <div className="pt-6 border-t border-border">
                              <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Key Point</p>
                              <p className="text-foreground font-semibold text-lg">
                                {home.methodologyKeyPoint}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Right - Video */}
                        <div className="relative">
                          <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/10 rounded-3xl blur-2xl" />
                          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-3xl blur-3xl" />

                          <div className="relative bg-white dark:bg-slate-950 rounded-2xl shadow-medium overflow-hidden border border-border/50 hover:shadow-lg transition-shadow duration-300">
                            <div className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur px-3 py-1 rounded-full">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Director's Desk</p>
                            </div>
                            <div className="aspect-video w-full bg-muted">
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
                </div>
                <MethodologySection />
                <div ref={gainFromCourseRef}>
                  <GainFromCourse />
                </div>
                <div ref={facultyHighlightRef}>
                  <FacultyHighlight />
                </div>
                {home.achievementsSection && (
                  <div ref={homeAchievementsRef}>
                    <section className="py-10 md:py-14">
                      <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                            {home.achievementsSection.title}
                          </h2>
                          <p className="text-muted-foreground max-w-2xl mx-auto">
                            {home.achievementsSection.subtitle}
                          </p>
                        </div>

                        <div className="max-w-4xl mx-auto bg-card/80 border border-border/60 rounded-2xl shadow-soft px-6 py-4 md:px-8 md:py-6 space-y-4">
                          {home.achievementsSection.items.map((item, index) => (
                            <div
                              key={index}
                              className={`flex items-start gap-4 py-3 border-b last:border-b pl-5 border-l-4 ${index === 1 || index === 3 ? 'border-accent' : 'border-primary'}`}
                              style={{
                                borderLeftColor: index === 1 || index === 3 ? 'hsl(0 84% 50%)' : 'hsl(217 91% 28%)',
                                borderBottomColor: index === 1 || index === 3 ? 'hsl(0 84% 50%)' : 'hsl(217 91% 28%)',
                              }}
                            >
                              <div>
                                <h3 className="text-base md:text-lg font-bold text-primary mb-1">{item.title}</h3>
                                <p className="text-muted-foreground text-sm md:text-[15px]">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {/* Student Activities */}
                <div ref={activityVideosRef}>
                  <ActivityVideos />
                </div>
                {/* Review from our achievers */}
                <div ref={homeReviewsRef}>
                  <HomeReviewsSection />
                </div>
                {/* Moments that Matter */}
                <div ref={activityImagesRef}>
                  <ActivityImages />
                </div>
                {/* Final CTA (same as Home.tsx bottom section) */}
                <section ref={admissionsCtaRef} className="py-20">
                  <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{content.admissions.cta.title}</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">{content.admissions.cta.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-6">{content.admissions.cta.tagline}</p>
                    <div className="inline-flex items-center gap-3 bg-secondary/30 rounded-full p-2">
                      <a href={`tel:${content.admissions.cta.phoneNumber}`}>
                        <Button size="lg" className="gradient-accent">{content.admissions.cta.phoneLabel}</Button>
                      </a>
                      <a href={content.admissions.cta.directionsUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline">{content.admissions.cta.directionsLabel}</Button>
                      </a>
                    </div>
                  </div>
                </section>

                <a
                  href={`tel:${content.admissions.cta.phoneNumber}`}
                  className="md:hidden absolute bottom-6 right-4 z-50 h-14 w-14 rounded-full gradient-accent shadow-lg flex items-center justify-center"
                  aria-label="Call"
                >
                  <i aria-hidden="true" className="fas fa-phone-volume inline-block text-white text-xl" style={{ transform: "scaleX(-1)" }} />
                </a>
              </div>
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
        case "footer": {
          // Preview-safe Footer component (using <a> instead of Link)
          const { footer } = content;
          const footerAbout = content.about;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-auto">
              <div className="w-full flex flex-col min-h-full" style={{ minWidth: '1200px' }}>
                <footer ref={footerRef} className="relative mt-20 text-primary-foreground bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900">
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                    aria-hidden
                  />
                  <div className="relative px-2 sm:px-4 py-6 sm:py-12" style={{ minWidth: '1200px', width: 'max-content' }}>
                    <div className="flex gap-6 sm:gap-10 md:gap-12 items-start" style={{ minWidth: '1200px' }}>
                      {/* Brand + about */}
                      <div style={{ width: '300px', minWidth: '300px' }}>
                        <div className="flex items-center mb-3 sm:mb-4">
                          <img
                            src={tpLogo}
                            alt="Turning Point Institute Logo"
                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain flex-shrink-0"
                          />
                          <div className="ml-2 min-w-0">
                            <span className="block font-bold text-sm sm:text-base lg:text-lg leading-tight truncate uppercase">
                              {footer.instituteName || "TURNING POINT INSTITUTE"}
                            </span>
                            <span className="block text-[10px] sm:text-[11px] tracking-[0.18em] text-primary-foreground/80 uppercase truncate">
                              {footer.subHeader || "THE ONE TO TURN TO"}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-primary-foreground/80 mb-3 sm:mb-5 max-w-md">
                          {footer.tagline}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-3">
                          {footer.socialMedia.instagram && (
                            <a href={footer.socialMedia.instagram} aria-label="Instagram" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                              <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />
                            </a>
                          )}
                          {footer.socialMedia.facebook && (
                            <a href={footer.socialMedia.facebook} aria-label="Facebook" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                              <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />
                            </a>
                          )}
                          {footer.socialMedia.twitter && (
                            <a href={footer.socialMedia.twitter} aria-label="Twitter" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                              <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
                            </a>
                          )}
                          {footer.socialMedia.linkedin && (
                            <a href={footer.socialMedia.linkedin} aria-label="LinkedIn" className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
                              <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div style={{ width: '250px', minWidth: '250px' }}>
                        <h3 className="font-bold mb-3 sm:mb-4 text-accent text-sm sm:text-base">Quick Links</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          {footer.quickLinks.map((link, index) => (
                            <li key={index}>
                              <a href={link.to} className="hover:underline hover:decoration-white/60 hover:text-accent text-primary-foreground/90">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* What We Do */}
                      <div style={{ width: '250px', minWidth: '250px' }}>
                        <h3 className="font-bold mb-3 sm:mb-4 text-accent text-sm sm:text-base">What We Do</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          {(footer.whatWeDo && footer.whatWeDo.length
                            ? footer.whatWeDo
                            : (footerAbout?.differentiators || []).slice(0, 4).map((item) => item.title)
                          ).map((item, i) => (
                            <li key={i} className="text-primary-foreground/80">{item}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Contact Info */}
                      <div style={{ width: '300px', minWidth: '300px' }}>
                        <h3 className="font-bold mb-3 sm:mb-4 text-accent text-sm sm:text-base">Contact Info</h3>
                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                          <li className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5 text-accent" />
                            <span className="text-primary-foreground/90 break-words">{footer.contact.address}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-accent" />
                            <span className="text-primary-foreground/90 break-words">{footer.contact.phone}</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-accent" />
                            <span className="text-primary-foreground/90 break-words">{footer.contact.email}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-white/20 mt-6 sm:mt-10 pt-4 sm:pt-6 text-xs sm:text-sm text-primary-foreground/70 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                      <p className="order-2 md:order-1">{footer.copyright}</p>
                      <p className="order-1 md:order-2">Made with <span className="text-accent">❤</span> for learners</p>
                      <p className="order-3">
                        Website by <a href="https://www.devsyncinnovation.in/" target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">DevSync Innovation</a>
                      </p>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          );
        }
        case "about":
          // Preview-safe About page
          const { about } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={aboutHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{about.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{about.hero.subtitle}</p>
                  </div>
                </section>

                {about.highlight && (
                  <section ref={aboutHighlightRef} className="py-12 sm:py-16">
                    <div className="container mx-auto px-2 sm:px-4">
                      <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-5 leading-tight">
                          <span className="text-primary">
                            {about.highlight.headingPrimary}
                          </span>{" "}
                          {about.highlight.headingSecondary && (
                            <span className="text-foreground">
                              {about.highlight.headingSecondary}
                            </span>
                          )}
                        </h2>
                        <div className="space-y-4 sm:space-y-5 text-muted-foreground leading-relaxed text-[15px] md:text-base">
                          {about.highlight.paragraphs.map((p, index) => (
                            <p key={index}>{p}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

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

                {about.amenities && (
                  <section ref={aboutAmenitiesRef} className="py-16 md:py-24">
                    <div className="container mx-auto px-2 sm:px-4">
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                          <div className="lg:col-span-7 relative w-full h-80 md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-medium bg-muted">
                            {about.amenities.carouselImages.map((image, index) => (
                              <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-500 ${
                                  index === amenitySlideIndex ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={`Amenity ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                            <div className="absolute bottom-4 left-4 bg-foreground/85 text-background px-3 py-1.5 rounded text-xs font-semibold">
                              {`${(amenitySlideIndex % (about.amenities.carouselImages.length || 1)) + 1} / ${about.amenities.carouselImages.length || 1}`}
                            </div>
                          </div>
                          <div className="lg:col-span-5 flex flex-col justify-start p-1 md:p-2">
                            <span className="self-start text-[10px] md:text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                              Our Facilities
                            </span>
                            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">{about.amenities.title}</h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed max-w-prose">
                              {about.amenities.description}
                            </p>
                            <ul className="space-y-3 list-disc pl-5">
                              {about.amenities.amenitiesList.map((item, index) => (
                                <li key={index} className="text-sm md:text-base text-foreground/90 leading-snug">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {about.community && (
                  <section ref={aboutCommunityRef} className="py-12 md:py-16">
                    <div className="container mx-auto px-2 sm:px-4">
                      <div className="max-w-6xl mx-auto">
                        <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 inline-block">
                          About Us
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                          {about.community.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
                          {about.community.description}
                        </p>
                      </div>
                    </div>
                  </section>
                )}

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
                  <CourseDetails />
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
        case "gallery": {
          // Preview-safe Gallery page with Images / Videos tabs
          const { gallery } = content;
          const toEmbedUrl = (url: string) => {
            if (!url) return "";
            try {
              if (url.includes("youtu.be/")) {
                const id = url.split("youtu.be/")[1]?.split(/[?&#]/)[0];
                return id ? `https://www.youtube.com/embed/${id}` : url;
              }
              if (url.includes("watch?v=")) {
                const id = url.split("watch?v=")[1]?.split(/[?&#]/)[0];
                return id ? `https://www.youtube.com/embed/${id}` : url;
              }
              return url;
            } catch {
              return url;
            }
          };
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
                    <Tabs
                      key={activeSubSection === 'gallery-videos' ? 'gallery-videos' : 'gallery-images'}
                      defaultValue={activeSubSection === 'gallery-videos' ? 'videos' : 'images'}
                      className="w-full"
                    >
                      <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-8 sm:mb-12">
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="videos">Videos</TabsTrigger>
                      </TabsList>

                      {/* Images Tab */}
                      <TabsContent value="images">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {(gallery.categories.all || []).length ? (
                            gallery.categories.all.map((image, index) => {
                              const imgSrc = resolveImageSrc(image.src);
                              return (
                                <Card key={`all-${index}`} className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
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

                      {/* Videos Tab */}
                      <TabsContent value="videos">
                        {videos && videos.filter((v) => !!v.url).length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {videos.filter((v) => !!v.url).map((video, index) => (
                              <Card
                                key={`video-${index}`}
                                className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300"
                              >
                                <div className="aspect-video w-full bg-muted">
                                  <iframe
                                    src={toEmbedUrl(video.url)}
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
                          <p className="text-center text-muted-foreground">No videos added yet.</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </section>
              </div>
            </div>
          );
        }
        case "reviews":
          // Preview-safe Reviews page: reuse actual Reviews component so layout matches website,
          // but hide the footer inside the preview.
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0 reviews-preview">
                <Reviews />
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
                            <CardTitle>Request a call back</CardTitle>
                            <CardDescription>Fill in your details and pick a suitable time.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="preview-firstName">Name *</Label>
                                  <Input id="preview-firstName" placeholder="First" />
                                </div>
                                <div className="space-y-2">
                                  {/* Empty label to align with Contact page layout */}
                                  <Label className="opacity-0">Last</Label>
                                  <Input placeholder="Last" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Dropdown</Label>
                                <Select defaultValue="working">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Working Person" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="working">Working Person</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="homemaker">House Maker</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="preview-phone">Contact Number *</Label>
                                <Input id="preview-phone" type="tel" placeholder="Enter your number" />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="preview-area">Area of Residence/Work</Label>
                                <Input
                                  id="preview-area"
                                  placeholder="e.g., Ahmedabad"
                                />
                              </div>

                              <div className="space-y-3">
                                <Label>Preferable call time</Label>
                                <div className="flex flex-wrap gap-3">
                                  <label className="flex items-center space-x-2 border rounded-md p-3 flex-1 min-w-[120px] cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Checkbox checked={false} onCheckedChange={() => {}} />
                                    <span className="text-sm">Morning</span>
                                  </label>
                                  <label className="flex items-center space-x-2 border rounded-md p-3 flex-1 min-w-[120px] cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Checkbox checked={false} onCheckedChange={() => {}} />
                                    <span className="text-sm">Afternoon</span>
                                  </label>
                                  <label className="flex items-center space-x-2 border rounded-md p-3 flex-1 min-w-[120px] cursor-pointer hover:bg-gray-50 transition-colors">
                                    <Checkbox checked={false} onCheckedChange={() => {}} />
                                    <span className="text-sm">Evening</span>
                                  </label>
                                </div>
                              </div>

                              <Button type="button" className="w-full gradient-accent">
                                Submit
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
                    <div className="max-w-4xl mx-auto space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden shadow-soft bg-muted">
                        <iframe
                          title="Turning Point Institute Location"
                          src="https://www.google.com/maps?q=Turning+Point+Institute,+The+Grand+Monarch,+306,+100+Feet+Anand+Nagar+Rd,+near+Sima+Hall,+beside+Diamond+Gym+lounge,+Satellite,+Ahmedabad,+Gujarat+380015&hl=en&z=17&output=embed"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                      {contact.mapNote && (
                        <p className="text-sm text-muted-foreground text-center">{contact.mapNote}</p>
                      )}
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
                                    {member.extraLinkLabel && member.extraLinkUrl ? (
                                      <div className="flex items-center space-x-2">
                                        <Users className="h-4 w-4 text-accent" />
                                        <a
                                          href={member.extraLinkUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-accent hover:underline"
                                        >
                                          {member.extraLinkLabel}
                                        </a>
                                      </div>
                                    ) : null}
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
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-50 via-white to-rose-50 border border-border/60 p-8 rounded-2xl shadow-soft">
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

