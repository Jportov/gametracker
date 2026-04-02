import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getGames } from "@/lib/rawg"
import GameCard from "@/components/game/GameCard"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [topRated, recent] = await Promise.all([
    getGames({ page_size: 8, ordering: "-rating" }),
    getGames({ page_size: 8, ordering: "-released" }),
  ])

  return (
    <main className="space-y-10">
      {!user && (
        <section className="relative rounded-2xl overflow-hidden bg-zinc-800 px-8 py-14 text-center space-y-5">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-zinc-900/0 to-zinc-900/0 pointer-events-none" />
          <h1 className="relative text-4xl font-bold text-white leading-tight">
            Seu catálogo pessoal de jogos
          </h1>
          <p className="relative text-zinc-400 text-lg max-w-md mx-auto">
            Registre o que você está jogando, zerou, abandonou ou deseja jogar. Tudo em um só lugar.
          </p>
          <div className="relative flex items-center justify-center gap-3">
            <Link
              href="/discover"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
            >
              Explorar jogos
            </Link>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Mais Bem Avaliados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topRated.results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-4">Lançamentos Recentes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recent.results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </main>
  )
}
