import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  // Se as variáveis de ambiente não estiverem definidas, deixa a requisição
  // passar sem tentar autenticar — evita crash em ambientes sem .env configurado.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // try-catch: se o Supabase estiver fora do ar, o middleware não derruba o app.
  // A sessão simplesmente não é renovada, mas a navegação continua funcionando.
  try {
    await supabase.auth.getUser()
  } catch {
    // falha silenciosa — o app continua, apenas sem refresh de sessão
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
