import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const comments = await prisma.comment.findMany({
      where: { postId: resolvedParams.id },
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
      },
      orderBy: { createdAt: "asc" }
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const { content, authorId } = body

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: resolvedParams.id,
        authorId
      },
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

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error("Error creating comment:", error)
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    )
  }
}
