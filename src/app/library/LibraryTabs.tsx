"use client"

import { useState } from "react"
import { UserGame, GameStatus } from "@/types/game"
import EmptyState from "@/components/ui/EmptyState"
import Link from "next/link"


const TABS: { label: string; value: GameStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Jogando", value: "playing" },
  { label: "Zerados", value: "completed" },
  { label: "Abandonados", value: "dropped" },
  { label: "Lista de desejos", value: "wishlist" },
]

type Props = { userGames: UserGame[] }

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
              className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 rounded-lg px-4 py-3 transition"
            >
              <span className="text-sm text-white">Jogo #{game.game_id}</span>
              <span className="text-xs text-zinc-400 capitalize">{game.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
