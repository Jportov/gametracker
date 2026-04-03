import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.rawg.io" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  // Security headers aplicados em todas as rotas.
  // Protegem contra clickjacking, MIME sniffing e cross-origin leaks.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impede que o site seja embutido em iframes de outros domínios (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Impede que o browser "adivinhe" o Content-Type (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Não envia a URL completa no header Referer ao navegar para outros sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Força HTTPS por 1 ano (só ativo em produção — Vercel já faz isso)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Restringe acesso a APIs sensíveis do browser (câmera, microfone, etc.)
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
