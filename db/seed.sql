insert into games (slug, name, category, description, image_url, accent, is_featured, popularity_rank)
values
  ('blox-fruits', 'Blox Fruits', 'Roblox RPG', 'Codigos de XP, reset de atributos e dinheiro para evoluir mais rapido.', '/images/games/blox-fruits.svg', '#67f8c4', true, 1),
  ('blue-lock-rivals', 'Blue Lock Rivals', 'Roblox Esporte', 'Spins, boosts e recompensas para partidas inspiradas em anime.', '/images/games/blue-lock-rivals.svg', '#7c5cff', true, 2),
  ('anime-vanguards', 'Anime Vanguards', 'Roblox Anime', 'Codigos para gemas, rerolls e itens de progressao.', '/images/games/anime-vanguards.svg', '#ffbf47', true, 3),
  ('pet-simulator', 'Pet Simulator', 'Roblox Colecao', 'Brindes, boosts e recompensas para colecionadores.', '/images/games/pet-simulator.svg', '#38bdf8', true, 4),
  ('blade-ball', 'Blade Ball', 'Roblox Acao', 'Codigos de spins, moedas e itens para partidas rapidas.', '/images/games/blade-ball.svg', '#f97316', true, 5),
  ('fisch', 'Fisch', 'Roblox Simulador', 'Recompensas para pesca, iscas e progresso.', '/images/games/fisch.svg', '#22d3ee', true, 6),
  ('grow-a-garden', 'Grow a Garden', 'Roblox Casual', 'Codigos para sementes, moedas e boosts de jardim.', '/images/games/grow-a-garden.svg', '#84cc16', true, 7),
  ('brookhaven', 'Brookhaven', 'Roblox Roleplay', 'Itens promocionais e recompensas quando disponiveis.', '/images/games/brookhaven.svg', '#ec4899', true, 8),
  ('king-legacy', 'King Legacy', 'Roblox RPG', 'Codigos para gemas, beli, reset e XP.', '/images/games/king-legacy.svg', '#eab308', true, 9)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  image_url = excluded.image_url,
  accent = excluded.accent,
  is_featured = excluded.is_featured,
  popularity_rank = excluded.popularity_rank,
  updated_at = now();
