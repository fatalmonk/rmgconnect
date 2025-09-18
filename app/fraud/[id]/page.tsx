"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShieldAlert, User, Building2, Calendar, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Report {
  id: string
  subject: string
  details: string
  category: string
  status: string
  isPublic: boolean
  createdAt: string
  author: {
    id: string
    name: string | null
    email: string
    role: string
    organization: {
      name: string
      type: string
    } | null
  }
}

export default function ReportDetailPage() {
  const params = useParams()
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/reports/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setReport(data)
        }
      } catch (error) {
        console.error("Error fetching report:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchReport()
    }
  }, [params.id])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "FRAUD_ALERT":
        return "bg-red-100 text-red-800"
      case "SAFETY_VIOLATION":
        return "bg-orange-100 text-orange-800"
      case "LABOR_ISSUE":
        return "bg-yellow-100 text-yellow-800"
      case "QUALITY_CONCERN":
        return "bg-blue-100 text-blue-800"
      case "ENVIRONMENTAL":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "UNDER_REVIEW":
        return "bg-blue-100 text-blue-800"
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      case "PUBLISHED":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "FRAUD_ALERT":
        return "🚨"
      case "SAFETY_VIOLATION":
        return "⚠️"
      case "LABOR_ISSUE":
        return "👥"
      case "QUALITY_CONCERN":
        return "📋"
      case "ENVIRONMENTAL":
        return "🌱"
      default:
        return "📢"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report not found</h2>
          <p className="text-gray-600 mb-4">The report you&apos;re looking for doesn&apos;t exist or is not publicly available.</p>
          <Link
            href="/fraud"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Fraud Alerts
          </Link>
        </div>
      </div>
    )
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
            <Link
              href="/fraud"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Fraud Alerts
            </Link>

            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">{getCategoryIcon(report.category)}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {report.subject}
                </h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(report.category)}`}>
                    {report.category.replace("_", " ")}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>Reported by {report.author.name || "Anonymous"}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
              {report.author.organization && (
                <div className="flex items-center text-gray-600">
                  <Building2 className="w-5 h-5 mr-2" />
                  <span>{report.author.organization.name}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Report Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-6 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Details</h2>
              <div className="prose max-w-none">
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {report.details}
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
            >
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    This report has been submitted by a community member and is currently under review. 
                    Please verify any information independently before taking action. 
                    If you have additional information about this matter, please contact the appropriate authorities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${getCategoryColor(report.category)}`}>
                    {report.category.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                    {report.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reported</span>
                  <span className="font-medium text-gray-900">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibility</span>
                  <span className="font-medium text-gray-900">
                    {report.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Reporter Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Reporter Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {report.author.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-600">{report.author.role.replace("_", " ")}</p>
                  </div>
                </div>
                {report.author.organization && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{report.author.organization.name}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Take Action</h2>
              <div className="space-y-3">
                <Link
                  href="/fraud/new"
                  className="block w-full text-center py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Report Similar Issue
                </Link>
                <button className="block w-full text-center py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share Report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
