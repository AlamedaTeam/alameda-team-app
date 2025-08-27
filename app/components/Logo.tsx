'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Logo() {
  const pathname = usePathname()
  const isHome = pathname === '/' // solo en la home el logo grande

  return (
    <div
      className={`pointer-events-none flex justify-center items-center ${
        isHome ? 'absolute top-20 left-0 right-0 z-20' : 'absolute top-4 left-4 z-20'
      }`}
    >
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={isHome ? 440 : 120}   // grande en home, pequeño en resto
        height={isHome ? 180 : 50}
        className="drop-shadow-2xl"
        priority
      />
    </div>
  )
}
