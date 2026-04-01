import { getGames, getGenres } from "@/lib/rawg"
import GameCard from "@/components/game/GameCard"
import GameCardSkeleton from "@/components/game/GameCardSkeleton"
import { Suspense } from "react"

type Props = {
  searchParams: { search?: string; genre?: string; ordering?: string }
}

async function GameGrid({ searchParams }: Props) {
  const data = await getGames({
    search: searchParams.search,
    genres: searchParams.genre,
    ordering: searchParams.ordering || "-rating",
    page_size: 20,
  })

  if (data.results.length === 0) {
    return <p className="text-zinc-400 col-span-full">Nenhum jogo encontrado.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.results.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function DiscoverPage({ searchParams }: Props) {
  const { results: genres } = await getGenres()

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Descobrir</h1>

      <form className="flex flex-wrap gap-3">
        <input
          name="search"
          defaultValue={searchParams.search}
          placeholder="Buscar jogos..."
          className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <select
          name="genre"
          defaultValue={searchParams.genre}
          className="bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Todos os gêneros</option>
          {genres.map((g) => (
            <option key={g.id} value={g.slug}>{g.name}</option>
          ))}
        </select>

        <select
          name="ordering"
          defaultValue={searchParams.ordering}
          className="bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="-rating">Melhor avaliados</option>
          <option value="-released">Mais recentes</option>
          <option value="-added">Mais populares</option>
          <option value="name">A–Z</option>
        </select>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg px-5 py-2 text-sm font-medium transition"
        >
          Buscar
        </button>
      </form>

      <Suspense fallback={<SkeletonGrid />}>
        <GameGrid searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
