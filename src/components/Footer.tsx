"use client";

import React from "react";
import { SocialIcons } from "./SocialIcons";
import { SocialLink } from "../types/portfolio";

interface FooterProps {
  name: string;
  socials: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({ name, socials }) => {
  const brandName = name.toLowerCase().replace(/\s+/g, "");

  return (
    <footer className="bg-[#242424] -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-28 px-4 sm:px-8 md:px-16 lg:px-28 pb-12 md:pb-16 pt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        <a
          href="#"
          className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-[#4EE1A0] transition-colors"
        >
          {brandName}
        </a>
        <SocialIcons socials={socials} />
      </div>
    </footer>
  );
};
