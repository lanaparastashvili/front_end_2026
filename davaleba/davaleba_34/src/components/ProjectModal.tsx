"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";
import { X, ExternalLink, Sparkles, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#242424] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-[#4EE1A0] text-white hover:text-black p-2 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-[#151515] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent" />
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-[#4EE1A0]/10 text-[#4EE1A0] text-xs font-semibold rounded-full border border-[#4EE1A0]/30">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Project
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#4EE1A0] text-[#151515] font-bold rounded-lg hover:bg-[#75F3BD] transition-all duration-200 text-sm tracking-wider uppercase shadow-lg shadow-[#4EE1A0]/20"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-200 text-sm tracking-wider uppercase border border-white/10"
                >
                  <Code2 className="w-4 h-4" /> Code
                </a>
              </div>
            </div>

            {project.description && (
              <p className="text-[#D9D9D9] text-base leading-relaxed font-normal">
                {project.description}
              </p>
            )}

            {/* Tech Tags */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/60 font-bold mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[#151515] border border-white/10 text-xs font-semibold tracking-wider text-[#D9D9D9] rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
