import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ExperienceSection from "@/components/sections/experience-section"
import EducationSection from "@/components/sections/education-section"
import ProjectsSection from "@/components/sections/projects-section"
import AiDemoSection from "@/components/sections/ai-demo-section"
import ContactSection from "@/components/sections/contact-section"
import CertificatesSection from "@/components/sections/certificates-section"
import ThemeToggleButton from "@/components/theme-toggle-button"
import AchievementsSection from "@/components/sections/achievements-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Poloju Durga Prasad Chary | Machine Learning Intern",
  description:
    "Portfolio of Poloju Durga Prasad Chary, Machine Learning Intern specializing in AI, cybersecurity, and software systems.",
}

export default function Home() {
  return (
    <main className="min-h-screen paper-texture">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <AchievementsSection />
      <CertificatesSection />
      <ProjectsSection />
      <AiDemoSection />
      <ContactSection />
      <ThemeToggleButton />
    </main>
  )
}
