'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/portfolio-data'
import { useContact } from './contact-dialog'
import { SocialLinks } from './social-links'

export function ContactSection() {
  const { openContact } = useContact()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-6xl px-4 py-20">
      <div className="glass flex flex-col items-center gap-8 rounded-3xl px-6 py-14 text-center md:px-16 md:py-20">
        <p className="font-mono text-sm text-primary">{'// say hello'}</p>
        <h2 id="contact-heading" className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Have a project or role in mind?
        </h2>
        <p className="max-w-xl leading-relaxed text-pretty text-muted-foreground">
          {"I'm currently open to full-time roles and select freelance work in full-stack and applied AI. I usually reply within two days."}
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="h-12 w-full px-6 text-base sm:w-auto" onClick={openContact}>
            <Mail aria-hidden="true" />
            Contact Me
          </Button>
          <Button variant="outline" size="lg" className="glass h-12 w-full px-6 font-mono text-sm sm:w-auto" onClick={copyEmail}>
            {copied ? <Check className="text-primary" aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Copied!' : profile.email}</span>
          </Button>
        </div>
        <SocialLinks showLabels className="justify-center" />
      </div>
    </section>
  )
}
