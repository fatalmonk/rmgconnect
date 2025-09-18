import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    
    // Extract form data
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const severity = formData.get("severity") as string
    const subjectName = formData.get("subjectName") as string
    const subjectType = formData.get("subjectType") as string
    const subjectEmail = formData.get("subjectEmail") as string
    const location = formData.get("location") as string
    const amount = formData.get("amount") as string
    const currency = formData.get("currency") as string

    // Validate required fields
    if (!title || !description || !category || !severity || !subjectName || !subjectType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create fraud report
    const fraudReport = await prisma.fraudReport.create({
      data: {
        title,
        description,
        category: category as "PAYMENT_FRAUD" | "QUALITY_FRAUD" | "DELIVERY_FRAUD" | "DOCUMENT_FRAUD" | "CONTRACT_FRAUD" | "OTHER",
        severity: severity as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
        subjectName,
        subjectType: subjectType as "FACTORY" | "SUPPLIER" | "BUYER" | "BRAND" | "RETAILER",
        subjectEmail: subjectEmail || null,
        location: location || null,
        amount: amount ? parseFloat(amount) : null,
        currency: currency || "USD",
        reporterId: session.user.id,
        status: "PENDING"
      }
    })

    // Handle file uploads
    const uploadDir = join(process.cwd(), "uploads", "evidence", fraudReport.id)
    await mkdir(uploadDir, { recursive: true })

    const evidenceFiles = []
    let fileIndex = 0

    while (formData.has(`file_${fileIndex}`)) {
      const file = formData.get(`file_${fileIndex}`) as File
      
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        const fileName = `${Date.now()}-${file.name}`
        const filePath = join(uploadDir, fileName)
        
        await writeFile(filePath, buffer)
        
        const evidence = await prisma.evidence.create({
          data: {
            fileName: file.name,
            fileUrl: `/uploads/evidence/${fraudReport.id}/${fileName}`,
            fileType: file.type,
            fileSize: file.size,
            fraudReportId: fraudReport.id
          }
        })
        
        evidenceFiles.push(evidence)
      }
      
      fileIndex++
    }

    return NextResponse.json(
      { 
        message: "Report created successfully", 
        report: {
          id: fraudReport.id,
          title: fraudReport.title,
          status: fraudReport.status,
          evidenceCount: evidenceFiles.length
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating fraud report:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    
    // If user is not admin, only show their reports or published reports
    if (session.user.role !== "ADMIN") {
      where.OR = [
        { reporterId: session.user.id },
        { status: "PUBLISHED" }
      ]
    }

    if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    const [reports, total] = await Promise.all([
      prisma.fraudReport.findMany({
        where,
        include: {
          reporter: {
            select: {
              name: true,
              companyName: true,
              role: true
            }
          },
          evidence: true,
          reviews: {
            include: {
              reviewer: {
                select: {
                  name: true,
                  role: true
                }
              }
            }
          },
          _count: {
            select: {
              appeals: true
            }
          }
        },
        orderBy: {
          reportedAt: "desc"
        },
        skip,
        take: limit
      }),
      prisma.fraudReport.count({ where })
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
    console.error("Error fetching fraud reports:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
