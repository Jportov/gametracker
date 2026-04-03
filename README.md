# GameTracker

Catálogo pessoal de jogos — rastreie o que você está jogando, zerou, abandonou ou deseja jogar.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss)

---

## Funcionalidades

- **Descobrir jogos** — busca e filtros por gênero e ordenação via RAWG API
- **Página de detalhes** — screenshots, avaliação, plataformas, descrição expansível e jogos da série
- **Biblioteca pessoal** — grade de capas com status (jogando, zerado, abandonado, lista de desejos)
- **Perfil** — hero personalizado, barra de progresso segmentada e estante de capas
- **Autenticação OAuth** — Google, Discord e GitHub via Supabase
- **Design mobile-first** — bottom tab bar estilo iOS, scroll horizontal com snap, frosted glass header
- **Toasts de feedback** — confirmação visual em todas as ações da biblioteca

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 |
| Banco de dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth (OAuth) |
| API de jogos | RAWG API |
| Toasts | Sonner |
| Deploy | Vercel |

---

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com)
- Chave da [RAWG API](https://rawg.io/apidocs)
- Apps OAuth criados no Google, Discord e/ou GitHub

---

## Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/gametracker.git
cd gametracker

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com seus valores (veja seção abaixo)

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

---

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
# Supabase — Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# RAWG — rawg.io/apidocs
RAWG_API_KEY=sua_chave_aqui

# URL base do app (localhost em dev, domínio Vercel em produção)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Configuração do Supabase

### 1. Tabela `user_games`

Execute no **SQL Editor** do Supabase:

```sql
create table user_games (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade not null,
  game_id    integer not null,
  status     text check (status in ('playing','completed','dropped','wishlist')) not null,
  rating     numeric,
  notes      text,
  created_at timestamptz default now()
);

-- Política de segurança: cada usuário acessa só os próprios jogos
alter table user_games enable row level security;

create policy "Usuários gerenciam seus próprios jogos"
  on user_games for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

### 2. Provedores OAuth

Em **Authentication → Providers**, ative os provedores desejados e configure:

**Google**
1. [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth 2.0
2. Authorized redirect URI: `https://xxxx.supabase.co/auth/v1/callback`

**Discord**
1. [discord.com/developers/applications](https://discord.com/developers/applications) → OAuth2
2. Redirect: `https://xxxx.supabase.co/auth/v1/callback`

**GitHub**
1. GitHub → Settings → Developer Settings → OAuth Apps
2. Authorization callback URL: `https://xxxx.supabase.co/auth/v1/callback`

### 3. Redirect URLs

Em **Authentication → URL Configuration → Redirect URLs**, adicione:
```
http://localhost:3000/auth/callback
https://seu-app.vercel.app/auth/callback
```

---

## Estrutura do Projeto

```
src/
├── app/
│   ├── auth/callback/      # Handler do OAuth (troca code por sessão)
│   ├── discover/           # Página de descoberta com filtros
│   ├── game/[id]/          # Detalhes do jogo
│   ├── library/            # Biblioteca do usuário (protegida)
│   ├── login/              # Página de login com provedores OAuth
│   ├── profile/            # Perfil e estatísticas (protegida)
│   └── page.tsx            # Home com seções de jogos
│
├── components/
│   ├── game/               # GameCard, AddToLibraryButton, RatingBadge...
│   ├── layout/             # Header, BottomNav, NavLinks, UserMenu
│   └── ui/                 # EmptyState
│
├── context/
│   └── AuthContext.tsx     # Estado global de autenticação (client-side)
│
├── lib/
│   ├── auth-actions.ts     # Server Actions de login/logout
│   ├── rawg.ts             # Funções de busca na RAWG API
│   ├── supabase/           # Clientes Supabase (server e client)
│   ├── user-games.ts       # CRUD da biblioteca (client-side)
│   └── user-games.server.ts# Leitura da biblioteca (server-side)
│
├── middleware.ts            # Refresh de sessão Supabase em cada request
└── types/
    └── game.ts             # Tipos TypeScript (Game, UserGame, etc.)
```

---

## Deploy na Vercel

1. Faça push para o GitHub
2. Importe o repositório na [Vercel](https://vercel.com)
3. Em **Settings → Environment Variables**, adicione as mesmas variáveis do `.env.local`, trocando `NEXT_PUBLIC_SITE_URL` pelo domínio gerado pela Vercel
4. Após o primeiro deploy, copie a URL (ex: `https://gametracker-abc.vercel.app`)
5. Atualize `NEXT_PUBLIC_SITE_URL` na Vercel com essa URL e faça redeploy
6. Adicione a URL em **Supabase → Authentication → URL Configuration → Redirect URLs**

---

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Lint com ESLint
```

---

## Licença

MIT
