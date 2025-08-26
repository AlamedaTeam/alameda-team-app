'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/profile` },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // Si el proyecto tiene "email confirmation" desactivado, ya habrá sesión.
    // Si está activado, Supabase envía un email. En ambos casos, mandamos a /profile.
    router.replace('/profile');
  };

  return (
    <main className="hero">
      <div className="card">
        <h1>Crear cuenta</h1>
        <p style={{ opacity: .85, marginBottom: 12 }}>
          Crea tu cuenta para entrar al club.
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
            placeholder="Contraseña (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
          />

          {error && <p className="error">{error}</p>}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>

        <a className="btn secondary" href="/login" style={{ marginTop: 8 }}>
          Ya tengo cuenta
        </a>
        <a className="btn secondary" href="/welcome" style={{ marginTop: 8 }}>
          Volver
        </a>
      </div>
    </main>
  );
}
