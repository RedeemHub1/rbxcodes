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

export function assertCron(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const received = request.headers.get("x-cron-secret") || bearer || request.nextUrl.searchParams.get("secret");
  return Boolean(expected && received && received === expected);
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
