insert into games (slug, name, category, description, image_url, accent, is_featured, popularity_rank)
values
  ('blox-fruits', 'Blox Fruits', 'Roblox RPG', 'Codigos de XP, reset de atributos e dinheiro para evoluir mais rapido.', 'https://placehold.co/1200x630/111827/67f8c4?text=Blox+Fruits', '#67f8c4', true, 1),
  ('blue-lock-rivals', 'Blue Lock Rivals', 'Roblox Esporte', 'Spins, boosts e recompensas para partidas inspiradas em anime.', 'https://placehold.co/1200x630/111827/7c5cff?text=Blue+Lock+Rivals', '#7c5cff', true, 2),
  ('anime-vanguards', 'Anime Vanguards', 'Roblox Anime', 'Codigos para gemas, rerolls e itens de progressao.', 'https://placehold.co/1200x630/111827/ffbf47?text=Anime+Vanguards', '#ffbf47', true, 3),
  ('pet-simulator', 'Pet Simulator', 'Roblox Colecao', 'Brindes, boosts e recompensas para colecionadores.', 'https://placehold.co/1200x630/111827/38bdf8?text=Pet+Simulator', '#38bdf8', true, 4),
  ('blade-ball', 'Blade Ball', 'Roblox Acao', 'Codigos de spins, moedas e itens para partidas rapidas.', 'https://placehold.co/1200x630/111827/f97316?text=Blade+Ball', '#f97316', true, 5),
  ('fisch', 'Fisch', 'Roblox Simulador', 'Recompensas para pesca, iscas e progresso.', 'https://placehold.co/1200x630/111827/22d3ee?text=Fisch', '#22d3ee', true, 6),
  ('grow-a-garden', 'Grow a Garden', 'Roblox Casual', 'Codigos para sementes, moedas e boosts de jardim.', 'https://placehold.co/1200x630/111827/84cc16?text=Grow+a+Garden', '#84cc16', true, 7),
  ('brookhaven', 'Brookhaven', 'Roblox Roleplay', 'Itens promocionais e recompensas quando disponiveis.', 'https://placehold.co/1200x630/111827/ec4899?text=Brookhaven', '#ec4899', true, 8),
  ('king-legacy', 'King Legacy', 'Roblox RPG', 'Codigos para gemas, beli, reset e XP.', 'https://placehold.co/1200x630/111827/eab308?text=King+Legacy', '#eab308', true, 9)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  image_url = excluded.image_url,
  accent = excluded.accent,
  is_featured = excluded.is_featured,
  popularity_rank = excluded.popularity_rank,
  updated_at = now();
