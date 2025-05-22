"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, Monitor, Download, Award, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isResumeViewerOpen, setIsResumeViewerOpen] = useState(false);
  const pathname = usePathname()

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
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ]

  if (!mounted) return null

  return (
    <>
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-1 text-sm">
        <div className="container mx-auto px-4">
          <p>Welcome to my portfolio! Feel free to explore my work and get in touch.</p>
        </div>
      </div>
      
      <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Durga Prasad</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
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
