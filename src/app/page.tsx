import { getGames } from "@/lib/rawg"
import GameCard from "@/components/game/GameCard"

export default async function Home() {
  const [topRated, recent] = await Promise.all([
    getGames({ page_size: 8, ordering: "-rating" }),
    getGames({ page_size: 8, ordering: "-released" }),
  ])

  return (
    <main className="space-y-10">
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
