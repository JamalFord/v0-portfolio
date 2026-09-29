'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/portfolio-data'
import { useContact } from './contact-dialog'

const navItems = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { openContact } = useContact()

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`glass mx-auto flex max-w-6xl flex-col rounded-2xl px-4 py-3 md:flex-row md:items-center md:justify-between ${menuOpen ? 'bg-popover/95! md:bg-glass!' : ''}`}
      >
        <div className="flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-medium">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              AR
            </span>
            <span className="text-foreground">{profile.handle}</span>
            <span className="text-primary">.dev</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        <div
          id="mobile-nav"
          className={`${menuOpen ? 'flex' : 'hidden'} flex-col gap-1 pt-3 md:flex md:flex-row md:items-center md:gap-1 md:pt-0`}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Button
            className="mt-2 h-9 px-4 md:mt-0 md:ml-2"
            onClick={() => {
              setMenuOpen(false)
              openContact()
            }}
          >
            Hire me
          </Button>
        </div>
      </nav>
    </header>
  )
}
