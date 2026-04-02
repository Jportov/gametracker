import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getGames } from "@/lib/rawg"
import GameCard from "@/components/game/GameCard"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [topRated, recent] = await Promise.all([
    getGames({ page_size: 10, ordering: "-rating" }),
    getGames({ page_size: 10, ordering: "-released" }),
  ])

  return (
    <main className="space-y-8 md:space-y-10">
      {!user && (
        <section className="relative rounded-2xl overflow-hidden px-6 py-12 md:py-14 text-center space-y-4">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(8,12,24,0) 60%)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          />
          <h1 className="relative text-3xl md:text-4xl font-bold text-white leading-tight">
            Seu catálogo pessoal<br className="md:hidden" /> de jogos
          </h1>
          <p className="relative text-zinc-400 text-base md:text-lg max-w-sm md:max-w-md mx-auto">
            Registre o que você está jogando, zerou, abandonou ou deseja jogar.
          </p>
          <div className="relative flex items-center justify-center gap-3 pt-1">
            <Link
              href="/discover"
              className="bg-violet-500 hover:bg-violet-400 text-white text-sm font-semibold px-6 py-3 rounded-xl transition active:scale-95"
            >
              Explorar jogos
            </Link>
          </div>
        </section>
      )}

      <Section title="Mais Bem Avaliados" viewAllHref="/discover?ordering=-rating">
        <HScrollRow>
          {topRated.results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </HScrollRow>
      </Section>

      <Section title="Lançamentos Recentes" viewAllHref="/discover?ordering=-released">
        <HScrollRow>
          {recent.results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </HScrollRow>
      </Section>
    </main>
  )
}

function Section({
  title,
  viewAllHref,
  children,
}: {
  title: string
  viewAllHref: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
        <Link
          href={viewAllHref}
          className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
        >
          Ver todos
        </Link>
      </div>
      {children}
    </section>
  )
}

function HScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: scroll horizontal com snap */}
      <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory -mx-4 px-4">
        {children}
      </div>
      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-4">
        {children}
      </div>
    </>
  )
}
