'use client'

import { usePathname } from 'next/navigation'
import TopLogos from '../TopLogos' // si tu TopLogos está en otro sitio, ajusta la ruta

export default function ShowLogoOnHome() {
  const pathname = usePathname()
  // Solo mostramos el logo en la home exacta "/"
  if (pathname !== '/') return null
  return <TopLogos />
}
