'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  event_date: string // ISO date
  place: string | null
  url: string | null
}

export default function CalendarioPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [myUserId, setMyUserId] = useState<string | null>(null)
  const [myGoing, setMyGoing] = useState<Record<string, boolean>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})

  // Cargar usuario
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setMyUserId(data.user?.id ?? null)
    })
  }, [])

  // Cargar próximos eventos (desde hoy)
  useEffect(() => {
    const today = new Date()
    const ymd = today.toISOString().slice(0, 10)

    supabase
      .from('events')
      .select('*')
      .gte('event_date', ymd)
      .order('event_date', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setEvents(data as Event[])
      })
  }, [])

  // Cargar a cuáles ya voy
  useEffect(() => {
    if (!myUserId || events.length === 0) return
    const ids = events.map(e => e.id)

    supabase
      .from('event_attendees')
      .select('event_id')
      .in('event_id', ids)
      .eq('user_id', myUserId)
      .then(({ data }) => {
        const map: Record<string, boolean> = {}
        data?.forEach(r => (map[r.event_id] = true))
        setMyGoing(map)
      })
  }, [myUserId, events])

  const toggleAsistir = async (evId: string) => {
    if (!myUserId) return
    setLoadingIds(s => ({ ...s, [evId]: true }))

    const yaVoy = !!myGoing[evId]
    if (yaVoy) {
      await supabase
        .from('event_attendees')
        .delete()
        .eq('event_id', evId)
        .eq('user_id', myUserId)
    } else {
      await supabase
        .from('event_attendees')
        .insert({ event_id: evId, user_id: myUserId })
    }

    setMyGoing(s => ({ ...s, [evId]: !yaVoy }))
    setLoadingIds(s => ({ ...s, [evId]: false }))
  }

  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-2">Calendario del Team</h1>
        <p className="text-center text-white/85 mb-6">
          Próximas salidas y eventos. Marca <b>Asistir</b> y te apuntamos.
        </p>

        {events.length === 0 && (
          <p className="text-center text-white/70">No hay eventos próximos.</p>
        )}

        <ul className="space-y-4">
          {events.map(ev => {
            const fecha = new Date(ev.event_date + 'T00:00:00')
            const fechaStr = fecha.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: '2-digit',
              month: 'long'
            })

            return (
              <li key={ev.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{ev.title}</h3>
                    <p className="text-white/80 text-sm">
                      {fechaStr}{ev.place ? ` · ${ev.place}` : ''}
                    </p>
                    {ev.url && (
                      <Link
                        href={ev.url}
                        target="_blank"
                        className="text-white/90 underline text-sm"
                      >
                        Ver detalle en la web
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={() => toggleAsistir(ev.id)}
                    disabled={!myUserId || !!loadingIds[ev.id]}
                    className={`min-w-[110px] h-10 rounded-xl px-4 font-semibold transition
                      ${myGoing[ev.id]
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white border border-white/80 hover:bg-white/10'}
                    `}
                  >
                    {loadingIds[ev.id] ? '...' : myGoing[ev.id] ? 'Apuntado' : 'Asistir'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 text-center text-sm text-white/70">
          ¿Quieres añadir una salida? Dímelo y la creo en el calendario.
        </div>
      </div>
    </div>
  )
}
