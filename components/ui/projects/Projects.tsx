"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Project, Filter } from "./types"
import { defaultProjects, defaultFilters } from "./data"
import ProjectCardAnimated from "./ProjectCardAnimated"
import { ProjectsFilter } from "./ProjectsFilter"
import { ProjectsSkeleton } from "./ProjectsSkeleton"

export default function Projects() {
  const [projects] = useState<Project[]>(defaultProjects)
  const [isLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [availableTags] = useState<Filter[]>(defaultFilters)

  const filteredProjects: Project[] =
    filter === "all"
      ? projects
      : filter === "featured"
      ? projects.filter((project: Project) => project.featured)
      : projects.filter((project: Project) => project.tags.includes(filter))

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 dark:opacity-5 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of my recent work and personal projects. Each project reflects my skills and passion for
            creating impactful solutions.
          </p>
        </motion.div>

        <ProjectsFilter 
          filter={filter} 
          setFilter={setFilter} 
          filters={availableTags} 
          className="mb-12"
        />

        {isLoading ? (
          <ProjectsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCardAnimated
                key={project.id}
                project={project}
                index={index}
                inView={true}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="bg-muted/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              We couldn't find any projects matching your filter. Try a different one!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
