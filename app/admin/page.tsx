import { AdminForm } from "@/components/AdminForm";

export const metadata = {
  title: "Admin"
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase text-acid">Painel simples</p>
        <h1 className="mt-2 text-3xl font-black">Adicionar jogo</h1>
        <p className="mt-2 text-sm text-white/62">Use com Supabase configurado e proteja com `ADMIN_TOKEN`.</p>
      </div>
      <AdminForm />
    </main>
  );
}
