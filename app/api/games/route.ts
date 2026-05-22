import { NextRequest, NextResponse } from "next/server";
import { getCodes, getGames } from "@/lib/data";
import { jsonError, rateLimit } from "@/lib/security";

export async function GET(request: NextRequest) {
  if (!rateLimit(request)) return jsonError("Rate limit exceeded.", 429);

  const [games, codes] = await Promise.all([getGames(), getCodes()]);
  return NextResponse.json({ games, codes });
}
