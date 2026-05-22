import { seedCodes, seedGames, seedUpdateLogs } from "@/lib/seed";
import { getSupabaseAdmin, getSupabasePublic } from "@/lib/supabase";
import type { CodeStatus, Game, PromoCode, UpdateLog } from "@/lib/types";
import { normalizeCode } from "@/lib/utils";

const localGameImages: Record<string, string> = {
  "blox-fruits": "/images/games/blox-fruits.svg",
  "blue-lock-rivals": "/images/games/blue-lock-rivals.svg",
  "anime-vanguards": "/images/games/anime-vanguards.svg",
  "pet-simulator": "/images/games/pet-simulator.svg",
  "blade-ball": "/images/games/blade-ball.svg",
  fisch: "/images/games/fisch.svg",
  "grow-a-garden": "/images/games/grow-a-garden.svg",
  brookhaven: "/images/games/brookhaven.svg",
  "king-legacy": "/images/games/king-legacy.svg"
};

type DbGameRow = {
  id: unknown;
  slug: unknown;
  name: unknown;
  category: unknown;
  description: unknown;
  image_url: unknown;
  accent: unknown;
  is_featured: unknown;
  popularity_rank: unknown;
  updated_at: unknown;
};

type DbCodeRow = {
  id: unknown;
  game_slug: unknown;
  code: unknown;
  reward: unknown;
  status: unknown;
  source_url: unknown;
  first_seen_at: unknown;
  last_checked_at: unknown;
  expires_at: unknown;
};

type DbUpdateLogRow = {
  id: unknown;
  source: unknown;
  status: unknown;
  message: unknown;
  created_at: unknown;
};

function isPublicGameImage(value: unknown): value is string {
  return typeof value === "string" && /^\/images\/games\/[a-z0-9-]+\.(svg|png|jpg|jpeg|webp)$/i.test(value);
}

function resolveGameImage(slug: string, imageUrl: unknown): string {
  if (isPublicGameImage(imageUrl)) return imageUrl;
  if (localGameImages[slug]) return localGameImages[slug];
  if (/^[a-z0-9-]+$/.test(slug)) return `/images/games/${slug}.svg`;
  return "/images/games/blox-fruits.svg";
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback = 999): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function asCodeStatus(value: unknown): CodeStatus {
  return value === "expired" ? "expired" : "active";
}

function asNullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function byRank(a: Game, b: Game) {
  return a.popularityRank - b.popularityRank;
}

export async function getGames(): Promise<Game[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return seedGames.slice().sort(byRank);

  const { data, error } = await supabase.from("games").select("*").order("popularity_rank");
  if (error || !data) return seedGames.slice().sort(byRank);

  return (data as DbGameRow[]).map(mapGame);
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

  return (data as DbCodeRow[]).map(mapCode);
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
  return (data as DbUpdateLogRow[]).map((item) => ({
    id: asString(item.id),
    source: asString(item.source, "unknown"),
    status: item.status === "failed" ? "failed" : "success",
    message: asString(item.message),
    createdAt: asString(item.created_at, new Date().toISOString())
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
  if (!data) throw new Error("Game was not returned after upsert.");
  return mapGame(data as DbGameRow);
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

function mapGame(item: DbGameRow): Game {
  const slug = asString(item.slug, "blox-fruits");
  const imageUrl = resolveGameImage(slug, item.image_url);

  return {
    id: asString(item.id, slug),
    slug,
    name: asString(item.name, "Jogo"),
    category: asString(item.category, "Roblox"),
    description: asString(item.description, "Codigos e recompensas atualizados."),
    imageUrl,
    accent: asString(item.accent, "#67f8c4"),
    isFeatured: asBoolean(item.is_featured, true),
    popularityRank: asNumber(item.popularity_rank),
    updatedAt: asString(item.updated_at, new Date().toISOString())
  };
}

function mapCode(item: DbCodeRow): PromoCode {
  const code = asString(item.code);

  return {
    id: asString(item.id, code),
    gameSlug: asString(item.game_slug, "blox-fruits"),
    code,
    reward: asString(item.reward, "Recompensa"),
    status: asCodeStatus(item.status),
    sourceUrl: asNullableString(item.source_url) ?? undefined,
    firstSeenAt: asString(item.first_seen_at, new Date().toISOString()),
    lastCheckedAt: asString(item.last_checked_at, new Date().toISOString()),
    expiresAt: asNullableString(item.expires_at)
  };
}
