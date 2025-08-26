export default function Home() {
  return (
    <main className="hero">
      <div className="card">
        <img src="/icon-512.png" alt="Alameda Team" className="logo fade-in" />
        <h1 className="fade-in" style={{ animationDelay: "0.3s" }}>
          Club de Trail Running
        </h1>
        <a className="btn fade-in" style={{ animationDelay: "0.6s" }} href="/login">
          Entrar
        </a>
        <a className="btn secondary fade-in" style={{ animationDelay: "0.9s" }} href="/profile">
          Mi perfil
        </a>
      </div>
    </main>
  )
}
