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

O endpoint `GET /api/codes/update` pode ser chamado por Vercel Cron com o header `x-cron-secret`.

`CODE_SOURCE_URLS` aceita uma lista separada por virgulas de endpoints JSON confiaveis no formato:

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
