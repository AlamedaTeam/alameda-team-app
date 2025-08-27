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
            src="/bg.jpg"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Logo más abajo */}
        <header className="absolute top-54 left-0 right-0 z-10 flex justify-center">
          <Image
            src="/logo.png"
            alt="Alameda Team"
            width={220}
            height={90}
            className="drop-shadow-2xl animate-logo"
          />
        <header className="absolute top-44 left-0 right-0 z-10 flex justify-center">
  <Image
    src="/logo.png"
    alt="Alameda Team"
    width={440}   // antes 220 → ahora el doble
    height={180}  // antes 90 → ahora el doble
    className="drop-shadow-2xl animate-logo"
  />
</header>
