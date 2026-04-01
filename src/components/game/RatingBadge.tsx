type Props = { rating: number }

export default function RatingBadge({ rating }: Props) {
  const color =
    rating >= 4 ? "bg-emerald-500" :
    rating >= 3 ? "bg-yellow-500" :
    "bg-red-500"

  return (
    <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded`}>
      {rating.toFixed(1)}
    </span>
  )
}
