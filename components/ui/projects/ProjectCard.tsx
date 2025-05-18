import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type ProjectCardProps = {
  project: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    github_url: string
    demo_url: string
    featured: boolean
  }
  index: number
  inView: boolean
}

export default function ProjectCard({ project, index, inView }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/50">
        <div className="relative h-48 w-full group">
          <Image
            src={project.image || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(project.title)}`}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4
            translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-300">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {project.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-amber-500 to-pink-500 text-white border-0">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {project.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pb-4 flex-grow">
          <p className="text-muted-foreground line-clamp-3">{project.description}</p>
        </CardContent>

        <CardFooter className="pt-0 pb-6 px-6">
          <div className="flex gap-3 w-full">
            {project.github_url && (
              <Button variant="outline" size="sm" className="flex-1 group" asChild>
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Code</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </Button>
            )}

            {project.demo_url && (
              <Button size="sm" className="flex-1 group" asChild>
                <Link
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Live Demo</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
