"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { signInWithGoogle } from "@/lib/auth-actions"

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-colors ${active ? "fill-violet-400" : "fill-zinc-500"}`}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}

function CompassIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-colors ${active ? "fill-violet-400" : "fill-zinc-500"}`}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13l-2 6 6-2 2-6z" />
    </svg>
  )
}

function LibraryIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-colors ${active ? "fill-violet-400" : "fill-zinc-500"}`}>
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
    </svg>
  )
}

function PersonIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-colors ${active ? "fill-violet-400" : "fill-zinc-500"}`}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

type NavItem = {
  href: string
  label: string
  icon: (active: boolean) => React.ReactNode
}

const BASE_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: (a) => <HomeIcon active={a} /> },
  { href: "/discover", label: "Descobrir", icon: (a) => <CompassIcon active={a} /> },
  { href: "/library", label: "Biblioteca", icon: (a) => <LibraryIcon active={a} /> },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { user, loading } = useAuth()

  const items: NavItem[] = user
    ? [...BASE_ITEMS, { href: "/profile", label: "Perfil", icon: (a) => <PersonIcon active={a} /> }]
    : BASE_ITEMS

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800/60"
      style={{
        background: "rgba(8, 12, 24, 0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingBottom: "var(--safe-bottom)",
      }}
    >
      <div className="flex items-stretch">
        {items.map(({ href, label, icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-3 min-h-[56px]"
            >
              {icon(active)}
              <span className={`text-[10px] font-medium transition-colors ${active ? "text-violet-400" : "text-zinc-500"}`}>
                {label}
              </span>
            </Link>
          )
        })}

        {!loading && !user && (
          <form action={signInWithGoogle} className="flex-1">
            <button
              type="submit"
              className="w-full h-full flex flex-col items-center justify-center gap-1 py-3 min-h-[56px]"
            >
              <PersonIcon active={false} />
              <span className="text-[10px] font-medium text-zinc-500">Entrar</span>
            </button>
          </form>
        )}
      </div>
    </nav>
  )
}
