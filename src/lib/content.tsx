import React, { createContext, useContext, useEffect, useState } from "react";
import heroClassroom from "@/assets/hero-classroom.jpg";
import speakingConfidence from "@/assets/speaking-confidence.jpg";
import studentSuccess from "@/assets/student-success.jpg";

export type Feature = { title: string; description: string };
export type Testimonial = { name: string; role: string; content: string; rating?: number; achievement?: string };

type HeroContent = {
  title: string;
  subtitle: string;
};

type Stat = { value: string; label: string };
type SimpleCard = { title: string; description: string };
type BenefitSection = { title: string; items: string[] };
type Question = { q: string; a: string };
type FAQCategory = { category: string; questions: Question[] };

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
    directorVideoUrl: string;
    testimonials: Testimonial[];
    ctaTitle: string;
    ctaText: string;
  };
  header: {
    siteTitle: string;
    nav: { label: string; to: string }[];
  };
  footer: {
    instituteName: string;
    tagline: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    };
    quickLinks: { label: string; to: string }[];
    courses: string[];
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
  };
  reviews: {
    hero: HeroContent;
    ratingSummary: { score: string; label: string; count: string };
    testimonials: Testimonial[];
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
    features: [
      { title: "Expert Training", description: "Learn from experienced professionals with proven teaching methods" },
      { title: "10,000+ Students", description: "Join our successful alumni network since 1999" },
      { title: "Certified Programs", description: "Receive recognized certificates upon course completion" },
      { title: "Practical Approach", description: "Real-world scenarios and interactive learning methods" },
    ],
    directorVideoUrl: "https://www.youtube.com/embed/sLMm9trcZYc",
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
      { label: "Success Stories", to: "/success-stories" },
      { label: "Gallery", to: "/gallery" },
      { label: "Reviews", to: "/reviews" },
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  footer: {
    instituteName: "Excellence Institute",
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
    contact: {
      address: "123 Education Street, Learning City, 380001",
      phone: "+91 98765 43210",
      email: "info@excellence.edu",
    },
    copyright: "© 2025 TPI. All rights reserved.",
  },
  about: {
    hero: {
      title: "About Excellence Institute",
      subtitle: "Empowering individuals through quality education since 1999",
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
      subtitle: "Real transformations from our 10,000+ students trained since 1999",
    },
    stats: [
      { value: "10,000+", label: "Students Trained" },
      { value: "4.9/5", label: "Average Rating" },
      { value: "95%", label: "Success Rate" },
      { value: "25+", label: "Years of Excellence" },
    ],
    stories: [
      {
        name: "Priya Sharma",
        role: "Software Engineer at Tech Corp",
        content: "I joined as a shy Gujarati medium student. Today, I confidently lead presentations and meetings. The transformation has been incredible. Thank you Ashish sir and Pragna ma'am!",
        rating: 5,
        achievement: "Promoted to Team Lead",
      },
      {
        name: "Rahul Patel",
        role: "Business Owner",
        content: "My business communication improved dramatically. I can now negotiate confidently with international clients. The personality development sessions were life-changing.",
        rating: 5,
        achievement: "Expanded Business Internationally",
      },
      {
        name: "Anjali Desai",
        role: "HR Manager at MNC",
        content: "The course not only improved my English but also boosted my confidence. I can now conduct interviews, give presentations, and write professional emails effortlessly.",
        rating: 5,
        achievement: "Landed Dream Job",
      },
      {
        name: "Karan Shah",
        role: "MBA Student",
        content: "From struggling with basic sentences to winning debate competitions! The interactive teaching method made learning fun. Group discussions really built my confidence.",
        rating: 5,
        achievement: "Won University Debate",
      },
      {
        name: "Meera Joshi",
        role: "Homemaker",
        content: "I can now help my children with their English homework and communicate fluently with their teachers. The support from faculty was amazing throughout the journey.",
        rating: 5,
        achievement: "Supporting Children's Education",
      },
      {
        name: "Vishal Mehta",
        role: "Sales Manager",
        content: "My presentation skills improved tremendously. The practical activities and stage performances removed my stage fear completely. Highly recommended for working professionals!",
        rating: 5,
        achievement: "Top Sales Performer",
      },
      {
        name: "Neha Trivedi",
        role: "Content Writer",
        content: "The reading and writing modules were exceptional. I learned to write with clarity and read at double speed. This opened up new career opportunities for me.",
        rating: 5,
        achievement: "Published Author",
      },
      {
        name: "Amit Patel",
        role: "Entrepreneur",
        content: "Being a Gujarati medium student, I always struggled with English. Today I conduct business meetings in English fluently. The teaching methodology is truly unique!",
        rating: 5,
        achievement: "Started Own Venture",
      },
      {
        name: "Riya Shah",
        role: "Bank Officer",
        content: "The course exceeded my expectations. Grammar became so easy with their visualization technique. The personal attention from founders made all the difference.",
        rating: 5,
        achievement: "Cleared Bank PO Interview",
      },
      {
        name: "Dhruv Desai",
        role: "IT Professional",
        content: "From basic English to confidently speaking in corporate meetings - this journey was amazing. The activities like role-plays and group discussions were really effective.",
        rating: 5,
        achievement: "Got US Assignment",
      },
      {
        name: "Kavita Pandya",
        role: "Teacher",
        content: "I wanted to improve my English to be a better teacher. The course not only improved my language but also taught me effective communication techniques.",
        rating: 5,
        achievement: "Became English HOD",
      },
      {
        name: "Harsh Rao",
        role: "Engineering Student",
        content: "The public speaking activities removed all my hesitation. Now I participate actively in college events and Model UN conferences. Thank you for the transformation!",
        rating: 5,
        achievement: "Won MUN Best Delegate",
      },
    ],
    achievements: [
      "Students placed in top MNCs",
      "Alumni working in international companies",
      "Multiple students won debate competitions",
      "Several entrepreneurs expanded globally",
      "Students cleared IAS/UPSC interviews",
      "Alumni became successful teachers",
      "Many got promotions after course",
      "Students excelling in higher education",
    ],
    video: {
      description: "Watch our students share their transformation journey",
      linkText: "Visit Our YouTube Channel →",
      linkUrl: "https://www.youtube.com/channel/UC224YnLHAQ7R03mwvEmpaJQ",
      note: "See real students speaking fluently in group discussions, debates, and presentations",
    },
    cta: {
      title: "Be Our Next Success Story!",
      description:
        "Join thousands of successful students who transformed their lives with us. Your journey to fluent English and confident personality starts here!",
      phoneLabel: "Call: 9725500435",
      phoneNumber: "9725500435",
      reviewLinks: [
        { label: "Google Reviews", url: "https://www.google.com/search?q=turning+point+institute" },
        { label: "Facebook Reviews", url: "https://www.facebook.com/TurningPointInstitute/reviews/" },
        {
          label: "JustDial Reviews",
          url: "https://www.justdial.com/Ahmedabad/Turning-Point-Institute-Near-Seema-Hall-Beside-Manglya-Party-Plot-Satellite/079PF007391_BZDET",
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
      },
      {
        name: "Rahul Patel",
        role: "Business Owner",
        content: "The personality development course helped me become a better leader. Highly recommend to everyone who wants to grow professionally!",
        rating: 5,
      },
      {
        name: "Anjali Desai",
        role: "HR Manager",
        content: "Excellent teaching methods and supportive instructors. Worth every penny invested in my growth. The batch size is perfect for individual attention.",
        rating: 5,
      },
      {
        name: "Vikram Singh",
        role: "Marketing Executive",
        content: "I was hesitant about my English speaking skills, but after completing the course, I feel like a different person. Thank you for building my confidence!",
        rating: 5,
      },
      {
        name: "Neha Gupta",
        role: "Teacher",
        content: "The founders personally conduct classes which makes a huge difference. Their experience and dedication towards students is remarkable.",
        rating: 5,
      },
      {
        name: "Amit Kumar",
        role: "Student",
        content: "Best institute for spoken English in the city. The interactive sessions and group discussions helped me overcome my fear of speaking.",
        rating: 5,
      },
      {
        name: "Pooja Mehta",
        role: "Customer Service Executive",
        content: "My workplace communication improved significantly after joining here. The business communication module was especially helpful for my career.",
        rating: 5,
      },
      {
        name: "Karan Shah",
        role: "Entrepreneur",
        content: "I've attended many institutes before, but this one stands out. The practical tips for personality development are applicable in real life situations.",
        rating: 4,
      },
      {
        name: "Sneha Joshi",
        role: "Bank Manager",
        content: "Fantastic learning experience! The interview preparation course helped me crack multiple job interviews. Highly recommended!",
        rating: 5,
      },
    ],
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
    mapNote: "Map would be embedded here",
  },
  faculty: {
    hero: {
      title: "Meet Our Faculty",
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
  
  // Migrate footer if it exists but is missing new fields
  if (stored.footer && typeof stored.footer === 'object') {
    migrated.footer = {
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
  }
  
  // Migrate home carousel if it exists but is missing new fields
  if (stored.home && typeof stored.home === 'object') {
    migrated.home = {
      ...DEFAULT_CONTENT.home,
      ...stored.home,
      heroCarousel: stored.home.heroCarousel || DEFAULT_CONTENT.home.heroCarousel,
    };
  }
  
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

export default ContentProvider;
