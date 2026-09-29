import { ContactProvider } from '@/components/portfolio/contact-dialog'
import { ContactSection } from '@/components/portfolio/contact-section'
import { ExperienceSection } from '@/components/portfolio/experience-section'
import { Hero } from '@/components/portfolio/hero'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { SiteHeader } from '@/components/portfolio/site-header'
import { SkillsSection } from '@/components/portfolio/skills-section'
import { profile } from '@/lib/portfolio-data'

export default function Page() {
  return (
    <ContactProvider>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-glass-border px-4 py-8 font-mono text-xs text-muted-foreground sm:flex-row">
        <p>{`© 2026 ${profile.name}`}</p>
        <a href="#top" className="transition-colors hover:text-primary">
          back to top ↑
        </a>
      </footer>
    </ContactProvider>
  )
}
