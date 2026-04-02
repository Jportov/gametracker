import UserMenu from "./UserMenu"
import NavLinks from "./NavLinks"
import Link from "next/link"

export default function Header() {
  return (
    <header className="h-14 border-b border-zinc-800 flex items-center px-6 gap-4">
      <Link href="/" className="text-emerald-400 font-semibold text-lg tracking-tight hover:text-emerald-300 transition-colors">
        GameTracker
      </Link>
      <nav className="flex gap-4 ml-4">
        <NavLinks />
      </nav>
      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  )
}