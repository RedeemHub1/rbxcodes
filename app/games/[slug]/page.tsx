import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { CodeList } from "@/components/CodeList";
import { GameImage } from "@/components/GameImage";
import { getCodes, getGame, getGames } from "@/lib/data";
import { formatDate, siteUrl } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGame(slug);
  if (!game) return {};

  return {
    title: `${game.name} codigos ativos e expirados`,
    description: `Lista rapida de codigos ativos e expirados de ${game.name}, com recompensa, botao copiar e data de atualizacao.`,
    alternates: {
      canonical: `/games/${game.slug}`
    },
    openGraph: {
      title: `${game.name} codigos`,
      description: game.description,
      images: [game.imageUrl],
      url: siteUrl(`/games/${game.slug}`)
    }
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const [game, codes] = await Promise.all([getGame(slug), getCodes(slug)]);
  if (!game) notFound();

  const active = codes.filter((code) => code.status === "active");
  const expired = codes.filter((code) => code.status === "expired");
  const lastChecked = codes[0]?.lastCheckedAt ?? game.updatedAt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Como resgatar codigos de ${game.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abra o jogo, encontre a area de codigos ou recompensas, cole o codigo e confirme o resgate."
        }
      },
      {
        "@type": "Question",
        name: "Por que um codigo aparece como expirado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Codigos podem expirar por tempo, limite de uso ou atualizacao do desenvolvedor."
        }
      }
    ]
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
          <div className="relative aspect-[16/9]">
            <GameImage src={game.imageUrl} slug={game.slug} alt={`Banner de ${game.name}`} />
          </div>
          <div className="space-y-2 p-4">
            <p className="text-xs font-bold uppercase text-acid">{game.category}</p>
            <h1 className="text-3xl font-black">{game.name}</h1>
            <p className="text-sm text-white/62">{game.description}</p>
            <p className="text-xs text-white/48">Ultima atualizacao: {formatDate(lastChecked)}</p>
          </div>
        </div>
        <div className="space-y-7">
          <CodeList title="Codigos ativos" codes={active} empty="Nenhum codigo ativo confirmado agora. A automacao continuara verificando fontes configuradas." />
          <CodeList title="Codigos expirados" codes={expired} empty="Nenhum codigo expirado registrado ainda." />
        </div>
      </section>
      <section className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
        <h2 className="text-xl font-black">FAQ rapido</h2>
        <details className="rounded-md bg-ink/70 p-3">
          <summary className="cursor-pointer font-bold">Como resgatar?</summary>
          <p className="mt-2 text-sm text-white/62">Abra {game.name}, procure o menu de codigos, cole o codigo e confirme.</p>
        </details>
        <details className="rounded-md bg-ink/70 p-3">
          <summary className="cursor-pointer font-bold">Os codigos sao verificados automaticamente?</summary>
          <p className="mt-2 text-sm text-white/62">Sim. O endpoint de cron importa fontes configuradas, remove duplicados e atualiza o historico.</p>
        </details>
      </section>
      <div className="mt-6">
        <AdSlot />
      </div>
    </main>
  );
}
