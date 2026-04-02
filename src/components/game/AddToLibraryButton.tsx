"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { getUserGame, addUserGame, updateUserGame, removeUserGame } from "@/lib/user-games"
import { GameStatus, UserGame } from "@/types/game"
import { toast } from "sonner"

const STATUS_LABELS: Record<GameStatus, string> = {
  playing: "Jogando",
  completed: "Zerado",
  dropped: "Abandonado",
  wishlist: "Lista de desejos",
}

const STATUS_COLORS: Record<GameStatus, string> = {
  playing: "bg-emerald-600 hover:bg-emerald-500",
  completed:  "bg-blue-600 hover:bg-blue-500",
  dropped: "bg-red-700 hover:bg-red-600",
  wishlist: "bg-yellow-600 hover:bg-yellow-500",
}

type Props = { gameId: number }

export default function AddToLibraryButton({ gameId }: Props) {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [userGame, setUserGame] = useState<UserGame | null>(null)
  const [loading, setLoading] = useState(() => !!user)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!user) return
    getUserGame(gameId)
      .then((data: UserGame | null) => setUserGame(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, gameId])

  if (authLoading || loading) {
    return <div className="h-9 w-36 bg-zinc-700 rounded-lg animate-pulse" />
  }

  if (!user) {
    return (
      <button disabled className="bg-zinc-700 text-zinc-400 text-sm px-4 py-2 rounded-lg cursor-not-allowed">
        Faça login para adicionar
      </button>
    )
  }

  async function handleSelect(status: GameStatus) {
    setOpen(false)
    const previous = userGame

    // optimistic update — funciona tanto para adição quanto para atualização
    setUserGame((prev) =>
      prev
        ? { ...prev, status }
        : { id: "", user_id: "", game_id: gameId, status, rating: null, notes: null, created_at: "" }
    )

    try {
      if (!userGame) {
        const created = await addUserGame(gameId, status)
        setUserGame(created)
        toast.success(`Adicionado como "${STATUS_LABELS[status]}"`)
      } else {
        const updated = await updateUserGame(userGame.id, status)
        setUserGame(updated)
        toast.success(`Status atualizado para "${STATUS_LABELS[status]}"`)
      }
      router.refresh()
    } catch {
      setUserGame(previous)
      toast.error("Erro ao salvar. Tente novamente.")
    }
  }

  async function handleRemove() {
    setOpen(false)
    if (!userGame) return
    const previous = userGame

    setUserGame(null)

    try {
      await removeUserGame(userGame.id)
      router.refresh()
      toast.success("Jogo removido da biblioteca")
    } catch {
      setUserGame(previous)
      toast.error("Erro ao remover. Tente novamente.")
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`${userGame ? STATUS_COLORS[userGame.status] : "bg-zinc-700 hover:bg-zinc-600"} text-white text-sm font-medium px-4 py-2 rounded-lg transition flex items-center gap-2`}
      >
        {userGame ? STATUS_LABELS[userGame.status] : "+ Adicionar à biblioteca"}
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 right-0 bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden z-10 min-w-44">
          {(Object.keys(STATUS_LABELS) as GameStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => handleSelect(status)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 transition ${userGame?.status === status ? "text-violet-400" : "text-zinc-300"}`}
            >
              {STATUS_LABELS[status]}
            </button>
          ))}
          {userGame && (
            <button
              onClick={handleRemove}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition border-t border-zinc-700"
            >
              Remover da biblioteca
            </button>
          )}
        </div>
      )}
    </div>
  )
}
