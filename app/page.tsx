export default function Home() {
  return (
    <main style={{display:'grid',gap:16,placeItems:'center',padding:'40px'}}>
      <img src="/icon-192.png" alt="Alameda Team" width={96} height={96}/>
      <h1>Alameda Team</h1>
      <a href="/login">Entrar</a>
      <a href="/profile">Mi perfil</a>
    </main>
  )
}
