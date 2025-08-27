'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Logo() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div
      className={[
        'pointer-events-none',           // el logo no intercepta toques/clicks
        'fixed left-1/2 -translate-x-1/2',
        isHome ? 'top-[9vh]' : 'top-6',  // posición home vs internas
        'z-10',                          // SIEMPRE por debajo del contenido
      ].join(' ')}
    >
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={isHome ? 680 : 360}
        height={isHome ? 680 : 360}
        className="opacity-95 drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        priority
      />
    </div>
  )
}
