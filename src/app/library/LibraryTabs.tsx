"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EnrichedUserGame, GameStatus } from "@/types/game"
import EmptyState from "@/components/ui/EmptyState"

const TABS: { label: string; value: GameStatus | "all" }[] = [
  { label: "Todos",           value: "all"       },
  { label: "Jogando",         value: "playing"   },
  { label: "Zerados",         value: "completed" },
  { label: "Abandonados",     value: "dropped"   },
  { label: "Lista de desejos",value: "wishlist"  },
]

const STATUS_COLORS: Record<GameStatus, string> = {
  playing:   "bg-emerald-500",
  completed: "bg-blue-500",
  dropped:   "bg-red-500",
  wishlist:  "bg-yellow-500",
}

const STATUS_LABELS: Record<GameStatus, string> = {
  playing:   "Jogando",
  completed: "Zerado",
  dropped:   "Abandonado",
  wishlist:  "Desejado",
}

type Props = { userGames: EnrichedUserGame[] }

export default function LibraryTabs({ userGames }: Props) {
  const [activeTab, setActiveTab] = useState<GameStatus | "all">("all")

  const filtered = activeTab === "all"
    ? userGames
    : userGames.filter((g) => g.status === activeTab)

  return (
    <div className="space-y-4">
      {/* Tabs com scroll horizontal no mobile */}
      <div className="flex gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeTab === tab.value
                ? "bg-violet-500/20 border-violet-500 text-violet-400"
                : "bg-surface/60 border-border text-muted hover:text-white"
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
          action={
            <Link href="/discover" className="text-emerald-400 hover:underline text-sm">
              Explorar jogos
            </Link>
          }
        />
      ) : (
        /* Grade de capas estilo prateleira */
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
          {filtered.map((game) => (
            <Link
              key={game.id}
              href={`/game/${game.game_id}`}
              className="group relative rounded-xl overflow-hidden aspect-[2/3] bg-surface2 block active:scale-95 transition-transform"
            >
              {game.game_image ? (
                <Image
                  src={game.game_image}
                  alt={game.game_name}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 17vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-[10px] p-2 text-center leading-tight">
                  {game.game_name}
                </div>
              )}

              {/* Overlay ao hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Badge de status (sempre visível) */}
              <span
                className={`absolute top-1.5 left-1.5 w-2.5 h-2.5 rounded-full ring-2 ring-black/50 ${STATUS_COLORS[game.status]}`}
                title={STATUS_LABELS[game.status]}
              />

              {/* Nome ao hover */}
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] font-semibold line-clamp-2 leading-tight">
                  {game.game_name}
                </p>
                <p className={`text-[9px] mt-0.5 ${STATUS_COLORS[game.status].replace("bg-", "text-")}`}>
                  {STATUS_LABELS[game.status]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
