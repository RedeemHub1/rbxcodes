import { NextRequest, NextResponse } from "next/server";
import { importConfiguredSources } from "@/lib/codeSources";
import { jsonError, rateLimit, verifyCronAuth } from "@/lib/security";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const startedAt = Date.now();
  const auth = verifyCronAuth(request);
  const logContext = {
    path: request.nextUrl.pathname,
    userAgent: request.headers.get("user-agent") ?? "unknown",
    hasCronSecretEnv: Boolean(process.env.CRON_SECRET),
    hasAuthorizationHeader: Boolean(request.headers.get("authorization")),
    hasXCronSecretHeader: Boolean(request.headers.get("x-cron-secret")),
    hasQuerySecret: Boolean(request.nextUrl.searchParams.get("secret")),
    vercelId: request.headers.get("x-vercel-id") ?? "local"
  };

  console.info("[cron:update] request received", logContext);

  if (!rateLimit(request, 8, 60_000)) {
    console.warn("[cron:update] rate limited", logContext);
    return jsonError("Rate limit exceeded.", 429);
  }

  if (!auth.ok) {
    console.warn("[cron:update] unauthorized", { ...logContext, reason: auth.reason });
    return jsonError("Unauthorized.", 401);
  }

  console.info("[cron:update] authorized", { ...logContext, source: auth.source });

  const result = await importConfiguredSources();
  console.info("[cron:update] finished", {
    ...logContext,
    source: auth.source,
    durationMs: Date.now() - startedAt,
    result
  });

  return NextResponse.json({ ok: true, ...result });
}
