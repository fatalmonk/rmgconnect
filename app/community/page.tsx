"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Users, 
  FileText, 
  ShieldAlert, 
  CheckCircle,
  Activity
} from "lucide-react"
import Header from "@/components/ui/header"
import ActivityFeed from "@/components/activity-feed"

export default function CommunityPage() {
  const { status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  // Mock data - in real app, this would come from API
  const communityStats = {
    totalUsers: 1247,
    activeUsers: 89,
    totalReports: 342,
    resolvedReports: 298,
    pendingReports: 44,
    verifiedCompanies: 156
  }

  // const recentActivity = [
  //   {
  //     id: 1,
  //     user: "Sarah Johnson",
  //     company: "Global Textiles Ltd",
  //     action: "submitted a fraud report",
  //     type: "report",
  //     time: "2 minutes ago",
  //     icon: FileText,
  //     color: "text-blue-600"
  //   },
  //   {
  //     id: 2,
  //     user: "Ahmed Hassan",
  //     company: "Fashion Forward Inc",
  //     action: "verified a company",
  //     type: "verification",
  //     time: "15 minutes ago",
  //     icon: CheckCircle,
  //     color: "text-green-600"
  //   },
  //   {
  //     id: 3,
  //     user: "Maria Rodriguez",
  //     company: "Sustainable Garments Co",
  //     action: "updated their profile",
  //     type: "profile",
  //     time: "1 hour ago",
  //     icon: Users,
  //     color: "text-purple-600"
  //   },
  //   {
  //     id: 4,
  //     user: "John Smith",
  //     company: "Quality Control Corp",
  //     action: "resolved a fraud case",
  //     type: "resolution",
  //     time: "2 hours ago",
  //     icon: ShieldAlert,
  //     color: "text-red-600"
  //   }
  // ]

  const topContributors = [
    { name: "Sarah Johnson", company: "Global Textiles Ltd", reports: 23, verified: true },
    { name: "Ahmed Hassan", company: "Fashion Forward Inc", reports: 18, verified: true },
    { name: "Maria Rodriguez", company: "Sustainable Garments Co", reports: 15, verified: true },
    { name: "John Smith", company: "Quality Control Corp", reports: 12, verified: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-red-50">
      {/* Background pattern */}
      <div className="absolute inset-0 background-pattern"></div>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              RMGConnect Community
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with verified factories, suppliers, and buyers in Bangladesh&apos;s RMG industry. 
              Together, we&apos;re building a safer, more transparent supply chain.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{communityStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Now</p>
                  <p className="text-3xl font-bold text-gray-900">{communityStats.activeUsers}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reports</p>
                  <p className="text-3xl font-bold text-gray-900">{communityStats.totalReports}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900">{communityStats.resolvedReports}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <ActivityFeed />
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Top Contributors</h2>
                
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <motion.div
                      key={contributor.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-indigo-600">
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{contributor.name}</p>
                        <p className="text-xs text-gray-600">{contributor.company}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{contributor.reports} reports</span>
                          {contributor.verified && (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => router.push("/community/users")}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all group"
                >
                  <Users className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Users</h3>
                  <p className="text-sm text-gray-600">Connect with verified community members</p>
                </button>

                <button
                  onClick={() => router.push("/community/knowledge")}
                  className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all group"
                >
                  <FileText className="w-8 h-8 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Base</h3>
                  <p className="text-sm text-gray-600">Learn fraud prevention strategies</p>
                </button>

                <button
                  onClick={() => router.push("/dashboard/reports/new")}
                  className="p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl hover:from-red-100 hover:to-rose-100 transition-all group"
                >
                  <ShieldAlert className="w-8 h-8 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Fraud</h3>
                  <p className="text-sm text-gray-600">Submit a new fraud report</p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
