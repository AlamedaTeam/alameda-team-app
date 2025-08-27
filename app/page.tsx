'use client'

import TopLogos from './TopLogos'         // ajusta la ruta si tu archivo está en otra carpeta

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* Logo solo en home (debajo del cajón) */}
      <div className="pointer-events-none absolute inset-x-0 top-60 flex justify-center z-0">
        <TopLogos />
      </div>

      {/* Cajón de botones (siempre por ENCIMA del logo) */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
          <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">
            Club de Trail Running
          </h1>

          <div className="grid grid-cols-1 gap-4">
            <a href="/login">
              <button className="w-full h-12 sm:h-14 rounded-xl bg-white text-black font-semibold shadow-md active:scale-[.99] transition">
                Entrar
              </button>
            </a>
            <a href="/profile">
              <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
                Mi perfil
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
