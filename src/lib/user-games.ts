import { createClient } from "@/lib/supabase/client"
import { GameStatus, UserGame } from "@/types/game"

export async function getUserGame(gameId: number): Promise<UserGame | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from("user_games")
    .select("*")
    .eq("game_id", gameId)
    .single()
  return data
}

export async function addUserGame(gameId: number, status: GameStatus): Promise<UserGame> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Usuário não autenticado")

  const { data, error } = await supabase
    .from("user_games")
    .insert({ game_id: gameId, status, user_id: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateUserGame(id: string, status: GameStatus): Promise<UserGame> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("user_games")
    .update({ status })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function removeUserGame(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from("user_games").delete().eq("id", id)
  if (error) throw error
}

export async function getUserGames(): Promise<UserGame[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("user_games")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

