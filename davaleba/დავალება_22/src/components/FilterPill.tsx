interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function FilterPill({ label, active = false, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-shrink-0 rounded-full border px-4 py-1.5 font-display text-xs font-medium uppercase tracking-wide transition-colors ${
        active
          ? "border-r-gold bg-r-gold text-ink"
          : "border-line text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
