import "../globals.css"
import Image from "next/image"
import type { ReactNode } from "react"

export const metadata = {
  title: "Alameda Team – Embed",
  description: "Vistas para incrustar sin cabecera/Logo",
}

export default function EmbedLayout({ children }: { children: ReactNode }) {
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
        </div>

        {/* Oscurecedor suave para legibilidad */}
        <div className="absolute inset-0 bg-black/25 -z-10" />

        {/* Contenido embebido, sin logos por encima */}
        <main className="relative z-20 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
