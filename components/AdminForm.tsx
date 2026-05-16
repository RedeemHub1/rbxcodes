"use client";

import { PlusCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type State = "idle" | "saving" | "saved" | "error";

export function AdminForm() {
  const [state, setState] = useState<State>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/admin/games", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-token": String(payload.adminToken)
      },
      body: JSON.stringify(payload)
    });

    setState(response.ok ? "saved" : "error");
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="name" placeholder="Nome do jogo" required />
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="slug" placeholder="url-amigavel" required />
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="category" placeholder="Categoria" required />
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="imageUrl" placeholder="URL da imagem/banner" required />
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="accent" placeholder="#67f8c4" required />
        <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="popularityRank" placeholder="Ranking" type="number" required />
      </div>
      <textarea className="min-h-24 rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="description" placeholder="Descricao curta" required />
      <input className="rounded-md border border-white/10 bg-ink px-3 py-3 outline-none focus:border-acid" name="adminToken" placeholder="ADMIN_TOKEN" type="password" required />
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-acid px-4 font-black text-ink" type="submit" disabled={state === "saving"}>
        <PlusCircle size={18} />
        {state === "saving" ? "Salvando..." : "Adicionar jogo"}
      </button>
      {state === "saved" && <p className="text-sm text-acid">Jogo salvo.</p>}
      {state === "error" && <p className="text-sm text-red-300">Nao foi possivel salvar. Confira token e Supabase.</p>}
    </form>
  );
}
