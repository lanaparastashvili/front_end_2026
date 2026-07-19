interface PalmTreeProps {
  className?: string;
  flip?: boolean;
}

export default function PalmTree({ className = "", flip = false }: PalmTreeProps) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M62 220V96c0-6 4-10 6-14"
        stroke="black"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g fill="black">
        <path d="M68 90c-14-18-42-20-62-8 18 4 40 10 62 8Z" />
        <path d="M68 90c-8-24-30-40-52-42 10 16 26 34 52 42Z" />
        <path d="M68 90c4-26-6-52-24-66 2 20 6 46 24 66Z" />
        <path d="M68 90c16-16 46-14 64 0-20 2-44 4-64 0Z" />
        <path d="M68 90c12-22 36-34 58-32-12 14-30 28-58 32Z" />
        <path d="M68 90c2-24-4-48-18-64 0 20 2 44 18 64Z" />
      </g>
    </svg>
  );
}
