"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 min-w-24 items-center justify-center gap-2 rounded-md bg-acid px-3 text-sm font-black text-ink transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-acid focus:ring-offset-2 focus:ring-offset-ink"
      aria-label={`Copiar codigo ${code}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}
