interface CarSilhouetteProps {
  className?: string;
}

export default function CarSilhouette({ className = "" }: CarSilhouetteProps) {
  return (
    <svg viewBox="0 0 320 120" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 92c0-4 4-8 10-8h6c4-14 18-28 40-30l24-18c6-4 14-6 22-6h56c10 0 20 4 26 12l16 20c14 2 26 8 32 18h8c6 0 10 4 10 8v10c0 5-4 9-9 9H19c-5 0-9-4-9-9V92Z"
        fill="black"
      />
      <circle cx="92" cy="100" r="16" fill="#0a0a0a" stroke="black" strokeWidth="6" />
      <circle cx="228" cy="100" r="16" fill="#0a0a0a" stroke="black" strokeWidth="6" />
    </svg>
  );
}
