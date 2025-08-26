'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) {
      alert('Cuenta creada. Revisa tu correo para confirmar.')
      router.push('/login')
    } else alert(error.message)
  }

  return (
    <main className="hero">
      <div className="card">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" className="btn">Registrarse</button>
        </form>
      </div>
    </main>
  )
}
