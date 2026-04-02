import UserMenu from "./UserMenu"
import NavLinks from "./NavLinks"
import Link from "next/link"

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 h-14 border-b border-zinc-800/60 flex items-center px-4 md:px-6 gap-4"
      style={{
        background: "rgba(8, 12, 24, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        paddingTop: "var(--safe-top)",
      }}
    >
      <Link
        href="/"
        className="text-violet-400 font-bold text-lg tracking-tight hover:text-violet-300 transition-colors"
      >
        GameTracker
      </Link>

      {/* Nav links — só visível em desktop */}
      <nav className="hidden md:flex gap-5 ml-4">
        <NavLinks />
      </nav>

      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  )
}
