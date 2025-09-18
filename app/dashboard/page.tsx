"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ShieldAlert, FileText, Users, BarChart3, Plus, LogOut } from "lucide-react"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const userRole = session?.user?.role || "FACTORY"
  const userName = session?.user?.name || "User"

  const dashboardItems = [
    {
      title: "My Reports",
      description: "View and manage your industry reports",
      icon: <FileText className="w-6 h-6" />,
      href: "/dashboard/reports",
      color: "bg-blue-500"
    },
    {
      title: "Submit Report",
      description: "Create a new industry report",
      icon: <Plus className="w-6 h-6" />,
      href: "/dashboard/reports/new",
      color: "bg-green-500"
    },
    {
      title: "Browse Reports",
      description: "View published industry reports",
      icon: <ShieldAlert className="w-6 h-6" />,
      href: "/dashboard/browse",
      color: "bg-red-500"
    },
    {
      title: "Profile",
      description: "Manage your account settings",
      icon: <Users className="w-6 h-6" />,
      href: "/dashboard/profile",
      color: "bg-purple-500"
    }
  ]

  // Add admin/reviewer specific items
  if (userRole === "ADMIN" || userRole === "REVIEWER") {
    dashboardItems.push({
      title: "Review Reports",
      description: "Review pending industry reports",
      icon: <BarChart3 className="w-6 h-6" />,
      href: "/review",
      color: "bg-orange-500"
    })
  }

  if (userRole === "ADMIN") {
    dashboardItems.push({
      title: "Admin Panel",
      description: "Manage users and system settings",
      icon: <Users className="w-6 h-6" />,
      href: "/admin",
      color: "bg-gray-500"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">
            <span className="text-green-600">RMG</span>Connect Dashboard
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {userName} ({userRole})
            </span>
                <button
                  onClick={() => {
                    window.location.href = "/auth/signout"
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 mb-8">
            Manage your industry reports and access platform features
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My Reports</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShieldAlert className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-start">
                  <div className={`p-3 ${item.color} rounded-lg text-white`}>
                    {item.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
