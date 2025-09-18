"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  Calendar,
  DollarSign,
  MapPin,
  FileText
} from "lucide-react"

interface FraudReport {
  id: string
  title: string
  description: string
  category: string
  severity: string
  status: string
  subjectName: string
  subjectType: string
  location?: string
  amount?: number
  currency: string
  reportedAt: string
  reporter: {
    name?: string
    companyName?: string
    role: string
  }
  evidence: Array<{
    id: string
    fileName: string
    fileType: string
  }>
}

export default function BrowsePage() {
  const { status } = useSession()
  const router = useRouter()
  const [reports, setReports] = useState<FraudReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  useEffect(() => {
    fetchPublishedReports()
  }, [])

  const fetchPublishedReports = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/reports?status=PUBLISHED")
      const data = await response.json()

      if (response.ok) {
        setReports(data.reports || [])
      } else {
        setError(data.message || "Failed to fetch reports")
      }
    } catch {
      setError("An error occurred while fetching reports")
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "LOW":
        return "bg-green-100 text-green-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "HIGH":
        return "bg-orange-100 text-orange-800"
      case "CRITICAL":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(report => 
    !categoryFilter || report.category === categoryFilter
  )

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">
            <span className="text-green-600">RMG</span>Connect - Browse Reports
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
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
            Published Industry Reports
          </h1>
          <p className="text-gray-600 mb-8">
            Browse through published industry reports from the community
          </p>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  <option value="PAYMENT_FRAUD">Payment Issues</option>
                  <option value="QUALITY_FRAUD">Quality Concerns</option>
                  <option value="DELIVERY_FRAUD">Delivery Issues</option>
                  <option value="DOCUMENT_FRAUD">Document Problems</option>
                  <option value="CONTRACT_FRAUD">Contract Issues</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("")
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Reports List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-sm border text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-600">
                {searchTerm || categoryFilter
                  ? "Try adjusting your filters to see more results."
                  : "No published reports available at the moment."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {report.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {report.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(report.reportedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {report.evidence.length} evidence
                        </div>
                        {report.amount && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {report.amount.toLocaleString()} {report.currency}
                          </div>
                        )}
                        {report.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.location}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <strong>Subject:</strong> {report.subjectName} ({report.subjectType})
                        </span>
                        <span>
                          <strong>Reporter:</strong> {report.reporter.name || "Anonymous"} ({report.reporter.role})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => router.push(`/dashboard/reports/${report.id}`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
