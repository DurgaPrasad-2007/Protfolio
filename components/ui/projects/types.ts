export type Project = {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github_url: string
  demo_url: string
  featured: boolean
  problem?: string
  approach?: string
  outcome?: string
  metrics?: string
}

export type Filter = {
  value: string
  label: string
  icon?: React.ReactNode
}
