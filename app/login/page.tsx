export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Iniciar sesión</h1>

      <form className="flex flex-col space-y-4 w-full max-w-xs">
        <input
          type="email"
          placeholder="tu@email.com"
          className="bg-black/50 text-white placeholder-white rounded-xl px-4 py-2 focus:outline-none"
        />
        <input
          type="password"
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

      <div className="flex flex-col space-y-3 mt-6 w-full max-w-xs text-center">
        <a href="/signup" className="text-white underline">
          Crear cuenta
        </a>
        <a href="/" className="text-white underline">
          Volver
        </a>
      </div>
    </div>
  )
}
