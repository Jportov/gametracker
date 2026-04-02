import type { Metadata } from "next"
import Header from "@/components/layout/Header"
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
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
          <Toaster position="bottom-right" theme="dark" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}
