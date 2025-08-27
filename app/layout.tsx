import "./globals.css"
import Image from "next/image"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

// Logo grande solo en home
function LogoHome() {
  const pathname = usePathname()
  if (pathname !== "/") return null

  return (
    <header
      className="
        pointer-events-none
        absolute left-0 right-0 top-60
        z-10 flex justify-center
      "
    >
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={440}
        height={180}
        className="drop-shadow-2xl animate-logo"
        priority
      />
    </header>
  )
}

// Logo pequeño fijo en páginas interiores
function LogoSmall() {
  const pathname = usePathname()
  if (pathname === "/") return null

  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={160}
        height={65}
        className="drop-shadow-lg"
        priority
      />
    </div>
  )
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="relative min-h-screen">
        {/* Fondo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg.JPG"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Oscurecedor */}
        <div className="absolute inset-0 bg-black/25 -z-10" />

        {/* Logo dinámico */}
        <LogoHome />
        <LogoSmall />

        {/* Contenido principal */}
        <main className="relative z-20 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
