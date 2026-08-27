import React from "react";
import { SocialLink } from "../types/portfolio";

interface SocialIconsProps {
  socials: SocialLink[];
  className?: string;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ socials, className = "" }) => {
  return (
    <div className={`flex items-center gap-6 md:gap-8 ${className}`}>
      {socials.map((social) => {
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="text-white hover:text-[#4EE1A0] transition-colors duration-200 focus:outline-none focus-visible:text-[#4EE1A0]"
          >
            {social.icon === "github" && (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            )}
            {social.icon === "linkedin" && (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            )}
            {social.icon === "twitter" && (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
            {social.icon === "mail" && (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
            )}
            {social.icon === "globe" && (
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            )}
            {social.icon === "code" && (
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 10.373c0 .323-.122.645-.366.889l-5.5 5.5c-.49.49-1.287.49-1.777 0s-.49-1.287 0-1.777l4.612-4.612-4.612-4.612c-.49-.49-.49-1.287 0-1.777s1.287-.49 1.777 0l5.5 5.5c.244.244.366.566.366.889zm-16.366.889l5.5-5.5c.49-.49.49-1.287 0-1.777s-1.287-.49-1.777 0l-5.5 5.5c-.49.49-.49 1.287 0 1.777l5.5 5.5c.49.49 1.287.49 1.777 0s.49-1.287 0-1.777l-5.5-5.5z" />
              </svg>
            )}
          </a>
        );
      })}
    </div>
  );
};
