import { NextRequest, NextResponse } from "next/server";

const hits = new Map<string, { count: number; resetAt: number }>();

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function assertAdmin(request: NextRequest) {
  const expected = process.env.ADMIN_TOKEN;
  const received = request.headers.get("x-admin-token");
  return Boolean(expected && received && received === expected);
}

export type CronAuthResult =
  | { ok: true; source: "authorization" | "x-cron-secret" | "query" }
  | { ok: false; reason: "missing_env" | "missing_token" | "token_mismatch" };

export function verifyCronAuth(request: NextRequest): CronAuthResult {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const bearer = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : null;
  const headerSecret = request.headers.get("x-cron-secret")?.trim() || null;
  const querySecret = request.nextUrl.searchParams.get("secret")?.trim() || null;

  if (!expected) return { ok: false, reason: "missing_env" };

  const received = headerSecret ?? bearer ?? querySecret;
  if (!received) return { ok: false, reason: "missing_token" };
  if (received !== expected) return { ok: false, reason: "token_mismatch" };

  if (headerSecret) return { ok: true, source: "x-cron-secret" };
  if (bearer) return { ok: true, source: "authorization" };
  return { ok: true, source: "query" };
}

export function rateLimit(request: NextRequest, limit = 40, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const bucket = hits.get(key);

  if (!bucket || bucket.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}
