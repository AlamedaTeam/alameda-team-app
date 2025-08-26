export default function Home() {
  return (
    <main className="hero">
      {/* LOGO ARRIBA (mismo ancho que la caja) */}
      <img
        src="/icon-512.png?v=2"   // <-- ojo: este archivo EXISTE en /public
        alt="Alameda Team"
        className="logo"
      />

      {/* CAJA SOLO PARA TEXTO + BOTONES */}
      <div className="card">
        <h1>Club de Trail Running</h1>
        <a className="btn" href="/welcome">Entrar</a>
        <a className="btn secondary" href="/profile">Mi perfil</a>
      </div>
    </main>
  );
}
