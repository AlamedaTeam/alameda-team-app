'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Logo() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  if (!isHome) return null

  return (
    <div className="pointer-events-none absolute top-[10vh] left-1/2 -translate-x-1/2 z-20">
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={600}
        height={600}
        className="drop-shadow-2xl"
        priority
      />
    </div>
  )
}
