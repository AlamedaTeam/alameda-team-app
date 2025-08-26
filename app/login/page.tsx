'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    // Si ya tiene sesión, mándalo directo al perfil
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/profile');
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) {
      setMsg(error.message);
    } else {
      router.replace('/profile');
    }
  };

  return (
    <main className="hero">
      <div className="card">
        <h1 style={{marginBottom: 10}}>Iniciar sesión</h1>
        <p style={{opacity:.9, color:'#fff', marginBottom: 18}}>
          Entra con tu email y contraseña.
        </p>

        <form onSubmit={handleLogin}>
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
              placeholder="Tu contraseña"
              value={pass}
              onChange={(e)=>setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {msg && (
            <p style={{color:'#fff', margin:'8px 0 4px'}}>{msg}</p>
          )}

          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <a className="btn secondary" href="/signup">Crear cuenta</a>
        <a className="btn secondary" href="/">Volver</a>
      </div>
    </main>
  );
}
