'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setError(error.message)

    // si está desactivada la verificación por email, habrá sesión directa
    if (data.user) {
      await supabase.from('profiles').upsert({ id: data.user.id, email, rol: 'atleta' })
    }
    // manda a login para que entre
    router.push('/login')
  }

  return (
    <main className="hero">
      <div className="card">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSignup} style={{display:'grid', gap:12}}>
          <input type="email" placeholder="Tu email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña (mín. 6)" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn" disabled={loading}>{loading ? 'Creando…' : 'Registrarme'}</button>
        </form>
        {error && <p style={{color:'tomato'}}>{error}</p>}
        <a className="btn secondary" href="/login">Ya tengo cuenta</a>
        <a className="btn secondary" href="/welcome">Volver</a>
      </div>
    </main>
  )
}
