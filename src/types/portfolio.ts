export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "globe" | "code";
}

export interface Skill {
  name: string;
  experience: string;
  category?: "frontend" | "backend" | "tools" | "design";
  level?: number; // 0 to 100
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export interface PortfolioData {
  name: string;
  title: string;
  greeting: string;
  location: string;
  bio: string;
  contactEmail: string;
  avatarUrl: string;
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[];
}
