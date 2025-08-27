'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Intake = {
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
}

function computeProgress(intake: Intake | null) {
  if (!intake) return 0
  const fields: Array<keyof Intake> = [
    'height_cm','weight_kg','rhr_bpm','vo2max','zones',
    'last_fitness_test_date','last_race_name','long_run_km',
    'pb_10k_sec','pb_21k_sec','pb_42k_sec',
    'has_gym','has_bike','has_treadmill','has_weights','has_bands','has_plyo_box',
    'goals',
  ]
  const total = fields.length
  const filled = fields.reduce((acc, k) => {
    const v = intake[k]
    const hasValue =
      v !== null && v !== undefined &&
      !(typeof v === 'string' && v.trim() === '') &&
      !(typeof v === 'object' && v !== null && Object.keys(v as object).length === 0)
    return acc + (hasValue ? 1 : 0)
  }, 0)
  return Math.round((filled / total) * 100)
}

export default function ProfileProgress() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [hasIntake, setHasIntake] = useState<boolean | null>(null)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        setHasIntake(false)
        setProgress(0)
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('athlete_intake')
        .select('*')
        .eq('athlete_id', userData.user.id)
        .maybeSingle()

      if (!data) {
        setHasIntake(false)
        setProgress(0)
      } else {
        setHasIntake(true)
        setProgress(computeProgress(data as Intake))
      }
      setLoading(false)
    }
    run()
  }, [])

  const label = useMemo(() => {
    if (loading) return 'Calculando…'
    if (!hasIntake) return 'Cuestionario pendiente'
    if (progress >= 90) return 'Perfil casi completo'
    if (progress >= 60) return 'Buen progreso'
    return 'Empecemos a completar'
  }, [loading, hasIntake, progress])

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <div className="rounded-2xl bg-black/60 backdrop-blur-md p-4 shadow-lg border border-white/10 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Progreso de tu perfil</h3>
          <span className="text-sm text-white/80">{label}</span>
        </div>

        {/* Barra de progreso */}
        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-white/80">{progress}% completado</span>
          <Link
            href="/profile/intake"
            className="px-3 py-1.5 rounded-xl bg-white/90 text-black font-semibold hover:bg-white"
          >
            {hasIntake ? 'Editar datos' : 'Completar ahora'}
          </Link>
        </div>
      </div>
    </div>
  )
}
