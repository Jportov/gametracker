import { GameDetail, GamesResponse, Genre } from "@/types/game"

const BASE_URL = "https://api.rawg.io/api"
const API_KEY = process.env.RAWG_API_KEY

function buildUrl(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set("key", API_KEY!)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  return url.toString()
}

export async function getGames(params: {
  page?: number
  page_size?: number
  search?: string
  genres?: string
  ordering?: string
} = {}): Promise<GamesResponse> {
  const stringParams: Record<string, string> = {}
  if (params.page) stringParams.page = String(params.page)
  if (params.page_size) stringParams.page_size = String(params.page_size)
  if (params.search) stringParams.search = params.search
  if (params.genres) stringParams.genres = params.genres
  if (params.ordering) stringParams.ordering = params.ordering

  const res = await fetch(buildUrl("/games", stringParams), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Falha ao buscar jogos")
  return res.json()
}

export async function getGameById(id: string): Promise<GameDetail> {
  const res = await fetch(buildUrl(`/games/${id}`), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Jogo não encontrado")
  return res.json()
}

export async function searchGames(query: string): Promise<GamesResponse> {
  return getGames({ search: query, page_size: 10 })
}

export async function getGenres(): Promise<{ results: Genre[] }> {
  const res = await fetch(buildUrl("/genres"), {
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error("Falha ao buscar gêneros")
  return res.json()
}

export async function getGameScreenshots(id: string): Promise<{ results: { id: number; image: string }[] }> {
  const res = await fetch(buildUrl(`/games/${id}/screenshots`), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Falha ao buscar screenshots")
  return res.json()
}

export async function getGameBasic(id: number): Promise<{ name: string; background_image: string | null }> {
  const res = await fetch(buildUrl(`/games/${id}`), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return { name: `Jogo #${id}`, background_image: null }
  const data = await res.json()
  return { name: data.name, background_image: data.background_image }
}

export async function getSimilarGames(id: string): Promise<GamesResponse> {
  const res = await fetch(buildUrl(`/games/${id}/game-series`), {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error("Falha ao buscar jogos similares")
  return res.json()
}
