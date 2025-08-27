'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Zones = {
  z1?: string
  z2?: string
  z3?: string
  z4?: string
  z5?: string
}

type Days = {
  mon?: boolean
  tue?: boolean
  wed?: boolean
  thu?: boolean
  fri?: boolean
  sat?: boolean
  sun?: boolean
}

type Intake = {
  height_cm: number | null
  weight_kg: number | null
  rhr_bpm: number | null
  vo2max: number | null
  zones: Zones | null
  last_fitness_test_date: string | null
  last_race_name: string | null
  long_run_km: number | null
  pb_10k_sec: number | null
  pb_21k_sec: number | null
  pb_42k_sec: number | null
  goal_text: string | null
  goal_race: string | null
  goal_date: string | null
  has_gym: boolean | null
  has_nutritionist: boolean | null
  has_bike: boolean | null
  has_treadmill: boolean | null
  has_weights: boolean | null
  has_bands: boolean | null
  has_plyo_box: boolean | null
  days_available: Days | null
  weekly_volume_pref: string | null
  notes: string | null
}

const empty: Intake = {
  height_cm: null,
  weight_kg: null,
  rhr_bpm: null,
  vo2max: null,
  zones: {},
  last_fitness_test_date: null,
  last_race_name: null,
  long_run_km: null,
  pb_10k_sec: null,
  pb_21k_sec: null,
  pb_42k_sec: null,
  goal_text: null,
  goal_race: null,
  goal_date: null,
  has_gym: null,
  has_nutritionist: null,
  has_bike: null,
  has_treadmill: null,
  has_weights: null,
  has_bands: null,
  has_plyo_box: null,
  days_available: {
    mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: true,
  },
  weekly_volume_pref: 'km',
  notes: null,
}

