import Image from "next/image"
import Link from "next/link"
import { Game } from "@/types/game"
import RatingBadge from "./RatingBadge"
import PlatformIcon from "./PlatformIcon"

type Props = { game: Game }

export default function GameCard({ game }: Props) {
  return (
    <Link href={`/game/${game.id}`} className="group block rounded-xl overflow-hidden bg-zinc-800 hover:ring-2 hover:ring-emerald-500 transition">
      <div className="relative aspect-video w-full">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-zinc-500 text-sm">
            Sem imagem
          </div>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">{game.name}</h3>
          {game.rating > 0 && <RatingBadge rating={game.rating} />}
        </div>
        {game.platforms?.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {game.platforms.slice(0, 4).map(({ platform }) => (
              <PlatformIcon key={platform.id} slug={platform.slug} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
