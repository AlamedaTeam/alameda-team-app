// app/calendario/[id]/page.tsx

import Link from "next/link"

type PageProps = {
  params: { id: string }   // 👈 params es un objeto síncrono, NO un Promise
}

export default function EventoDetalle({ params }: PageProps) {
  const { id } = params

  return (
    <div className="relative z-30 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-2">
          Detalle del evento
        </h1>
        <p className="text-center text-white/85 mb-6">
          ID del evento: <span className="font-mono">{id}</span>
        </p>

        {/* Aquí más adelante añadiremos la carga desde Supabase y el botón Asistir */}
        <div className="grid grid-cols-1 gap-4">
          <Link href="/calendario" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white bg-transparent hover:bg-white/10 transition">
              Volver al calendario
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
