import React from "react";

interface DecorativeRingsProps {
  className?: string;
}

export const DecorativeRings: React.FC<DecorativeRingsProps> = ({ className = "" }) => {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      width="530"
      height="129"
      viewBox="0 0 530 129"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" fillRule="evenodd" stroke="#FFFFFF" opacity="0.25">
        <ellipse cx="265" cy="40" rx="264.5" ry="39.5" />
        <ellipse cx="265" cy="52" rx="264.5" ry="39.5" />
        <ellipse cx="265" cy="65" rx="264.5" ry="39.5" />
        <ellipse cx="265" cy="77" rx="264.5" ry="39.5" />
        <ellipse cx="265" cy="89" rx="264.5" ry="39.5" />
      </g>
    </svg>
  );
};
