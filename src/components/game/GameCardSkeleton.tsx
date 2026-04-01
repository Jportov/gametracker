export default function GameCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-zinc-800 animate-pulse">
      <div className="aspect-video w-full bg-zinc-700" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="h-3 bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  )
}
