import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserGamesServer } from "@/lib/user-games.server"
import Image from "next/image"
import Link from "next/link"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/")

  const userGames = await getUserGamesServer()

  const stats = {
    total: userGames.length,
    playing: userGames.filter((g) => g.status === "playing").length,
    completed: userGames.filter((g) => g.status === "completed").length,
    dropped: userGames.filter((g) => g.status === "dropped").length,
    wishlist: userGames.filter((g) => g.status === "wishlist").length,
  }

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const avatar = user.user_metadata?.avatar_url
  const name = user.user_metadata?.full_name ?? user.email

  return (
    <main className="space-y-8 max-w-2xl">
      {/* Cabeçalho do perfil */}
      <div className="flex items-center gap-5">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={72}
            height={72}
            className="rounded-full"
          />
        ) : (
          <div className="w-18 h-18 rounded-full bg-zinc-700 flex items-center justify-center text-2xl">
            🎮
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <p className="text-zinc-400 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total de jogos", value: stats.total, color: "text-white" },
          { label: "Jogando", value: stats.playing, color: "text-emerald-400" },
          { label: "Zerados", value: stats.completed, color: "text-blue-400" },
          { label: "Abandonados", value: stats.dropped, color: "text-red-400" },
          { label: "Lista de desejos", value: stats.wishlist, color: "text-yellow-400" },
          { label: "Taxa de conclusão", value: `${completionRate}%`, color: "text-purple-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-zinc-800 rounded-xl p-4">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-zinc-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Barra de progresso de conclusão */}
      {stats.total > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Progresso geral</span>
            <span className="text-zinc-300">{stats.completed} de {stats.total} zerados</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      )}

      {/* Jogos recentes */}
      {userGames.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Adicionados recentemente</h2>
          <div className="space-y-2">
            {userGames.slice(0, 5).map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.game_id}`}
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-3 transition"
              >
                <span className="text-sm text-white">Jogo #{game.game_id}</span>
                <span className="text-xs text-zinc-400 capitalize">{game.status}</span>
              </Link>
            ))}
          </div>
          {userGames.length > 5 && (
            <Link href="/library" className="text-emerald-400 hover:underline text-sm">
              Ver todos os {userGames.length} jogos →
            </Link>
          )}
        </section>
      )}
    </main>
  )
}
