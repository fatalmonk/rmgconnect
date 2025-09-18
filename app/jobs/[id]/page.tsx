"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Building2, Clock, DollarSign, User, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
    description: string | null
    website: string | null
    email: string | null
    phone: string | null
    address: string | null
    isVerified: boolean
  }
  author: {
    id: string
    name: string | null
    email: string
    role: string
  }
  applications: Array<{
    id: string
    coverLetter: string | null
    status: string
    createdAt: string
    user: {
      id: string
      name: string | null
      email: string
      role: string
    }
  }>
  _count: {
    applications: number
  }
}

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasApplied] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setJob(data)
        }
      } catch (error) {
        console.error("Error fetching job:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchJob()
    }
  }, [params.id])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement application submission with user authentication
    console.log("Applying for job:", params.id, coverLetter)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
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
              href="/jobs"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h1>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                    <Link 
                      href={`/directory/${job.organization.id}`}
                      className="text-gray-600 hover:text-green-600 font-medium"
                    >
                      {job.organization.name}
                    </Link>
                    {job.organization.isVerified && (
                      <div className="ml-2 p-0.5 bg-blue-100 rounded-full">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {job.organization.type.replace("_", " ")}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.employmentType.replace("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {job.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-medium text-green-600">{job.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2" />
                    <span>{job._count.applications} applications</span>
                  </div>
                </div>
              </div>

              <div className="ml-8">
                {hasApplied ? (
                  <div className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg">
                    Application Submitted
                  </div>
                ) : (
                  <button
                    onClick={() => setShowApplicationForm(!showApplicationForm)}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
              </div>
            </motion.div>

            {/* Requirements */}
            {job.requirements && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-wrap">{job.requirements}</p>
                </div>
              </motion.div>
            )}

            {/* Application Form */}
            {showApplicationForm && !hasApplied && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for this position</h2>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={6}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Tell us why you're interested in this position..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Company</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900">{job.organization.name}</h3>
                  <p className="text-sm text-gray-600">{job.organization.type.replace("_", " ")}</p>
                </div>
                {job.organization.description && (
                  <p className="text-sm text-gray-600">{job.organization.description}</p>
                )}
                {job.organization.address && (
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                    <span>{job.organization.address}</span>
                  </div>
                )}
                {job.organization.website && (
                  <a
                    href={job.organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-green-600 hover:text-green-700"
                  >
                    Visit Website →
                  </a>
                )}
                <Link
                  href={`/directory/${job.organization.id}`}
                  className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  View Company Profile
                </Link>
              </div>
            </motion.div>

            {/* Job Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment Type</span>
                  <span className="font-medium text-gray-900">{job.employmentType.replace("_", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-medium text-gray-900">{job._count.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-gray-900">{job.status}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
