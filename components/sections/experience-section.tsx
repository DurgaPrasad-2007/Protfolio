"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Experience {
  company: string
  position: string
  period: string
  description: string[]
  logo: string
}

const experiences: Experience[] = [
  {
    company: "Unified Mentor",
    position: "Machine Learning Intern",
    period: "May 2025 - Present \u2022 1 mo",
    description: [
      "Internship focusing on machine learning applications",
      "Developed an Accurate Animal Classification Application which can ...",
    ],
    logo: "/placeholder.svg?height=80&width=80",
  },
  {
    company: "Micro IT",
    position: "Intern",
    period: "May 2025 - Present \u2022 1 mo",
    description: [
      "Artificial Intelligence and Machine Learning Intern",
      "Intern",
    ],
    logo: "/placeholder.svg?height=80&width=80",
  },
]

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>

        <div className="relative pl-8 md:pl-16 max-w-3xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-primary"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="mb-12 relative timeline-item pl-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-dot top-0"></div>

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Image
                    src={exp.logo || "/placeholder.svg"}
                    alt={exp.company}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-gray-600 dark:text-gray-400 mb-2">
                    <p className="font-medium">{exp.company}</p>
                    <span className="hidden md:inline">•</span>
                    <p>{exp.period}</p>
                  </div>

                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-3">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
