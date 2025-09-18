"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building2, Users, Briefcase, MapPin, Globe, Mail, Phone, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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
  users: Array<{
    id: string
    name: string | null
    email: string
    role: string
    isVerified: boolean
  }>
  jobs: Array<{
    id: string
    title: string
    location: string | null
    employmentType: string
    createdAt: string
  }>
  _count: {
    users: number
    jobs: number
  }
}

export default function OrganizationDetailPage() {
  const params = useParams()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await fetch(`/api/organizations/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setOrganization(data)
        }
      } catch (error) {
        console.error("Error fetching organization:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchOrganization()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Organization not found</h2>
          <p className="text-gray-600 mb-4">The organization you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/directory"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Directory
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
              href="/directory"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {organization.name}
                  </h1>
                  {organization.isVerified && (
                    <div className="flex items-center px-2 py-1 bg-blue-100 rounded-full">
                      <svg className="w-4 h-4 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium text-blue-800">Verified</span>
                    </div>
                  )}
                </div>
                
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                  {organization.type.replace("_", " ")}
                </span>

                {organization.description && (
                  <p className="text-lg text-gray-600 mb-6">
                    {organization.description}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{organization._count.users} members</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-2" />
                    <span>{organization._count.jobs} active jobs</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Joined {new Date(organization.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {organization.website && (
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Website
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                {organization.address && (
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <span className="text-gray-600">{organization.address}</span>
                  </div>
                )}
                {organization.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <a href={`mailto:${organization.email}`} className="text-gray-600 hover:text-green-600">
                      {organization.email}
                    </a>
                  </div>
                )}
                {organization.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <a href={`tel:${organization.phone}`} className="text-gray-600 hover:text-green-600">
                      {organization.phone}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Active Jobs */}
            {organization.jobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Jobs</h2>
                <div className="space-y-4">
                  {organization.jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {job.location && (
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </span>
                            )}
                            <span>{job.employmentType.replace("_", " ")}</span>
                            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          View Job
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/jobs?organization=${organization.id}`}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    View all jobs from this organization →
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Members</h2>
              <div className="space-y-3">
                {organization.users.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {user.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-600">{user.role.replace("_", " ")}</p>
                    </div>
                    {user.isVerified && (
                      <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Organization Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">{organization._count.users}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Jobs</span>
                  <span className="font-semibold text-gray-900">{organization._count.jobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Joined</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(organization.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Country</span>
                  <span className="font-semibold text-gray-900">{organization.country}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
