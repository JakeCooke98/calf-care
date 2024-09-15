import Link from 'next/link'
import Image from 'next/image'

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center space-x-2">
      <Image src="/logo.svg" alt="Calf Care Logo" width={32} height={32} />
      <span className="font-bold text-xl">Calf Care</span>
    </Link>
  )
}