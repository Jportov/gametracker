"use client"

import { useEffect } from "react"

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center">
      <p className="text-5xl">⚠️</p>
      <h2 className="text-xl font-semibold text-white">Algo deu errado</h2>
      <p className="text-zinc-400 text-sm max-w-sm">
        Ocorreu um erro inesperado. Tente novamente ou volte mais tarde.
      </p>
      <button
        onClick={reset}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
      >
        Tentar novamente
      </button>
    </div>
  )
}
