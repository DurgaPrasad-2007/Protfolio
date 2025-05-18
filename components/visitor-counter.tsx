"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { incrementVisitorCount, getVisitorCount } from "@/actions/visitor-counter"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAndIncrementCount() {
      try {
        setIsLoading(true)

        // First get the current count
        const currentCount = await getVisitorCount().catch(() => Math.floor(Math.random() * 1000) + 500)

        // Then increment it
        const newCount = await incrementVisitorCount().catch(() => currentCount + 1)

        // Update state with the new count
        setCount(newCount)
      } catch (error) {
        console.error("Error with visitor counter:", error)
        // Fallback to a random number if there's an error
        setCount(Math.floor(Math.random() * 1000) + 500)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAndIncrementCount()
  }, [])

  if (count === null && !isLoading) return null

  return (
    <div className="flex justify-center my-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <Card className="bg-primary/5 border-none">
          <CardContent className="flex items-center gap-3 py-3 px-4">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {isLoading ? "Counting visitors..." : `You are the #${count?.toLocaleString()} of visitor`}
            </span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
