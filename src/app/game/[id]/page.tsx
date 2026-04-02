import { notFound } from "next/navigation"
import Image from "next/image"
import { getGameById, getGameScreenshots } from "@/lib/rawg"
import RatingBadge from "@/components/game/RatingBadge"
import PlatformIcon from "@/components/game/PlatformIcon"
import AddToLibraryButton from "@/components/game/AddToLibraryButton"
import ScreenshotGallery from "@/components/game/ScreenshotGallery"
import SimilarGames from "@/components/game/SimilarGames"
import ExpandableText from "@/components/game/ExpandableText"
import type { Metadata } from "next"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const game = await getGameById(id)
    return {
      title: `${game.name} — GameTracker`,
      description: game.description_raw?.slice(0, 160) ?? undefined,
      openGraph: {
        images: game.background_image ? [game.background_image] : [],
      },
    }
  } catch {
    return { title: "Jogo não encontrado — GameTracker" }
  }
}

export default async function GamePage({ params }: Props) {
  const { id } = await params
  let game
  let screenshotsData
  try {
    ;[game, screenshotsData] = await Promise.all([
      getGameById(id),
      getGameScreenshots(id),
    ])
  } catch {
    notFound()
  }

  return (
    <main className="space-y-6 md:space-y-8">
      {/* Hero */}
      <div className="relative w-full aspect-video md:rounded-2xl overflow-hidden -mx-4 md:mx-0">
        {game.background_image && (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent" />

        {/* Info sobre a imagem */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{game.name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            {game.rating > 0 && <RatingBadge rating={game.rating} />}
            {game.released && (
              <span className="text-zinc-300 text-xs md:text-sm">{game.released}</span>
            )}
            {game.platforms?.slice(0, 5).map(({ platform }) => (
              <PlatformIcon key={platform.id} slug={platform.slug} />
            ))}
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex flex-wrap items-center gap-3">
        <AddToLibraryButton gameId={game.id} />
        <div className="flex flex-wrap gap-1.5">
          {game.genres?.map((g) => (
            <span key={g.id} className="bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-xs px-3 py-1 rounded-full">
              {g.name}
            </span>
          ))}
        </div>
      </div>

      {/* Descrição */}
      {game.description_raw && (
        <section className="space-y-2">
          <h2 className="text-base md:text-lg font-semibold text-white">Sobre</h2>
          <ExpandableText text={game.description_raw} />
        </section>
      )}

      {/* Metadados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
        {game.developers?.length > 0 && (
          <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-xl p-3">
            <p className="text-zinc-500 text-xs mb-1">Desenvolvedora</p>
            <p className="text-zinc-200 text-sm font-medium">{game.developers.map((d) => d.name).join(", ")}</p>
          </div>
        )}
        {game.publishers?.length > 0 && (
          <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-xl p-3">
            <p className="text-zinc-500 text-xs mb-1">Publicadora</p>
            <p className="text-zinc-200 text-sm font-medium">{game.publishers.map((p) => p.name).join(", ")}</p>
          </div>
        )}
        {game.esrb_rating && (
          <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-xl p-3">
            <p className="text-zinc-500 text-xs mb-1">Classificação</p>
            <p className="text-zinc-200 text-sm font-medium">{game.esrb_rating.name}</p>
          </div>
        )}
        {game.website && (
          <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-xl p-3">
            <p className="text-zinc-500 text-xs mb-1">Site oficial</p>
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:underline text-sm font-medium truncate block"
            >
              {game.website.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        )}
      </div>

      {/* Screenshots */}
      <ScreenshotGallery screenshots={screenshotsData.results} />

      <SimilarGames gameId={id} />
    </main>
  )
}
