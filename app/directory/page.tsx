"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Building2, Users, Briefcase, MapPin, Globe, Filter, ShieldCheck, Award, Factory } from "lucide-react"
import Link from "next/link"

interface Organization {
  id: string
  name: string
  type: string
  description: string | null
  website: string | null
  email: string | null
  phone: string | null
  address: string | null
  country: string
  isVerified: boolean
  createdAt: string
  // BGMEA Fields
  bgmeaRegNo: string | null
  bgmeaMember: boolean
  bgmeaVerified: boolean
  contactPerson: string | null
  bgmeaDetailsUrl: string | null
  registrationDate: string | null
  membershipType: string | null
  complianceStatus: string | null
  productionCapacity: number | null
  employeeCount: number | null
  exportCountries: string | null
  lastAudit: string | null
  complianceScore: number | null
  greenFactory: boolean
  users: Array<{
    id: string
    name: string | null
    role: string
  }>
  _count: {
    users: number
    jobs: number
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function DirectoryPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [bgmeaFilter, setBgmeaFilter] = useState("")
  const [verifiedFilter, setVerifiedFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const organizationTypes = [
    "FACTORY",
    "SUPPLIER", 
    "BUYER",
    "BRAND",
    "RETAILER",
    "AUDITOR",
    "GOVERNMENT",
    "NGO"
  ]

  const fetchOrganizations = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12"
      })
      
      if (search) params.append("search", search)
      if (typeFilter) params.append("type", typeFilter)
      if (bgmeaFilter) params.append("bgmea_only", bgmeaFilter)
      if (verifiedFilter) params.append("verified_only", verifiedFilter)

      const response = await fetch(`/api/organizations?${params}`)
      const data = await response.json()
      
      setOrganizations(data.organizations || [])
      setPagination(data.pagination || null)
    } catch (error) {
      console.error("Error fetching organizations:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, search, typeFilter, bgmeaFilter, verifiedFilter])

  useEffect(() => {
    fetchOrganizations()
  }, [fetchOrganizations])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchOrganizations()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Manufacturing Directory
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover verified manufacturers, BGMEA members, and factories in Bangladesh&apos;s RMG industry
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search organizations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </form>
              
              <div className="flex flex-wrap gap-4">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Filter by organization type"
                >
                  <option value="">All Types</option>
                  {organizationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>

                <select
                  value={bgmeaFilter}
                  onChange={(e) => setBgmeaFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Filter by BGMEA membership"
                >
                  <option value="">All Members</option>
                  <option value="true">BGMEA Members Only</option>
                </select>

                <select
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Filter by verification status"
                >
                  <option value="">All Status</option>
                  <option value="true">Verified Only</option>
                </select>
                
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : organizations.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No organizations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse all organizations.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {organizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {org.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {org.type.replace("_", " ")}
                        </span>
                        {org.bgmeaVerified && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            BGMEA Verified
                          </span>
                        )}
                        {org.greenFactory && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Award className="w-3 h-3 mr-1" />
                            Green Factory
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {org.isVerified && (
                        <div className="p-1 bg-blue-100 rounded-full">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      {org.bgmeaRegNo && (
                        <div className="text-xs text-gray-500 text-right">
                          {org.bgmeaRegNo}
                        </div>
                      )}
                    </div>
                  </div>

                  {org.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {org.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    {org.contactPerson && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {org.contactPerson}
                      </div>
                    )}
                    {org.address && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{org.address}</span>
                      </div>
                    )}
                    {org.exportCountries && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">Exports to: {org.exportCountries}</span>
                      </div>
                    )}
                    {org.employeeCount && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Factory className="w-4 h-4 mr-2" />
                        {org.employeeCount.toLocaleString()} employees
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {org._count.users} members
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {org._count.jobs} jobs
                    </div>
                  </div>

                  <Link
                    href={`/directory/${org.id}`}
                    className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {[...Array(pagination.pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    currentPage === i + 1
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                disabled={currentPage === pagination.pages}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
