"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Hello, I'm Durga Prasad</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I enjoy building efficient, clean code and exploring AI, cybersecurity, and software systems. As a Machine
              Learning Intern at Unified Mentor, I'm passionate about leveraging technology to solve complex problems
              and create innovative solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              My journey in computer science has equipped me with a strong foundation in programming languages like
              Python, C++, and Java, along with expertise in machine learning, deep learning, and NLP. I'm also skilled
              in full-stack development and have experience with Azure AI fundamentals. I value teamwork and leadership,
              and I'm constantly expanding my knowledge in the rapidly evolving field of AI.
            </p>

            <motion.div whileHover={{ y: -2 }}>
              <Button className="flex items-center gap-2 group">
                <Download size={18} className="group-hover:animate-bounce" />
                <span className="group-hover:underline">Download Resume</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Poloju Durga Prasad Chary"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
