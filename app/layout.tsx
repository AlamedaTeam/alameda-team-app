import "./globals.css";
import Image from "next/image";
import type { Metadata } from "next";
import HeaderLogo from "./components/HeaderLogo";

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
        {/* Fondo a pantalla completa (capa más baja) */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg.JPG"
            alt="Montañas Alameda Team"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Velo suave para mejorar contraste (debajo del logo y contenido) */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Logo (solo en "/"), no bloquea toques y va debajo del contenido */}
        <HeaderLogo />

        {/* Contenido de cada página: SIEMPRE por encima del logo */}
        <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
