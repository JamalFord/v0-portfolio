'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { projects, type Project, type ProjectCategory } from '@/lib/portfolio-data'
import { GithubIcon } from './brand-icons'
import { SectionHeading } from './section-heading'

type Filter = 'All' | ProjectCategory
const FILTERS: Filter[] = ['All', 'Web', 'AI', 'Tools']

export function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="projects-heading"
          eyebrow="// selected work"
          title="Projects"
          description="A few things I've designed, built, and shipped to real users."
        />
        <div role="group" aria-label="Filter projects" className="glass flex w-full gap-1 overflow-x-auto rounded-xl p-1 md:w-auto">
          {FILTERS.map((f) => {
            const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:flex-none',
                  active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                )}
              >
                {f}
                <span className={cn('font-mono text-xs', active ? 'text-primary-foreground/70' : 'text-muted-foreground/70')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <ul key={filter} className="grid gap-6 sm:grid-cols-2">
        {visible.map((project, i) => (
          <li
            key={project.slug}
            className="animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-glass-border">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="glass absolute top-3 left-3 rounded-md px-2 py-1 font-mono text-xs text-primary">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p className="leading-relaxed text-pretty text-muted-foreground">{project.description}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-accent/60 px-2 py-1 font-mono text-xs text-accent-foreground">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <ExternalLink className="size-4" aria-hidden="true" />
            Live demo
            <span className="sr-only">{`of ${project.title}`}</span>
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-glass-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <GithubIcon className="size-4" />
            GitHub
            <span className="sr-only">{`repository for ${project.title}`}</span>
          </a>
        </div>
      </div>
    </article>
  )
}
