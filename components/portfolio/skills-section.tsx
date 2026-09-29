'use client'

import { useState } from 'react'
import { Cloud, Layout, Server } from 'lucide-react'
import { cn } from '@/lib/utils'
import { skillGroups, type SkillGroup } from '@/lib/portfolio-data'
import { SectionHeading } from './section-heading'

const GROUP_ICONS: Record<SkillGroup['id'], typeof Layout> = {
  frontend: Layout,
  backend: Server,
  cloud: Cloud,
}

const LEVEL_LABELS = ['', 'Familiar', 'Working', 'Proficient', 'Advanced', 'Expert']

export function SkillsSection() {
  const [selected, setSelected] = useState<{ group: SkillGroup['id']; name: string }>({
    group: 'frontend',
    name: 'React',
  })

  const activeGroup = skillGroups.find((g) => g.id === selected.group) ?? skillGroups[0]
  const activeSkill = activeGroup.skills.find((s) => s.name === selected.name) ?? activeGroup.skills[0]

  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20">
      <SectionHeading
        id="skills-heading"
        eyebrow="// toolbox"
        title="Skills & Tools"
        description="Select any badge to see how long I've used it and how deep my experience goes."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        {skillGroups.map((group) => {
          const Icon = GROUP_ICONS[group.id]
          return (
            <div key={group.id} className="glass flex flex-col gap-5 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{group.label}</h3>
                <span className="ml-auto font-mono text-xs text-muted-foreground">{group.skills.length} tools</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const active = selected.group === group.id && selected.name === skill.name
                  return (
                    <li key={skill.name}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelected({ group: group.id, name: skill.name })}
                        className={cn(
                          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                          active
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-glass-border text-foreground hover:-translate-y-0.5 hover:border-indigo/60 hover:bg-indigo/10',
                        )}
                      >
                        {skill.name}
                        <span className="flex gap-0.5" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={cn(
                                'h-2.5 w-1 rounded-full',
                                n <= skill.level ? (active ? 'bg-primary' : 'bg-indigo') : 'bg-muted',
                              )}
                            />
                          ))}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      <div
        key={`${selected.group}-${selected.name}`}
        aria-live="polite"
        className="glass flex flex-col gap-4 rounded-2xl p-6 animate-in fade-in duration-300 md:flex-row md:items-center md:gap-8"
      >
        <div className="flex flex-col gap-1 md:w-56">
          <p className="font-mono text-xs text-muted-foreground">{`${activeGroup.label.toLowerCase()} / selected`}</p>
          <p className="text-2xl font-semibold text-primary">{activeSkill.name}</p>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <p className="leading-relaxed text-muted-foreground">{activeSkill.note}</p>
          <div className="flex items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
              role="meter"
              aria-label={`${activeSkill.name} proficiency`}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={activeSkill.level}
              aria-valuetext={LEVEL_LABELS[activeSkill.level]}
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${(activeSkill.level / 5) * 100}%` }}
              />
            </div>
            <span className="w-24 text-right font-mono text-xs text-foreground">{LEVEL_LABELS[activeSkill.level]}</span>
          </div>
        </div>
        <div className="flex gap-6 font-mono text-sm md:border-l md:border-glass-border md:pl-8">
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-foreground">{activeSkill.years}+</span>
            <span className="text-xs text-muted-foreground">years</span>
          </div>
        </div>
      </div>
    </section>
  )
}
