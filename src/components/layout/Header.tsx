import UserMenu from "./UserMenu";

/* eslint-disable @next/next/no-html-link-for-pages */
export default function Header() {
  return (
    <header className="h-14 border-b border-zinc-800 flex items-center px-6 gap-4">
      <span className="text-emerald-400 font-semibold text-lg tracking-tight">
        GameTracker
      </span>
      <nav className="flex gap-4 ml-4">
        <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Home
        </a>
        <a href="/discover" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Discover
        </a>
        <a href="/library" className="text-sm text-zinc-400 hover:text-white transition-colors">
          Library
        </a>
      </nav>
      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  )
}