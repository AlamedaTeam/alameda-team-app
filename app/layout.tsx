import "./globals.css"
import Image from "next/image"
import type { ReactNode } from "react"
import ShowLogoOnHome from "./components/ShowLogoOnHome"  // << usamos el gate

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
            src="/bg.JPG"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Oscurecedor suave para legibilidad */}
        <div className="absolute inset-0 bg-black/25 -z-10" />

        {/* Logo SOLO en la home */}
        <div className="absolute inset-x-0 top-60 left-0 right-0 z-10 flex justify-center pointer-events-none">
          <ShowLogoOnHome />
        </div>

        {/* Contenido de cada página: SIEMPRE por encima del logo */}
        <main className="relative z-20 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
