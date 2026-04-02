"use client"

import { useAuth } from "@/context/AuthContext"
import { signInWithGoogle, signOut } from "@/lib/auth-actions"
import Image from "next/image"

export default function UserMenu() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse" />
  }

  if (!user) {
    return (
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="text-sm text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-md hover:border-zinc-500 hover:text-white transition-colors"
        >
          Sign in
        </button>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {user.user_metadata.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name ?? "Avatar"}
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <form action={signOut}>
        <button
          type="submit"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Sair
        </button>
      </form>
    </div>
  )
}
