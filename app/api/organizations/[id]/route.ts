import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const organization = await prisma.organization.findUnique({
      where: { id: resolvedParams.id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isVerified: true
          }
        },
        jobs: {
          where: { status: "ACTIVE" },
          select: {
            id: true,
            title: true,
            location: true,
            employmentType: true,
            createdAt: true
          },
          orderBy: { createdAt: "desc" },
          take: 5
        },
        _count: {
          select: {
            users: true,
            jobs: true
          }
        }
      }
    })

    if (!organization) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(organization)
  } catch (error) {
    console.error("Error fetching organization:", error)
    return NextResponse.json(
      { error: "Failed to fetch organization" },
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
    const { name, type, description, website, email, phone, address, country, isVerified } = body

    const organization = await prisma.organization.update({
      where: { id: resolvedParams.id },
      data: {
        ...(name && { name }),
        ...(type && { type: type.toUpperCase() }),
        ...(description !== undefined && { description }),
        ...(website !== undefined && { website }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address }),
        ...(country && { country }),
        ...(isVerified !== undefined && { isVerified })
      }
    })

    return NextResponse.json(organization)
  } catch (error) {
    console.error("Error updating organization:", error)
    return NextResponse.json(
      { error: "Failed to update organization" },
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
    await prisma.organization.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: "Organization deleted successfully" })
  } catch (error) {
    console.error("Error deleting organization:", error)
    return NextResponse.json(
      { error: "Failed to delete organization" },
      { status: 500 }
    )
  }
}
