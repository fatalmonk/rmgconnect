"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Users, 
  Globe, 
  Award, 
  ShieldCheck,
  Factory,
  BarChart3,
  PieChart
} from "lucide-react"

interface AnalyticsData {
  overview?: {
    totalOrganizations: number
    totalUsers: number
    totalJobs: number
    bgmeaMembers: number
    verifiedOrganizations: number
    greenFactories: number
  }
  manufacturingStats?: Array<{
    type: string
    total_companies: number
    avg_employees: number
    verified_count: number
    green_factories: number
    avg_compliance_score: number
  }>
  bgmeaStats?: Array<{
    total_bgmea_members: number
    verified_members: number
    avg_employees_per_factory: number
    avg_compliance_score: number
    green_factories: number
  }>
  exportStats?: Array<{
    exportCountries: string
    manufacturer_count: number
    avg_compliance: number
    avg_employees: number
    green_factories: number
  }>
  trends?: Array<{
    metric_name: string
    metric_value: number
    trend_direction: string
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchAnalytics()
  }, [activeTab])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics/stats?type=${activeTab}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon: Icon, trend, subtitle }: {
    title: string
    value: string | number
    icon: any
    trend?: string
    subtitle?: string
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-green-100 rounded-full">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : trend === 'down' ? (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          ) : null}
          <span className={`text-sm ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
            {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Stable'}
          </span>
        </div>
      )}
    </motion.div>
  )

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "manufacturing", label: "Manufacturing", icon: Factory },
    { id: "bgmea", label: "BGMEA", icon: ShieldCheck },
    { id: "export", label: "Export", icon: Globe },
    { id: "trends", label: "Trends", icon: TrendingUp }
  ]

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
              Industry Analytics
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Comprehensive insights into Bangladesh&apos;s RMG industry performance
            </p>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-white text-green-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {activeTab === "overview" && analytics.overview && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Organizations"
                  value={analytics.overview.totalOrganizations.toLocaleString()}
                  icon={Building2}
                  subtitle="Registered companies"
                />
                <StatCard
                  title="BGMEA Members"
                  value={analytics.overview.bgmeaMembers.toLocaleString()}
                  icon={ShieldCheck}
                  subtitle={`${Math.round((analytics.overview.bgmeaMembers / analytics.overview.totalOrganizations) * 100)}% of total`}
                />
                <StatCard
                  title="Verified Organizations"
                  value={analytics.overview.verifiedOrganizations.toLocaleString()}
                  icon={Award}
                  subtitle={`${Math.round((analytics.overview.verifiedOrganizations / analytics.overview.totalOrganizations) * 100)}% verified`}
                />
                <StatCard
                  title="Green Factories"
                  value={analytics.overview.greenFactories.toLocaleString()}
                  icon={Factory}
                  subtitle="Environmentally certified"
                />
                <StatCard
                  title="Total Users"
                  value={analytics.overview.totalUsers.toLocaleString()}
                  icon={Users}
                  subtitle="Platform members"
                />
                <StatCard
                  title="Active Jobs"
                  value={analytics.overview.totalJobs.toLocaleString()}
                  icon={BarChart3}
                  subtitle="Current openings"
                />
              </div>
            )}

            {activeTab === "manufacturing" && analytics.manufacturingStats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analytics.manufacturingStats.map((stat, index) => (
                    <motion.div
                      key={stat.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow-sm border p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {stat.type.replace("_", " ")}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Companies</span>
                          <span className="font-semibold">{stat.total_companies}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Avg Employees</span>
                          <span className="font-semibold">{Math.round(stat.avg_employees).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Verified</span>
                          <span className="font-semibold">{stat.verified_count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Green Factories</span>
                          <span className="font-semibold">{stat.green_factories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Avg Compliance</span>
                          <span className="font-semibold">{Math.round(stat.avg_compliance_score)}%</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bgmea" && analytics.bgmeaStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analytics.bgmeaStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <StatCard
                      title="Total BGMEA Members"
                      value={stat.total_bgmea_members.toLocaleString()}
                      icon={ShieldCheck}
                    />
                    <StatCard
                      title="Verified Members"
                      value={stat.verified_members.toLocaleString()}
                      icon={Award}
                      subtitle={`${Math.round((stat.verified_members / stat.total_bgmea_members) * 100)}% verified`}
                    />
                    <StatCard
                      title="Avg Employees per Factory"
                      value={Math.round(stat.avg_employees_per_factory).toLocaleString()}
                      icon={Users}
                    />
                    <StatCard
                      title="Avg Compliance Score"
                      value={`${Math.round(stat.avg_compliance_score)}%`}
                      icon={BarChart3}
                    />
                    <StatCard
                      title="Green Factories"
                      value={stat.green_factories.toLocaleString()}
                      icon={Factory}
                      subtitle={`${Math.round((stat.green_factories / stat.total_bgmea_members) * 100)}% of members`}
                    />
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "export" && analytics.exportStats && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Export Destinations
                  </h3>
                  <div className="space-y-4">
                    {analytics.exportStats.map((stat, index) => (
                      <div key={stat.exportCountries} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-green-600">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{stat.exportCountries}</h4>
                            <p className="text-sm text-gray-600">{stat.manufacturer_count} manufacturers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {Math.round(stat.avg_compliance)}% compliance
                          </p>
                          <p className="text-xs text-gray-600">
                            {Math.round(stat.avg_employees)} avg employees
                          </p>
                          <p className="text-xs text-gray-600">
                            {stat.green_factories} green factories
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "trends" && analytics.trends && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analytics.trends.map((trend, index) => (
                  <StatCard
                    key={trend.metric_name}
                    title={trend.metric_name}
                    value={Math.round(trend.metric_value)}
                    icon={BarChart3}
                    trend={trend.trend_direction}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
