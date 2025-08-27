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
        {/* Fondo */}
        <Image
          src="/bg.JPG"
          alt="Montañas Alameda Team"
          fill
          priority
          className="absolute inset-0 -z-20 object-cover"
        />
        {/* Oscurecedor */}
        <div className="absolute inset-0 -z-10 bg-black/25" />

        {/* Contenido de cada página */}
        <main className="relative z-0 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
