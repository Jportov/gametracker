"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// ─── Função auxiliar interna ───────────────────────────────────────────────
// Evita repetir a lógica de OAuth para cada provedor.
// "provider" aceita qualquer string que o Supabase reconheça.
async function signInWithProvider(provider: "google" | "discord" | "github") {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      // Após autenticar no provedor externo, o Supabase redireciona para
      // esta URL — que é a rota /auth/callback do nosso app Next.js.
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  // Se o Supabase retornar erro (ex: provedor não ativado), volta para
  // /login com um parâmetro de erro que a página vai exibir como mensagem.
  if (error || !data.url) redirect(`/login?error=${encodeURIComponent(error?.message ?? "Erro ao conectar. Tente novamente.")}`)
  redirect(data.url)
}

// ─── Ações públicas (chamadas pelos <form action={...}>) ───────────────────

export async function signInWithGoogle() {
  await signInWithProvider("google")
}

export async function signInWithDiscord() {
  await signInWithProvider("discord")
}

export async function signInWithGitHub() {
  await signInWithProvider("github")
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
