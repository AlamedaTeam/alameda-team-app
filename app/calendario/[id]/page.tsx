'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation'

type Row = {
  profiles: { full_name: string | null, email: string }
}

export default function AsistentesEvento() {
  const params = useParams() as { id: string }
  const [nombre, setNombre] = useState<string>('')
  const [asistentes, setAsistentes] = useState<Row[]>([])

  useEffect(() => {
    const cargar = async () => {
      const { data: ev } = await supabase
        .from('events')
        .select('title')
        .eq('id', params.id)
        .single()
      setNombre(ev?.title ?? 'Evento')

      const { data } = await supabase
        .from('event_attendees')
        .select('profiles(full_name, email)')
        .eq('event_id', params.id)
        .order('created_at', { ascending: true })
      setAsistentes((data ?? []) as Row[])
    }
    cargar()
  }, [params.id])

  return (
    <div className="relative z-20 w-full max-w-xl mx-auto px-4">
      <div className="rounded-3xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-center text-3xl font-extrabold mb-4">
          Asistentes · {nombre}
        </h1>
        {asistentes.length === 0 ? (
          <p className="text-center text-white/70">No hay asistentes aún.</p>
        ) : (
          <ul className="space-y-2">
            {asistentes.map((r, i) => (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                {r.profiles?.full_name || r.profiles?.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
