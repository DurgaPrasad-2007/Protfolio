"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

const HeroSection = () => {
  const constraintsRef = useRef(null)

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden gradient-bg"
      ref={constraintsRef}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: 'url("/placeholder.svg?height=500&width=500")',
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 relative">
          <motion.div
            className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Poloju Durga Prasad Chary"
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Poloju Durga Prasad Chary
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl text-white/90 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Machine Learning Intern
        </motion.h2>

        <motion.p
          className="text-white/80 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Hyderabad, Telangana, India
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-6 rounded-full text-lg"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }} className="pulse-animation">
            <Button
              className="bg-coral text-white px-8 py-6 rounded-full text-lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </Button>
      </motion.div>
    </section>
  )
}

export default HeroSection
