import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alameda Team",
  description: "Club de Trail Running",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="relative min-h-screen text-white">
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
        <div className="absolute inset-0 bg-black/30 -z-0" />

        {/* Logo grande centrado, NO intercepta toques y va detrás del cajón */}
        <header className="absolute top-28 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <Image
            src="/logo.png"
            alt="Alameda Team"
            width={540}  // tamaño grande
            height={220}
            className="drop-shadow-2xl animate-logo"
            aria-hidden="true"
            priority
          />
        </header>

        {/* Contenido de cada página: SIEMPRE por encima del logo */}
        <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
