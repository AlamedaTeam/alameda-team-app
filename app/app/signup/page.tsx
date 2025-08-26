'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/profile') // tras crear cuenta, directo al perfil
    }
  }

  return (
    <main className="hero">
      <div className="card">
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Registrarse</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a className="btn secondary" href="/welcome">Volver</a>
      </div>
    </main>
  )
}
