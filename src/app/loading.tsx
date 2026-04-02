import GameCardSkeleton from "@/components/game/GameCardSkeleton"

export default function Loading() {
  return (
    <div className="space-y-10">
      <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
