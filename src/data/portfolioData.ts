import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Lana Parastashvili",
  title: "Frontend Developer",
  greeting: "Nice to meet you!",
  location: "Based in Georgia",
  bio: "I'm a passionate developer building accessible, modern, and high-performance web applications with seamless user experiences.",
  contactEmail: "lanaparastashvili@gmail.com",
  avatarUrl: "/images/profile.svg",
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
    { name: "JavaScript", experience: "", level: 95 },
    { name: "Python", experience: "", level: 85 },
    { name: "React", experience: "", level: 95 },
    { name: "C#", experience: "", level: 80 },
    { name: "C++", experience: "", level: 75 },
    { name: "HTML", experience: "", level: 98 },
    { name: "CSS", experience: "", level: 96 },
    { name: "Tailwind CSS", experience: "", level: 94 },
    { name: "GitHub", experience: "", level: 90 },
  ],
  projects: [
    {
      id: "project-1",
      title: "WEATHER FORECAST APP",
      description:
        "A real-time weather dashboard that displays current conditions, temperature, humidity, and hourly forecasts for any city using live weather API data. Features a clean dark UI with smooth data updates.",
      tags: ["JAVASCRIPT", "WEATHER API", "CLOUDFLARE"],
      image: "/images/project-1.svg",
      demoUrl: "https://davaleba-32.lana-parastashvili.workers.dev/",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "project-2",
      title: "TV MAZE APP",
      description:
        "A TV show discovery and search application powered by the TVMaze public API. Browse trending shows, search by title, view detailed episode information, ratings, and cast with a modern responsive interface.",
      tags: ["REACT", "TVMAZE API", "CLOUDFLARE WORKERS"],
      image: "/images/project-2.svg",
      demoUrl: "https://front-end-2026.lana-parastashvili.workers.dev/",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "project-3",
      title: "PASSWORD GENERATOR",
      description:
        "A secure, customizable password generator with adjustable length, character set options (uppercase, lowercase, numbers, symbols), real-time strength meter, and one-click clipboard copy.",
      tags: ["REACT", "VITE", "VERCEL"],
      image: "/images/project-3.svg",
      demoUrl: "https://front-end-2026-q7as.vercel.app/",
      githubUrl: "https://github.com",
    },
    {
      id: "project-4",
      title: "CREDIT CARD FORM",
      description:
        "An interactive credit card payment form with live card preview that dynamically updates as the user types. Features smooth animations, real-time validation, and a polished gradient card design.",
      tags: ["REACT", "VITE", "CSS ANIMATIONS"],
      image: "/images/project-4.svg",
      demoUrl: "https://front-end-2026-gl1y.vercel.app/",
      githubUrl: "https://github.com",
    },
    {
      id: "project-5",
      title: "INTERACTIVE COMMENT APP",
      description:
        "A fully interactive nested comment system with real-time add, edit, delete, and reply functionality. Includes voting system, user avatars, timestamps, and a clean discussion board layout.",
      tags: ["REACT", "VITE", "LOCAL STATE"],
      image: "/images/project-5.svg",
      demoUrl: "https://front-end-2026-8mhz.vercel.app/",
      githubUrl: "https://github.com",
    },
    {
      id: "project-6",
      title: "AGE CALCULATOR APP",
      description:
        "A sleek age calculator that computes your exact age in years, months, and days from a given birth date. Includes smart date validation, animated number counting results, and accessible input design.",
      tags: ["REACT", "JAVASCRIPT", "VITE"],
      image: "/images/project-6.svg",
      demoUrl: "https://front-end-2026-4hmk.vercel.app/",
      githubUrl: "https://github.com",
    },
  ],
};
