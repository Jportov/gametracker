"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

type Props = {
  genres: { id: number; name: string; slug: string }[]
}

export default function DiscoverFilters({ genres }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Cria uma nova URL mantendo os params existentes e atualizando só o que mudou
  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="flex flex-wrap gap-3">
      <input
        name="search"
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Buscar jogos..."
        className="bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-4 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") updateFilter("search", e.currentTarget.value)
        }}
        onBlur={(e) => updateFilter("search", e.currentTarget.value)}
      />

      <select
        defaultValue={searchParams.get("genre") ?? ""}
        onChange={(e) => updateFilter("genre", e.target.value)}
        className="bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="">Todos os gêneros</option>
        {genres.map((g) => (
          <option key={g.id} value={g.slug}>{g.name}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("ordering") ?? ""}
        onChange={(e) => updateFilter("ordering", e.target.value)}
        className="bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="-rating">Melhor avaliados</option>
        <option value="-released">Mais recentes</option>
        <option value="-added">Mais populares</option>
        <option value="name">A–Z</option>
      </select>
    </div>
  )
}
