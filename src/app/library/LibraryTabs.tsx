"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EnrichedUserGame, GameStatus } from "@/types/game"
import EmptyState from "@/components/ui/EmptyState"

const TABS: { label: string; value: GameStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Jogando", value: "playing" },
  { label: "Zerados", value: "completed" },
  { label: "Abandonados", value: "dropped" },
  { label: "Lista de desejos", value: "wishlist" },
]

const STATUS_LABELS: Record<GameStatus, string> = {
  playing: "Jogando",
  completed: "Zerado",
  dropped: "Abandonado",
  wishlist: "Lista de desejos",
}

const STATUS_COLORS: Record<GameStatus, string> = {
  playing: "text-emerald-400",
  completed: "text-blue-400",
  dropped: "text-red-400",
  wishlist: "text-yellow-400",
}

type Props = { userGames: EnrichedUserGame[] }

export default function LibraryTabs({ userGames }: Props) {
  const [activeTab, setActiveTab] = useState<GameStatus | "all">("all")

  const filtered = activeTab === "all"
    ? userGames
    : userGames.filter((g) => g.status === activeTab)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.value
                ? "border-emerald-500 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Nenhum jogo aqui ainda"
          description="Adicione jogos à sua biblioteca pela página de detalhes."
          action={<Link href="/discover" className="text-emerald-400 hover:underline text-sm">Explorar jogos</Link>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((game) => (
            <Link
              key={game.id}
              href={`/game/${game.game_id}`}
              className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg px-3 py-2 transition"
            >
              <div className="relative w-16 h-10 rounded overflow-hidden shrink-0 bg-zinc-700">
                {game.game_image && (
                  <Image
                    src={game.game_image}
                    alt={game.game_name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-sm text-white flex-1 line-clamp-1">{game.game_name}</span>
              <span className={`text-xs shrink-0 ${STATUS_COLORS[game.status]}`}>
                {STATUS_LABELS[game.status]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
