"use client"

import { useState } from "react"

type Props = { text: string; maxLines?: number }

export default function ExpandableText({ text, maxLines = 6 }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <p
        className={`text-zinc-400 text-sm leading-relaxed whitespace-pre-line ${!expanded ? `line-clamp-${maxLines}` : ""}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-violet-400 hover:text-violet-300 text-sm transition-colors"
      >
        {expanded ? "Mostrar menos" : "Ler mais"}
      </button>
    </div>
  )
}
