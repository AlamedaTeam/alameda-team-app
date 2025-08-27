import "./globals.css"
import Image from "next/image"

export const metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          {/* Oscurecedor suave para que se lea bien el contenido */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Logo animado */}
        <header className="w-full flex justify-center pt-10 animate-fadeInScale">
          <Image
            src="/logo.png"
            alt="Alameda Team"
            width={220}
            height={90}
            className="drop-shadow-lg"
          />
        </header>

        {/* Contenido de cada página */}
        <main className="flex flex-col items-center justify-center space-y-4">
          {children}
        </main>
      </body>
    </html>
  )
}
