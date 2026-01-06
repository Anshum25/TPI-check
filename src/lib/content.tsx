import React, { createContext, useContext, useEffect, useState } from "react";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";

export type Feature = { title: string; description: string };

type CourseBatchItem = { label: string; time: string };
type CourseBatchGroup = { heading: string; color?: "primary" | "accent"; items: CourseBatchItem[] };
type CourseKeyDetail = { icon: "clock" | "calendar" | "users"; title: string; description: string };
type CourseOverview = {
  kicker?: string;
  title?: string;
  titleBefore?: string;
  titleHighlight?: string;
  titleAfter?: string;
  schedule?: CourseBatchGroup[];
  details?: CourseKeyDetail[];
  ctaText?: string;
  ctaButton?: string;
  ctaLink?: string;
};
type DifferentiatorItem = { title: string; description?: string };
type DifferentiatorCard = {
  icon: "award" | "users";
  title: string;
  items: DifferentiatorItem[];
  footerText?: string;
};
export type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating?: number;
  achievement?: string;
  source?: "google" | "facebook" | "justdial";
};

type HeroContent = {
  title: string;
  subtitle: string;
};

type Stat = { value: string; label: string };
type SimpleCard = { title: string; description: string };
type BenefitSection = { title: string; items: string[] };
type JoinUs = {
  kicker?: string;
  titleBefore?: string;
  titleHighlight?: string;
  titleAfter?: string;
  subtitle?: string;
  videoUrl?: string;
  steps?: { label: string }[];
  reasons?: { title: string; description: string }[];
  reasonsHeading?: string;
  statCard?: { metric: string; heading: string; description: string };
  infoCard?: { title: string; description: string };
  bottom?: { title: string; description: string };
};
type Question = { q: string; a: string };
type FAQCategory = { category: string; questions: Question[] };
type MethodologySection = {
  title: string;
  intro?: string;
  subtitle?: string;
  description?: string;
  objectives?: string[];
  objectivesTitle?: string;
  images?: { src: string; alt?: string }[];
};

type InformationBanner = {
  isVisible: boolean;
  content: string;
  imageUrl?: string;
};

type Marquee = {
  isVisible: boolean;
  text: string;
};

