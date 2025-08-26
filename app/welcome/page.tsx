// app/welcome/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // o '../../lib/supabaseClient' si no tienes el alias '@'

export default function Welcome() {
  const router = useRouter();

  // Si ya hay sesión, manda al perfil
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/profile');
    });
  }, [router]);

  return (
    <main className="hero">
      <div className="card">
        <h1>Bienvenido al Alameda Team</h1>
        <p style={{ opacity: .9, marginBottom: 12 }}>
          Salidas, planes semanales, tests y eventos del club.
        </p>
        <Link className="btn" href="/signup">Crear cuenta</Link>
        <Link className="btn secondary" href="/login">Ya tengo cuenta</Link>
        <Link className="btn secondary" href="/">Volver</Link>
      </div>
    </main>
  );
}
