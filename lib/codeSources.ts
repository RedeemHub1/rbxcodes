import { z } from "zod";
import { createUpdateLog, upsertCodes } from "@/lib/data";

const sourceCodeSchema = z.object({
  gameSlug: z.string().min(2),
  code: z.string().min(2),
  reward: z.string().min(2),
  status: z.enum(["active", "expired"]).default("active"),
  sourceUrl: z.string().url().optional()
});

const sourceSchema = z.array(sourceCodeSchema);

export async function importConfiguredSources() {
  const urls = (process.env.CODE_SOURCE_URLS || "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  if (urls.length === 0) {
    await createUpdateLog({
      source: "env:CODE_SOURCE_URLS",
      status: "success",
      message: "Nenhuma fonte configurada. Use CODE_SOURCE_URLS para ativar importacao automatica."
    });
    return { imported: 0, sources: 0 };
  }

  let imported = 0;

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { accept: "application/json" },
        next: { revalidate: 0 }
      });

      if (!response.ok) throw new Error(`Fonte retornou HTTP ${response.status}`);

      const parsed = sourceSchema.parse(await response.json());
      const result = await upsertCodes(parsed);
      imported += result.inserted;

      await createUpdateLog({
        source: url,
        status: "success",
        message: `${result.inserted} codigos importados.`
      });
    } catch (error) {
      await createUpdateLog({
        source: url,
        status: "failed",
        message: error instanceof Error ? error.message : "Falha desconhecida"
      });
    }
  }

  return { imported, sources: urls.length };
}
