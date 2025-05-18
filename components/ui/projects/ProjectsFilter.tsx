import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type Filter = {
  value: string
  label: string
  icon?: React.ReactNode
}

type ProjectsFilterProps = {
  filter: string
  setFilter: (filter: string) => void
  filters: Filter[]
  className?: string
}

export function ProjectsFilter({ 
  filter, 
  setFilter, 
  filters,
  className = "" 
}: ProjectsFilterProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 mb-12 ${className}`}>
      {filters.map((item, index) => (
        <motion.div
          key={item.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant={filter === item.value ? "default" : "outline"}
            onClick={() => setFilter(item.value)}
            className={`relative overflow-hidden group ${filter === item.value ? "shadow-lg" : ""}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
            {filter === item.value && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 bg-primary/10 dark:bg-primary/20"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
