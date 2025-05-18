import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  try {
    // Get the file path relative to the project root
    const filePath = path.join(process.cwd(), "public", "Resume & CV -1 (2) (1).pdf")
    
    // Read the file as a buffer
    const fileBuffer = await fs.readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Resume & CV -1 (2) (1).pdf"
      },
    })
  } catch (error) {
    console.error("Error serving resume:", error)
    return NextResponse.json(
      { error: "Failed to download resume" },
      { status: 500 }
    )
  }
}