function hmsToSec(v: string): number | null {
  if (!v) return null
  // Admite "mm:ss" o "hh:mm:ss"
  const parts = v.split(':').map(Number)
  if (parts.some((n) => Number.isNaN(n))) return null
  if (parts.length === 2) {
    const [m, s] = parts
    return m * 60 + s
  }
  if (parts.length === 3) {
    const [h, m, s] = parts
    return h * 3600 + m * 60 + s
  }
  return null
}
function secToHms(sec: number | null): string {
  if (sec == null) return ''
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return h > 0
    ? `${String(h)}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
    : `${String(m)}:${String(s).padStart(2,'0')}`
}

export default function IntakeFormPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [step, setStep] = useState<1|2|3|4|5|6>(1)
  const [intake, setIntake] = useState<Intake>(empty)
  const [pb10, setPb10] = useState('')   // texto mm:ss ó hh:mm:ss
  const [pb21, setPb21] = useState('')
  const [pb42, setPb42] = useState('')

  // Carga inicial de la fila del usuario (si existe)
  useEffect(() => {
    (async () => {
      const { data: { user }, error: eUser } = await supabase.auth.getUser()
      if (eUser || !user) { setLoading(false); return }
      const { data, error } = await supabase
        .from('athlete_intake')
        .select('*')
        .eq('athlete_id', user.id)
        .maybeSingle()
      if (!error && data) {
        setIntake(prev => ({
          ...prev,
          ...data,
          zones: data.zones ?? {},
          days_available: data.days_available ?? empty.days_available,
        }))
        setPb10(secToHms(data.pb_10k_sec))
        setPb21(secToHms(data.pb_21k_sec))
        setPb42(secToHms(data.pb_42k_sec))
      }
      setLoading(false)
    })()
  }, [])

  const nextDisabled = useMemo(() => {
    // Valida lo mínimo en cada paso
    if (step === 1) return false
    if (step === 2) return false
    if (step === 3) return false
    if (step === 4) return false
    if (step === 5) return false
    return false
  }, [step])

  async function save(partial?: boolean) {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }

    const payload = {
      ...intake,
      athlete_id: user.id,
      pb_10k_sec: hmsToSec(pb10),
      pb_21k_sec: hmsToSec(pb21),
      pb_42k_sec: hmsToSec(pb42),
    }

    await supabase.from('athlete_intake').upsert(payload, { onConflict: 'athlete_id' })
    setSaving(false)

    if (!partial) {
      // Al terminar todo el cuestionario, volvemos a /profile
      router.push('/profile')
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Cargando…
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div className="w-full max-w-md rounded-2xl bg-black/50 backdrop-blur-md p-5 shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-1">Cuestionario deportivo</h1>
        <p className="text-center text-sm opacity-80 mb-4">Paso {step} de 6</p>

        {/* PASO 1 — Datos físicos */}
        {step === 1 && (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm">Altura (cm)</span>
              <input type="number" inputMode="decimal"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.height_cm ?? ''} onChange={e => setIntake({ ...intake, height_cm: e.target.value ? Number(e.target.value) : null })}
              />
            </label>
            <label className="block">
              <span className="text-sm">Peso (kg)</span>
              <input type="number" inputMode="decimal"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.weight_kg ?? ''} onChange={e => setIntake({ ...intake, weight_kg: e.target.value ? Number(e.target.value) : null })}
              />
            </label>
            <label className="block">
              <span className="text-sm">Pulso en reposo (bpm)</span>
              <input type="number"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.rhr_bpm ?? ''} onChange={e => setIntake({ ...intake, rhr_bpm: e.target.value ? Number(e.target.value) : null })}
              />
            </label>
            <label className="block">
              <span className="text-sm">VO2max (si lo conoces)</span>
              <input type="number" inputMode="decimal"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.vo2max ?? ''} onChange={e => setIntake({ ...intake, vo2max: e.target.value ? Number(e.target.value) : null })}
              />
            </label>
          </div>
        )}

        {/* PASO 2 — Zonas */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-sm opacity-80">Si las conoces, indica tus zonas (ej. 135-150)</p>
            {(['z1','z2','z3','z4','z5'] as (keyof Zones)[]).map((k) => (
              <label className="block" key={k}>
                <span className="text-sm uppercase">{k}</span>
                <input
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  placeholder="ej. 135-150"
                  value={intake.zones?.[k] ?? ''}
                  onChange={(e) => setIntake({ ...intake, zones: { ...(intake.zones ?? {}), [k]: e.target.value } })}
                />
              </label>
            ))}
          </div>
        )}

        {/* PASO 3 — Historial / marcas */}
        {step === 3 && (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm">Última prueba (fecha)</span>
              <input type="date"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.last_fitness_test_date ?? ''}
                onChange={e => setIntake({ ...intake, last_fitness_test_date: e.target.value || null })}
              />
            </label>
            <label className="block">
              <span className="text-sm">Última carrera</span>
              <input
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.last_race_name ?? ''}
                onChange={e => setIntake({ ...intake, last_race_name: e.target.value || null })}
              />
            </label>
            <label className="block">
              <span className="text-sm">Tirada más larga (km)</span>
              <input type="number" inputMode="decimal"
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.long_run_km ?? ''} onChange={e => setIntake({ ...intake, long_run_km: e.target.value ? Number(e.target.value) : null })}
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="block">
                <span className="text-sm">Mejor 10k (mm:ss)</span>
                <input
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  placeholder="42:30"
                  value={pb10} onChange={e => setPb10(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm">Mejor 21k (hh:mm:ss o mm:ss)</span>
                <input
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  placeholder="1:35:20"
                  value={pb21} onChange={e => setPb21(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm">Mejor 42k (hh:mm:ss)</span>
                <input
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  placeholder="3:25:10"
                  value={pb42} onChange={e => setPb42(e.target.value)}
                />
              </label>
            </div>
          </div>
        )}

        {/* PASO 4 — Objetivos */}
        {step === 4 && (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm">Objetivo principal (texto libre)</span>
              <textarea
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                rows={3}
                value={intake.goal_text ?? ''} onChange={e => setIntake({ ...intake, goal_text: e.target.value || null })}
              />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm">Carrera objetivo</span>
                <input
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  value={intake.goal_race ?? ''} onChange={e => setIntake({ ...intake, goal_race: e.target.value || null })}
                />
              </label>
              <label className="block">
                <span className="text-sm">Fecha objetivo</span>
                <input type="date"
                  className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                  value={intake.goal_date ?? ''} onChange={e => setIntake({ ...intake, goal_date: e.target.value || null })}
                />
              </label>
            </div>
          </div>
        )}

        {/* PASO 5 — Recursos */}
        {step === 5 && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                ['has_gym','Gimnasio'],
                ['has_nutritionist','Nutricionista'],
                ['has_bike','Bici'],
                ['has_treadmill','Cinta correr'],
                ['has_weights','Mancuernas/pesas'],
                ['has_bands','Gomas'],
                ['has_plyo_box','Cajón pliométrico'],
              ].map(([key,label]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(intake as any)[key] ?? false}
                    onChange={e => setIntake({ ...intake, [key]: e.target.checked } as any)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-sm">Preferencia de volumen semanal</span>
              <select
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                value={intake.weekly_volume_pref ?? 'km'}
                onChange={e => setIntake({ ...intake, weekly_volume_pref: e.target.value })}
              >
                <option value="km">Kilómetros</option>
                <option value="horas">Horas</option>
                <option value="mixto">Mixto</option>
              </select>
            </label>
          </div>
        )}

        {/* PASO 6 — Disponibilidad + notas */}
        {step === 6 && (
          <div className="space-y-3">
            <p className="text-sm opacity-80">Días disponibles para entrenar</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                ['mon','Lunes'],['tue','Martes'],['wed','Miércoles'],
                ['thu','Jueves'],['fri','Viernes'],['sat','Sábado'],['sun','Domingo'],
              ].map(([k,label]) => (
                <label key={k} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(intake.days_available as any)?.[k] ?? false}
                    onChange={e => setIntake({
                      ...intake,
                      days_available: { ...(intake.days_available ?? {}), [k]: e.target.checked }
                    })}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-sm">Notas (cualquier extra útil)</span>
              <textarea
                className="w-full mt-1 rounded-xl bg-black/40 px-3 py-2 outline-none"
                rows={3}
                value={intake.notes ?? ''} onChange={e => setIntake({ ...intake, notes: e.target.value || null })}
              />
            </label>
          </div>
        )}

        {/* Botonera */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-white/10"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as any) : s))}
          >
            Atrás
          </button>

          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-xl bg-white/10"
              onClick={() => save(true)}
              disabled={saving}
            >
              Guardar
            </button>

            {step < 6 ? (
              <button
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
                onClick={() => setStep((s) => (s < 6 ? ((s + 1) as any) : s))}
                disabled={nextDisabled}
              >
                Siguiente
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
                onClick={() => save(false)}
                disabled={saving}
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enlace volver */}
      <div className="mt-4">
        <a href="/welcome" className="underline">Volver</a>
      </div>
    </main>
  )
}
