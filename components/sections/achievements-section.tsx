"use client"

import { motion } from "framer-motion"
import { Trophy, Settings } from "lucide-react"

const achievementsData = [
  {
    title: "1st Place - Public Speaking Competition",
    institution: "TRR College of Technology",
    year: "2024",
    description: "Secured top honors in a competitive public speaking event, demonstrating exceptional communication, persuasive storytelling, and critical thinking skills.",
    icon: Trophy,
  },
  {
    title: "1st Place - Model Making Competition",
    institution: "TRR College of Technology",
    year: "2023",
    description: "Won top honors in a college-wide technical model-making competition, showcasing innovation and hands-on engineering skills.",
    icon: Settings,
  },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-16 lg:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Achievements
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Key milestones, awards, and recognitions throughout my professional journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <achievement.icon className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.institution} | {achievement.year}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection; 