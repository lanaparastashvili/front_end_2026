import type { GameItem } from "../types";

interface GameCardProps {
  game: GameItem;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <a
      href={`#${game.id}`}
      className="group w-40 flex-shrink-0 snap-start sm:w-48 lg:w-full"
    >
      <div className="relative flex aspect-[3/4] items-end overflow-hidden rounded-md border border-line transition-transform duration-300 group-hover:-translate-y-1">

        <img
          src={game.image}
          alt={game.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {game.tag && (
          <span
            className="absolute left-2 top-2 z-20 rounded-sm px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wide text-ink"
            style={{ backgroundColor: game.accent }}
          >
            {game.tag}
          </span>
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-1.5 z-20"
          style={{ backgroundColor: game.accent }}
        />

        <span className="relative z-20 w-full px-3 pb-4 font-display text-sm font-bold uppercase leading-tight text-white">
          {game.title}
        </span>
      </div>

      <p className="mt-2 font-display text-xs font-medium uppercase tracking-wide text-white/50">
        {game.platforms.join(" · ")}
      </p>
    </a>
  );
}
