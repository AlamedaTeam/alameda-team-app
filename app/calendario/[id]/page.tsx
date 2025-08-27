// app/calendario/[id]/page.tsx

interface PageProps {
  params: {
    id: string
  }
}

export default function EventoDetallePage({ params }: PageProps) {
  const { id } = params

  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-extrabold mb-2">
          Detalle del evento
        </h1>

        <p className="text-center text-white/85">
          ID del evento: <span className="font-mono">{id}</span>
        </p>

        <div className="mt-6 text-center">
          <a href="/calendario" className="underline">Volver al calendario</a>
        </div>
      </div>
    </div>
  )
}
