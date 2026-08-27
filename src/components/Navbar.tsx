"use client";

import React from "react";
import { SocialIcons } from "./SocialIcons";
import { SocialLink } from "../types/portfolio";

interface NavbarProps {
  name: string;
  socials: SocialLink[];
}

export const Navbar: React.FC<NavbarProps> = ({ name, socials }) => {
  // Format the name as a clean handle or lowercase brand as in the design (e.g. adamkeyes)
  const brandName = name.toLowerCase().replace(/\s+/g, "");

  return (
    <nav className="relative z-20 flex flex-col md:flex-row items-center justify-between py-6 md:py-8 gap-5 md:gap-0">
      <a
        href="#"
        className="text-2xl md:text-3xl font-bold tracking-tight text-white hover:text-[#4EE1A0] transition-colors"
      >
        {brandName}
      </a>
      <SocialIcons socials={socials} />
    </nav>
  );
};
