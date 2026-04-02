import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import BottomNav from "@/components/layout/BottomNav"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "sonner"
import "./globals.css"

export const metadata: Metadata = {
  title: "GameTracker",
  description: "Seu catálogo pessoal de jogos",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-bg text-zinc-100 min-h-screen">
        <AuthProvider>
          <Header />
          {/* padding bottom no mobile para não sobrepor o BottomNav */}
          <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-[calc(var(--bottom-nav-total)+1.5rem)] md:pb-8">
            {children}
          </main>
          <BottomNav />
          <Toaster position="bottom-right" theme="dark" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
