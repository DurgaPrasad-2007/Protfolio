import { NextResponse } from "next/server"

let visitorCount = 0

export async function GET() {
  try {
    visitorCount++
    return NextResponse.json({ count: visitorCount })
  } catch (error) {
    console.error("Error counting visitors:", error)
    return NextResponse.json(
      { error: "Failed to get visitor count" },
      { status: 500 }
    )
  }
}
