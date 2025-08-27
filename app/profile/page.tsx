'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  level: 'iniciación' | 'intermedio' | 'avanzado' | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (!user) {
        router.replace('/login');
        return;
      }
      setEmail(user.email ?? null);

      const { data: rows, error } = await supabase
        .from('profiles')
        .select('id, full_name, phone, level')
        .eq('id', user.id)
        .maybeSingle();

      if (error) console.error(error);

      if (!rows) {
        // crea fila si no existe
        const { error: insErr } = await supabase
          .from('profiles')
          .insert({ id: user.id, full_name: null, phone: null, level: null });
        if (insErr) console.error(insErr);
        setProfile({ id: user.id, full_name: '', phone: '', level: null });
      } else {
        setProfile(rows as Profile);
      }

      setLoading(false);
    })();
  }, [router]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setMsg(null);
    const { error } = await supabase.from('profiles').upsert(profile);
    setMsg(error ? `Error: ${error.message}` : 'Guardado ✅');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/welcome');
  };

  if (loading) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 px-6 py-8 text-center">
          Cargando tu perfil…
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 shadow-2xl px-6 py-7 md:px-8 md:py-8">
        <h1 className="text-center text-3xl font-extrabold mb-2">Mi perfil</h1>
        <p className="text-center text-white/80 mb-6">{email}</p>

        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="block text-white/90 mb-1">Nombre completo</label>
            <input
              className="w-full rounded-2xl bg-black/30 border border-white/40 text-white px-4 py-3"
              value={profile?.full_name ?? ''}
              onChange={(e) =>
                setProfile((p) => p && { ...p, full_name: e.target.value })
              }
              placeholder="Ej: Ana López"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1">Teléfono</label>
            <input
              className="w-full rounded-2xl bg-black/30 border border-white/40 text-white px-4 py-3"
              value={profile?.phone ?? ''}
              onChange={(e) =>
                setProfile((p) => p && { ...p, phone: e.target.value })
              }
              placeholder="Ej: 600123123"
            />
          </div>

          <div>
            <label className="block text-white/90 mb-1">Nivel</label>
            <select
              className="w-full rounded-2xl bg-black/30 border border-white/40 text-white px-4 py-3"
              value={profile?.level ?? ''}
              onChange={(e) =>
                setProfile((p) => p && { ...p, level: (e.target.value || null) as Profile['level'] })
              }
            >
              <option value="">— Selecciona —</option>
              <option value="iniciación">Iniciación</option>
              <option value="intermedio">Intermedio</option</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>

          {msg && <p className="text-center text-white/90">{msg}</p>}

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-white text-black font-semibold shadow-md active:scale-[.99] transition"
          >
            Guardar
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={signOut}
            className="w-full h-12 rounded-xl border border-white/80 text-white font-semibold bg-transparent hover:bg-white/10 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
