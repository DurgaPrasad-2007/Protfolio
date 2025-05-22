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
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Update active section based on scroll position
      // Exclude 'resume' and 'view-resume' from section tracking
      const sections = ["home", "about", "skills", "projects", "contact", "certificates"]
      const scrollPosition = window.scrollY + 100
      
      let currentActive = "home";

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentActive = section;
            break
          }
        }
      }
      setActiveSection(currentActive);
    }

    // Initial check
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false); // Close mobile menu on click

    if (sectionId === 'view-resume' || sectionId === 'resume') { // Both links will open the viewer
      setIsResumeViewerOpen(true);
      // Prevent scrolling for resume view/download actions
      return;
    }

    // Handle other sections
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
    }
  }

  const handleDownloadResume = () => {
    const resumeLink = document.createElement('a');
    resumeLink.href = '/resume.pdf'; // Path to the resume file in the public folder
    resumeLink.download = 'resume.pdf'; // Set the download attribute
    document.body.appendChild(resumeLink); // Append to body to make it clickable in Firefox
    resumeLink.click();
    document.body.removeChild(resumeLink); // Clean up
  };

  const navItems = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "certificates", name: "Certificates" },
    // Keep 'resume' for navigation link that opens viewer
    { id: "resume", name: "Resume" }, 
    { id: "contact", name: "Contact" },
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
                    className={`text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${ (activeSection === item.id && item.id !== 'resume') || (item.id === 'resume' && isResumeViewerOpen) ? "font-medium text-blue-600 dark:text-blue-400" : "" }`}
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
              className="fixed top-24 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg p-6 border-t border-gray-200 dark:border-800"
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
                        // setIsMobileMenuOpen(false) // scrollToSection now handles this
                      }}
                      className={`block w-full py-2 px-4 rounded-md transition-colors ${ activeSection === item.id && item.id !== 'resume' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' }`}
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

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {isResumeViewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black bg-opacity-75 flex justify-center items-center p-4"
            onClick={() => setIsResumeViewerOpen(false)} // Close on clicking overlay
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900 rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Resume</h3>
                <button onClick={() => setIsResumeViewerOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="w-full h-[calc(90vh-65px)]">
                 {/* Use iframe to display PDF */}
                 <iframe
                   src="/resume.pdf"
                   title="Resume Viewer"
                   className="w-full h-full border-none"
                 ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
