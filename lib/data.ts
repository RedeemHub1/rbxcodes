import { seedCodes, seedGames, seedUpdateLogs } from "@/lib/seed";
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase";
import type { Game, PromoCode, UpdateLog } from "@/lib/types";
import { normalizeCode } from "@/lib/utils";

function byRank(a: Game, b: Game) {
  return a.popularityRank - b.popularityRank;
}

export async function getGames(): Promise<Game[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return seedGames.slice().sort(byRank);

  const { data, error } = await supabase.from("games").select("*").order("popularity_rank");
  if (error || !data) return seedGames.slice().sort(byRank);

  return data.map(mapGame);
}

export async function getGame(slug: string): Promise<Game | null> {
  const games = await getGames();
  return games.find((game) => game.slug === slug) ?? null;
}

export async function getCodes(gameSlug?: string): Promise<PromoCode[]> {
  const supabase = getSupabasePublic();
  if (!supabase) {
    return seedCodes.filter((code) => !gameSlug || code.gameSlug === gameSlug);
  }

  let query = supabase.from("codes").select("*").order("last_checked_at", { ascending: false });
  if (gameSlug) query = query.eq("game_slug", gameSlug);

  const { data, error } = await query;
  if (error || !data) return seedCodes.filter((code) => !gameSlug || code.gameSlug === gameSlug);

  return data.map(mapCode);
}

export async function getUpdateLogs(): Promise<UpdateLog[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return seedUpdateLogs;

  const { data, error } = await supabase
    .from("update_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error || !data) return seedUpdateLogs;
  return data.map((item) => ({
    id: item.id,
    source: item.source,
    status: item.status,
    message: item.message,
    createdAt: item.created_at
  }));
}

export async function upsertGame(input: Omit<Game, "id" | "updatedAt"> & Partial<Pick<Game, "id" | "updatedAt">>) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase service role key is required for writes.");

  const payload = {
    id: input.id,
    slug: input.slug,
    name: input.name,
    category: input.category,
    description: input.description,
    image_url: input.imageUrl,
    accent: input.accent,
    is_featured: input.isFeatured,
    popularity_rank: input.popularityRank,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from("games").upsert(payload, { onConflict: "slug" }).select().single();
  if (error) throw error;
  return mapGame(data);
}

export async function upsertCodes(codes: Array<Pick<PromoCode, "gameSlug" | "code" | "reward" | "status" | "sourceUrl">>) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { inserted: 0, skipped: codes.length };

  const now = new Date().toISOString();
  const payload = codes.map((item) => ({
    game_slug: item.gameSlug,
    code: normalizeCode(item.code),
    reward: item.reward,
    status: item.status,
    source_url: item.sourceUrl,
    last_checked_at: now,
    first_seen_at: now
  }));

  const { error } = await supabase.from("codes").upsert(payload, { onConflict: "game_slug,code" });
  if (error) throw error;
  return { inserted: payload.length, skipped: 0 };
}

export async function createUpdateLog(log: Omit<UpdateLog, "id" | "createdAt">) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("update_logs").insert({
    source: log.source,
    status: log.status,
    message: log.message
  });
}

function mapGame(item: any): Game {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    category: item.category,
    description: item.description,
    imageUrl: item.image_url,
    accent: item.accent,
    isFeatured: item.is_featured,
    popularityRank: item.popularity_rank,
    updatedAt: item.updated_at
  };
}

function mapCode(item: any): PromoCode {
  return {
    id: item.id,
    gameSlug: item.game_slug,
    code: item.code,
    reward: item.reward,
    status: item.status,
    sourceUrl: item.source_url,
    firstSeenAt: item.first_seen_at,
    lastCheckedAt: item.last_checked_at,
    expiresAt: item.expires_at
  };
}
