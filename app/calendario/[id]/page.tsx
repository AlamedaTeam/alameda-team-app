// app/calendario/[id]/page.tsx
import Link from "next/link"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

export const dynamic = "force-dynamic"

type Params = { params: { id: string } }

export default async function EventAttendeesPage({ params }: Params) {
  const eventId = params.id

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${cookies().get("sb-access-token")?.value ?? ""}`,
        },
      },
    }
  )

  // Datos del evento
  const { data: event, error: evtErr } = await supabase
    .from("events")
    .select("id,title,event_date")
    .eq("id", eventId)
    .single()

  if (evtErr || !event) {
    return (
      <div className="relative z-20 w-full max-w-xl mx-auto px-4">
        <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6">
          <h1 className="text-2xl font-bold mb-2">Salida no encontrada</h1>
          <Link href="/calendario" className="underline">Volver al calendario</Link>
        </div>
      </div>
    )
  }

  // Lista de asistentes
  const { data: attendees } = await supabase
    .from("event_attendees")
    .select(`
      user_id,
      profiles:profiles(full_name,email)
    `)
    .eq("event_id", eventId)
    .order("created_at", { ascending: true })

  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">{event.title}</h1>
        <p className="text-white/85 mb-6">
          Fecha: {new Date(event.event_date).toLocaleDateString("es-ES")}
        </p>

        <h2 className="text-xl font-semibold mb-3">Asistentes</h2>

        {attendees && attendees.length > 0 ? (
          <ul className="space-y-2">
            {attendees.map((a) => (
              <li
                key={a.user_id}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
              >
                {a.profiles?.full_name || a.profiles?.email || "Sin nombre"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/70">Aún no hay asistentes.</p>
        )}

        <div className="mt-6">
          <Link href="/calendario" className="underline">← Volver al calendario</Link>
        </div>
      </div>
    </div>
  )
}
