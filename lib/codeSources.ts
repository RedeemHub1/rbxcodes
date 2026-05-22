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

function getConfiguredSourceUrls() {
  const rawValue = process.env.CODE_SOURCE_URLS;
  const entries = (rawValue || "")
    .split(/[,\n]+/)
    .map((url) => url.trim())
    .filter(Boolean);
  const urls = entries.filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  });

  return {
    hasEnv: typeof rawValue === "string",
    rawLength: rawValue?.length ?? 0,
    entryCount: entries.length,
    invalidEntries: entries.filter((entry) => !urls.includes(entry)),
    urls
  };
}

export async function importConfiguredSources() {
  const { hasEnv, rawLength, entryCount, invalidEntries, urls } = getConfiguredSourceUrls();

  console.info("[codes:sources] loaded CODE_SOURCE_URLS", {
    hasEnv,
    rawLength,
    entryCount,
    urlCount: urls.length,
    invalidCount: invalidEntries.length,
    invalidEntries,
    urls
  });

  if (urls.length === 0) {
    console.warn("[codes:sources] no source URLs configured", {
      hasEnv,
      rawLength,
      entryCount,
      invalidEntries,
      hint: "Set CODE_SOURCE_URLS to one or more absolute JSON URLs separated by commas."
    });

    await createUpdateLog({
      source: "env:CODE_SOURCE_URLS",
      status: "success",
      message: "Nenhuma fonte configurada. Use CODE_SOURCE_URLS para ativar importacao automatica."
    });
    return { imported: 0, sources: 0, failed: 0, invalidSources: invalidEntries.length, sourceUrls: [] };
  }

  let imported = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      console.info("[codes:sources] fetching source", { url });

      const response = await fetch(url, {
        headers: { accept: "application/json" },
        cache: "no-store"
      });

      if (!response.ok) throw new Error(`Fonte retornou HTTP ${response.status}`);

      const parsed = sourceSchema.parse(await response.json());
      const result = await upsertCodes(parsed);
      imported += result.inserted;

      console.info("[codes:sources] imported source", {
        url,
        parsedCodes: parsed.length,
        inserted: result.inserted,
        skipped: result.skipped
      });

      await createUpdateLog({
        source: url,
        status: "success",
        message: `${result.inserted} codigos importados.`
      });
    } catch (error) {
      failed += 1;
      console.error("[codes:sources] failed source", {
        url,
        error: error instanceof Error ? error.message : "Falha desconhecida"
      });

      await createUpdateLog({
        source: url,
        status: "failed",
        message: error instanceof Error ? error.message : "Falha desconhecida"
      });
    }
  }

  console.info("[codes:sources] import finished", {
    urlCount: urls.length,
    imported,
    failed
  });

  return { imported, sources: urls.length, failed, sourceUrls: urls };
}
