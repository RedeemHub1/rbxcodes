import { NextRequest, NextResponse } from "next/server";
import { importConfiguredSources } from "@/lib/codeSources";
import { assertCron, jsonError, rateLimit } from "@/lib/security";

export async function GET(request: NextRequest) {
  if (!rateLimit(request, 8, 60_000)) return jsonError("Rate limit exceeded.", 429);
  if (!assertCron(request)) return jsonError("Unauthorized.", 401);

  const result = await importConfiguredSources();
  return NextResponse.json({ ok: true, ...result });
}
