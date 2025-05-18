"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Monitor, Download, Award, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    
    if (sectionId === 'resume') {
      // Handle resume download
      const resumeLink = document.createElement('a');
      resumeLink.href = '/resume.pdf'; // Updated filename
      resumeLink.download = 'resume.pdf'; // Added download attribute
      resumeLink.click();
      return;
    }
    
    if (sectionId === 'certificates') {
      // Handle certificates section with header offset
      const element = document.getElementById('certificates')
      if (element) {
        const headerOffset = 80 // Use the same offset as other sections
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      setActiveSection('certificates')
      setIsMobileMenuOpen(false)
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      // If home, scroll to top
      if (sectionId === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        // For other sections
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "certificates", name: "Certificates" },
    { id: "resume", name: "Resume" },
  ]

  if (!mounted) return null

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-1 text-sm">
        <div className="container mx-auto px-4">
          <p>Welcome to my portfolio! Feel free to explore my work and get in touch.</p>
        </div>
      </div>
      
      <nav className="sticky top-0 w-full z-50">
        <motion.div
          className={`flex items-center justify-between px-4 py-3 md:px-12 transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md"
              : "bg-white dark:bg-gray-900"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="text-blue-400 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl font-bold">P</span>
              <span className="text-sm font-semibold text-white">Portfolio</span>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                      activeSection === item.id ? "font-medium text-blue-600 dark:text-blue-400" : ""
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-24 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg p-6 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        scrollToSection(e, item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`block w-full py-2 px-4 rounded-md transition-colors ${
                        activeSection === item.id 
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.div>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  )
}
