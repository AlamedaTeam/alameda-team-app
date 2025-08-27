export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Crear cuenta</h1>

      <form className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="email"
          placeholder="tu@email.com"
          className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
        />

        <button
          type="submit"
          className="bg-white text-black font-semibold py-2 rounded-xl shadow-md"
        >
          Crear cuenta
        </button>
      </form>

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
