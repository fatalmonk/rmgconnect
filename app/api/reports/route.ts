import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ReportCategory, ReportStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where = {
      isPublic: true,
      ...(category && { category: category.toUpperCase() as ReportCategory }),
      ...(status && { status: status.toUpperCase() as ReportStatus })
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              role: true,
              organization: {
                select: {
                  name: true,
                  type: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.report.count({ where })
    ])

    return NextResponse.json({
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { subject, details, category, authorId } = body

    const report = await prisma.report.create({
      data: {
        subject,
        details,
        category: category.toUpperCase(),
        authorId,
        isPublic: false // Reports are private by default until reviewed
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            organization: {
              select: {
                name: true,
                type: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    )
  }
}