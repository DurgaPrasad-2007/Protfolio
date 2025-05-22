"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Mail, Linkedin, Github } from "lucide-react"
import Image from "next/image"

const HeroSection = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  
  const titles = [
    "Full Stack Developer",
    "ML Intern",
    "AI Specialist",
    "Innovative Problem Solver",
    "Web Solutions Architect"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, 2500) // Changed interval to 2.5 seconds
    
    return () => clearInterval(interval)
  }, [titles.length])

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 px-4 md:px-8 lg:px-12"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
      </div>

      <div className="container mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-12 py-16">
        {/* Left Column: Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-white text-2xl md:text-3xl font-semibold mb-3">Hi, I&apos;m</h3>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-4">
            Poloju Durga Prasad Chary
          </h1>

          {/* Dynamic Title Area */}
          <div className="h-12 md:h-14 mb-6 overflow-hidden">
            <motion.h2
              key={currentTitleIndex}
              className="text-xl md:text-2xl text-white font-medium"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {titles[currentTitleIndex]}
            </motion.h2>
          </div>

          <p className="text-white/90 mb-10 text-lg leading-relaxed">
            Building innovative web solutions with modern technologies. Passionate about creating impactful digital experiences.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-lg font-semibold transition-colors"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get in Touch
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-transparent hover:bg-white/10 text-white px-8 py-6 rounded-md text-lg font-semibold border border-white/20 transition-colors"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
              </Button>
            </motion.div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 mt-12 justify-center md:justify-start">
            <motion.a
              href="https://github.com/DurgaPrasad-2007"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-7 h-7" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-7 h-7" />
            </motion.a>
            {/* Add Twitter/X icon if needed */}
            {/* <motion.a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-7 h-7" />
            </motion.a> */}
          </div>

        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-blue-400 shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            {/* Replace with your actual image component/tag */}
            {/* The image in the original screenshot appears to be a framed profile photo. */}
            {/* You might want to use Next/Image component here */}
            <Image
              src="https://media.licdn.com/dms/image/v2/D5635AQFIkZtWksuT9g/profile-framedphoto-shrink_400_400/B56ZbY8HnKH0Ak-/0/1747396361026?e=1748188800&v=beta&t=u2HhtGKPUm7HM_Q6GMtOFCRTJV1dfl0NtmVMISwZ6Kk"
              alt="Poloju Durga Prasad Chary's profile picture"
              width={320}
              height={320}
              className="rounded-full object-cover"
              priority
            />
            {/* Placeholder div for the image circle */}
            {/* <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white/50 text-sm">
              [Your Image Here]
            </div> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Remove the scroll down indicator if not needed in the new design */}
      {/* <motion.div className="mt-16">
// ... existing code ...
      </motion.div> */}
    </section>
  )
}

export default HeroSection
