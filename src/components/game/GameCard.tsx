import Image from "next/image"
import Link from "next/link"
import { Game } from "@/types/game"
import RatingBadge from "./RatingBadge"
import PlatformIcon from "./PlatformIcon"

type Props = { game: Game }

export default function GameCard({ game }: Props) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group block rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 hover:border-violet-500/50 transition-all duration-200 active:scale-[0.97]
        w-[160px] shrink-0
        md:w-auto md:shrink"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Imagem */}
      <div className="relative w-full aspect-[3/4] md:aspect-video">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            sizes="(max-width: 768px) 160px, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
            Sem imagem
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
      </div>

      {/* Info — rating aqui, fora da área de overflow */}
      <div className="p-2.5 space-y-1.5">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="text-xs md:text-sm font-semibold text-white leading-tight line-clamp-2 flex-1">
            {game.name}
          </h3>
          {game.rating > 0 && (
            <div className="shrink-0 mt-0.5">
              <RatingBadge rating={game.rating} />
            </div>
          )}
        </div>

        {game.platforms?.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {game.platforms.slice(0, 3).map(({ platform }) => (
              <PlatformIcon key={platform.id} slug={platform.slug} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
