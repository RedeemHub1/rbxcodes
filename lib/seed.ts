import type { Game, PromoCode, UpdateLog } from "@/lib/types";

const now = new Date("2026-05-15T12:00:00.000Z").toISOString();

export const seedGames: Game[] = [
  {
    id: "game-blox-fruits",
    slug: "blox-fruits",
    name: "Blox Fruits",
    category: "Roblox RPG",
    description: "Codigos de XP, reset de atributos e dinheiro para evoluir mais rapido.",
    imageUrl: "https://placehold.co/1200x630/111827/67f8c4?text=Blox+Fruits",
    accent: "#67f8c4",
    isFeatured: true,
    popularityRank: 1,
    updatedAt: now
  },
  {
    id: "game-blue-lock-rivals",
    slug: "blue-lock-rivals",
    name: "Blue Lock Rivals",
    category: "Roblox Esporte",
    description: "Spins, boosts e recompensas para partidas inspiradas em anime.",
    imageUrl: "https://placehold.co/1200x630/111827/7c5cff?text=Blue+Lock+Rivals",
    accent: "#7c5cff",
    isFeatured: true,
    popularityRank: 2,
    updatedAt: now
  },
  {
    id: "game-anime-vanguards",
    slug: "anime-vanguards",
    name: "Anime Vanguards",
    category: "Roblox Anime",
    description: "Codigos para gemas, rerolls e itens de progressao.",
    imageUrl: "https://placehold.co/1200x630/111827/ffbf47?text=Anime+Vanguards",
    accent: "#ffbf47",
    isFeatured: true,
    popularityRank: 3,
    updatedAt: now
  },
  {
    id: "game-pet-simulator",
    slug: "pet-simulator",
    name: "Pet Simulator",
    category: "Roblox Colecao",
    description: "Brindes, boosts e recompensas para colecionadores.",
    imageUrl: "https://placehold.co/1200x630/111827/38bdf8?text=Pet+Simulator",
    accent: "#38bdf8",
    isFeatured: true,
    popularityRank: 4,
    updatedAt: now
  },
  {
    id: "game-blade-ball",
    slug: "blade-ball",
    name: "Blade Ball",
    category: "Roblox Acao",
    description: "Codigos de spins, moedas e itens para partidas rapidas.",
    imageUrl: "https://placehold.co/1200x630/111827/f97316?text=Blade+Ball",
    accent: "#f97316",
    isFeatured: true,
    popularityRank: 5,
    updatedAt: now
  },
  {
    id: "game-fisch",
    slug: "fisch",
    name: "Fisch",
    category: "Roblox Simulador",
    description: "Recompensas para pesca, iscas e progresso.",
    imageUrl: "https://placehold.co/1200x630/111827/22d3ee?text=Fisch",
    accent: "#22d3ee",
    isFeatured: true,
    popularityRank: 6,
    updatedAt: now
  },
  {
    id: "game-grow-a-garden",
    slug: "grow-a-garden",
    name: "Grow a Garden",
    category: "Roblox Casual",
    description: "Codigos para sementes, moedas e boosts de jardim.",
    imageUrl: "https://placehold.co/1200x630/111827/84cc16?text=Grow+a+Garden",
    accent: "#84cc16",
    isFeatured: true,
    popularityRank: 7,
    updatedAt: now
  },
  {
    id: "game-brookhaven",
    slug: "brookhaven",
    name: "Brookhaven",
    category: "Roblox Roleplay",
    description: "Itens promocionais e recompensas quando disponiveis.",
    imageUrl: "https://placehold.co/1200x630/111827/ec4899?text=Brookhaven",
    accent: "#ec4899",
    isFeatured: true,
    popularityRank: 8,
    updatedAt: now
  },
  {
    id: "game-king-legacy",
    slug: "king-legacy",
    name: "King Legacy",
    category: "Roblox RPG",
    description: "Codigos para gemas, beli, reset e XP.",
    imageUrl: "https://placehold.co/1200x630/111827/eab308?text=King+Legacy",
    accent: "#eab308",
    isFeatured: true,
    popularityRank: 9,
    updatedAt: now
  }
];

export const seedCodes: PromoCode[] = [
  {
    id: "code-blox-starcodeheo",
    gameSlug: "blox-fruits",
    code: "starcodeheo",
    reward: "2x XP por tempo limitado",
    status: "active",
    sourceUrl: "https://rocodes.gg/codes/blox-fruits",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-blox-easterexp",
    gameSlug: "blox-fruits",
    code: "EASTEREXP",
    reward: "2x XP",
    status: "active",
    sourceUrl: "https://rocodes.gg/codes/blox-fruits",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-blox-kitt-reset",
    gameSlug: "blox-fruits",
    code: "KITT_RESET",
    reward: "Reset de atributos",
    status: "active",
    sourceUrl: "https://rocodes.gg/codes/blox-fruits",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-blue-lock-example",
    gameSlug: "blue-lock-rivals",
    code: "44PANTHER",
    reward: "5 Lucky Spins",
    status: "active",
    sourceUrl: "https://www.pcgamer.com/games/roblox/blue-lock-rivals-codes/",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-blue-lock-chigiri",
    gameSlug: "blue-lock-rivals",
    code: "CHIGIRIHERE",
    reward: "5 Lucky Spins e 5 Flow Spins",
    status: "active",
    sourceUrl: "https://www.pcgamer.com/games/roblox/blue-lock-rivals-codes/",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-anime-vanguards-example",
    gameSlug: "anime-vanguards",
    code: "OopsiePoopsie",
    reward: "100 RR, 100 MemShards e 50K Flowers",
    status: "active",
    sourceUrl: "https://rocodes.gg/codes/anime-vanguards",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-anime-vanguards-pain",
    gameSlug: "anime-vanguards",
    code: "TooMuchPain",
    reward: "100 Trait Rerolls",
    status: "active",
    sourceUrl: "https://rocodes.gg/codes/anime-vanguards",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-blade-ball-expired",
    gameSlug: "blade-ball",
    code: "2BTHANKS",
    reward: "Spin gratis",
    status: "expired",
    sourceUrl: "https://www.gamesradar.com/games/action/blade-ball-codes/",
    firstSeenAt: now,
    lastCheckedAt: now
  },
  {
    id: "code-king-legacy-expired",
    gameSlug: "king-legacy",
    code: "UPDATE6",
    reward: "Gemas",
    status: "expired",
    sourceUrl: "https://www.pcgamesn.com/roblox/king-legacy-codes",
    firstSeenAt: now,
    lastCheckedAt: now
  }
];

export const seedUpdateLogs: UpdateLog[] = [
  {
    id: "log-seed",
    source: "seed",
    status: "success",
    message: "Dados iniciais carregados. Configure Supabase e fontes JSON para atualizacao automatica.",
    createdAt: now
  }
];
