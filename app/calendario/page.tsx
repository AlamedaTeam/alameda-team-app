'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Rsvp = { id: string; user_id: string; salida_id: string }
type Profile = { id: string; full_name: string | null; email: string | null }

// TEMP: define aquí tus próximas salidas (rápido). Luego podemos leerlas de Supabase si quieres.
const SALIDAS = [
  { id: '2025-08-28', titulo: 'Salida jueves 28 de agosto' },
  { id: '2025-08-31', titulo: 'Salida domingo 31 de agosto' },
]

const ADMIN_PHONE = process.env.NEXT_PUBLIC_ADMIN_PHONE // "34XXXXXXXXX"

export default function CalendarioMix() {
  const [userId, setUserId] = useState<string | null>(null)
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [loading, setLoading] = useState(true)

  // carga usuario, RSVPs y perfiles de quienes han confirmado
  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data: u } = await supabase.auth.getUser()
      setUserId(u.user?.id ?? null)

      // Trae TODOS los RSVPs (para mostrar asistentes) — ampliamos la policy en breve si hace falta
      const { data: allRsvps } = await supabase.from('rsvp').select('*')
      setRsvps((allRsvps as any) ?? [])

      // Carga perfiles de esos user_ids para mostrar nombre
      const ids = Array.from(new Set((allRsvps ?? []).map(r => r.user_id)))
      if (ids.length) {
        const { data: profs } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', ids)
        const map: Record<string, Profile> = {}
        ;(profs ?? []).forEach((p: any) => (map[p.id] = p))
        setProfiles(map)
      }

      setLoading(false)
    })()
  }, [])

  const asistentesBySalida = useMemo(() => {
    const out: Record<string, Profile[]> = {}
    for (const s of SALIDAS) out[s.id] = []
    for (const r of rsvps) {
      const p = profiles[r.user_id]
      if (!p) continue
      if (!out[r.salida_id]) out[r.salida_id] = []
      out[r.salida_id].push(p)
    }
    return out
  }, [rsvps, profiles])

  async function asistir(salidaId: string, titulo: string) {
    if (!userId) {
      alert('Inicia sesión para confirmar asistencia.')
      return
    }
    // Inserta RSVP (si ya existe, no pasa nada malo si hay duplicados, luego metemos unique)
    await supabase.from('rsvp').insert({ user_id: userId, salida_id: salidaId })

    // refresca rsvps
    const { data: allRsvps } = await supabase.from('rsvp').select('*')
    setRsvps((allRsvps as any) ?? [])

    // Enlace rápido a WhatsApp para avisarte a ti (ADMIN_PHONE) con un mensaje ya montado
    if (ADMIN_PHONE) {
      // obtenemos nombre/email del usuario logueado para el texto
      const { data: u } = await supabase.auth.getUser()
      const uid = u.user?.id
      let display = ''
      if (uid) {
        const { data: pr } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', uid)
          .maybeSingle()
        display = pr?.full_name || pr?.email || 'Un atleta'
      }
      const text = encodeURIComponent(`${display} se ha apuntado a: ${titulo} (${salidaId})`)
      const wa = `https://wa.me/${ADMIN_PHONE}?text=${text}`
      // abre WhatsApp (en móvil abre app; en desktop, web)
      window.open(wa, '_blank')
    }
  }

  function etiqueta(p?: Profile) {
    if (!p) return '—'
    return p.full_name || p.email || 'Atleta'
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">Calendario del Team</h1>

        {/* Enlace a tu web (actualizada) */}
        <a
          href="https://alamedatrailteam.com" // 🔁 pon la URL de tu calendario específico si la tienes
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center w-full h-12 rounded-xl bg-white text-black font-semibold shadow-md mb-6 flex items-center justify-center"
        >
          Ver calendario completo en la web
        </a>

        {loading ? (
          <p className="text-center text-white/80">Cargando…</p>
        ) : (
          <div className="space-y-5">
            {SALIDAS.map((s) => {
              const asistentes = asistentesBySalida[s.id] || []
              return (
                <div key={s.id} className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">{s.titulo}</h2>
                      <p className="text-white/70 text-sm">{s.id}</p>
                    </div>
                    <button
                      onClick={() => asistir(s.id, s.titulo)}
                      className="px-3 py-2 rounded-xl bg-white text-black font-semibold"
                    >
                      Asistiré
                    </button>
                  </div>

                  <div className="mt-3">
                    <p className="text-white/80 text-sm mb-1">Asistentes:</p>
                    {asistentes.length > 0 ? (
                      <ul className="text-sm list-disc pl-5 space-y-0.5">
                        {asistentes.map((p, i) => (
                          <li key={i}>{etiqueta(p)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/60 text-sm">Nadie confirmado aún</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6">
          <Link href="/welcome" className="block">
            <button className="w-full h-12 rounded-xl border border-white/40 text-white/90 hover:bg-white/10">
              Volver
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
