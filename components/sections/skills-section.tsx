"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Skill {
  name: string
  level: number
  category: string
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
}

const skills: Skill[] = [
  { name: "Python", level: 90, category: "Programming", proficiency: "Expert" },
  { name: "C++", level: 85, category: "Programming", proficiency: "Advanced" },
  { name: "Java", level: 80, category: "Programming", proficiency: "Advanced" },
  { name: "Machine Learning", level: 88, category: "AI", proficiency: "Advanced" },
  { name: "Deep Learning", level: 85, category: "AI", proficiency: "Advanced" },
  { name: "NLP", level: 82, category: "AI", proficiency: "Advanced" },
  { name: "Generative AI", level: 80, category: "AI", proficiency: "Advanced" },
  { name: "Azure AI", level: 75, category: "Cloud", proficiency: "Intermediate" },
  { name: "Web Development", level: 78, category: "Development", proficiency: "Intermediate" },
  { name: "Full-Stack", level: 75, category: "Development", proficiency: "Intermediate" },
  { name: "Front-End", level: 80, category: "Development", proficiency: "Advanced" },
  { name: "Software Testing", level: 78, category: "QA", proficiency: "Intermediate" },
  { name: "Team Leadership", level: 85, category: "Soft Skills", proficiency: "Advanced" },
  { name: "Teamwork", level: 90, category: "Soft Skills", proficiency: "Expert" },
  { name: "IT Infrastructure", level: 70, category: "IT", proficiency: "Intermediate" },
]

const SkillsSection = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className="relative skill-progress-circle"
                onMouseEnter={() => setActiveTooltip(skill.name)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <svg width="100" height="100" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="text-primary"
                    strokeDasharray={339.292}
                    strokeDashoffset={339.292 * (1 - skill.level / 100)}
                    initial={{ strokeDashoffset: 339.292 }}
                    whileInView={{ strokeDashoffset: 339.292 * (1 - skill.level / 100) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-sm font-bold">{skill.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                </div>

                {activeTooltip === skill.name && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 shadow-lg rounded-md px-3 py-2 z-10 whitespace-nowrap">
                    <p className="text-sm font-medium">{skill.proficiency}</p>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-700"></div>
                  </div>
                )}
              </div>
              <p className="mt-2 text-center text-xs text-gray-700 dark:text-gray-300">{skill.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
