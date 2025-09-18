import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const job = await prisma.job.findUnique({
      where: { id: resolvedParams.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            description: true,
            website: true,
            email: true,
            phone: true,
            address: true,
            isVerified: true
          }
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        },
        _count: {
          select: {
            applications: true
          }
        }
      }
    })

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error("Error fetching job:", error)
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const { 
      title, 
      description, 
      requirements, 
      location, 
      salary, 
      employmentType, 
      status 
    } = body

    const job = await prisma.job.update({
      where: { id: resolvedParams.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(location !== undefined && { location }),
        ...(salary !== undefined && { salary }),
        ...(employmentType && { employmentType: employmentType.toUpperCase() }),
        ...(status && { status: status.toUpperCase() })
      }
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    await prisma.job.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    )
  }
}
