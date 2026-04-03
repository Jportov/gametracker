"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { signOut } from "@/lib/auth-actions"
import Image from "next/image"

export default function UserMenu() {
  const { user, loading } = useAuth()

  // Enquanto verifica a sessão, mostra um placeholder animado
  // para evitar o "flash" de trocar o botão de lugar.
  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
  }

  // Não logado: link para a página de login
  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:border-violet-500/60 hover:text-white transition-colors"
      >
        Entrar
      </Link>
    )
  }

  // Logado: avatar + botão de sair
  return (
    <div className="flex items-center gap-3">
      {user.user_metadata?.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata?.full_name ?? "Avatar"}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      {/* signOut é uma Server Action — funciona dentro de form action */}
      <form action={signOut}>
        <button
          type="submit"
          className="text-sm text-zinc-500 hover:text-white transition-colors"
        >
          Sair
        </button>
      </form>
    </div>
  )
}
