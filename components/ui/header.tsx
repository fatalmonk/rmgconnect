"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import CircularLogo from "./circular-logo"
import { Menu, X, User, LogOut } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50 opacity-30"></div>
      <div className="absolute inset-0 header-background"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        {/* Main header bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <CircularLogo size="md" />
          </div>

          {/* Middle section - Navigation */}
          <div className="flex-1 mx-8 hidden md:flex items-center justify-center space-x-8">
            <Link href="/directory" className="text-gray-600 hover:text-gray-900 transition-colors">
              Directory
            </Link>
            <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
              Jobs
            </Link>
            <Link href="/knowledge" className="text-gray-600 hover:text-gray-900 transition-colors">
              Knowledge
            </Link>
            <Link href="/fraud" className="text-gray-600 hover:text-gray-900 transition-colors">
              Fraud Alerts
            </Link>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    window.location.href = "/auth/signout"
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/directory"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Directory
              </Link>
              <Link
                href="/jobs"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                href="/knowledge"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Knowledge
              </Link>
              <Link
                href="/fraud"
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Fraud Alerts
              </Link>
              
              {session ? (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      window.location.href = "/auth/signout"
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link
                    href="/auth/signin"
                    className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

