"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";
import { ProjectModal } from "./ProjectModal";
import { motion } from "framer-motion";

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-28 relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Projects
        </h2>
        <a
          href="#contact"
          className="link-underline text-white hover:text-[#4EE1A0] tracking-widest text-base font-bold uppercase transition-colors"
        >
          CONTACT ME
        </a>
      </div>

      {/* Projects Grid: 2 columns on tablet & desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
            className="flex flex-col group"
          >
            {/* Image Container with Hover Overlay */}
            <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-[#242424] rounded-lg overflow-hidden border border-white/5 shadow-lg mb-5">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Desktop Hover Overlay */}
              <div className="hidden lg:flex absolute inset-0 bg-[#151515]/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center gap-6 z-10">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-white hover:text-[#4EE1A0] text-base font-bold uppercase tracking-widest"
                >
                  VIEW PROJECT
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-white hover:text-[#4EE1A0] text-base font-bold uppercase tracking-widest"
                >
                  VIEW CODE
                </a>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs uppercase tracking-widest text-[#D9D9D9] hover:text-[#4EE1A0] transition-colors mt-2"
                >
                  Quick Preview &rarr;
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-2 group-hover:text-[#4EE1A0] transition-colors">
              {project.title}
            </h3>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-base text-[#D9D9D9] uppercase font-medium tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Mobile / Tablet Direct Action Links */}
            <div className="flex lg:hidden items-center gap-8 mt-1">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-white hover:text-[#4EE1A0] text-sm font-bold uppercase tracking-widest"
              >
                VIEW PROJECT
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-white hover:text-[#4EE1A0] text-sm font-bold uppercase tracking-widest"
              >
                VIEW CODE
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
