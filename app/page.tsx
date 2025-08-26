export default function Home() {
  return (
    <main className="hero">
      <div>
        <img src="/logo.png" alt="Alameda Team" className="logo" />
      </div>
      <div className="card fade-in" style={{ animationDelay: "0.3s" }}>
        <h1>Club de Trail Running</h1>
        <a className="btn" href="/login">Entrar</a>
        <a className="btn secondary" href="/profile">Mi perfil</a>
      </div>
    </main>
  )
}
