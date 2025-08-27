import './globals.css'
import Image from 'next/image'
import type { ReactNode } from 'react'
import Logo from '../Logo'   // usa esta import porque tu Logo.tsx está en la raíz

export const metadata = {
  title: 'Alameda Team',
  description: 'Club de Trail Running',
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

        {/* Oscurecedor suave */}
        <div className="absolute inset-0 bg-black/25 -z-10" />

        {/* Logo grande: solo en Home */}
        <Logo />

        {/* Contenido de cada página */}
        <main className="relative z-10 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
