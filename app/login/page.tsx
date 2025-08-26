'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Si ya está logueado, salta a /profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/profile');
    });
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace('/profile');
  };

  return (
    <main className="hero">
      <div className="card">
        <h1>Iniciar sesión</h1>
        <p style={{ opacity: .85, marginBottom: 12 }}>
          Entra con tu correo y contraseña.
        </p>

        <form onSubmit={onSubmit}>
          <input
            className="input"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <a className="btn secondary" href="/signup" style={{ marginTop: 8 }}>
          Crear cuenta
        </a>
        <a className="btn secondary" href="/welcome" style={{ marginTop: 8 }}>
          Volver
        </a>
      </div>
    </main>
  );
}
