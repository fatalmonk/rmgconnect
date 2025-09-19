"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, Briefcase, MapPin, Building2, Clock, Filter } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  description: string
  requirements: string | null
  location: string | null
  salary: string | null
  employmentType: string
  status: string
  createdAt: string
  organization: {
    id: string
    name: string
    type: string
    isVerified: boolean
  }
  author: {
    id: string
    name: string | null
    role: string
  }
  _count: {
    applications: number
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const employmentTypes = [
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE"
  ]

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12"
      })
      
      if (search) params.append("search", search)
      if (location) params.append("location", location)
      if (employmentType) params.append("employmentType", employmentType)

      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()
      
      setJobs(data.jobs || [])
      setPagination(data.pagination || null)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, search, location, employmentType])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchJobs()
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
              Job Board
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find your next career opportunity in Bangladesh&apos;s RMG industry
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </form>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  aria-label="Filter by employment type"
                >
                  <option value="">All Types</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
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

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-gray-600">{job.organization.name}</span>
                          {job.organization.isVerified && (
                            <div className="ml-2 p-0.5 bg-blue-100 rounded-full">
                              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.organization.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.employmentType.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    {job.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center">
                        <span className="font-medium text-green-600">{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <span>{job._count.applications} applications</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View Job
                    </Link>
                    <Link
                      href={`/directory/${job.organization.id}`}
                      className="text-gray-600 hover:text-green-600 text-sm"
                    >
                      View Company →
                    </Link>
                  </div>
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
