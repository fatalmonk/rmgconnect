import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const report = await prisma.report.findUnique({
      where: { id: resolvedParams.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
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

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      )
    }

    // Only show public reports or reports from the same user
    // TODO: Add proper authentication check here
    if (!report.isPublic) {
      return NextResponse.json(
        { error: "Report is not publicly available" },
        { status: 403 }
      )
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json(
      { error: "Failed to fetch report" },
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
    const { subject, details, category, status, isPublic } = body

    const report = await prisma.report.update({
      where: { id: resolvedParams.id },
      data: {
        ...(subject && { subject }),
        ...(details && { details }),
        ...(category && { category: category.toUpperCase() }),
        ...(status && { status: status.toUpperCase() }),
        ...(isPublic !== undefined && { isPublic })
      }
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error updating report:", error)
    return NextResponse.json(
      { error: "Failed to update report" },
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
    await prisma.report.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: "Report deleted successfully" })
  } catch (error) {
    console.error("Error deleting report:", error)
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    )
  }
}
