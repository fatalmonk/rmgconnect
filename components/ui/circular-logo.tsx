import Link from "next/link"

interface CircularLogoProps {
  className?: string
  href?: string
  size?: "sm" | "md" | "lg"
}

export default function CircularLogo({ 
  className = "", 
  href = "/", 
  size = "md" 
}: CircularLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  }

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-green-500 to-red-400 flex items-center justify-center relative ${className}`}>
      {/* Central star shape */}
      <div className="w-2 h-2 bg-white rounded-full"></div>
      
      {/* Petal shapes around the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Top and bottom petals */}
        <div className="absolute -top-1 w-3 h-3 bg-green-600 rounded-full transform rotate-45"></div>
        <div className="absolute -bottom-1 w-3 h-3 bg-green-600 rounded-full transform rotate-45"></div>
        
        {/* Left and right petals */}
        <div className="absolute -left-1 w-3 h-3 bg-red-300 rounded-full transform rotate-45"></div>
        <div className="absolute -right-1 w-3 h-3 bg-red-300 rounded-full transform rotate-45"></div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex items-center space-x-2">
        <LogoIcon />
        <div className="flex flex-col">
          <span className="font-bold text-gray-900 text-sm">RMGConnect</span>
          <span className="text-xs text-gray-600">Bangladesh</span>
        </div>
      </Link>
    )
  }

  return <LogoIcon />
}
