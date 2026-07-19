export interface NavLink {
  label: string;
  href: string;
}

export type Platform = "PC" | "Console" | "Portátil";

export interface GameItem {
  id: string;
  title: string;
  tag?: string;
  platforms: Platform[];
  gradient: [string, string];
  accent: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  gradient: [string, string];
  size: "large" | "small";
  image?: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}
