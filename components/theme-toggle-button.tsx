"use client"

import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Avoids hydration mismatch

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-3 rounded-full bg-gray-200/60 backdrop-blur-md shadow-lg text-gray-700 hover:bg-gray-300/60 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/60 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Optional: System theme button */}
      {/* <button
        onClick={() => setTheme("system")}
        className="p-3 rounded-full bg-gray-200/60 backdrop-blur-md shadow-lg text-gray-700 hover:bg-gray-300/60 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/60 transition-colors"
        aria-label="Set system theme"
      >
        <Monitor className="w-5 h-5" />
      </button> */}

    </motion.div>
  )
}

export default ThemeToggleButton; 