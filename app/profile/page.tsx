'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Verifica si hay sesión activa
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace('/login'); // Si no hay sesión, redirige al login
        return;
      }
      const { data: userData } = await supabase.auth.getUser();
      setEmail(userData?.user?.email ?? null);
    });
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/welcome');
  };

  return (
    <main className="hero">
      <div className="card">
        <h1>Mi perfil</h1>
        <p style={{ opacity: .85, marginBottom: 16 }}>
          {email ? `Has iniciado sesión como ${email}` : 'Cargando…'}
        </p>

        <a className="btn" href="/welcome" style={{ marginBottom: 8 }}>
          Ir a inicio
        </a>
        <button className="btn secondary" onClick={signOut}>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}
