import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Lana Parastashvili",
  title: "Frontend & Full-Stack Developer",
  greeting: "Nice to meet you!",
  location: "Based in Georgia",
  bio: "I'm a passionate developer focused on building modern, high-performance, and accessible web applications with delightful user experiences.",
  contactEmail: "lanaparastashvili@gmail.com",
  avatarUrl: "/images/profile.jpg",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "twitter",
    },
    {
      name: "Email",
      url: "mailto:lanaparastashvili@gmail.com",
      icon: "mail",
    },
  ],
  skills: [
    { name: "Next.js", experience: "2 Years Experience", level: 90 },
    { name: "TypeScript", experience: "2 Years Experience", level: 88 },
    { name: "React", experience: "3 Years Experience", level: 95 },
    { name: "Tailwind CSS", experience: "3 Years Experience", level: 92 },
    { name: "JavaScript (ES6+)", experience: "4 Years Experience", level: 95 },
    { name: "HTML & CSS", experience: "4 Years Experience", level: 98 },
    { name: "Accessibility", experience: "3 Years Experience", level: 85 },
    { name: "Node.js & C#", experience: "2 Years Experience", level: 80 },
    { name: "Git & GitHub", experience: "4 Years Experience", level: 90 },
  ],
  projects: [
    {
      id: "project-1",
      title: "DESIGN PORTFOLIO",
      description:
        "A showcase portfolio platform with dynamic animations, responsive dark mode, and seamless micro-interactions.",
      tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS"],
      image: "/images/project-1.png",
      demoUrl: "https://example.com/design-portfolio",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "project-2",
      title: "E-LEARNING LANDING PAGE",
      description:
        "Modern educational platform landing page with interactive course catalogs, pricing tiers, and student reviews.",
      tags: ["REACT", "TAILWIND CSS", "FRAMER MOTION"],
      image: "/images/project-2.png",
      demoUrl: "https://example.com/elearning",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "project-3",
      title: "TODO WEB APP",
      description:
        "Comprehensive task management app with drag-and-drop ordering, category filters, and local persistence.",
      tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND"],
      image: "/images/project-3.png",
      demoUrl: "https://example.com/todo-app",
      githubUrl: "https://github.com",
    },
    {
      id: "project-4",
      title: "ENTERTAINMENT WEB APP",
      description:
        "Multi-page streaming interface featuring trending movies, bookmarks, search with instant debounce, and responsive grid.",
      tags: ["REACT", "API INTEGRATION", "CSS MODULES"],
      image: "/images/project-4.png",
      demoUrl: "https://example.com/entertainment",
      githubUrl: "https://github.com",
    },
    {
      id: "project-5",
      title: "MEMORY GAME",
      description:
        "Fun interactive multiplayer and solo memory match game with customizable grid size and timer tracking.",
      tags: ["TYPESCRIPT", "REACT", "TAILWIND"],
      image: "/images/project-5.png",
      demoUrl: "https://example.com/memory-game",
      githubUrl: "https://github.com",
    },
    {
      id: "project-6",
      title: "ART GALLERY SHOWCASE",
      description:
        "Interactive slideshow gallery displaying historical masterpieces with detailed modal previews and smooth slide transitions.",
      tags: ["NEXT.JS", "TAILWIND CSS", "RESPONSIVE"],
      image: "/images/project-6.png",
      demoUrl: "https://example.com/art-gallery",
      githubUrl: "https://github.com",
    },
  ],
};
