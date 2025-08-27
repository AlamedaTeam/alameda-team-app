'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  event_date: string
  place: string | null
  url: string | null
  rsvp_open_at: string | null
  rsvp_close_at: string | null
}

export default function CalendarioPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [myUserId, setMyUserId] = useState<string | null>(null)
  const [myGoing, setMyGoing] = useState<Record<string, boolean>>({})
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({})
  const [ensuring, setEnsuring] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setMyUserId(data.user?.id ?? null)
    })
  }, [])

  const fetchEvents = async () => {
    const ymd = new Date().toISOString().slice(0, 10)
    const { data } = await supabase
      .from('events')
      .select('id,title,event_date,place,url,rsvp_open_at,rsvp_close_at')
      .gte('event_date', ymd)
      .order('event_date', { ascending: true })
    setEvents((data ?? []) as Event[])
  }

  // 1) Asegura que existan los eventos del finde y luego carga la lista
  useEffect(() => {
    (async () => {
      try {
        await supabase.rpc('ensure_weekend_events')
      } finally {
        await fetchEvents()
        setEnsuring(false)
      }
    })()
  }, [])

  // 2) Marca mis asistencias
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

  const toggleAsistir = async (ev: Event) => {
    if (!myUserId) return
    setLoadingIds(s => ({ ...s, [ev.id]: true }))

    const yaVoy = !!myGoing[ev.id]
    if (yaVoy) {
      await supabase.from('event_attendees').delete().eq('event_id', ev.id).eq('user_id', myUserId)
    } else {
      const { error } = await supabase.from('event_attendees').insert({ event_id: ev.id, user_id: myUserId })
      if (error) {
        alert('Inscripciones cerradas para esta salida.')
      }
    }

    setMyGoing(s => ({ ...s, [ev.id]: !yaVoy }))
    setLoadingIds(s => ({ ...s, [ev.id]: false }))
  }

  function estadoVentana(e: Event) {
    const now = Date.now()
    const open = e.rsvp_open_at ? new Date(e.rsvp_open_at).getTime() : 0
    const close = e.rsvp_close_at ? new Date(e.rsvp_close_at).getTime() : 0
    if (now < open) return { abierto: false, msg: 'Abre el lunes 00:00' }
    if (now > close) return { abierto: false, msg: 'Cerrado (viernes 23:00)' }
    return { abierto: true, msg: 'Inscripción abierta' }
  }

  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        {/* Enlace a tu web */}
        <a
          href="https://www.alamedatrailteam.com/salidas-trail-running-montana-entrenamientos-alcala-de-henares/"
          target="_blank"
          className="block w-full h-12 rounded-xl bg-white text-black font-semibold text-center leading-[3rem] mb-4"
        >
          Ver calendario en la web
        </a>

        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-2">Calendario del Team</h1>
        <p className="text-center text-white/85 mb-6">
          Inscripciones: <b>lunes 00:00 → viernes 23:00</b> (hora de Madrid).
        </p>

        {ensuring && <p className="text-center text-white/70">Preparando eventos…</p>}

        {!ensuring && events.length === 0 && (
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
            const ventana = estadoVentana(ev)

            return (
              <li key={ev.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg capitalize">{ev.title}</h3>
                    <p className="text-white/80 text-sm">{fechaStr}{ev.place ? ` · ${ev.place}` : ''}</p>
                    <p className={`text-xs mt-1 ${ventana.abierto ? 'text-green-300' : 'text-white/60'}`}>
                      {ventana.msg}
                    </p>
                    {ev.url && (
                      <Link href={ev.url} target="_blank" className="text-white/90 underline text-sm">
                        Detalle en la web
                      </Link>
                    )}
                  </div>

                  <button
                    onClick={() => toggleAsistir(ev)}
                    disabled={!myUserId || !!loadingIds[ev.id] || !ventana.abierto}
                    className={`min-w-[120px] h-10 rounded-xl px-4 font-semibold transition
                      ${myGoing[ev.id]
                        ? 'bg-white text-black'
                        : ventana.abierto
                          ? 'bg-transparent text-white border border-white/80 hover:bg-white/10'
                          : 'bg-transparent text-white/50 border border-white/30 cursor-not-allowed'}
                    `}
                  >
                    {loadingIds[ev.id] ? '...' : myGoing[ev.id] ? 'Apuntado' : ventana.abierto ? 'Asistir' : 'Cerrado'}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
