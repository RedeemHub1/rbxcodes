import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import "@/app/globals.css";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Redeem Hub - Codigos Roblox e jogos populares",
    template: "%s | Redeem Hub"
  },
  description: "Codigos ativos e expirados de Roblox e jogos populares, com busca rapida, copiar codigo e atualizacao automatica.",
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      en: "/en"
    }
  },
  openGraph: {
    title: "Redeem Hub",
    description: "Codigos redeem de Roblox em uma interface rapida e mobile-first.",
    type: "website",
    url: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#070914",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="noise font-sans antialiased">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/86 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-black tracking-wide">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-acid text-ink">
                <Sparkles size={18} />
              </span>
              Redeem Hub
            </Link>
            <nav className="flex items-center gap-2 text-sm text-white/72">
              <Link className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white" href="/admin">
                Admin
              </Link>
              <span className="hidden items-center gap-1 rounded-md border border-white/10 px-3 py-2 text-acid sm:flex">
                <ShieldCheck size={15} />
                Seguro
              </span>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
