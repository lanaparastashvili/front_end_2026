import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { portfolioData } from "@/data/portfolioData";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#151515] text-white flex flex-col justify-between overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
        {/* Top Navigation */}
        <Navbar name={portfolioData.name} socials={portfolioData.socials} />

        {/* Hero Section */}
        <Hero
          greeting={portfolioData.greeting}
          name={portfolioData.name}
          location={portfolioData.location}
          bio={portfolioData.bio}
          avatarUrl={portfolioData.avatarUrl}
        />

        {/* Skills Section */}
        <Skills skills={portfolioData.skills} />

        {/* Projects Showcase */}
        <Projects projects={portfolioData.projects} />

        {/* Contact Form Section */}
        <Contact />

        {/* Footer */}
        <Footer name={portfolioData.name} socials={portfolioData.socials} />
      </div>
    </main>
  );
}
