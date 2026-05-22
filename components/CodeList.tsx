import { CopyButton } from "@/components/CopyButton";
import type { PromoCode } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function CodeList({ title, codes, empty }: { title: string; codes: PromoCode[]; empty: string }) {
  return (
    <section className="space-y-3" aria-labelledby={title}>
      <div className="flex items-center justify-between gap-3">
        <h2 id={title} className="text-xl font-black">{title}</h2>
        <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/60">{codes.length}</span>
      </div>
      <div className="space-y-2">
        {codes.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/15 p-4 text-sm text-white/58">{empty}</p>
        ) : codes.map((item) => (
          <article key={item.id} className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <strong className="rounded-md border border-acid/30 bg-acid/10 px-2 py-1 font-mono text-base text-acid">{item.code}</strong>
                <span className="text-sm text-white/80">{item.reward}</span>
              </div>
              <p className="mt-2 text-xs text-white/48">Verificado em {formatDate(item.lastCheckedAt)}</p>
            </div>
            <CopyButton code={item.code} />
          </article>
        ))}
      </div>
    </section>
  );
}
