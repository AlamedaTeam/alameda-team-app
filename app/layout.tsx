import "./globals.css"
import Image from "next/image"
import type { ReactNode } from "react"
import Logo from "./components/Logo"   // 👈 ruta correcta (components está DENTRO de /app)

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen text-white">
        {/* Fondo a pantalla completa */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg.JPG"              // respeta mayúsculas/minúsculas del nombre real del archivo
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
          {/* Oscurecedor suave para legibilidad */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Logo (no intercepta clics) */}
        <Logo />

        {/* Contenido SIEMPRE por encima y clicable */}
        <main className="relative z-20 flex flex-col items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
