'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function TopLogos() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (isHome) {
    // Logo GRANDE solo en la home
    return (
      <header
        className="
          pointer-events-none
          absolute inset-x-0 top-60
          z-30 flex justify-center
        "
      >
        <Image
          src="/logo.png"
          alt="Alameda Team"
          width={440}   // doble ancho que el inicial
          height={180}
          priority
          className="drop-shadow-2xl animate-logo"
        />
      </header>
    )
  }

  // Logo PEQUEÑO fijo en páginas interiores
  return (
    <div className="pointer-events-none absolute top-5 left-1/2 -translate-x-1/2 z-30">
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={160}
        height={65}
        priority
        className="drop-shadow-lg"
      />
    </div>
  )
}
