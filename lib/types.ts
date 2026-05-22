export type CodeStatus = "active" | "expired";

export type PromoCode = {
  id: string;
  gameSlug: string;
  code: string;
  reward: string;
  status: CodeStatus;
  sourceUrl?: string;
  firstSeenAt: string;
  lastCheckedAt: string;
  expiresAt?: string | null;
};

export type Game = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  accent: string;
  isFeatured: boolean;
  popularityRank: number;
  updatedAt: string;
};

export type UpdateLog = {
  id: string;
  source: string;
  status: "success" | "failed";
  message: string;
  createdAt: string;
};
