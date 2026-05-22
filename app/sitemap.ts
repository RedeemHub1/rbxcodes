import type { MetadataRoute } from "next";
import { getGames } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getGames();
  return [
    {
      url: siteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1
    },
    ...games.map((game) => ({
      url: siteUrl(`/games/${game.slug}`),
      lastModified: new Date(game.updatedAt),
      changeFrequency: "hourly" as const,
      priority: 0.9
    }))
  ];
}
