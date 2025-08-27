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
            src="/bg.JPG"                 // ¡OJO! respeta mayúsculas/minúsculas
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Oscurecedor suave para que se lea bien el contenido */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Logo centrado arriba */}
        <header className="w-full flex justify-center pt-10">
          <Image
            src="/file.svg"               // <- usamos un asset que SÍ existe en /public
            alt="Alameda Team"
            width={220}
            height={90}
            className="drop-shadow-lg"
          />
        </header>

        {/* Contenido de cada página */}
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
