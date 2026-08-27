"use client";

import React from "react";
import Image from "next/image";
import { DecorativeRings } from "./DecorativeRings";
import { DecorativeCircle } from "./DecorativeCircle";
import { motion } from "framer-motion";

interface HeroProps {
  greeting: string;
  name: string;
  location: string;
  bio: string;
  avatarUrl: string;
}

export const Hero: React.FC<HeroProps> = ({
  greeting,
  name,
  location,
  bio,
  avatarUrl,
}) => {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 lg:pt-16 lg:pb-32">
      {/* Top-Left Decorative Rings */}
      <div className="absolute -left-32 sm:-left-20 top-20 md:top-28 z-0 pointer-events-none opacity-60">
        <DecorativeRings />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-7 lg:col-span-7 z-10 text-center md:text-left order-2 md:order-1"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 md:mb-8">
            {greeting}
            <br />
            I&apos;m{" "}
            <span className="relative inline-block">
              {name}
              <span className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-[4px] md:h-[6px] bg-[#4EE1A0] rounded-full" />
            </span>
            .
          </h1>

          <p className="text-base sm:text-lg text-[#D9D9D9] max-w-lg mx-auto md:mx-0 font-medium leading-relaxed mb-8 md:mb-12">
            {location}, {bio}
          </p>

          <div>
            <a
              href="#contact"
              className="link-underline text-[#FFFFFF] hover:text-[#4EE1A0] tracking-widest text-base font-bold uppercase transition-colors inline-block"
            >
              CONTACT ME
            </a>
          </div>
        </motion.div>

        {/* Right Column: Hero Image with Frame and Decorative Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="md:col-span-5 lg:col-span-5 relative flex justify-center md:justify-end order-1 md:order-2"
        >
          {/* Subtle Glow background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4EE1A0]/10 to-transparent blur-2xl rounded-full -z-10 pointer-events-none" />

          <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[440px] aspect-[4/5] bg-[#242424] overflow-hidden rounded-2xl md:rounded-none shadow-2xl border border-white/5">
            {/* Fallback & Portrait Rendering */}
            <div className="w-full h-full relative group">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 320px, 440px"
                className="object-cover object-top grayscale contrast-110 brightness-95 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                onError={(e) => {
                  // If image fails, fallback to elegant styling
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Inner stylized overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-80" />
            </div>

            {/* Decorative Circle overlapping hero image bottom-left */}
            <div className="absolute -left-12 bottom-6 z-20 hidden sm:block pointer-events-none">
              <DecorativeCircle className="w-24 h-24 md:w-32 md:h-32 text-white/30" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative separator line */}
      <div className="w-full h-[1px] bg-[#FFFFFF]/20 mt-16 md:mt-24" />
    </section>
  );
};
