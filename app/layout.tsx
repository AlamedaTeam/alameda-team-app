import "./globals.css"
import Image from "next/image"
import type { ReactNode } from "react"
import Logo from "../components/Logo"   // 👈 ahora coge el logo desde /components

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen">
        {/* Fondo */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/bg.JPG"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Oscurecedor suave */}
        <div className="absolute inset-0 bg-black/25 -z-10" />

        {/* Logo (decide tamaño y visibilidad según ruta) */}
        <Logo />

        {/* Contenido siempre por encima del logo */}
        <main className="relative z-30 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
