import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Minha Biblioteca — GameTracker",
  description: "Gerencie sua coleção de jogos: jogando, zerados, abandonados e lista de desejos.",
}
import { createClient } from "@/lib/supabase/server"
import { getUserGamesServer } from "@/lib/user-games.server"
import { getGameBasic } from "@/lib/rawg"
import { EnrichedUserGame } from "@/types/game"
import LibraryTabs from "./LibraryTabs"

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const userGames = await getUserGamesServer()

  const enriched: EnrichedUserGame[] = await Promise.all(
    userGames.map(async (g) => {
      const { name, background_image } = await getGameBasic(g.game_id)
      return { ...g, game_name: name, game_image: background_image }
    })
  )

  const stats = {
    total:     enriched.length,
    playing:   enriched.filter((g) => g.status === "playing").length,
    completed: enriched.filter((g) => g.status === "completed").length,
    dropped:   enriched.filter((g) => g.status === "dropped").length,
    wishlist:  enriched.filter((g) => g.status === "wishlist").length,
  }

  return (
    <main className="space-y-6">
      {/* Cabeçalho com stats em linha */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-white">Biblioteca</h1>
          <span className="text-muted text-sm">{stats.total} jogos</span>
        </div>

        {/* Stats compactas em linha */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {[
            { label: "Jogando",  value: stats.playing,   color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
            { label: "Zerados",  value: stats.completed, color: "text-blue-400",    border: "border-blue-500/30",    bg: "bg-blue-500/10"    },
            { label: "Desejados",value: stats.wishlist,  color: "text-yellow-400",  border: "border-yellow-500/30",  bg: "bg-yellow-500/10"  },
            { label: "Abandonados", value: stats.dropped, color: "text-red-400",    border: "border-red-500/30",     bg: "bg-red-500/10"     },
          ].map(({ label, value, color, border, bg }) => (
            <div
              key={label}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border ${border} ${bg}`}
            >
              <span className={`text-lg font-bold ${color}`}>{value}</span>
              <span className="text-muted text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <LibraryTabs userGames={enriched} />
    </main>
  )
}