export type SiteContent = {
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroCarousel: {
      slides: {
        imageUrl: string;
        title: string;
        subtitle: string;
        primaryButtonText: string;
        primaryButtonLink: string;
        secondaryButtonText: string;
        secondaryButtonLink: string;
      }[];
    };
    features: Feature[];
    differentiators?: { cards: DifferentiatorCard[] };
    joinUs?: JoinUs;
    courseOverview?: CourseOverview;
    directorVideoUrl: string;
    methodologyBadge?: string;
    methodologyKeyPoint?: string;
    testimonials: Testimonial[];
    methodologyHeading: string;
    methodologyTitle: string;
    methodologySections: MethodologySection[];
    gainHeading: string;
    gainTitle: string;
    gainGroups?: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    }[];
    achievementsSection?: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    };
    facultyHighlight?: {
      badgeLabel: string;
      title: string;
      description: string;
    };
    activityVideos?: {
      title: string;
      subtitle: string;
      videos: { title: string; videoUrl: string }[];
    };
    activityImages?: {
      title: string;
      subtitle: string;
      images: { title: string; src: string }[];
    };
    homeReviews?: {
      title: string;
      subtitle: string;
    };
    informationBanner?: InformationBanner;
    marquee?: Marquee;
    ctaTitle: string;
    ctaText: string;
  };
  header: {
    siteTitle: string;
    nav: { label: string; to: string }[];
  };
  footer: {
    instituteName: string;
    subHeader: string;
    tagline: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
    quickLinks: { label: string; to: string }[];
    courses: string[];
    whatWeDo?: string[];
    contact: {
      address: string;
      phone: string;
      email: string;
    };
    copyright: string;
  };
  about: {
    hero: HeroContent;
    stats: Stat[];
    highlight?: {
      headingPrimary: string;
      headingSecondary: string;
      paragraphs: string[];
    };
    amenities?: {
      title: string;
      description: string;
      amenitiesList: string[];
      carouselImages: string[];
    };
    community?: {
      title: string;
      description: string;
    };
    story: string[];
    coreValues: SimpleCard[];
    differentiators: SimpleCard[];
  };
  courses: {
    hero: HeroContent;
    courses: {
      title: string;
      description: string;
      duration: string;
      students: string;
      level: string;
    }[];
    benefits: string[];
    learningSections: BenefitSection[];
  };
  admissions: {
    hero: HeroContent & { subtitle: string };
    contactCtas: {
      phoneLabel: string;
      phoneNumber: string;
      secondaryLabel: string;
      secondaryLink: string;
      secondaryText: string;
    };
    steps: { step: string; title: string; description: string }[];
    courseDetails: { label: string; value: string; icon: "clock" | "calendar" | "map" | "award" | "users" }[];
    targetGroups: { title: string; benefits: string[] }[];
    whyChoose: string[];
    cta: {
      title: string;
      subtitle: string;
      tagline: string;
      phoneLabel: string;
      phoneNumber: string;
      directionsLabel: string;
      directionsUrl: string;
    };
  };
  successStories: {
    hero: HeroContent;
    stats: Stat[];
    stories: Required<Testimonial>[];
    achievements: string[];
    video: { description: string; linkText: string; linkUrl: string; note: string };
    cta: {
      title: string;
      description: string;
      phoneLabel: string;
      phoneNumber: string;
      reviewLinks: { label: string; url: string }[];
    };
  };
  gallery: {
    hero: HeroContent;
    categories: Record<"all" | "classroom" | "events" | "students", { src: string; title: string; category: string }[]>;
    videos: { title: string; url: string }[];
  };
  reviews: {
    hero: HeroContent;
    ratingSummary: { score: string; label: string; count: string };
    testimonials: Testimonial[];
    sections?: {
      google: { title: string; description: string; watchMoreUrl: string };
      facebook: { title: string; description: string; watchMoreUrl: string };
      justdial: { title: string; description: string; watchMoreUrl: string };
    };
    cta: { title: string; description: string; buttonText: string; mailTo: string };
  };
  faq: {
    hero: HeroContent;
    categories: FAQCategory[];
    support: { title: string; description: string; phoneNumber: string; note: string };
  };
  contact: {
    hero: HeroContent;
    courseOptions: { value: string; label: string }[];
    cards: { type: "address" | "phone" | "email" | "hours"; title: string; lines: string[] }[];
    mapNote: string;
  };
  faculty: {
    hero: HeroContent;
    members: {
      name: string;
      role: string;
      imageUrl?: string;
      imageInitials: string;
      education: string;
      experience: string;
      specialization: string[];
      description: string;
      achievements: string[];
      extraLinkLabel?: string;
      extraLinkUrl?: string;
    }[];
    methodology: SimpleCard[];
    promise: { title: string; paragraphs: string[] };
  };
  notFound: {
    title: string;
    description: string;
    linkLabel: string;
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  home: {
    heroTitle: "Learn English the way never experienced before",
    heroSubtitle: "Your Performance is Our Responsibility!!",
    heroCarousel: {
      slides: [
        {
          imageUrl: "/src/assets/hero-classroom.jpg",
          title: "Transform Your Communication Skills",
          subtitle: "Master English Speaking & Personality Development",
          primaryButtonText: "Enroll Now",
          primaryButtonLink: "/admissions",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "/about",
        },
        {
          imageUrl: "/src/assets/speaking-confidence.jpg",
          title: "Build Confidence & Leadership",
          subtitle: "Expert Training for Personal & Professional Growth",
          primaryButtonText: "Enroll Now",
          primaryButtonLink: "/admissions",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "/courses",
        },
        {
          imageUrl: "/src/assets/student-success.jpg",
          title: "Join 10,000+ Successful Students",
          subtitle: "Quality Education Since 1999",
          primaryButtonText: "Enroll Now",
          primaryButtonLink: "/admissions",
          secondaryButtonText: "Learn More",
          secondaryButtonLink: "/success-stories",
        },
      ],
    },
    joinUs: {
      kicker: "Start Your Journey",
      titleBefore: "Bring a",
      titleHighlight: "Turning Point",
      subtitle: "Be fluent and confident in English, from basic to advanced level",
      videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
      steps: [
        { label: "Basics" },
        { label: "Intermediate" },
        { label: "Fluent" },
      ],
      reasons: [
        {
          title: "Established Since 1999",
          description:
            "Founded by Ashish Bhatt and Pragna Bhatt, we've been the ultimate solution for effective English communication skills in Ahmedabad for over 25 years.",
        },
        {
          title: "Learn Directly from Founders",
          description:
            "Study with Mr Ashish Bhatt and Mrs Pragna Bhatt themselves. Their rich experience in making students fluent and confident is unmatched.",
        },
        {
          title: "Out of the Box Teaching",
          description:
            "Our unique approach is completely unconventional and highly effective. You'll find learning Spoken English easy and genuinely interesting.",
        },
      ],
      statCard: {
        metric: "25+",
        heading: "Years of Excellence",
        description:
          "Two decades of transforming lives and building confidence in English communication. Join thousands of successful alumni.",
      },
      infoCard: {
        title: "Perfect Institute For You",
        description:
          "If you're looking for the best English speaking classes in Ahmedabad, Turning Point is the ultimate choice. We've evolved into an institution of excellence.",
      },
      bottom: {
        title: "You belong here.",
        description:
          "The real strength of any institute is its teachers. At Turning Point, you're not just a student – you're part of a community led by the founders themselves. Your success is our responsibility. You'll experience a teaching method that's proven effective for making students fluent, confident, and genuinely interested in learning English.",
      },
    },
    courseOverview: {
      kicker: "Program Overview",
      titleBefore: "The",
      titleHighlight: "Course",
      titleAfter: "",
      schedule: [
        {
          heading: "Morning",
          color: "primary",
          items: [
            { label: "Batch 1", time: "8:00 am to 9:30 am" },
            { label: "Batch 2", time: "9:30 am to 11:00 am" },
            { label: "Batch 3", time: "11:00 am to 12:30 pm" },
          ],
        },
        {
          heading: "Afternoon",
          color: "primary",
          items: [],
        },
        {
          heading: "Evening",
          color: "accent",
          items: [
            { label: "Batch 4", time: "6:00 pm to 7:30 pm" },
            { label: "Batch 5", time: "7:30 pm to 9:00 pm" },
          ],
        },
      ],
      details: [
        { icon: "clock", title: "Duration", description: "Two months" },
        { icon: "calendar", title: "Sessions", description: "Monday to Friday (90 minutes)" },
        { icon: "users", title: "Seminars", description: "Twice in a month (Saturday)" },
      ],
      ctaText: "Ready to start your transformation journey?",
      ctaButton: "Contact Us",
      ctaLink: "/contact",
    },
    features: [
      { title: "Expert Training", description: "Learn from experienced professionals with proven teaching methods" },
      { title: "10,000+ Students", description: "Join our successful alumni network since 1999" },
      { title: "Certified Programs", description: "Receive recognized certificates upon course completion" },
      { title: "Practical Approach", description: "Real-world scenarios and interactive learning methods" },
    ],
    differentiators: {
      cards: [
        {
          icon: "award",
          title: "An Institute Exclusively for",
          items: [
            { title: "Spoken English and Personality Development" },
          ],
          footerText:
            "Specialized training designed specifically for these core areas of transformation",
        },
        {
          icon: "users",
          title: "Trained 10,000+ Students Since 1999",
          items: [
            {
              title: "Coaching by Founders",
              description:
                "Direct mentorship from institute founders with 25+ years experience",
            },
            {
              title: "No Franchises/No Branches",
              description:
                "Single location ensures consistent quality and personalized attention",
            },
          ],
        },
      ],
    },
    directorVideoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
    methodologyBadge: "Our Methodology",
    methodologyKeyPoint: "Direct mentorship from the institute founders with proven teaching methods",
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Software Engineer",
        content: "This institute transformed my communication skills completely. I'm now confident in presentations and team meetings.",
        rating: 5,
      },
      {
        name: "Rahul Patel",
        role: "Business Owner",
        content: "The personality development course helped me become a better leader. Highly recommend to everyone!",
        rating: 5,
      },
      {
        name: "Anjali Desai",
        role: "HR Manager",
        content: "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth.",
        rating: 5,
      },
    ],
    methodologyHeading: "How We Teach",
    methodologyTitle: "Our Teaching Methodology",
    methodologySections: [
      {
        title: "Coaching Method",
        intro: "You are going to study with Mr Ashish Bhatt and Mrs Pragna Bhatt who have taught thousands of students in more than two decades. Their highly interactive and practical method will help you to create your own sentence structures with amazing clarity in Grammar and other aspects. You are going to speak thousands of sentences during the grammar session, which are asked to you in Hindi/Gujarati for every grammar point being taught. During this step by step we connect all structures with logic and visualization in such a way that you will find out that each 5+ every sentence is formed by using basic 4 to 5 rules only! In this process your smartest errors will be rectified and you will develop presence of mind to use simplest to most complex structures for expressing yourself with the confidence that your grammar is always correct. This will help you in participating in variety of speaking activities with confidence and get true fluency in English.",
        images: [
          { src: "/src/assets/hero-classroom.jpg", alt: "Coaching Method Image 1" },
          { src: "/src/assets/speaking-confidence.jpg", alt: "Coaching Method Image 2" },
          { src: "/src/assets/student-success.jpg", alt: "Coaching Method Image 3" },
        ],
      },
      {
        title: "Speaking Activities",
        subtitle: "Speak Fluently As Effectively As In Your Mother Tongue",
        description: "With every passing grammar lecture you will find improvement in speaking English, which will be strengthened by various speaking activities like Public Speaking, Role-Plays, Group Discussions, Debates, Presentations, Small Dramas and more.... All of those activities are spontaneous and highly interactive. The format of the activities are designed in such a way that gradually it becomes more interesting and challenging with the time and improvement in your speaking skills. You will be performing from the stage again and again. Your body language, presentation skills, confidence level etc. will be improved in this phase. Having got rid of stage fear, you will be able to communicate in English in any one in any situation fluently and effectively.",
        objectivesTitle: "Activities are held aiming at following objectives:",
        objectives: [
          "Confirming clarity in use of various sentence structures and vocabulary while speaking fluently",
          "Developing ability to articulate and respond quickly in smart manner ( Negotiating and handling resistance)",
          "Making good rapport at professional and social level by verbal and non verbal expressions",
          "Refining eye contact, gestures, movement of body parts and over all body language",
          "Removing stage fear while giving presentation and then responding to the questions from any corner of the audience and so on...",
        ],
        images: [
          { src: "/src/assets/speaking-confidence.jpg", alt: "Speaking Activities Image 1" },
          { src: "/src/assets/hero-classroom.jpg", alt: "Speaking Activities Image 2" },
          { src: "/src/assets/student-success.jpg", alt: "Speaking Activities Image 3" },
        ],
      },
      {
        title: "Reading and Writing",
        description: "Growing in white collar profession is not possible without excellent reading and writing skills. Specially designed modules for reading and writing will enable you to read and write as effectively as in your mother tongue. With the help of reading techniques taught by us and absolute clarity in sentence formations, you will be able to read with perfect understanding and at double speed. You will be able to make written communication very effectively and the course will enable you to present your ideas in the way you want. Whether you would like to make it precise or elaborate or enthusiastic, you will have the tools to do it. This will enhance your performance specially working at corporate level.",
        images: [
          { src: "/src/assets/student-success.jpg", alt: "Reading and Writing Image 1" },
          { src: "/src/assets/speaking-confidence.jpg", alt: "Reading and Writing Image 2" },
          { src: "/src/assets/hero-classroom.jpg", alt: "Reading and Writing Image 3" },
        ],
      },
      {
        title: "Personal Support",
        subtitle: "No Matter What !! We Are There You Will Achieve Your Goal !",
        description: "When you join our institute you become part of Turning Point Family. We make sure that each and every student gets the desired result. We are continuously monitoring the performance of all the students through various parameters and if required we provide personal support to the weak students. If you miss any lecture also our team is at your help to cover up what you had missed. The goal for which you have joined must be achieved. The only condition for our support is that you have to regular and do the work regularly which is of around 30 minutes.",
        images: [
          { src: "/src/assets/hero-classroom.jpg", alt: "Personal Support Image 1" },
          { src: "/src/assets/student-success.jpg", alt: "Personal Support Image 2" },
          { src: "/src/assets/speaking-confidence.jpg", alt: "Personal Support Image 3" },
        ],
      },
    ],
    gainHeading: "What You Will Gain",
    gainTitle: "What you would gain from the course!",
    gainGroups: [
      {
        title: "Working Professionals",
        subtitle: "Make English your strength and achieve higher professional growth!",
        items: [
          {
            title: "Correct Language (Written Communication)",
            description: "Present your ideas effectively with extraordinary skills to construct smallest to most complex sentences with absolute clarity and decency.",
          },
          {
            title: "Presentation Skills (Verbal Communication)",
            description: "Speak fluently in English with tremendous confidence that you are always correct in the language. Remove stage fear and develop correct body language by performing various activities on the stage.",
          },
          {
            title: "Be a quick learner ( Reading Skills)",
            description: "Develop ability To Read with Double speed and understand the mails and Other written Communication Without Any Confusion . Pursue Further Education or Training with Excellent Reading Skills and Get Success",
          },
        ],
      },
      {
        title: "Students",
        subtitle: "Make English your language to get success in higher education and social life",
        items: [
          {
            title: "Replace your mother tongue with English",
            description: "Get so much clarity and perfection in English that you would speak in English every where and with anyone.",
          },
          {
            title: "Make your higher education interesting and burden-less",
            description: "Develop very effective reading and writing skills which would help you to study effectively and get good marks in collage.",
          },
          {
            title: "Transform into a confident and out spoken person",
            description: "A number of speaking activities will help you transform into a person with confidence to communicate effectively and create own identity where ever you go.",
          },
        ],
      },
      {
        title: "Homemakers",
        subtitle: "Get fluency and confidence in spoken English and play your roles effectively.",
        items: [
          {
            title: "Be the best teacher of your child",
            description: "You will get amazing clarity in English language which will help you to support your child who is studying in English medium. Also you will be able to communicate effectively with your child's teacher in English.",
          },
          {
            title: "Be fluent and confident",
            description: "A lot of practice will make you fluent in English and you will be confident to speak in English just like your mother tongue. It will give confidence to your child as well as an environment to learn better in English medium school.",
          },
          {
            title: "Be presentable in social life",
            description: "A lot of speaking activities like public speaking, group discussions, role plays and more will help you to become confident and presentable in your social circle.",
          },
        ],
      },
    ],
    achievementsSection: {
      title: "What You'll Achieve",
      subtitle: "Master English through our proven methodology",
      items: [
        {
          title: "Achieve Clarity",
          description: "from Basic to most Advance sentence structures",
        },
        {
          title: "Achieve Fluency",
          description: "with complete understanding of grammar concepts and flow of language",
        },
        {
          title: "Achieve Confidence",
          description: "through numerous stage activities and public speaking sessions",
        },
        {
          title: "Achieve Perfection",
          description: "by mastering all aspects of the language",
        },
      ],
    },
    facultyHighlight: {
      badgeLabel: "Core Faculty",
      title: "Owners are the Teachers!!",
      description:
        "Meet the founders and core faculty who personally mentor every student at Turning Point.",
    },
    activityVideos: {
      title: "Student Activities",
      subtitle: "Watch real student activities and transformations in action",
      videos: [
        {
          title: "Group Discussion Activity",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Public Speaking & Confidence Building",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Interactive Role Play Session",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Stage Presentation Practice",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Speaking Drill & Fluency Building",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
        {
          title: "Interview & Personality Development",
          videoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
        },
      ],
    },
    activityImages: {
      title: "Moments that Matter",
      subtitle: "Glimpses of real classrooms, stage activities, and everyday learning moments",
      images: [
        {
          title: "Classroom Interaction",
          src: "/src/assets/hero-classroom.jpg",
        },
        {
          title: "Speaking & Confidence",
          src: "/src/assets/speaking-confidence.jpg",
        },
        {
          title: "Student Success",
          src: "/src/assets/student-success.jpg",
        },
      ],
    },
    homeReviews: {
      title: "Review from our achievers",
      subtitle: "Read authentic reviews from students who transformed their English and personality with us.",
    },
    informationBanner: {
      isVisible: false,
      content: "",
      imageUrl: undefined,
    },
    marquee: {
      isVisible: true,
      text: "Transform your English speaking skills with our proven methodology",
    },
    ctaTitle: "Ready to Transform Your Future?",
    ctaText: "Join thousands of successful students and start your journey towards excellence today",
  },
  header: {
    siteTitle: "TURNING POINT INSTITUTE",
    nav: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Faculty", to: "/faculty" },
      { label: "Admissions", to: "/admissions" },
      { label: "Gallery", to: "/gallery" },
      { label: "Reviews", to: "/reviews" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  footer: {
    instituteName: "TURNING POINT INSTITUTE",
    subHeader: "THE ONE TO TURN TO",
    tagline: "Transforming lives through quality education and personality development since 1999.",
    socialMedia: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    quickLinks: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Courses", to: "/courses" },
      { label: "Gallery", to: "/gallery" },
    ],
    courses: [
      "Spoken English",
      "Personality Development",
      "Business Communication",
      "Interview Preparation",
    ],
    whatWeDo: [
      "Coaching by Founders",
      "No Franchises or Branches",
      "Practical, Results-Oriented Approach",
    ],
    contact: {
      address: "123 Education Street, Learning City, 380001",
      phone: "+91 98765 43210",
      email: "info@excellence.edu",
    },
    copyright: "© 2025 TPI. All rights reserved.",
  },
  about: {
    hero: {
      title: "About Turning Point Institute",
      subtitle: "Empowering individuals through quality education since 1999",
    },
    highlight: {
      headingPrimary: "Your search for effective coaching",
      headingSecondary: "ENDS HERE...",
      paragraphs: [
        "Established in 1999 by Mr. Ashish Bhatt and Mrs. Pragna Bhatt, Turning Point Institute has trained thousands of people from all walks of life. Dedication to the purpose and unmatched skills in imparting coaching have helped Turning Point win love and admiration from all its students. For those searching for English speaking classes near me, Turning Point Institute offers a proven track record of success.",
        "The enduring benefits of the training can be measured by the fact that there have been hundreds of families whose 2 to 3 members, or even entire families, have taken our courses to upgrade their abilities and keep pace with today’s dynamic world.",
      ],
    },
    stats: [
      { value: "10,000+", label: "Students Trained" },
      { value: "25+", label: "Years Experience" },
      { value: "95%", label: "Success Rate" },
      { value: "4.9/5", label: "Student Rating" },
    ],
    story: [
      "Founded in 1999, Excellence Institute began with a simple mission: to help individuals overcome language barriers and build confidence in their personal and professional lives. What started as a small coaching center has grown into one of the most trusted names in personality development and English language training.",
      "Our founders, with decades of combined experience in education and corporate training, recognized the need for practical, results-oriented programs that focus on real-world application rather than just theoretical knowledge. This philosophy continues to guide everything we do.",
      "Over the years, we've had the privilege of training over 10,000 students from diverse backgrounds, helping them achieve their dreams of career advancement, academic success, and personal growth. Our commitment to quality education and individual attention has remained unwavering.",
    ],
    amenities: {
      title: "Amenities",
      description:
        "We are functioning at a spacious premises in posh area of Satellite with all the amenities to facilitate our students with the best environment to sharpen their communication skills and gain self confidence along with positive personality traits.",
      amenitiesList: [
        "Precious AC class rooms with comfortable sitting arrangement",
        "Hall with stage, mic and projector",
        "Course material with detailed explanation and practice material",
        "Recorded videos of all the lectures if student misses any lecture",
        "Library with numerous reading materials along with take home facility",
        "Reading room where you can utilize for quality time",
      ],
      carouselImages: [
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1516979187457-635ffe35ff81?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1497633762265-25c147778efd?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=800&fit=crop",
      ],
    },
    community: {
      title: "Serving the community for more than two decades",
      description:
        "Turning Point Institute is the best English speaking coaching class in Ahmedabad, situated beside Sima hall of Satellite it caters to the needs of all the people residing in Anand nagar, Prahlad nagar, shymal, jivraj park, Vejalpur, sarkhej, juhapura, Prernatirth derasar road, ramdev nagar, bodakdev cross roads, Ambawadi, Shreyas Tekra, Manek baugh, Ayojan nagar, SG road, Iscon cross roads, Himmatlal park, bodakdev, Vastrapur and more where people find English Speaking class near me. Apart from these areas Working professionals, students, housewives and also foreign study aspirants join our course from far areas like Drive in, bopal, south bopal, Shilaj, Thaltej, Science city, Chand kheda, Naroda, Narol, Bapunagar, Shahibagh, Naranpura, Paldi, Maninagar, Vatva and more as Turning Point Institute is one of the oldest and among the top ten institutes in Ahmedabad. The students join our course to get perfection in grammar as it's helpful for Govt exams, gpsc, staff selection, banking along with IELTS, SAT and PTE. Apart from this our course is extremely helpful to working professionals as it develops corporate communication skills along with email writing and client communication.",
    },
    coreValues: [
      { title: "Excellence", description: "We strive for excellence in everything we do, ensuring the highest quality education." },
      { title: "Integrity", description: "We maintain the highest standards of integrity in our teaching methods and relationships with students." },
      { title: "Innovation", description: "We continuously evolve our teaching methods to incorporate the latest educational research and technology." },
    ],
    differentiators: [
      { title: "Coaching by Founders", description: "Unlike many institutes, our founders personally conduct classes, bringing decades of expertise directly to you." },
      { title: "No Franchises or Branches", description: "We maintain quality by operating from a single location, ensuring consistent standards and personalized attention." },
      { title: "Practical, Results-Oriented Approach", description: "Our curriculum focuses on real-world applications, preparing you for actual situations you'll face in life and career." },
    ],
  },
  courses: {
    hero: {
      title: "Our Courses",
      subtitle: "Comprehensive programs designed to transform your communication and personality",
    },
    courses: [
      {
        title: "Spoken English - Basic",
        description: "Build a strong foundation in English grammar, vocabulary, and basic conversation skills",
        duration: "2 Months",
        students: "2000+ Students",
        level: "Beginner",
      },
      {
        title: "Spoken English - Advanced",
        description: "Master fluent communication, advanced grammar, and professional English skills",
        duration: "3 Months",
        students: "3000+ Students",
        level: "Intermediate to Advanced",
      },
      {
        title: "Personality Development",
        description: "Build confidence, leadership skills, body language, and professional etiquette",
        duration: "2 Months",
        students: "3000+ Students",
        level: "All Levels",
      },
      {
        title: "Business Communication",
        description: "Learn professional email writing, presentations, and corporate communication skills",
        duration: "1.5 Months",
        students: "1500+ Students",
        level: "Intermediate",
      },
      {
        title: "Interview Preparation",
        description: "Ace your job interviews with expert guidance on common questions and techniques",
        duration: "1 Month",
        students: "2000+ Students",
        level: "All Levels",
      },
      {
        title: "Public Speaking",
        description: "Overcome stage fear and become a confident public speaker with practical training",
        duration: "1.5 Months",
        students: "1000+ Students",
        level: "All Levels",
      },
    ],
    benefits: [
      "Small batch sizes for personalized attention",
      "Interactive group discussions and activities",
      "Real-world practice scenarios",
      "Experienced instructors with proven methods",
      "Flexible timing options",
      "Certificate upon completion",
      "Lifetime alumni support",
      "Regular progress assessments",
    ],
    learningSections: [
      {
        title: "Spoken English Programs",
        items: [
          "Grammar fundamentals and advanced concepts",
          "Vocabulary building and contextual usage",
          "Pronunciation and accent training",
          "Conversation skills for various situations",
          "Writing skills - emails, letters, essays",
        ],
      },
      {
        title: "Personality Development",
        items: [
          "Confidence building techniques",
          "Body language and non-verbal communication",
          "Leadership and team management skills",
          "Time management and goal setting",
          "Professional etiquette and grooming",
        ],
      },
      {
        title: "Business Communication",
        items: [
          "Professional email writing",
          "Business presentation skills",
          "Meeting etiquette and participation",
          "Negotiation and persuasion techniques",
          "Corporate communication protocols",
        ],
      },
    ],
  },
  admissions: {
    hero: {
      title: "Admissions Open",
      subtitle: "Join us and bring a Turning Point in your life",
    },
    contactCtas: {
      phoneLabel: "Call: 9725500435",
      phoneNumber: "9725500435",
      secondaryLabel: "Request Callback",
      secondaryLink: "/contact",
      secondaryText: "Request Callback",
    },
    steps: [
      { step: "1", title: "Contact Us", description: "Call us at 9725500435 or visit our institute to learn about available batches and course details" },
      { step: "2", title: "Counseling", description: "Discuss your goals with our founders. We'll help you understand the course structure and choose the right program" },
      { step: "3", title: "Select Batch", description: "Choose a batch timing that suits your schedule - morning, afternoon, or evening options available" },
      { step: "4", title: "Enrollment", description: "Complete the simple enrollment process and start your journey with the next available batch" },
    ],
    courseDetails: [
      { label: "Duration", value: "2 Months", icon: "clock" },
      { label: "Schedule", value: "Monday to Friday", icon: "calendar" },
      { label: "Session Length", value: "90 minutes per session", icon: "clock" },
      { label: "Seminars", value: "Personality Development & GK seminars twice a month", icon: "award" },
      { label: "Batch Size", value: "Small batches for personalized attention", icon: "users" },
      { label: "Location", value: "Satellite, Ahmedabad", icon: "map" },
    ],
    targetGroups: [
      {
        title: "Working Professionals",
        benefits: [
          "Improve presentation and communication skills",
          "Enhance written business communication",
          "Boost career growth opportunities",
          "Read faster and understand better",
        ],
      },
      {
        title: "Students",
        benefits: [
          "Build strong foundation in English",
          "Excel in higher education",
          "Develop confident personality",
          "Improve academic performance",
        ],
      },
      {
        title: "Homemakers",
        benefits: [
          "Support children's English education",
          "Communicate confidently in social circles",
          "Become fluent like native speakers",
          "Be the best teacher for your child",
        ],
      },
    ],
    whyChoose: [
      "Coaching by Founders - 25+ years experience",
      "No Franchises, No Branches - Quality maintained",
      "10,000+ students trained since 1999",
      "Highly interactive and practical method",
      "Personal support to every student",
      "Small batch sizes",
      "Flexible timing options",
      "Lifetime alumni support",
    ],
    cta: {
      title: "Ready to Get Started?",
      subtitle: "From basic to the advance level - Be fluent and confident in English!",
      tagline: "Your Performance is Our Responsibility!!",
      phoneLabel: "Call Now: 9725500435",
      phoneNumber: "9725500435",
      directionsLabel: "Get Directions",
      directionsUrl: "https://www.google.com/maps/place/Turning+Point+Institute/@23.0131818,72.518835,17z/data=!3m1!4b1!4m6!3m5!1s0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e!8m2!3d23.0131818!4d72.5210237!16s%2Fg%2F1v42d5nt",
    },
  },

  successStories: {
    hero: {
      title: "Success Stories",
      subtitle: "Real transformations from our students",
    },
    stats: [
      { value: "10,000+", label: "Students Trained" },
      { value: "1999", label: "Established" },
      { value: "4.9/5", label: "Average Rating" },
    ],
    stories: [
      {
        name: "Priya Sharma",
        role: "Software Engineer",
        content:
          "This institute transformed my communication skills completely. I'm now confident in presentations and team meetings.",
        rating: 5,
        achievement: "More confidence in presentations",
        source: "google",
      },
      {
        name: "Rahul Patel",
        role: "Business Owner",
        content:
          "The course helped me become a better leader and communicator. The founders' guidance is truly valuable.",
        rating: 5,
        achievement: "Better leadership and communication",
        source: "facebook",
      },
      {
        name: "Anjali Desai",
        role: "HR Manager",
        content:
          "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth.",
        rating: 5,
        achievement: "Improved professional communication",
        source: "justdial",
      },
    ],
    achievements: [
      "Improved fluency and grammar clarity",
      "More confident stage performance",
      "Better interviews and workplace communication",
      "Stronger body language and personality",
    ],
    video: {
      description: "Watch our students speak with confidence and share their learning experience.",
      linkText: "Watch student activities",
      linkUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
      note: "Videos showcase speaking activities conducted during the course",
    },
    cta: {
      title: "Read More Reviews",
      description: "Check authentic student reviews on popular platforms.",
      phoneLabel: "Call: 9725500435",
      phoneNumber: "9725500435",
      reviewLinks: [
        {
          label: "Google Reviews",
          url: "https://www.google.com/search?q=turning+point+institute#lrd=0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e,1,,,,",
        },
        {
          label: "Facebook Reviews",
          url: "https://www.facebook.com/",
        },
        {
          label: "JustDial Reviews",
          url: "https://www.justdial.com/",
        },
      ],
    },
  },

  gallery: {
    hero: {
      title: "Gallery",
      subtitle: "Glimpses of our vibrant learning environment and student activities",
    },
    categories: {
      all: [
        { src: heroClassroom, title: "Group Discussion Session", category: "classroom" },
        { src: speakingConfidence, title: "Public Speaking Practice", category: "events" },
        { src: studentSuccess, title: "Successful Students Batch", category: "students" },
        { src: heroClassroom, title: "Interactive Learning", category: "classroom" },
        { src: speakingConfidence, title: "Presentation Skills", category: "events" },
        { src: studentSuccess, title: "Achievement Ceremony", category: "events" },
      ],
      classroom: [
        { src: heroClassroom, title: "Group Discussion Session", category: "classroom" },
        { src: heroClassroom, title: "Interactive Learning", category: "classroom" },
      ],
      events: [
        { src: speakingConfidence, title: "Public Speaking Practice", category: "events" },
        { src: speakingConfidence, title: "Presentation Skills", category: "events" },
        { src: studentSuccess, title: "Achievement Ceremony", category: "events" },
      ],
      students: [{ src: studentSuccess, title: "Successful Students Batch", category: "students" }],
    },
    videos: [
      {
        title: "Speaking activities done in the later part of the course",
        url: "https://www.youtube.com/embed/sLMm9trcZYc",
      },
      {
        title: "Turning Point Institute student presentation",
        url: "https://www.youtube.com/embed/VIDEO_ID_2",
      },
      {
        title: "Group discussion and public speaking practice",
        url: "https://www.youtube.com/embed/VIDEO_ID_3",
      },
    ],
  },
  reviews: {
    hero: {
      title: "Student Reviews",
      subtitle: "Read what our students have to say about their learning experience",
    },
    ratingSummary: {
      score: "4.9",
      label: "out of 5 stars",
      count: "Based on 500+ reviews",
    },
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Software Engineer",
        content: "This institute transformed my communication skills completely. I'm now confident in presentations and team meetings. The practical approach really works!",
        rating: 5,
        source: "google",
      },
      {
        name: "Rahul Patel",
        role: "Business Owner",
        content: "The personality development course helped me become a better leader. Highly recommend to everyone who wants to grow professionally!",
        rating: 5,
        source: "google",
      },
      {
        name: "Anjali Desai",
        role: "HR Manager",
        content: "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth. The batch size is perfect for individual attention.",
        rating: 5,
        source: "google",
      },
      {
        name: "Vikram Singh",
        role: "Marketing Executive",
        content: "I was hesitant about my English speaking skills, but after completing the course, I feel like a different person. Thank you for building my confidence!",
        rating: 5,
        source: "facebook",
      },
      {
        name: "Neha Gupta",
        role: "Teacher",
        content: "The founders personally conduct classes which makes a huge difference. Their experience and dedication towards students is remarkable.",
        rating: 5,
        source: "facebook",
      },
      {
        name: "Amit Kumar",
        role: "Student",
        content: "Best institute for spoken English in the city. The interactive sessions and group discussions helped me overcome my fear of speaking.",
        rating: 5,
        source: "facebook",
      },
      {
        name: "Pooja Mehta",
        role: "Customer Service Executive",
        content: "My workplace communication improved significantly after joining here. The business communication module was especially helpful for my career.",
        rating: 5,
        source: "justdial",
      },
      {
        name: "Karan Shah",
        role: "Entrepreneur",
        content: "I've attended many institutes before, but this one stands out. The practical tips for personality development are applicable in real life situations.",
        rating: 4,
        source: "justdial",
      },
      {
        name: "Sneha Joshi",
        role: "Bank Manager",
        content: "Fantastic learning experience! The interview preparation course helped me crack multiple job interviews. Highly recommended!",
        rating: 5,
        source: "justdial",
      },
    ],
    sections: {
      google: {
        title: "Google Reviews",
        description: "Highlights from our latest Google reviews",
        watchMoreUrl:
          "https://www.google.com/search?q=turning+point+institute#lrd=0x395e84cf0a8203a1:0xd1a3ec8eb1a3e77e,1,,,,",
      },
      facebook: {
        title: "Facebook Reviews",
        description: "Stories shared by our community on Facebook",
        watchMoreUrl: "https://www.facebook.com/",
      },
      justdial: {
        title: "JustDial Reviews",
        description: "Ratings and feedback from JustDial",
        watchMoreUrl: "https://www.justdial.com/",
      },
    },
    cta: {
      title: "Want to Share Your Experience?",
      description: "We'd love to hear about your journey with us. Your feedback helps us improve and inspires others to take the first step.",
      buttonText: "Submit Your Review",
      mailTo: "info@excellence.edu?subject=My Review",
    },
  },
  faq: {
    hero: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our courses and methodology",
    },
    categories: [
      {
        category: "Course Details",
        questions: [
          {
            q: "What is the duration of the Spoken English course?",
            a: "Our main Spoken English course is 2 months long, with sessions Monday to Friday for 90 minutes each. We also conduct seminars on Personality Development and General Knowledge twice a month.",
          },
          {
            q: "What are the class timings?",
            a: "We offer flexible batch timings to accommodate working professionals, students, and homemakers. Morning, afternoon, and evening batches are available. Contact us for current batch schedules.",
          },
          {
            q: "Do you provide certificates?",
            a: "Yes, we provide certificates upon successful completion of the course. Our certificates are recognized and valued by employers.",
          },
          {
            q: "What is the batch size?",
            a: "We maintain small batch sizes to ensure personalized attention to each student. This allows for maximum interaction and individual feedback.",
          },
        ],
      },
      {
        category: "Eligibility & Admission",
        questions: [
          {
            q: "Who can join these courses?",
            a: "Our courses are designed for everyone - working professionals, students, homemakers, business owners, and anyone who wants to improve their English communication and personality.",
          },
          {
            q: "Do I need any prior knowledge of English?",
            a: "No prior knowledge required! We start from basics and take you to advanced levels. Our founders understand the challenges faced by Gujarati/Hindi medium students as they have experienced it themselves.",
          },
          {
            q: "What is the admission process?",
            a: "Simply contact us via phone or visit our institute. We'll discuss your goals, explain the course structure, and help you choose the right batch timing. You can start with the next available batch.",
          },
          {
            q: "Do you have any branches?",
            a: "No, we deliberately have NO FRANCHISES and NO BRANCHES. All teaching is done personally by the founders at our single location to maintain the highest quality standards.",
          },
        ],
      },
      {
        category: "Teaching Methodology",
        questions: [
          {
            q: "How is your teaching method different?",
            a: "Our method is highly interactive and practical. During grammar sessions, you'll speak thousands of sentences with questions asked in Hindi/Gujarati. We use logic and visualization to connect all structures.",
          },
          {
            q: "What kind of activities do you conduct?",
            a: "We conduct Public Speaking, Role-Plays, Group Discussions, Debates, Presentations, and small Dramas. All activities are spontaneous and highly interactive, designed to build your confidence and fluency gradually.",
          },
          {
            q: "Will I get personal attention?",
            a: "Absolutely! You'll study directly with the founders. We continuously monitor each student's performance and provide personal support to ensure everyone achieves their goals.",
          },
          {
            q: "What if I miss a class?",
            a: "Don't worry! Our team will help you cover what you missed. We ensure no student is left behind as long as they maintain regular attendance and complete homework.",
          },
        ],
      },
      {
        category: "For Different Groups",
        questions: [
          {
            q: "How will this course help working professionals?",
            a: "You'll gain correct written communication skills, excellent presentation abilities, confidence to speak fluently, and ability to read with double speed.",
          },
          {
            q: "What benefits do students get?",
            a: "Students develop clarity to speak English everywhere, make higher education interesting with effective reading and writing skills, and transform into confident individuals.",
          },
          {
            q: "How does it help homemakers?",
            a: "Homemakers gain the ability to be the best teacher for their children, communicate effectively with teachers, and support children studying in English medium schools.",
          },
        ],
      },
      {
        category: "Results & Support",
        questions: [
          {
            q: "What results can I expect?",
            a: "You'll achieve clarity from basic to advanced sentence structures, fluency with complete grammar understanding, and confidence through stage activities.",
          },
          {
            q: "How much homework is required?",
            a: "Daily homework takes around 30 minutes. Regular homework completion is essential for reinforcing what you learn in class.",
          },
          {
            q: "Do you provide support after course completion?",
            a: "Yes! Once you join us, you become part of the Turning Point Family. We provide lifetime alumni support.",
          },
          {
            q: "What is your success rate?",
            a: "We have trained 10,000+ students since 1999 with a very high success rate. Our students consistently praise the transformation in their communication skills and confidence.",
          },
        ],
      },
    ],
    support: {
      title: "Still Have Questions?",
      description: "Can't find the answer you're looking for? Our friendly team is here to help!",
      phoneNumber: "9725500435",
      note: "Call us during business hours for immediate assistance",
    },
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Get in touch with us to start your learning journey",
    },
    courseOptions: [
      { value: "spoken-english", label: "Spoken English" },
      { value: "personality-development", label: "Personality Development" },
      { value: "business-communication", label: "Business Communication" },
      { value: "interview-prep", label: "Interview Preparation" },
      { value: "public-speaking", label: "Public Speaking" },
    ],
    cards: [
      {
        type: "address",
        title: "Address",
        lines: ["123 Education Street", "Learning District", "City - 380001"],
      },
      {
        type: "phone",
        title: "Phone",
        lines: ["+91 98765 43210", "+91 98765 43211"],
      },
      {
        type: "email",
        title: "Email",
        lines: ["info@excellence.edu", "admissions@excellence.edu"],
      },
      {
        type: "hours",
        title: "Office Hours",
        lines: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
      },
    ],
    mapNote: "",
  },
  faculty: {
    hero: {
      title: "Owners are the Teachers!!",
      subtitle: "Learn from the founders with 25+ years of experience - No Franchises, No Branches",
    },
    members: [
      {
        name: "Ashish Bhatt",
        role: "Founder & Core Faculty",
        imageInitials: "AB",
        education: "MBA from reputed business school, Gujarati Medium School graduate",
        experience: "25+ years",
        specialization: ["Spoken English", "Grammar Training", "Public Speaking"],
        description:
          "Ashish Bhatt is the founder and core faculty of Turning Point Institute. His energetic and jolly method of teaching English helps students grasp even the most complicated concepts very easily. Having studied in Gujarati Medium School and then pursuing MBA from a reputed business school, he deeply understands students' difficulties. His corporate experience with MNCs gives him insights into the skills required for professional environments.",
        achievements: [
          "Trained 10,000+ students since 1999",
          "Expert in converting Gujarati/Hindi thoughts to English",
          "Developed unique visualization techniques for grammar",
          "Personal coaching by founder - No franchises/No branches",
        ],
      },
      {
        name: "Pragna Bhatt",
        role: "Co-Founder & Core Faculty",
        imageInitials: "PB",
        education: "M.Sc. with University Rank",
        experience: "25+ years",
        specialization: ["Personality Development", "Speaking Activities", "Group Discussions"],
        description:
          "Pragna Bhatt is the soul of Turning Point Institute. She has nurtured the institute with great care and ensures every student gets full support to achieve their goals. She has complemented the teaching of Mr. Ashish Bhatt by designing variety of speaking activities and competitions to bring out positive energy from students.",
        achievements: [
          "Won prizes in Elocution and Debate at University and State level",
          "Expert in conducting Public Speaking, Debates, Group Discussions",
          "Designed innovative speaking activities and competitions",
          "Specialized in Extempore Speech, Presentations, and Drama activities",
        ],
      },
      {
        name: "Aditya Bhatt",
        role: "Faculty & Founder of Turning Point Community",
        imageInitials: "AD",
        education: "National-level Debater",
        experience: "10+ years",
        extraLinkLabel: "Turning Point Community",
        extraLinkUrl: "https://www.turningpointcommunity.in/",
        specialization: ["Public Speaking", "Personality Development", "Model United Nations"],
        description:
          "Apart from being the Founder of Turning Point Community, Aditya is a national-level debater with extensive experience in public speaking. He has chaired over 100 Model United Nations conferences and judged numerous debates at premier colleges across India.",
        achievements: [
          "Chaired 100+ Model United Nations conferences",
          "Mentored students from IIT Gandhinagar, IIM Shillong, Nirma University",
          "Connected thousands of students fostering debate culture in Gujarat",
          "Expert in simulation debates and political discourse",
        ],
      },
    ],
    methodology: [
      {
        title: "Interactive Grammar Sessions",
        description: "Speak thousands of sentences during grammar sessions with questions asked in Hindi/Gujarati, building your foundation step by step",
      },
      {
        title: "Practical Speaking Activities",
        description: "Public Speaking, Role-Plays, Group Discussions, Debates, Presentations, and small Dramas - all spontaneous and highly interactive",
      },
      {
        title: "Personal Support",
        description: "Continuous monitoring of performance with personal support to weak students. Missed a lecture? We'll help you cover up",
      },
      {
        title: "Professional Skills",
        description: "Reading and writing modules for professional growth, learning to read at double speed with perfect understanding",
      },
    ],
    promise: {
      title: "Your Performance is Our Responsibility!",
      paragraphs: [
        "When you join our institute, you become part of the Turning Point Family. We continuously monitor the performance of all students through various parameters and provide personal support to ensure everyone achieves their goals.",
        "The only condition for our support is regular attendance and completing daily homework of around 30 minutes. We're here to help you succeed!",
      ],
    },
  },
  notFound: {
    title: "Oops! Page not found",
    description: "Return to Home",
    linkLabel: "Return to Home",
  },
};

