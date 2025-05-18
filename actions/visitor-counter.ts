"use server"

// Simple in-memory fallback (for development/preview)
let visitorCount = 500

export async function getVisitorCount(): Promise<number> {
  try {
    // Try to use Vercel KV if available
    if (typeof process.env.KV_REST_API_TOKEN === "string" && typeof process.env.KV_REST_API_URL === "string") {
      const VISITOR_COUNT_KEY = "portfolio:visitor_count"

      // Use fetch API instead of the KV SDK to avoid potential issues
      const response = await fetch(`${process.env.KV_REST_API_URL}/get/${VISITOR_COUNT_KEY}`, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        return Number.parseInt(data.result || "0", 10)
      }
    }

    // Fallback to in-memory counter for development/preview
    return visitorCount
  } catch (error) {
    console.error("Error getting visitor count:", error)
    return visitorCount
  }
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    // Try to use Vercel KV if available
    if (typeof process.env.KV_REST_API_TOKEN === "string" && typeof process.env.KV_REST_API_URL === "string") {
      const VISITOR_COUNT_KEY = "portfolio:visitor_count"

      // Use fetch API to increment the counter
      const response = await fetch(`${process.env.KV_REST_API_URL}/incr/${VISITOR_COUNT_KEY}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        return Number.parseInt(data.result || "0", 10)
      }
    }

    // Fallback to in-memory counter for development/preview
    return ++visitorCount
  } catch (error) {
    console.error("Error incrementing visitor count:", error)
    return ++visitorCount
  }
}
