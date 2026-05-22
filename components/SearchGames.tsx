"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/GameCard";
import type { Game, PromoCode } from "@/lib/types";

export function SearchGames({ games, codes }: { games: Game[]; codes: PromoCode[] }) {
  const [query, setQuery] = useState("");

  const visibleGames = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return games;
    return games.filter((game) => `${game.name} ${game.category}`.toLowerCase().includes(term));
  }, [games, query]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="mb-5 flex items-center gap-3 rounded-lg border border-white/10 bg-panel/80 px-3 py-2 shadow-glow">
        <Search size={18} className="text-white/45" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Pesquisar jogo ou codigo..."
          className="h-11 w-full bg-transparent text-base outline-none placeholder:text-white/38"
          aria-label="Pesquisar jogos"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} codes={codes.filter((code) => code.gameSlug === game.slug)} />
        ))}
      </div>
    </section>
  );
}
