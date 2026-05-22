# Redeem Hub

Site moderno e responsivo para codigos redeem e promocionais de Roblox e outros jogos populares.

## Stack

- Next.js App Router
- TailwindCSS
- API routes
- Supabase/PostgreSQL opcional
- Vercel Cron preparado

## Rodando

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha as chaves do Supabase quando quiser persistencia real. Sem Supabase, o app usa dados seedados para desenvolvimento.

## Automacao

O endpoint `GET /api/codes/update` e chamado por Vercel Cron usando `Authorization: Bearer $CRON_SECRET`.

`CODE_SOURCE_URLS` aceita uma lista separada por virgulas de endpoints JSON confiaveis. Para testar com a fonte empacotada neste projeto, use:

```text
CODE_SOURCE_URLS=https://your-domain.vercel.app/code-sources/roblox-codes.json
```

Formato esperado:

```json
[
  {
    "gameSlug": "blox-fruits",
    "code": "EXAMPLE",
    "reward": "2x XP",
    "status": "active",
    "sourceUrl": "https://example.com/source"
  }
]
```

O import normaliza codigos, evita duplicacao e grava historico de atualizacao.

## Deploy no Vercel

Este projeto usa o App Router moderno do Next.js. A raiz do projeto no Vercel deve ser a pasta que contem:

- `package.json`
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `next.config.mjs`
- `vercel.json`
- `public/images/games/*`

Se o GitHub tiver uma pasta acima desta, configure em Vercel > Project Settings > General > Root Directory para:

```text
crie-um-site-moderno-r-pido
```

No plano Hobby, o cron esta configurado para rodar uma vez por dia:

```json
{
  "path": "/api/codes/update",
  "schedule": "0 0 * * *"
}
```

Configure estas Environment Variables no Vercel:

- `CRON_SECRET`: string aleatoria com pelo menos 16 caracteres. A Vercel envia esse valor automaticamente no header `Authorization: Bearer ...` quando executa o cron.
- `CODE_SOURCE_URLS`: lista separada por virgulas com fontes JSON confiaveis. Exemplo: `https://your-domain.vercel.app/code-sources/roblox-codes.json`
- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave anon publica do Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: chave service role para gravar codigos e logs.
- `ADMIN_TOKEN`: token para proteger o painel admin.

Depois de alterar Environment Variables ou `vercel.json`, faca um novo deploy.
