'use client'
export default function BtnWhatsapp() {
  const phone = process.env.NEXT_PUBLIC_ADMIN_PHONE || ''
  const href = phone ? `https://wa.me/${phone}` : '#'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-12 rounded-xl bg-green-500 text-white font-semibold flex items-center justify-center shadow-md hover:bg-green-600 transition"
    >
      WhatsApp al admin
    </a>
  )
}
