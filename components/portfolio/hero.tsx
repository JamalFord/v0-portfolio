'use client'

import { ArrowDownRight, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/portfolio-data'
import { useContact } from './contact-dialog'
import { SocialLinks } from './social-links'
import { TerminalWidget } from './terminal-widget'

export function Hero() {
  const { openContact } = useContact()

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-32 pb-20 md:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28"
    >
      <div className="flex flex-col items-start gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span className="glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" />
          {profile.location}
        </span>
        <div className="flex flex-col gap-3">
          <h1 id="hero-heading" className="text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="font-mono text-lg text-primary sm:text-xl">
            {'<'}
            <span className="text-foreground">{profile.title}</span>
            {' />'}
          </p>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{profile.tagline}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            className="h-12 px-6 text-base"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects
            <ArrowDownRight aria-hidden="true" />
          </Button>
          <Button variant="outline" size="lg" className="glass h-12 px-6 text-base" onClick={openContact}>
            <Mail aria-hidden="true" />
            Contact Me
          </Button>
        </div>
        <SocialLinks />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-6 delay-150 duration-700 fill-mode-both">
        <TerminalWidget />
      </div>
    </section>
  )
}
