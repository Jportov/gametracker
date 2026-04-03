import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  // Quando o usuário cancela o login, o provedor OAuth redireciona
  // para cá com ?error=access_denied em vez de ?code=...
  const error = searchParams.get("error")
  if (error) {
    return NextResponse.redirect(`${origin}/login?error=Login cancelado.`)
  }

  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    // Se a troca do código falhar por qualquer motivo, volta para o login
    if (exchangeError) {
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
      )
    }
  }

  // Login bem-sucedido — vai para a home
  return NextResponse.redirect(`${origin}/`)
}
