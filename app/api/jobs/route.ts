import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const location = searchParams.get("location")
    const employmentType = searchParams.get("employmentType")
    const organization = searchParams.get("organization")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where = {
      status: "ACTIVE",
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { requirements: { contains: search, mode: "insensitive" as const } }
        ]
      }),
      ...(location && { location: { contains: location, mode: "insensitive" as const } }),
      ...(employmentType && { employmentType: employmentType.toUpperCase() as any }),
      ...(organization && { organizationId: organization })
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              type: true,
              isVerified: true
            }
          },
          author: {
            select: {
              id: true,
              name: true,
              role: true
            }
          },
          _count: {
            select: {
              applications: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.job.count({ where })
    ])

    return NextResponse.json({
      jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      requirements, 
      location, 
      salary, 
      employmentType, 
      organizationId, 
      authorId 
    } = body

    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements,
        location,
        salary,
        employmentType: employmentType.toUpperCase(),
        organizationId,
        authorId
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    )
  }
}
