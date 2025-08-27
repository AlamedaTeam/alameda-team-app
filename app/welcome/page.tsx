'use client'

import Link from 'next/link'
import ProfileProgress from '@/app/components/ProfileProgress'

export default function Welcome() {
  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-2">¡Bienvenido!</h1>
        <p className="text-center text-white/85 mb-6">
          Elige a dónde quieres ir:
        </p>

        {/* Tarjeta de progreso del perfil con botón directo */}
        <div className="mb-6">
          <ProfileProgress />
          <div className="mt-3 text-center">
            <Link
              href="/profile/intake"
              className="inline-block px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-white/90"
            >
              Completar / Editar perfil
            </Link>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="grid grid-cols-1 gap-4">
          <Link href="/profile" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl bg-white text-black font-semibold shadow-md active:scale-[.99] transition">
              Mi perfil
            </button>
          </Link>

          <Link href="/planes" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Planes semanales
            </button>
          </Link>

          <Link href="/calendario" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Calendario del Team
            </button>
          </Link>

          <Link href="/tienda" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Tienda del Team
            </button>
          </Link>

          <Link href="/inscripciones" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Inscripciones a carreras
            </button>
          </Link>

          <Link href="/noticias" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Noticias / Avisos
            </button>
          </Link>

          <Link href="/soporte" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Soporte / Contacto
            </button>
          </Link>

          <Link href="/faq" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              FAQ / Cómo unirse
            </button>
          </Link>

          <Link href="/" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/40 text-white/90 bg-transparent hover:bg-white/10 transition">
              Inicio
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
