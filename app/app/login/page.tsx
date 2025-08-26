'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // si ya hay sesión, salta al perfil
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/profile')
    })
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    router.push('/profile')
  }

  return (
    <main className="hero">
      <div className="card">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleLogin} style={{display:'grid', gap:12}}>
          <input type="email" placeholder="Tu email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="btn" disabled={loading}>{loading ? 'Entrando…' : 'Entrar'}</button>
        </form>
        {error && <p style={{color:'tomato'}}>{error}</p>}
        <a className="btn secondary" href="/signup">Crear cuenta</a>
        <a className="btn secondary" href="/welcome">Volver</a>
      </div>
    </main>
  )
}
