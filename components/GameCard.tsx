import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import type { Game, PromoCode } from "@/lib/types";

export function GameCard({ game, codes }: { game: Game; codes: PromoCode[] }) {
  const activeCount = codes.filter((code) => code.status === "active").length;

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.045] transition hover:-translate-y-0.5 hover:border-acid/40 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-panel">
        <Image src={game.imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 transition group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-ink/80 px-2 py-1 text-xs font-bold text-acid backdrop-blur">
          <Zap size={13} />
          {activeCount} ativos
        </span>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-white/45">{game.category}</p>
            <h2 className="mt-1 text-lg font-black">{game.name}</h2>
          </div>
          <ArrowRight className="mt-1 shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:text-acid" size={18} />
        </div>
        <p className="line-clamp-2 text-sm text-white/62">{game.description}</p>
      </div>
    </Link>
  );
}
