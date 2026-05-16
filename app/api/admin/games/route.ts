import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { upsertGame } from "@/lib/data";
import { assertAdmin, jsonError, rateLimit } from "@/lib/security";

const schema = z.object({
  name: z.string().min(2).max(80),
  slug: z.string().min(2).max(90).regex(/^[a-z0-9-]+$/),
  category: z.string().min(2).max(60),
  description: z.string().min(8).max(220),
  imageUrl: z.string().url(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  popularityRank: z.coerce.number().int().positive()
});

export async function POST(request: NextRequest) {
  if (!rateLimit(request, 12, 60_000)) return jsonError("Rate limit exceeded.", 429);
  if (!assertAdmin(request)) return jsonError("Unauthorized.", 401);

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return jsonError("Invalid payload.", 422);

  const game = await upsertGame({
    ...parsed.data,
    isFeatured: true
  });

  return NextResponse.json({ game }, { status: 201 });
}
