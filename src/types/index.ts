export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements?: string[];
}

// Education Types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  activities?: string[];
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  percentage: number;
  icon?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; size?: number }>;
}

// Social Links Types - UPDATED to include size prop
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}