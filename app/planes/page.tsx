import Link from "next/link";

export default function PlanesPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-2">Planes semanales</h1>
        <p className="text-center text-white/85 mb-6">Aquí verás tus sesiones por semanas (iniciación / intermedio / avanzado).</p>

        <div className="grid gap-3">
          <button className="w-full h-12 rounded-xl border border-white/80 text-white bg-transparent">Ver mi plan</button>
          <button className="w-full h-12 rounded-xl border border-white/40 text-white/90 bg-transparent">Explorar planes tipo</button>
          <Link href="/welcome" className="block">
            <button className="w-full h-12 rounded-xl bg-white text-black font-semibold">Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
