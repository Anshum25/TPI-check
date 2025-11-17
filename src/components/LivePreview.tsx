import { useRef, useEffect } from "react";
import { useContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Users, Award, BookOpen, Phone, Menu, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Clock, Calendar, CheckCircle, TrendingUp, Heart, Star, Image as ImageIcon, HelpCircle } from "lucide-react";
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
  const admissionsCtaRef = useRef<HTMLDivElement>(null);
  
  // Success Stories page refs
  const successHeroRef = useRef<HTMLDivElement>(null);
  const successStatsRef = useRef<HTMLDivElement>(null);
  const successStoriesRef = useRef<HTMLDivElement>(null);
  const successAchievementsRef = useRef<HTMLDivElement>(null);
  const successVideoRef = useRef<HTMLDivElement>(null);
  
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
      'admissions-cta': admissionsCtaRef,
      // Success Stories page
      'success-hero': successHeroRef,
      'success-stats': successStatsRef,
      'success-stories': successStoriesRef,
      'success-achievements': successAchievementsRef,
      'success-video': successVideoRef,
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
                      <Button size="sm" className="gradient-accent flex-shrink-0 text-xs sm:text-sm">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {gallery.categories.all.slice(0, 9).map((item, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-secondary/30">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs sm:text-sm">
                            {item.title}
                          </div>
                        </div>
                      ))}
                    </div>
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
                <section ref={reviewsHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{reviews.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90 mb-4 sm:mb-6">
                      {reviews.hero.subtitle}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl sm:text-3xl font-bold">{reviews.ratingSummary.score}</span>
                      <span className="text-sm sm:text-base">({reviews.ratingSummary.count} {reviews.ratingSummary.label})</span>
                    </div>
                  </div>
                </section>

                <section ref={reviewsTestimonialsRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                  </div>
                </section>

                <section ref={reviewsCtaRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">{reviews.cta.title}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{reviews.cta.description}</p>
                    <Button size="lg" asChild>
                      <a href={`mailto:${reviews.cta.mailTo}`}>{reviews.cta.buttonText}</a>
                    </Button>
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
                <section ref={faqHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{faq.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{faq.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={faqCategoriesRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                      {faq.categories.map((category, categoryIndex) => (
                        <Card key={categoryIndex} className="shadow-soft">
                          <CardHeader>
                            <CardTitle className="text-base sm:text-lg">{category.category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                              {category.questions.map((question, questionIndex) => (
                                <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                                  <AccordionTrigger className="text-sm sm:text-base">{question.q}</AccordionTrigger>
                                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground">
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

                <section ref={faqSupportRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <Card className="max-w-2xl mx-auto shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">{faq.support.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">{faq.support.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                          <a href={`tel:${faq.support.phoneNumber}`} className="text-sm sm:text-base font-semibold">{faq.support.phoneNumber}</a>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-4">{faq.support.note}</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            </div>
          );
        case "contact":
          // Preview-safe Contact page
          const { contact } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={contactHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{contact.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{contact.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={contactFormRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                      <Card className="shadow-soft">
                        <CardHeader>
                          <CardTitle className="text-base sm:text-lg">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="course">Course Interest</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                              </SelectTrigger>
                              <SelectContent>
                                {contact.courseOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" rows={4} placeholder="Your message..." />
                          </div>
                          <Button className="w-full">Send Message</Button>
                        </CardContent>
                      </Card>

                      <div className="space-y-4 sm:space-y-6">
                        {contact.cards.map((card, index) => (
                          <Card key={index} className="shadow-soft">
                            <CardHeader>
                              <CardTitle className="text-base sm:text-lg">{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {card.lines.map((line, lineIndex) => (
                                  <p key={lineIndex} className="text-xs sm:text-sm text-muted-foreground">{line}</p>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section ref={contactMapRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <p className="text-xs sm:text-sm text-muted-foreground">{contact.mapNote}</p>
                  </div>
                </section>
              </div>
            </div>
          );
        case "faculty":
          // Preview-safe Faculty page
          const { faculty } = content;
          return (
            <div ref={previewRef} className="h-full w-full bg-background overflow-y-auto overflow-x-hidden">
              <div className="w-full max-w-full min-w-0">
                <section ref={facultyHeroRef} className="gradient-hero py-12 sm:py-20 text-primary-foreground">
                  <div className="container mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{faculty.hero.title}</h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-primary-foreground/90">{faculty.hero.subtitle}</p>
                  </div>
                </section>

                <section ref={facultyMembersRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                      {faculty.members.map((member, index) => (
                        <Card key={index} className="shadow-soft">
                          <CardHeader>
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="h-16 w-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground text-xl font-bold">
                                {member.imageInitials}
                              </div>
                              <div>
                                <CardTitle className="text-base sm:text-lg">{member.name}</CardTitle>
                                <CardDescription className="text-xs sm:text-sm">{member.role}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="text-xs sm:text-sm font-semibold mb-1">Education</p>
                              <p className="text-xs sm:text-sm text-muted-foreground">{member.education}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold mb-1">Experience</p>
                              <p className="text-xs sm:text-sm text-muted-foreground">{member.experience}</p>
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-semibold mb-1">Specialization</p>
                              <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                                {member.specialization.map((spec, specIndex) => (
                                  <li key={specIndex}>{spec}</li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground">{member.description}</p>
                            {member.achievements.length > 0 && (
                              <div>
                                <p className="text-xs sm:text-sm font-semibold mb-1">Achievements</p>
                                <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside">
                                  {member.achievements.map((achievement, achIndex) => (
                                    <li key={achIndex}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={facultyMethodologyRef} className="py-12 sm:py-20 bg-secondary/30">
                  <div className="container mx-auto px-2 sm:px-4">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-12 text-center">Teaching Methodology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                      {faculty.methodology.map((method, index) => (
                        <Card key={index} className="shadow-soft">
                          <CardHeader>
                            <CardTitle className="text-base sm:text-lg">{method.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs sm:text-sm text-muted-foreground">{method.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                <section ref={facultyPromiseRef} className="py-12 sm:py-20">
                  <div className="container mx-auto px-2 sm:px-4">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">{faculty.promise.title}</h2>
                      <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-muted-foreground">
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
        <p className="text-sm font-semibold">Live Preview</p>
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

