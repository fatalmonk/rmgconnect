import Link from "next/link"

interface LogoProps {
  className?: string
  href?: string
}

export default function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link href={href} className={`font-bold text-xl ${className}`}>
      <span className="text-green-600">RMG</span>Connect
    </Link>
  )
}
