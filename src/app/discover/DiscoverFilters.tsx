"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback } from "react"

type Props = {
  genres: { id: number; name: string; slug: string }[]
}

const ORDERING_OPTIONS = [
  { value: "-rating", label: "Melhor avaliados" },
  { value: "-released", label: "Mais recentes" },
  { value: "-added", label: "Mais populares" },
  { value: "name", label: "A–Z" },
]

export default function DiscoverFilters({ genres }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  const activeGenre = searchParams.get("genre") ?? ""
  const activeOrdering = searchParams.get("ordering") ?? "-rating"

  return (
    <div className="space-y-3">
      {/* Busca */}
      <input
        name="search"
        defaultValue={searchParams.get("search") ?? ""}
        placeholder="Buscar jogos..."
        className="w-full bg-zinc-800/80 text-white placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 border border-zinc-700/50"
        onKeyDown={(e) => {
          if (e.key === "Enter") updateFilter("search", e.currentTarget.value)
        }}
        onBlur={(e) => updateFilter("search", e.currentTarget.value)}
      />

      {/* Ordenação — chips com scroll horizontal no mobile */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {ORDERING_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => updateFilter("ordering", value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeOrdering === value
                ? "bg-violet-500/20 border-violet-500 text-violet-400"
                : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Gêneros — chips com scroll horizontal no mobile */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        <button
          onClick={() => updateFilter("genre", "")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            activeGenre === ""
              ? "bg-violet-500/20 border-violet-500 text-violet-400"
              : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
          }`}
        >
          Todos
        </button>
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => updateFilter("genre", g.slug)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              activeGenre === g.slug
                ? "bg-violet-500/20 border-violet-500 text-violet-400"
                : "bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>
    </div>
  )
}
