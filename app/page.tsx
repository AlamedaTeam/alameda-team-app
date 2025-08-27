export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Club de Trail Running
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <a
          href="/login"
          className="bg-white text-black font-semibold py-2 px-4 rounded-xl shadow-md text-center"
        >
          Entrar
        </a>
        <a
          href="/profile"
          className="border border-white text-white font-semibold py-2 px-4 rounded-xl shadow-md text-center"
        >
          Mi perfil
        </a>
      </div>
    </div>
  )
}
