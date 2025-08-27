import './globals.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import Logo from './components/Logo'

export const metadata: Metadata = {
  title: 'Alameda Team',
  description: 'Club de Trail Running',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen text-white">
        {/* Fondo a pantalla completa */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/bg.JPG"                  // ojo: mayúsculas/minúsculas deben coincidir
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Oscurecedor para legibilidad */}
        <div className="absolute inset-0 -z-10 bg-black/25" />

        {/* Logo (grande en home, más pequeño en el resto) */}
        <Logo />

        {/* Contenido de cada página (siempre por encima del logo) */}
        <main className="relative z-30 flex min-h-screen flex-col items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
