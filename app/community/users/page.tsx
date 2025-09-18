"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Search, 
  MapPin, 
  Building, 
  CheckCircle, 
  Users, 
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  FileText
} from "lucide-react"
import Header from "@/components/ui/header"

interface User {
  id: string
  name: string
  email: string
  company: string
  role: string
  location: string
  verified: boolean
  reportsCount: number
  joinDate: string
  avatar?: string
  website?: string
  phone?: string
}

export default function UsersPage() {
  const { status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [verifiedFilter, setVerifiedFilter] = useState("")
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, this would come from API
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@globaltextiles.com",
      company: "Global Textiles Ltd",
      role: "FACTORY",
      location: "Dhaka, Bangladesh",
      verified: true,
      reportsCount: 23,
      joinDate: "2024-01-15",
      website: "https://globaltextiles.com",
      phone: "+880-123-456-789"
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      email: "ahmed@fashionforward.com",
      company: "Fashion Forward Inc",
      role: "BUYER",
      location: "New York, USA",
      verified: true,
      reportsCount: 18,
      joinDate: "2024-02-03",
      website: "https://fashionforward.com",
      phone: "+1-555-123-4567"
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@sustainablegarments.com",
      company: "Sustainable Garments Co",
      role: "SUPPLIER",
      location: "Barcelona, Spain",
      verified: true,
      reportsCount: 15,
      joinDate: "2024-01-28",
      website: "https://sustainablegarments.com"
    },
    {
      id: "4",
      name: "John Smith",
      email: "john@qualitycontrol.com",
      company: "Quality Control Corp",
      role: "REVIEWER",
      location: "London, UK",
      verified: false,
      reportsCount: 12,
      joinDate: "2024-03-10",
      phone: "+44-20-1234-5678"
    },
    {
      id: "5",
      name: "Chen Wei",
      email: "chen@easternfabrics.com",
      company: "Eastern Fabrics Ltd",
      role: "FACTORY",
      location: "Shanghai, China",
      verified: true,
      reportsCount: 8,
      joinDate: "2024-02-20",
      website: "https://easternfabrics.com"
    },
    {
      id: "6",
      name: "Priya Patel",
      email: "priya@indiantextiles.com",
      company: "Indian Textiles Group",
      role: "SUPPLIER",
      location: "Mumbai, India",
      verified: true,
      reportsCount: 21,
      joinDate: "2024-01-10",
      website: "https://indiantextiles.com"
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    if (verifiedFilter === "verified") {
      filtered = filtered.filter(user => user.verified)
    } else if (verifiedFilter === "unverified") {
      filtered = filtered.filter(user => !user.verified)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, roleFilter, verifiedFilter])

  if (status === "loading" || loading) {
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "FACTORY": return "bg-blue-100 text-blue-800"
      case "SUPPLIER": return "bg-green-100 text-green-800"
      case "BUYER": return "bg-purple-100 text-purple-800"
      case "REVIEWER": return "bg-orange-100 text-orange-800"
      case "ADMIN": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "FACTORY": return "🏭"
      case "SUPPLIER": return "📦"
      case "BUYER": return "🛒"
      case "REVIEWER": return "👨‍💼"
      case "ADMIN": return "⚙️"
      default: return "👤"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.03) 2px, rgba(59, 130, 246, 0.03) 4px)`
      }}></div>
      
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
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Community Members
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Connect with verified factories, suppliers, buyers, and industry professionals 
              working together to combat fraud in the RMG industry.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Members
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Roles</option>
                  <option value="FACTORY">Factory</option>
                  <option value="SUPPLIER">Supplier</option>
                  <option value="BUYER">Buyer</option>
                  <option value="REVIEWER">Reviewer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {/* Verification Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification
                </label>
                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Members</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} members
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setRoleFilter("")
                  setVerifiedFilter("")
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>

          {/* Users Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border p-6 hover:shadow-xl transition-all group"
              >
                {/* User Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        user.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {user.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)} {user.role}
                        </span>
                        {user.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="font-medium">{user.company}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{user.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>{user.reportsCount} fraud reports submitted</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  
                  {user.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  
                  {user.website && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 truncate"
                      >
                        {user.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    Connect
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Message
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setRoleFilter("")
                  setVerifiedFilter("")
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
