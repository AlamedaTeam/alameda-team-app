'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Welcome() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/profile')
    })
  }, [router])

  return (
    <main className="hero">
      <div className="card">
        <h1>Bienvenido al Alameda Team</h1>
        <p style={{ opacity: .9, marginBottom: 12 }}>
          Salidas, planificaciones semanales, tests y eventos del club.
        </p>
        <a className="btn" href="/signup">Crear cuenta</a>
        <a className="btn secondary" href="/login">Ya tengo cuenta</a>
        <a className="btn secondary" href="/">Volver</a>
      </div>
    </main>
  )
}
