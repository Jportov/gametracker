# GameTracker — contexto do projeto

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- Supabase (auth + banco de dados)
- RAWG API (dados de jogos)
- Zustand (estado global)
- React Query / TanStack Query

## Estrutura atual
```
gametracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx        (layout raiz com Header)
│   │   ├── page.tsx          (home)
│   │   ├── globals.css       (tema zinc/emerald dark)
│   │   ├── discover/page.tsx
│   │   ├── library/page.tsx
│   │   ├── profile/page.tsx
│   │   └── game/[id]/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   ├── ui/               (vazio)
│   │   └── game/             (vazio)
│   ├── types/                (vazio — próximo passo)
│   └── lib/                  (vazio — próximo passo)
├── .env.local                (SUPABASE_URL, SUPABASE_ANON_KEY, RAWG_API_KEY)
├── next.config.ts
└── CONTEXT.md
```

## O que já foi feito
- Dia 1: setup completo, dependências instaladas, .env.local configurado, repo no GitHub
- Dia 2: Header com logo emerald e links de nav, layout raiz, 4 rotas placeholder

## Roadmap restante
- Dia 3: src/types/game.ts + src/lib/rawg.ts + configurar next.config.ts para imagens
- Dia 4: GameCard, GameCardSkeleton, RatingBadge, PlatformIcon
- Dia 5: página Home e Discover com busca e filtros
- Dia 6: Supabase Auth com Google OAuth
- Dia 7: tabela user_games com RLS no Supabase
- Dia 8: AuthContext + UserMenu no header
- Dia 9: AddToLibraryButton com optimistic update
- Dia 10: página Library com abas e estatísticas
- Dia 11: página de detalhe do jogo com SSR e generateMetadata
- Dia 12: galeria de screenshots e lightbox
- Dia 13: jogos similares e busca avançada com filtros na URL
- Dia 14: loading.tsx, error.tsx, not-found.tsx, EmptyState
- Dia 15: página de perfil com estatísticas do banco
- Dia 16: testes com Jest e React Testing Library
- Dia 17: CI/CD com GitHub Actions
- Dia 18: otimizações de performance e Lighthouse
- Dia 19: polimento visual, responsividade e Toast
- Dia 20: README profissional e showcase no portfólio

## Dependências instaladas
- @supabase/supabase-js
- @supabase/ssr
- @tanstack/react-query
- @tanstack/react-query-devtools
- zustand

## Variáveis de ambiente (.env.local)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RAWG_API_KEY=
