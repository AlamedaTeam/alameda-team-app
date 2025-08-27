'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function HeaderLogo() {
  const pathname = usePathname();

  // Solo mostrar el logo en la portada "/"
  if (pathname !== '/') return null;

  return (
    <header className="pointer-events-none absolute top-28 left-0 right-0 z-10 flex justify-center">
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={600}   // tamaño grande
        height={260}
        priority
        className="drop-shadow-2xl animate-logo"
      />
    </header>
  );
}
