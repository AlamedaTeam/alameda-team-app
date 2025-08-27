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
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Logo (grande en home, pequeño en las demás) */}
        <HeaderLogo />

        {/* Contenido */}
        <main className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
