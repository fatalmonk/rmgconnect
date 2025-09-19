import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrganizationType } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where = {
      ...(type && { type: type.toUpperCase() as OrganizationType }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
          { country: { contains: search, mode: "insensitive" as const } }
        ]
      })
    }

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        skip,
        take: limit,
        include: {
          users: {
            select: {
              id: true,
              name: true,
              role: true
            }
          },
          _count: {
            select: {
              users: true,
              jobs: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }),
      prisma.organization.count({ where })
    ])

    return NextResponse.json({
      organizations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, website, email, phone, address, country } = body

    const organization = await prisma.organization.create({
      data: {
        name,
        type: type.toUpperCase(),
        description,
        website,
        email,
        phone,
        address,
        country: country || "Bangladesh"
      }
    })

    return NextResponse.json(organization, { status: 201 })
  } catch (error) {
    console.error("Error creating organization:", error)
    return NextResponse.json(
      { error: "Failed to create organization" },
      { status: 500 }
    )
  }
}
