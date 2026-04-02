import { notFound } from "next/navigation"
import Image from "next/image"
import { getGameById, getGameScreenshots } from "@/lib/rawg"
import RatingBadge from "@/components/game/RatingBadge"
import PlatformIcon from "@/components/game/PlatformIcon"
import AddToLibraryButton from "@/components/game/AddToLibraryButton"
import ScreenshotGallery from "@/components/game/ScreenshotGallery"
import SimilarGames from "@/components/game/SimilarGames"
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
    <main className="space-y-8">
      {/* Hero */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 space-y-2">
          <h1 className="text-3xl font-bold text-white">{game.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            {game.rating > 0 && <RatingBadge rating={game.rating} />}
            {game.released && (
              <span className="text-zinc-300 text-sm">{game.released}</span>
            )}
            {game.platforms?.slice(0, 5).map(({ platform }) => (
              <PlatformIcon key={platform.id} slug={platform.slug} />
            ))}
          </div>
        </div>
      </div>

      {/* Ações e metadados */}
      <div className="flex flex-wrap items-start gap-6">
        <AddToLibraryButton gameId={game.id} />
        <div className="flex flex-wrap gap-2">
          {game.genres?.map((g) => (
            <span key={g.id} className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full">
              {g.name}
            </span>
          ))}
        </div>
      </div>

      {/* Descrição */}
      {game.description_raw && (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-white">Sobre</h2>
          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line line-clamp-6">
            {game.description_raw}
          </p>
        </section>
      )}

      {/* Desenvolvedores e publishers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {game.developers?.length > 0 && (
          <div>
            <p className="text-zinc-500 mb-1">Desenvolvedora</p>
            <p className="text-zinc-200">{game.developers.map((d) => d.name).join(", ")}</p>
          </div>
        )}
        {game.publishers?.length > 0 && (
          <div>
            <p className="text-zinc-500 mb-1">Publicadora</p>
            <p className="text-zinc-200">{game.publishers.map((p) => p.name).join(", ")}</p>
          </div>
        )}
        {game.esrb_rating && (
          <div>
            <p className="text-zinc-500 mb-1">Classificação</p>
            <p className="text-zinc-200">{game.esrb_rating.name}</p>
          </div>
        )}
        {game.website && (
          <div>
            <p className="text-zinc-500 mb-1">Site oficial</p>
            <a
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate block"
            >
              {game.website}
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
