import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getUserGamesServer } from "@/lib/user-games.server"
import { getGameBasic } from "@/lib/rawg"
import { EnrichedUserGame } from "@/types/game"
import LibraryTabs from "./LibraryTabs"

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/")

  const userGames = await getUserGamesServer()

  const enriched: EnrichedUserGame[] = await Promise.all(
    userGames.map(async (g) => {
      const { name, background_image } = await getGameBasic(g.game_id)
      return { ...g, game_name: name, game_image: background_image }
    })
  )

  const stats = {
    total: enriched.length,
    playing: enriched.filter((g) => g.status === "playing").length,
    completed: enriched.filter((g) => g.status === "completed").length,
    dropped: enriched.filter((g) => g.status === "dropped").length,
    wishlist: enriched.filter((g) => g.status === "wishlist").length,
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Minha Biblioteca</h1>
        <p className="text-zinc-400 text-sm mt-1">{stats.total} jogos no total</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Jogando", value: stats.playing, color: "text-emerald-400" },
          { label: "Zerados", value: stats.completed, color: "text-blue-400" },
          { label: "Abandonados", value: stats.dropped, color: "text-red-400" },
          { label: "Lista de desejos", value: stats.wishlist, color: "text-yellow-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-zinc-800 rounded-xl p-4">
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-zinc-400 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <LibraryTabs userGames={enriched} />
    </main>
  )
}
