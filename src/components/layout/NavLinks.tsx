"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

const BASE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Descobrir" },
  { href: "/library", label: "Biblioteca" },
]

export default function NavLinks() {
  const pathname = usePathname()
  const { user } = useAuth()

  const links = user
    ? [...BASE_LINKS, { href: "/profile", label: "Perfil" }]
    : BASE_LINKS

  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm transition-colors ${
            pathname === href
              ? "text-white font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {label}
        </Link>
      ))}
    </>
  )
}
