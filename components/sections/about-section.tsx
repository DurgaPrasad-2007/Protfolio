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
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Full Stack Developer & AI Enthusiast</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Hello! I&apos;m Poloju Durga Prasad Chary, a passionate Full Stack Developer with expertise in building modern web
              applications. I specialize in JavaScript/TypeScript, React, Next.js, Node.js, and various database technologies.
              With a strong foundation in both frontend and backend development, I create seamless, user-friendly
              applications that solve real-world problems. I&apos;m particularly interested in AI and machine learning integration in
              web applications.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              My experience includes working as a Machine Learning Intern at Unified Mentor for 2 months and at Micro IT for 1 month.
              My journey in computer science has equipped me with a strong foundation in programming languages like
              Python, C++, and Java, along with expertise in machine learning, deep learning, and NLP. I&apos;m also skilled
              in full-stack development and have experience with Azure AI fundamentals. I value teamwork and leadership,
              and I&apos;m constantly expanding my knowledge in the rapidly evolving field of AI.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div className="flex flex-col items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">3+</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Months Experience</span>
                </div>
                 <div className="flex flex-col items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">7+</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</span>
                </div>
                 <div className="flex flex-col items-center justify-center bg-gray-200/50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">10+</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Technologies</span>
                </div>
            </div>

            <motion.div whileHover={{ y: -2 }}>
              <Button 
                className="flex items-center gap-2 group"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/resume')
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'resume.pdf'
                    document.body.appendChild(a)
                    a.click()
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(a)
                  } catch (error) {
                    console.error('Error downloading resume:', error)
                    alert('Failed to download resume. Please try again.')
                  }
                }}
              >
                <Download size={18} className="group-hover:animate-bounce" />
                <span className="group-hover:underline">Download Resume</span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-full bg-gray-200/50 dark:bg-gray-800/50 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Personal Info</h4>
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> Poloju Durga Prasad Chary</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> polojudurgaprasad@gmail.com</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Location:</strong> Hyderabad, India</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Availability:</strong> <span className="text-green-500 font-semibold">Available for hire</span></p>
              </div>
            </div>

            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] mt-8 md:mt-0">
              <Image
                src="https://media.licdn.com/dms/image/v2/D5635AQFIkZtWksuT9g/profile-framedphoto-shrink_400_400/B56ZbY8HnKH0Ak-/0/1747396361026?e=1748188800&v=beta&t=u2HhtGKPUm7HM_Q6GMtOFCRTJV1dfl0NtmVMISwZ6Kk"
                alt="Poloju Durga Prasad Chary"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
