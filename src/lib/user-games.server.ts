import { createClient } from "@/lib/supabase/server"
import { UserGame } from "@/types/game"

export async function getUserGamesServer(): Promise<UserGame[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("user_games")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}
