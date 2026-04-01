export interface Game {
  id: number
  name: string
  slug: string
  background_image: string | null
  rating: number
  ratings_count: number
  released: string | null
  platforms: { platform: { id: number; name: string; slug: string } }[]
  genres: { id: number; name: string; slug: string }[]
  short_screenshots: { id: number; image: string }[]
}

export interface GameDetail extends Game {
  description_raw: string
  website: string | null
  developers: { id: number; name: string }[]
  publishers: { id: number; name: string }[]
  esrb_rating: { id: number; name: string } | null
}

export interface GamesResponse {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export interface Genre {
  id: number
  name: string
  slug: string
  games_count: number
  image_background: string
}