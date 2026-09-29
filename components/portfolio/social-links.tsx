import { cn } from '@/lib/utils'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon, XBrandIcon } from './brand-icons'

const links = [
  { label: 'GitHub', href: profile.socials.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: 'Twitter / X', href: profile.socials.twitter, Icon: XBrandIcon },
]

export function SocialLinks({ className, showLabels = false }: { className?: string; showLabels?: boolean }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={showLabels ? undefined : label}
            className={cn(
              'glass flex items-center gap-2 rounded-lg text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
              showLabels ? 'px-4 py-2.5 text-sm' : 'size-9 justify-center',
            )}
          >
            <Icon className="size-4" />
            {showLabels ? <span>{label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  )
}
