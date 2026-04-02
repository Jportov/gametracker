type Props = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <p className="text-4xl">🎮</p>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="text-zinc-400 text-sm max-w-xs">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
