import { getGames, getGenres } from "@/lib/rawg"
import GameCard from "@/components/game/GameCard"
import GameCardSkeleton from "@/components/game/GameCardSkeleton"
import DiscoverFilters from "./DiscoverFilters"
import { Suspense } from "react"
import EmptyState from "@/components/ui/EmptyState"
import Link from "next/link"

type Props = {
  searchParams: Promise<{ search?: string; genre?: string; ordering?: string }>
}

async function GameGrid({ searchParams }: { searchParams: { search?: string; genre?: string; ordering?: string } }) {
  const resolvedParams = searchParams
  const data = await getGames({
    search: resolvedParams.search,
    genres: resolvedParams.genre,
    ordering: resolvedParams.ordering || "-rating",
    page_size: 20,
  })

  if (data.results.length === 0) {
    return (
  <EmptyState
    title="Nenhum jogo encontrado"
    description="Tente outros termos de busca ou remova os filtros."
    action={<Link href="/discover" className="text-violet-400 hover:underline text-sm">Limpar filtros</Link>}
  />
)
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
  const resolvedParams = await searchParams
  const { results: genres } = await getGenres()

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Descobrir</h1>

      <Suspense>
        <DiscoverFilters genres={genres} />
      </Suspense>

      <Suspense fallback={<SkeletonGrid />}>
        <GameGrid searchParams={resolvedParams} />
      </Suspense>
    </main>
  )
}
