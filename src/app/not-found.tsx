import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center">
      <p className="text-6xl font-bold text-zinc-700">404</p>
      <h2 className="text-xl font-semibold text-white">Página não encontrada</h2>
      <p className="text-zinc-400 text-sm max-w-sm">
        O jogo ou página que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
      >
        Voltar para home
      </Link>
    </div>
  )
}
