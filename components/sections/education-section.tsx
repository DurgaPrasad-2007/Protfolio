"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, Calendar } from "lucide-react"

interface Education {
  degree: string
  institution: string
  period: string
  description: string
  achievements?: string[]
}

const educations: Education[] = [
  {
    degree: "Diploma in Computer Science",
    institution: "T. R. R. College of Technology, Hyderabad",
    period: "Jul 2023 - May 2026",
    description: "Studying computer science with a focus on programming, algorithms, and software development.",
    achievements: [
      "Active participation in Public Speaking activities",
      "Engaged in various technical workshops and seminars",
    ],
  },
  {
    degree: "High School",
    institution: "KarthiKeya Concept School",
    period: "Jul 2016 - Apr 2023",
    description: "Completed high school education with a focus on mathematics and science.",
    achievements: [
      "Participated in various school competitions",
      "Developed interest in computer science and programming",
    ],
  },
]

const EducationSection = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-primary" size={24} />
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Award size={16} />
                    <p>{edu.institution}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <p>{edu.period}</p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>

                {edu.achievements && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        >
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
