"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Logo() {
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/welcome"

  // Grande en Home/Welcome, pequeño fijo en páginas internas
  const size = isHome ? { w: 440, h: 180 } : { w: 160, h: 65 }
  const top = isHome ? "top-60" : "top-6"

  return (
    <div
      className={`pointer-events-none absolute ${top} left-0 right-0 z-10 flex justify-center`}
      aria-hidden
    >
      <Image
        src="/logo.png"
        alt="Alameda Team"
        width={size.w}
        height={size.h}
        className="drop-shadow-2xl"
        priority
      />
    </div>
  )
}
