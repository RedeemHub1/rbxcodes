import { Clock3, Gamepad2, Radar, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { SearchGames } from "@/components/SearchGames";
import { getCodes, getGames, getUpdateLogs } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [games, codes, logs] = await Promise.all([getGames(), getCodes(), getUpdateLogs()]);
  const activeCodes = codes.filter((code) => code.status === "active").length;
  const lastUpdate = logs[0]?.createdAt ?? games[0]?.updatedAt;

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-md border border-acid/20 bg-acid/10 px-3 py-2 text-sm font-bold text-acid">
            <Radar size={16} />
            Codigos atualizados e separados por status
          </div>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-black tracking-normal sm:text-6xl">
              Codigos Roblox sem enrolacao.
            </h1>
            <p className="max-w-2xl text-base text-white/62 sm:text-lg">
              Encontre jogos populares, veja codigos ativos primeiro, copie em um toque e acompanhe expirados sem precisar rolar por textos enormes.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/[0.045] p-3">
          <Stat icon={<Gamepad2 size={18} />} label="Jogos" value={String(games.length)} />
          <Stat icon={<ShieldCheck size={18} />} label="Ativos" value={String(activeCodes)} />
          <Stat icon={<Clock3 size={18} />} label="Update" value={lastUpdate ? formatDate(lastUpdate).split(" ").slice(0, 2).join(" ") : "Hoje"} />
        </div>
      </section>
      <SearchGames games={games} codes={codes} />
    </main>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-md bg-ink/70 p-3">
      <div className="text-acid">{icon}</div>
      <p className="mt-3 text-xs text-white/45">{label}</p>
      <p className="text-base font-black sm:text-lg">{value}</p>
    </div>
  );
}
