"use client";

import React from "react";
import { Skill } from "../types/portfolio";
import { DecorativeRings } from "./DecorativeRings";
import { motion } from "framer-motion";

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      {/* Decorative Rings positioned on bottom right */}
      <div className="absolute -right-36 md:-right-24 bottom-0 z-0 pointer-events-none opacity-50 overflow-hidden">
        <DecorativeRings />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-14 text-center md:text-left relative z-10">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group p-4 md:p-0 rounded-xl hover:bg-white/[0.02] md:hover:bg-transparent transition-colors"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 md:mb-3 group-hover:text-[#4EE1A0] transition-colors duration-200">
              {skill.name}
            </h3>
            {skill.experience && (
              <p className="text-base sm:text-lg text-[#D9D9D9] font-medium tracking-wide">
                {skill.experience}
              </p>
            )}

            {skill.level && (
              <div className="w-full max-w-[200px] mx-auto md:mx-0 mt-3 h-1 bg-white/10 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className="h-full bg-[#4EE1A0] rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Decorative separator line */}
      <div className="w-full h-[1px] bg-[#FFFFFF]/20 mt-16 md:mt-24" />
    </section>
  );
};
