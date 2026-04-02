"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

type Screenshot = { id: number; image: string }
type Props = { screenshots: Screenshot[] }

export default function ScreenshotGallery({ screenshots }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Foca o dialog automaticamente ao abrir para capturar eventos de teclado
  useEffect(() => {
    if (lightboxIndex !== null) {
      dialogRef.current?.focus()
    }
  }, [lightboxIndex])

  if (screenshots.length === 0) return null

  function prev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length))
  }

  function next() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % screenshots.length))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev()
    if (e.key === "ArrowRight") next()
    if (e.key === "Escape") setLightboxIndex(null)
  }

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Screenshots</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {screenshots.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-video rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <Image
              src={s.image}
              alt={`Screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          ref={dialogRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Imagem */}
          <div
            className="relative w-full max-w-5xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[lightboxIndex].image}
              alt={`Screenshot ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Navegação */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 text-white text-3xl bg-zinc-800/70 hover:bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 text-white text-3xl bg-zinc-800/70 hover:bg-zinc-700 w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            ›
          </button>

          {/* Contador */}
          <span className="absolute bottom-4 text-zinc-400 text-sm">
            {lightboxIndex + 1} / {screenshots.length}
          </span>

          {/* Fechar */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-zinc-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}
