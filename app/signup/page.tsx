'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      // 1) Alta de usuario
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error

      const user = data.user
      // 2) (Refuerzo) Inserta su perfil si no lo hizo el trigger
      if (user) {
        const { error: insertErr } = await supabase
          .from('profiles')
          .insert({ id: user.id, email })
          .select()
        // Si ya existiera por el trigger, ignoramos conflicto
        // (Supabase devuelve error 23505 en conflicto unique)
        if (insertErr && (insertErr as any).code !== '23505') {
          // No detenemos el flujo por esto, solo lo dejamos anotado
          console.warn('Insert profile warning:', insertErr.message)
        }
      }

      // 3) A perfil (o a /welcome si prefieres)
      router.replace('/profile')
    } catch (err: any) {
      setErrorMsg(err.message ?? 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Crear cuenta</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-xs"
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="tu@email.com"
          className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Contraseña (mín. 6)"
          className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black font-semibold py-2 rounded-xl shadow-md disabled:opacity-60"
        >
          {loading ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>

      {errorMsg && (
        <p className="mt-4 text-red-200 text-center max-w-xs">{errorMsg}</p>
      )}

      <div className="flex flex-col space-y-3 mt-6 w-full max-w-xs text-center">
        <a href="/login" className="text-white underline">
          Ya tengo cuenta
        </a>
        <a href="/" className="text-white underline">
          Volver
        </a>
      </div>
    </div>
  )
}