type ContentContextValue = {
  content: SiteContent;
  setContent: (updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => void;
  resetContent: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
};

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

// Migration function to ensure backward compatibility
const migrateContent = (stored: any): SiteContent => {
  const migrated = { ...DEFAULT_CONTENT, ...stored };

  // Ensure About hero title uses the updated institute name even if older content is cached
  if (migrated.about && migrated.about.hero) {
    migrated.about.hero.title = DEFAULT_CONTENT.about.hero.title;
  }

  if (!stored?.home || typeof stored.home !== "object") {
    migrated.home = DEFAULT_CONTENT.home;
  } else {
    migrated.home = {
      ...DEFAULT_CONTENT.home,
      ...stored.home,
      heroCarousel: stored.home.heroCarousel || DEFAULT_CONTENT.home.heroCarousel,
    };
  }

  // Ensure joinUs has videoUrl even for older content
  if (migrated.home?.joinUs) {
    migrated.home.joinUs = {
      ...DEFAULT_CONTENT.home.joinUs,
      ...migrated.home.joinUs,
      videoUrl:
        migrated.home.joinUs.videoUrl ||
        (DEFAULT_CONTENT.home.joinUs as any).videoUrl ||
        "https://www.youtube.com/embed/sLMm9trcZYc",
    } as any;
  }

  if (migrated.home?.courseOverview && DEFAULT_CONTENT.home.courseOverview?.schedule?.length) {
    const defaultSchedule = DEFAULT_CONTENT.home.courseOverview.schedule;
    const currentSchedule = migrated.home.courseOverview.schedule;

    if (!Array.isArray(currentSchedule)) {
      migrated.home = {
        ...migrated.home,
        courseOverview: {
          ...DEFAULT_CONTENT.home.courseOverview,
          ...(migrated.home.courseOverview || {}),
          schedule: defaultSchedule,
        },
      };
    } else if (currentSchedule.length === 2 && defaultSchedule.length >= 3) {
      migrated.home = {
        ...migrated.home,
        courseOverview: {
          ...(migrated.home.courseOverview || {}),
          schedule: [currentSchedule[0], defaultSchedule[1], currentSchedule[1]],
        },
      };
    }
  }

  if (migrated.home?.differentiators?.cards?.length) {
    const cards = migrated.home.differentiators.cards;
    const first = cards[0];
    const titles = (first?.items || []).map((it) => (it?.title || "").trim());

    if (
      first?.title === "An Institute Exclusively for" &&
      titles.length === 2 &&
      titles[0] === "Spoken English" &&
      titles[1] === "Personality Development"
    ) {
      migrated.home = {
        ...migrated.home,
        differentiators: {
          ...migrated.home.differentiators,
          cards: [
            {
              ...first,
              items: [{ title: "Spoken English and Personality Development" }],
            },
            ...cards.slice(1),
          ],
        },
      };
    }
  }

  if (!stored?.successStories || typeof stored.successStories !== "object") {
    migrated.successStories = DEFAULT_CONTENT.successStories;
  } else {
    migrated.successStories = {
      ...DEFAULT_CONTENT.successStories,
      ...stored.successStories,
      hero: {
        ...DEFAULT_CONTENT.successStories.hero,
        ...(stored.successStories.hero || {}),
      },
      stats: Array.isArray(stored.successStories.stats)
        ? stored.successStories.stats
        : DEFAULT_CONTENT.successStories.stats,
      stories: Array.isArray(stored.successStories.stories)
        ? stored.successStories.stories
        : DEFAULT_CONTENT.successStories.stories,
      achievements: Array.isArray(stored.successStories.achievements)
        ? stored.successStories.achievements
        : DEFAULT_CONTENT.successStories.achievements,
      video: {
        ...DEFAULT_CONTENT.successStories.video,
        ...(stored.successStories.video || {}),
      },
      cta: {
        ...DEFAULT_CONTENT.successStories.cta,
        ...(stored.successStories.cta || {}),
        reviewLinks: Array.isArray(stored.successStories.cta?.reviewLinks)
          ? stored.successStories.cta.reviewLinks
          : DEFAULT_CONTENT.successStories.cta.reviewLinks,
      },
    };
  }

  if (!stored?.admissions || typeof stored.admissions !== "object") {
    migrated.admissions = DEFAULT_CONTENT.admissions;
  } else {
    migrated.admissions = {
      ...DEFAULT_CONTENT.admissions,
      ...stored.admissions,
      hero: {
        ...DEFAULT_CONTENT.admissions.hero,
        ...(stored.admissions.hero || {}),
      },
      contactCtas: {
        ...DEFAULT_CONTENT.admissions.contactCtas,
        ...(stored.admissions.contactCtas || {}),
      },
      steps: Array.isArray(stored.admissions.steps) ? stored.admissions.steps : DEFAULT_CONTENT.admissions.steps,
      courseDetails: Array.isArray(stored.admissions.courseDetails)
        ? stored.admissions.courseDetails
        : DEFAULT_CONTENT.admissions.courseDetails,
      targetGroups: Array.isArray(stored.admissions.targetGroups)
        ? stored.admissions.targetGroups
        : DEFAULT_CONTENT.admissions.targetGroups,
      whyChoose: Array.isArray(stored.admissions.whyChoose) ? stored.admissions.whyChoose : DEFAULT_CONTENT.admissions.whyChoose,
      cta: {
        ...DEFAULT_CONTENT.admissions.cta,
        ...(stored.admissions.cta || {}),
      },
    };
  }

  if (!stored?.reviews || typeof stored.reviews !== "object") {
    migrated.reviews = DEFAULT_CONTENT.reviews;
  } else {
    migrated.reviews = {
      ...DEFAULT_CONTENT.reviews,
      ...stored.reviews,
      hero: {
        ...DEFAULT_CONTENT.reviews.hero,
        ...(stored.reviews.hero || {}),
      },
      ratingSummary: {
        ...DEFAULT_CONTENT.reviews.ratingSummary,
        ...(stored.reviews.ratingSummary || {}),
      },
      testimonials: Array.isArray(stored.reviews.testimonials)
        ? stored.reviews.testimonials
        : DEFAULT_CONTENT.reviews.testimonials,
      sections: DEFAULT_CONTENT.reviews.sections
        ? {
            google: {
              ...DEFAULT_CONTENT.reviews.sections.google,
              ...((stored.reviews.sections || {}).google || {}),
            },
            facebook: {
              ...DEFAULT_CONTENT.reviews.sections.facebook,
              ...((stored.reviews.sections || {}).facebook || {}),
            },
            justdial: {
              ...DEFAULT_CONTENT.reviews.sections.justdial,
              ...((stored.reviews.sections || {}).justdial || {}),
            },
          }
        : undefined,
      cta: {
        ...DEFAULT_CONTENT.reviews.cta,
        ...(stored.reviews.cta || {}),
      },
    };
  }

  // Remove deprecated Success Stories nav item if present in cached content
  if (Array.isArray(migrated.header?.nav)) {
    migrated.header.nav = migrated.header.nav.filter(
      (item: any) => item?.to !== "/success-stories" && item?.label !== "Success Stories",
    );
  }

  // Migrate footer if it exists but is missing new fields
  if (stored.footer && typeof stored.footer === 'object') {
    const mergedFooter = {
      ...DEFAULT_CONTENT.footer,
      ...stored.footer,
      // Ensure nested objects are properly merged
      socialMedia: {
        ...DEFAULT_CONTENT.footer.socialMedia,
        ...(stored.footer.socialMedia || {}),
      },
      quickLinks: stored.footer.quickLinks || DEFAULT_CONTENT.footer.quickLinks,
      courses: stored.footer.courses || DEFAULT_CONTENT.footer.courses,
      contact: {
        ...DEFAULT_CONTENT.footer.contact,
        ...(stored.footer.contact || {}),
      },
    };

    const rawName = (stored.footer as any).instituteName as string | undefined;
    if (!rawName || /excellence/i.test(rawName)) {
      mergedFooter.instituteName = DEFAULT_CONTENT.footer.instituteName;
    }

    migrated.footer = mergedFooter;
  }
  
  // Migrate home carousel if it exists but is missing new fields
  // NOTE: handled above with a safer merge that also protects against null/invalid cached values.
  
  return migrated as SiteContent;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContentState] = useState<SiteContent>(() => {
    try {
      const raw = localStorage.getItem("site_content");
      if (raw) {
        const parsed = JSON.parse(raw) as SiteContent;
        return migrateContent(parsed);
      }
    } catch (e) {
      console.error("Failed to parse stored content", e);
    }
    return DEFAULT_CONTENT;
  });

  // One-time migration for existing in-memory content so new fields
  // (like home.achievementsSection and home.facultyHighlight) are
  // always present even if localStorage was created before they existed.
  useEffect(() => {
    setContentState(prev => migrateContent(prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("site_content", JSON.stringify(content));
    } catch (e) {
      console.error("Failed to save content to localStorage", e);
    }
  }, [content]);

  const setContent = (updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => {
    setContentState((prev) =>
      typeof updater === "function"
        ? (updater as (prevState: SiteContent) => SiteContent)(prev)
        : { ...prev, ...(updater as Partial<SiteContent>) },
    );
  };

  const resetContent = () => setContentState(DEFAULT_CONTENT);

  const exportJSON = () => JSON.stringify(content, null, 2);

  const importJSON = (json: string) => {
    try {
      const parsed = JSON.parse(json) as SiteContent;
      setContentState(migrateContent(parsed));
    } catch (e) {
      throw new Error("Invalid JSON");
    }
  };

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent, exportJSON, importJSON }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
};
