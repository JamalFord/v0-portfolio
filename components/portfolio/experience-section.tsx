'use client'

import { useState } from 'react'
import { Briefcase, ChevronDown, GraduationCap, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import { milestones, type Milestone } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'

const KIND_ICONS: Record<Milestone['kind'], typeof Briefcase> = {
  Education: GraduationCap,
  Internship: Briefcase,
  Role: Rocket,
}

type KindFilter = 'All' | Milestone['kind']
const KIND_FILTERS: KindFilter[] = ['All', 'Role', 'Internship', 'Education']

export function ExperienceSection() {
  const [openId, setOpenId] = useState<string | null>(milestones[0].id)
  const [kind, setKind] = useState<KindFilter>('All')
  const visible = kind === 'All' ? milestones : milestones.filter((m) => m.kind === kind)

  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="experience-heading"
          eyebrow="// journey"
          title="Experience & Milestones"
          description="Education, internships, and roles that shaped how I build. Tap any entry for details."
        />
        <div role="group" aria-label="Filter milestones" className="flex flex-wrap gap-2">
          {KIND_FILTERS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                'rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                kind === k
                  ? 'border-indigo bg-indigo text-indigo-foreground'
                  : 'border-glass-border text-muted-foreground hover:border-indigo/60 hover:text-foreground',
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-glass-border md:before:left-1/2">
        {visible.map((m, i) => {
          const Icon = KIND_ICONS[m.kind]
          const open = openId === m.id
          const panelId = `milestone-${m.id}`
          const alignRight = i % 2 === 1
          return (
            <li
              key={m.id}
              className={cn(
                'relative flex pl-14 md:w-1/2 md:pl-0',
                alignRight ? 'md:ml-auto md:pl-10' : 'md:pr-10',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-5 left-0 flex size-10 items-center justify-center rounded-full border transition-colors md:top-5',
                  alignRight ? 'md:-left-5' : 'md:right-[-1.25rem] md:left-auto',
                  open ? 'border-primary bg-primary text-primary-foreground' : 'glass text-primary',
                )}
              >
                <Icon className="size-4" />
              </span>
              <div
                className={cn(
                  'glass w-full rounded-2xl transition-colors',
                  open ? 'border-primary/40' : 'hover:border-indigo/50',
                )}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : m.id)}
                  className="flex w-full items-start gap-4 rounded-2xl p-5 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="text-primary">{m.period}</span>
                      <span className="rounded bg-accent px-1.5 py-0.5 text-accent-foreground">{m.kind}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-balance">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.org}</p>
                  </div>
                  <ChevronDown
                    className={cn('mt-1 size-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180 text-primary')}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={panelId}
                  hidden={!open}
                  className="flex flex-col gap-3 border-t border-glass-border px-5 pt-4 pb-5 animate-in fade-in slide-in-from-top-1"
                >
                  <p className="leading-relaxed text-foreground">{m.summary}</p>
                  <ul className="flex flex-col gap-2">
                    {m.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
