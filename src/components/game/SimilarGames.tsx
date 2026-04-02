import Link from "next/link"
import Image from "next/image"
import { getSimilarGames } from "@/lib/rawg"
import RatingBadge from "./RatingBadge"

type Props = { gameId: string }

export default async function SimilarGames({ gameId }: Props) {
  const data = await getSimilarGames(gameId)

  if (!data.results.length) return null

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Da mesma série</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.slice(0, 4).map((game) => (
          <Link
            key={game.id}
            href={`/game/${game.id}`}
            className="group block bg-zinc-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-emerald-500 transition"
          >
            <div className="relative aspect-video">
              {game.background_image ? (
                <Image
                  src={game.background_image}
                  alt={game.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-zinc-700" />
              )}
            </div>
            <div className="p-3 flex items-center justify-between gap-2">
              <p className="text-sm text-white truncate">{game.name}</p>
              {game.rating > 0 && <RatingBadge rating={game.rating} />}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
