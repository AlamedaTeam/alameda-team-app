import "./globals.css"
import Image from "next/image"

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen">
        {/* Fondo a pantalla completa */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg.JPG"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
          {/* Oscurecedor suave para que se lea bien el contenido */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Logo centrado más grande */}
        <header className="absolute top-60 left-0 right-0 z-10 flex justify-center">
          <Image
            src="/logo.png"
            alt="Alameda Team"
            width={440}   // Doble de ancho
            height={180}  // Doble de alto
            className="drop-shadow-2xl animate-logo"
          />
        </header>

        {/* Contenido de cada página */}
        <main className="flex flex-col items-center justify-center min-h-screen text-white px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
