// app/login/page.tsx
"use client"

import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="relative z-50 flex flex-col items-center justify-center min-h-[70vh] w-full px-6">
      <div className="w-full max-w-sm rounded-2xl bg-black/60 backdrop-blur-md p-5 shadow-xl">
        <h1 className="text-white text-2xl font-bold text-center mb-3">
          Iniciar sesión
        </h1>

        <form className="flex flex-col space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold py-2 rounded-xl shadow-md"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col space-y-3 mt-4 text-center">
          <a href="/signup" className="text-white underline">
            Crear cuenta
          </a>
          <a href="/" className="text-white underline">
            Volver
          </a>
        </div>
      </div>
    </div>
  )
}
