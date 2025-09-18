import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { userId, coverLetter } = body

    const resolvedParams = await params
    
    // Check if user already applied
    const existingApplication = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId: resolvedParams.id,
          userId: userId
        }
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 400 }
      )
    }

    const application = await prisma.application.create({
      data: {
        jobId: resolvedParams.id,
        userId: userId,
        coverLetter
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            organization: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const resolvedParams = await params
    const application = await prisma.application.findUnique({
      where: {
        jobId_userId: {
          jobId: resolvedParams.id,
          userId: userId
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        job: {
          select: {
            id: true,
            title: true,
            organization: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ hasApplied: !!application, application })
  } catch (error) {
    console.error("Error checking application:", error)
    return NextResponse.json(
      { error: "Failed to check application" },
      { status: 500 }
    )
  }
}
