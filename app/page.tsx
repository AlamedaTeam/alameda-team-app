"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="w-full min-h-screen flex items-end justify-center pb-20 sm:pb-28">
      <div className="animate-card-in w-[92%] sm:w-[560px] rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6 sm:p-8">
        <h1 className="text-white text-3xl sm:text-4xl font-extrabold text-center tracking-tight drop-shadow-lg">
          Club de Trail Running
        </h1>

        <div className="mt-6 sm:mt-8 space-y-4">
          <Link href="/welcome" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl bg-white text-black font-semibold shadow-md transition active:scale-[.99]">
              Entrar
            </button>
          </Link>

          <Link href="/profile" className="block">
            <button className="w-full h-12 sm:h-14 rounded-xl border border-white/80 text-white font-semibold bg-transparent hover:bg-white/10 transition">
              Mi perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
