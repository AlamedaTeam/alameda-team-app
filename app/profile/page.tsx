'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Intake = {
  athlete_id: string
  height_cm: number | null
  weight_kg: number | null
  rhr_bpm: number | null
  vo2max: number | null
  zones: Record<string, string> | null
  last_fitness_test_date: string | null
  last_race_name: string | null
  long_run_km: number | null
  pb_10k_sec: number | null
  pb_21k_sec: number | null
  pb_42k_sec: number | null
  has_gym: boolean | null
  has_bike: boolean | null
  has_treadmill: boolean | null
  has_weights: boolean | null
  has_bands: boolean | null
  has_plyo_box: boolean | null
  goals: string | null
  updated_at?: string | null
}

function sToTimeLabel(s?: number | null) {
  if (!s && s !== 0) return '—'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(sec).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [intake, setIntake] = useState<Intake | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      const { data: userData, error: userErr } = await supabase.auth.getUser()
      if (userErr || !userData.user) {
        setError('Necesitas iniciar sesión.')
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('athlete_intake')
        .select('*')
        .eq('athlete_id', userData.user.id)
        .maybeSingle()

      if (error) {
        setError(error.message)
      } else {
        setIntake(data as Intake | null)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        Cargando perfil…
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white gap-4">
        <p>Error: {error}</p>
        <Link href="/login" className="btn">Ir a iniciar sesión</Link>
      </div>
    )
  }

  // Si aún no rellenó el cuestionario, le mandamos al intake
  if (!intake) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-white gap-4">
        <p>No encontramos tu cuestionario deportivo.</p>
        <Link href="/profile/intake" className="btn">Completar cuestionario</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl w-full px-4 pb-24">
      <div className="bg-black/60 backdrop-blur-md rounded-2xl p-5 shadow-lg text-white">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl md:text-3xl font-bold">Mi perfil</h1>
          <Link
            href="/profile/intake"
            className="px-3 py-1.5 rounded-xl bg-white/90 text-black font-semibold hover:bg-white"
          >
            Editar
          </Link>
        </div>

        <p className="text-white/70 text-sm mb-4">
          Última actualización: {intake.updated_at ? new Date(intake.updated_at).toLocaleString() : '—'}
        </p>

        {/* Datos físicos */}
        <section className="space-y-1 mb-5">
          <h2 className="font-semibold text-lg">Datos físicos</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Altura: <span className="font-semibold">{intake.height_cm ?? '—'} cm</span></div>
            <div>Peso: <span className="font-semibold">{intake.weight_kg ?? '—'} kg</span></div>
            <div>Pulso reposo: <span className="font-semibold">{intake.rhr_bpm ?? '—'} lpm</span></div>
            <div>VO₂max: <span className="font-semibold">{intake.vo2max ?? '—'}</span></div>
          </div>
        </section>

        {/* Zonas */}
        <section className="space-y-1 mb-5">
          <h2 className="font-semibold text-lg">Zonas de entrenamiento</h2>
          {intake.zones ? (
            <ul className="text-sm list-disc pl-5 space-y-0.5">
              {Object.entries(intake.zones).map(([k, v]) => (
                <li key={k}>
                  <span className="font-semibold">{k.toUpperCase()}</span>: {String(v)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-white/80">No indicadas.</p>
          )}
        </section>

        {/* Historial */}
        <section className="space-y-1 mb-5">
          <h2 className="font-semibold text-lg">Historial</h2>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div>Última prueba de acceso: <span className="font-semibold">
              {intake.last_fitness_test_date ? new Date(intake.last_fitness_test_date).toLocaleDateString() : '—'}
            </span></div>
            <div>Última carrera: <span className="font-semibold">{intake.last_race_name ?? '—'}</span></div>
            <div>Tirada más larga: <span className="font-semibold">{intake.long_run_km ?? '—'} km</span></div>
          </div>
        </section>

        {/* Marcas personales */}
        <section className="space-y-1 mb-5">
          <h2 className="font-semibold text-lg">Marcas personales</h2>
          <div className="grid grid-cols-1 gap-1 text-sm">
            <div>10K: <span className="font-semibold">{sToTimeLabel(intake.pb_10k_sec)}</span></div>
            <div>21K: <span className="font-semibold">{sToTimeLabel(intake.pb_21k_sec)}</span></div>
            <div>42K: <span className="font-semibold">{sToTimeLabel(intake.pb_42k_sec)}</span></div>
          </div>
        </section>

        {/* Material / recursos */}
        <section className="space-y-1 mb-5">
          <h2 className="font-semibold text-lg">Material / recursos</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Gimnasio: <span className="font-semibold">{intake.has_gym ? 'Sí' : 'No'}</span></div>
            <div>Bici: <span className="font-semibold">{intake.has_bike ? 'Sí' : 'No'}</span></div>
            <div>Cinta correr: <span className="font-semibold">{intake.has_treadmill ? 'Sí' : 'No'}</span></div>
            <div>Pesas: <span className="font-semibold">{intake.has_weights ? 'Sí' : 'No'}</span></div>
            <div>Gomas: <span className="font-semibold">{intake.has_bands ? 'Sí' : 'No'}</span></div>
            <div>Cajón pliométrico: <span className="font-semibold">{intake.has_plyo_box ? 'Sí' : 'No'}</span></div>
          </div>
        </section>

        {/* Objetivos */}
        <section className="space-y-1">
          <h2 className="font-semibold text-lg">Objetivos</h2>
          <p className="text-sm">{intake.goals || '—'}</p>
        </section>

        <div className="mt-6 flex gap-3">
          <Link
            href="/profile/intake"
            className="flex-1 text-center px-4 py-2 rounded-xl bg-white/90 text-black font-semibold hover:bg-white"
          >
            Editar cuestionario
          </Link>
          <Link
            href="/welcome"
            className="flex-1 text-center px-4 py-2 rounded-xl border border-white/40 hover:bg-white/10"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  )
}
