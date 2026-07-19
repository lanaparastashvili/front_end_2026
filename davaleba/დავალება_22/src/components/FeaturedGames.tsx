import { useMemo, useState } from "react";
import GameCard from "./GameCard";
import FilterPill from "./FilterPill";
import { games } from "../data/siteData";
import type { Platform } from "../types";

const filters: Array<Platform | "Todos"> = ["Todos", "PC", "Console", "Portátil"];

export default function FeaturedGames() {
  const [activeFilter, setActiveFilter] = useState<Platform | "Todos">("Todos");

  const filteredGames = useMemo(() => {
    if (activeFilter === "Todos") return games;
    return games.filter((game) => game.platforms.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="jogos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-bold uppercase text-white sm:text-3xl">
          Jogos em Destaque
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {filters.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 sm:mt-8 sm:gap-5 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <a
          href="#loja"
          className="rounded-sm bg-r-gold px-8 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-r-gold-dark"
        >
          Ver todos os jogos
        </a>
      </div>
    </section>
  );
}
