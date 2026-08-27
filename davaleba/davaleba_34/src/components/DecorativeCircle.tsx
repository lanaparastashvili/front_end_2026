import React from "react";

interface DecorativeCircleProps {
  className?: string;
}

export const DecorativeCircle: React.FC<DecorativeCircleProps> = ({ className = "" }) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="129"
      height="129"
      viewBox="0 0 129 129"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="64.5" cy="64.5" r="64" fill="none" stroke="#FFFFFF" opacity="0.25" strokeWidth="1" />
    </svg>
  );
};
