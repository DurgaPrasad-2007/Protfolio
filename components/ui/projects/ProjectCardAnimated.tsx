import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

type Project = {
  id: number
  title: string
  image: string
  description?: string
  problem?: string
  approach?: string
  outcome?: string
  metrics?: string
  tags: string[]
  github_url?: string
  demo_url?: string
  featured?: boolean
}

type ProjectCardAnimatedProps = {
  project: Project
  index: number
  inView: boolean
}

export default function ProjectCardAnimated({ project, index, inView }: ProjectCardAnimatedProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
      className="h-80 perspective cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <div className="relative h-48">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col rotate-y-180">
          <h3 className="text-xl font-bold mb-4">{project.title}</h3>
          <div className="flex-1 flex flex-col justify-between space-y-3 overflow-auto">
            {project.problem && (
              <div>
                <h4 className="font-medium text-primary">Problem:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{project.problem}</p>
              </div>
            )}
            {project.approach && (
              <div>
                <h4 className="font-medium text-primary">Approach:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{project.approach}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <h4 className="font-medium text-primary">Outcome:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{project.outcome}</p>
              </div>
            )}
            {project.metrics && (
              <div>
                <h4 className="font-medium text-primary">Metrics:</h4>
                <p className="text-sm font-bold">{project.metrics}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4 gap-2">
            {project.github_url && (
              <a
                href={project.github_url.startsWith("http") ? project.github_url : `https://github.com/${project.github_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
                <span>View Code</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </motion.div>
  )
}
