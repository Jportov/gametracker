import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Meu Perfil — GameTracker",
  description: "Veja suas estatísticas, progresso e estante de jogos.",
}
import { createClient } from "@/lib/supabase/server"
import { getUserGamesServer } from "@/lib/user-games.server"
import { getGameBasic } from "@/lib/rawg"
import { EnrichedUserGame, GameStatus } from "@/types/game"
import Image from "next/image"
import Link from "next/link"

const STATUS_LABELS: Record<GameStatus, string> = {
  playing: "Jogando",
  completed: "Zerado",
  dropped: "Abandonado",
  wishlist: "Desejado",
}

const STATUS_COLORS: Record<GameStatus, string> = {
  playing:   "bg-emerald-500",
  completed: "bg-blue-500",
  dropped:   "bg-red-500",
  wishlist:  "bg-yellow-500",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const userGames = await getUserGamesServer()

  const enriched: EnrichedUserGame[] = await Promise.all(
    userGames.slice(0, 9).map(async (g) => {
      const { name, background_image } = await getGameBasic(g.game_id)
      return { ...g, game_name: name, game_image: background_image }
    })
  )

  const stats = {
    total:     userGames.length,
    playing:   userGames.filter((g) => g.status === "playing").length,
    completed: userGames.filter((g) => g.status === "completed").length,
    dropped:   userGames.filter((g) => g.status === "dropped").length,
    wishlist:  userGames.filter((g) => g.status === "wishlist").length,
  }

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const avatar = user.user_metadata?.avatar_url
  const name   = user.user_metadata?.full_name ?? user.email

  return (
    <main className="space-y-8 pb-4">

      {/* ── Hero do perfil ── */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Fundo com blur das capas dos jogos */}
        <div className="absolute inset-0">
          {enriched[0]?.game_image ? (
            <Image
              src={enriched[0].game_image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover scale-110 blur-2xl opacity-20"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: "linear-gradient(135deg, #0f1629 0%, #1a2a5e 100%)" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080c18]/60 to-[#080c18]" />
        </div>

        {/* Conteúdo do hero */}
        <div className="relative px-6 pt-10 pb-8 flex flex-col items-center text-center gap-4">
          {avatar ? (
            <div className="ring-4 ring-violet-500/40 rounded-full shadow-2xl">
              <Image
                src={avatar}
                alt={name ?? ""}
                width={88}
                height={88}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="w-22 h-22 rounded-full bg-surface2 ring-4 ring-violet-500/30 flex items-center justify-center text-3xl shadow-2xl">
              🎮
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <p className="text-muted text-sm mt-0.5">{user.email}</p>
          </div>

          {/* Contagem rápida inline */}
          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <p className="text-white font-bold text-lg">{stats.total}</p>
              <p className="text-muted text-xs">jogos</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-emerald-400 font-bold text-lg">{stats.playing}</p>
              <p className="text-muted text-xs">jogando</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-blue-400 font-bold text-lg">{stats.completed}</p>
              <p className="text-muted text-xs">zerados</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Barra de progresso ── */}
      {stats.total > 0 && (
        <div className="space-y-3 px-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted font-medium">Progresso na biblioteca</span>
            <span className="text-white font-semibold">{completionRate}% zerado</span>
          </div>
          {/* Barra segmentada por status */}
          <div className="w-full h-3 rounded-full overflow-hidden flex gap-0.5 bg-surface2">
            {stats.playing > 0 && (
              <div
                className="bg-emerald-500 h-full rounded-l-full transition-all"
                style={{ width: `${(stats.playing / stats.total) * 100}%` }}
              />
            )}
            {stats.completed > 0 && (
              <div
                className="bg-blue-500 h-full transition-all"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              />
            )}
            {stats.wishlist > 0 && (
              <div
                className="bg-yellow-500 h-full transition-all"
                style={{ width: `${(stats.wishlist / stats.total) * 100}%` }}
              />
            )}
            {stats.dropped > 0 && (
              <div
                className="bg-red-500 h-full rounded-r-full transition-all"
                style={{ width: `${(stats.dropped / stats.total) * 100}%` }}
              />
            )}
          </div>
          <div className="flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Jogando</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Zerado</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" />Desejado</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Abandonado</span>
          </div>
        </div>
      )}

      {/* ── Estante de capas ── */}
      {enriched.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Minha estante</h2>
            <Link href="/library" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
              Ver biblioteca →
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {enriched.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.game_id}`}
                className="relative group rounded-xl overflow-hidden aspect-[2/3] bg-surface2 block"
              >
                {game.game_image ? (
                  <Image
                    src={game.game_image}
                    alt={game.game_name}
                    fill
                    sizes="(max-width: 768px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-xs p-2 text-center">
                    {game.game_name}
                  </div>
                )}
                {/* Gradiente + badge de status */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full ring-2 ring-black/40 ${STATUS_COLORS[game.status]}`} />
                <p className="absolute bottom-0 left-0 right-0 px-1.5 pb-1.5 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2 leading-tight">
                  {game.game_name}
                </p>
              </Link>
            ))}
          </div>

          {/* Legenda de status */}
          {enriched.length > 0 && (
            <div className="flex gap-3 text-xs text-muted flex-wrap">
              {(Object.keys(STATUS_LABELS) as GameStatus[]).map((s) => (
                <span key={s} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[s]}`} />
                  {STATUS_LABELS[s]}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Empty state */}
      {userGames.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="text-5xl">🎮</p>
          <h3 className="text-lg font-semibold text-white">Sua estante está vazia</h3>
          <p className="text-muted text-sm">Adicione jogos para começar sua coleção.</p>
          <Link href="/discover" className="inline-block mt-2 text-violet-400 hover:underline text-sm">
            Explorar jogos
          </Link>
        </div>
      )}
    </main>
  )
}
