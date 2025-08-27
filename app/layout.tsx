import "./globals.css"
import Image from "next/image"
import type { ReactNode } from "react"

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen">
        {/* Fondo a pantalla completa */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg.jpg"                 // Asegúrate de que /public/bg.jpg existe
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
          {/* Oscurecedor suave para que se lean bien los contenidos */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Logo centrado arriba con animación */}
        <header className="absolute top-16 left-0 right-0 z-10 flex justify-center">
          <Image
            src="/logo.png"               // Tu logo en /public/logo.png
            alt="Alameda Team"
            width={220}
            height={90}
            className="drop-shadow-2xl animate-logo"
          />
        </header>

        {/* Contenido de cada página */}
        <main className="relative z-10 flex flex-col items-center">{children}</main>
      </body>
    </html>
  )
}
