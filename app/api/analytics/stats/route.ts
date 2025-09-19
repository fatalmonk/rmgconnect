import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "overview"

    switch (type) {
      case "manufacturing":
        return await getManufacturingStats()
      case "bgmea":
        return await getBgmeaStats()
      case "export":
        return await getExportStats()
      case "users":
        return await getUserStats()
      case "jobs":
        return await getJobStats()
      case "trends":
        const days = parseInt(searchParams.get("days") || "30")
        return await getIndustryTrends(days)
      default:
        return await getOverviewStats()
    }
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    )
  }
}

async function getOverviewStats() {
  const [
    totalOrganizations,
    totalUsers,
    totalJobs,
    bgmeaMembers,
    verifiedOrganizations,
    greenFactories
  ] = await Promise.all([
    prisma.organization.count(),
    prisma.user.count(),
    prisma.job.count(),
    prisma.organization.count({ where: { bgmeaMember: true } }),
    prisma.organization.count({ where: { isVerified: true } }),
    prisma.organization.count({ where: { greenFactory: true } })
  ])

  return NextResponse.json({
    overview: {
      totalOrganizations,
      totalUsers,
      totalJobs,
      bgmeaMembers,
      verifiedOrganizations,
      greenFactories
    }
  })
}

async function getManufacturingStats() {
  const organizations = await prisma.organization.groupBy({
    by: ['type'],
    _count: {
      id: true
    },
    _avg: {
      employeeCount: true,
      complianceScore: true
    }
  })

  const verifiedCounts = await prisma.organization.groupBy({
    by: ['type'],
    where: { bgmeaVerified: true },
    _count: { id: true }
  })

  const greenFactoryCounts = await prisma.organization.groupBy({
    by: ['type'],
    where: { greenFactory: true },
    _count: { id: true }
  })

  const stats = organizations.map(org => ({
    type: org.type,
    total_companies: org._count.id,
    avg_employees: org._avg.employeeCount,
    verified_count: verifiedCounts.find(v => v.type === org.type)?._count.id || 0,
    green_factories: greenFactoryCounts.find(g => g.type === org.type)?._count.id || 0,
    avg_compliance_score: org._avg.complianceScore
  }))

  return NextResponse.json({ manufacturingStats: stats })
}

async function getBgmeaStats() {
  const bgmeaMembers = await prisma.organization.findMany({
    where: { bgmeaMember: true }
  })

  const stats = {
    total_bgmea_members: bgmeaMembers.length,
    verified_members: bgmeaMembers.filter(o => o.bgmeaVerified).length,
    avg_employees_per_factory: bgmeaMembers.reduce((sum, o) => sum + (o.employeeCount || 0), 0) / bgmeaMembers.length,
    avg_compliance_score: bgmeaMembers.reduce((sum, o) => sum + (o.complianceScore || 0), 0) / bgmeaMembers.length,
    green_factories: bgmeaMembers.filter(o => o.greenFactory).length
  }

  return NextResponse.json({ bgmeaStats: [stats] })
}

async function getExportStats() {
  const organizations = await prisma.organization.findMany({
    where: { 
      bgmeaMember: true,
      exportCountries: { not: null }
    }
  })

  const exportMap = new Map()
  organizations.forEach(org => {
    if (org.exportCountries) {
      const countries = org.exportCountries.split(', ').map(c => c.trim())
      countries.forEach(country => {
        if (!exportMap.has(country)) {
          exportMap.set(country, {
            exportCountries: country,
            manufacturer_count: 0,
            avg_compliance: 0,
            avg_employees: 0,
            green_factories: 0,
            complianceSum: 0,
            employeeSum: 0
          })
        }
        const stats = exportMap.get(country)
        stats.manufacturer_count++
        stats.complianceSum += org.complianceScore || 0
        stats.employeeSum += org.employeeCount || 0
        if (org.greenFactory) stats.green_factories++
      })
    }
  })

  const stats = Array.from(exportMap.values()).map(item => ({
    exportCountries: item.exportCountries,
    manufacturer_count: item.manufacturer_count,
    avg_compliance: item.complianceSum / item.manufacturer_count,
    avg_employees: item.employeeSum / item.manufacturer_count,
    green_factories: item.green_factories
  })).sort((a, b) => b.manufacturer_count - a.manufacturer_count).slice(0, 10)

  return NextResponse.json({ exportStats: stats })
}

async function getUserStats() {
  const users = await prisma.user.groupBy({
    by: ['role'],
    _count: { id: true }
  })

  const verifiedUsers = await prisma.user.groupBy({
    by: ['role'],
    where: { isVerified: true },
    _count: { id: true }
  })

  const stats = users.map(user => ({
    role: user.role,
    total_users: user._count.id,
    verified_users: verifiedUsers.find(v => v.role === user.role)?._count.id || 0,
    avg_days_since_registration: 0 // Simplified for now
  }))

  return NextResponse.json({ userStats: stats })
}

async function getJobStats() {
  const jobs = await prisma.job.groupBy({
    by: ['status'],
    _count: { id: true }
  })

  const stats = jobs.map(job => ({
    status: job.status,
    total_jobs: job._count.id,
    avg_days_since_posted: 0 // Simplified for now
  }))

  return NextResponse.json({ jobStats: stats })
}

async function getIndustryTrends(days: number) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const recentOrgs = await prisma.organization.findMany({
    where: { createdAt: { gte: cutoffDate } }
  })

  const historicalOrgs = await prisma.organization.findMany({
    where: { createdAt: { lt: cutoffDate } }
  })

  const recentAvgCompliance = recentOrgs.reduce((sum, o) => sum + (o.complianceScore || 0), 0) / recentOrgs.length || 0
  const historicalAvgCompliance = historicalOrgs.reduce((sum, o) => sum + (o.complianceScore || 0), 0) / historicalOrgs.length || 0

  const trends = [
    {
      metric_name: 'New Organizations',
      metric_value: recentOrgs.length,
      trend_direction: recentOrgs.length > historicalOrgs.length ? 'up' : recentOrgs.length < historicalOrgs.length ? 'down' : 'stable'
    },
    {
      metric_name: 'Avg Compliance Score',
      metric_value: recentAvgCompliance,
      trend_direction: recentAvgCompliance > historicalAvgCompliance ? 'up' : recentAvgCompliance < historicalAvgCompliance ? 'down' : 'stable'
    },
    {
      metric_name: 'Green Factories',
      metric_value: recentOrgs.filter(o => o.greenFactory).length,
      trend_direction: 'stable' // Simplified for now
    }
  ]

  return NextResponse.json({ trends })
}
