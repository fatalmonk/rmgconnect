"use client"

import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

export default function TestSignOutPage() {
  const { data: session, status } = useSession()
  const [message, setMessage] = useState("")

  const handleSignOut = async () => {
    try {
      setMessage("Attempting to sign out...")
      const result = await signOut({ callbackUrl: "/auth/signout" })
      setMessage(`Sign out result: ${JSON.stringify(result)}`)
    } catch (error) {
      setMessage(`Sign out error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Sign Out Test Page</h1>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Session Status:</h2>
          <p>Status: {status}</p>
          <p>Session: {session ? JSON.stringify(session, null, 2) : "No session"}</p>
        </div>

        <div className="mb-4">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Test Sign Out
          </button>
        </div>

        {message && (
          <div className="mb-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold">Message:</h3>
            <p>{message}</p>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>This page helps debug the signout functionality.</p>
        </div>
      </div>
    </div>
  )
}
