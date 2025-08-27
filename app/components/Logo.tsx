'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function HeaderLogo() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={`pointer-events-none absolute flex justify-center w-full 
        ${isHome ? 'top-28 z-10' : 'top-6 left-4 z-20 justify-start'}`}
    >
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={isHome ? 600 : 160}   // grande en home, pequeño en otras
        height={isHome ? 260 : 70}
        priority
        className={`${isHome ? 'drop-shadow-2xl animate-logo' : 'drop-shadow-md'}`}
      />
    </header>
  );
}
