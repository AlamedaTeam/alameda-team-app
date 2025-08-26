'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setLoading(false);
    if (error) {
      setMsg(error.message);
    } else {
      // Si usas confirmación por email, muestra aviso y vuelve al login
      setMsg('¡Te hemos enviado un correo para confirmar tu cuenta!');
      setTimeout(() => router.push('/login'), 1200);
    }
  };

  return (
    <main className="hero">
      <div className="card">
        <h1 style={{marginBottom: 10}}>Crear cuenta</h1>
        <p style={{opacity:.9, color:'#fff', marginBottom: 18}}>
          Crea tu cuenta para entrar al club.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Mín. 6 caracteres"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          {msg && (
            <p style={{color:'#fff', margin:'8px 0 4px'}}>{msg}</p>
          )}

          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear cuenta'}
          </button>
        </form>

        <a className="btn secondary" href="/login">Ya tengo cuenta</a>
        <a className="btn secondary" href="/">Volver</a>
      </div>
    </main>
  );
}
