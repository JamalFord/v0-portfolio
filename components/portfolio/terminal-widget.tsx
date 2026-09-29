'use client'

import { useEffect, useRef, useState } from 'react'
import { profile, projects, skillGroups } from '@/lib/portfolio-data'
import { useContact } from './contact-dialog'

type Line = { id: number; kind: 'input' | 'output' | 'accent' | 'error'; text: string }

const CURRENT_TASKS = [
  'fine-tuning retrieval evals',
  'refactoring a streaming API',
  'reviewing a PR on docmind',
  'sketching a WebGPU demo',
  'writing a blog post on RAG',
]

const QUICK_COMMANDS = ['whoami', 'status', 'skills', 'contact']

let lineId = 0
const line = (kind: Line['kind'], text: string): Line => ({ id: ++lineId, kind, text })

const BOOT_LINES: Line[] = [
  line('input', 'whoami'),
  line('output', `${profile.name} — ${profile.title}`),
  line('input', 'status --live'),
  line('accent', '● online · open to new opportunities'),
  line('output', "type 'help' to see available commands"),
]

export function TerminalWidget() {
  const { openContact } = useContact()
  const [lines, setLines] = useState<Line[]>(BOOT_LINES)
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [now, setNow] = useState<Date | null>(null)
  const [taskIndex, setTaskIndex] = useState(0)
  const [commits, setCommits] = useState(1284)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNow(new Date())
    const clock = setInterval(() => setNow(new Date()), 1000)
    const tasks = setInterval(() => setTaskIndex((i) => (i + 1) % CURRENT_TASKS.length), 4000)
    const commitTicker = setInterval(() => setCommits((c) => c + 1), 9000)
    return () => {
      clearInterval(clock)
      clearInterval(tasks)
      clearInterval(commitTicker)
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory((h) => [...h, cmd])
    setHistoryIndex(null)

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const out: Line[] = [line('input', cmd)]
    switch (cmd) {
      case 'help':
        out.push(line('output', 'whoami · status · skills · projects · socials · contact · clear'))
        break
      case 'whoami':
        out.push(line('output', `${profile.name} — ${profile.title}, based in ${profile.location}.`))
        break
      case 'status':
        out.push(line('accent', `● online · currently ${CURRENT_TASKS[taskIndex]}`))
        out.push(line('output', `${commits.toLocaleString('en-US')} commits this year · coffee level: high`))
        break
      case 'skills':
        skillGroups.forEach((g) =>
          out.push(line('output', `${g.label.padEnd(15, ' ')}${g.skills.slice(0, 4).map((s) => s.name).join(', ')}`)),
        )
        break
      case 'projects':
        projects.forEach((p) => out.push(line('output', `→ ${p.title} [${p.category}]`)))
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'socials':
        out.push(line('output', profile.socials.github))
        out.push(line('output', profile.socials.linkedin))
        out.push(line('output', profile.socials.twitter))
        break
      case 'contact':
        out.push(line('accent', 'opening secure channel…'))
        openContact()
        break
      case 'sudo hire jordan':
        out.push(line('accent', 'permission granted. great choice.'))
        openContact()
        break
      default:
        out.push(line('error', `command not found: ${cmd}. try 'help'`))
    }
    setLines((prev) => [...prev, ...out].slice(-40))
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      run(value)
      setValue('')
    } else if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault()
      const next = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(next)
      setValue(history[next])
    } else if (e.key === 'ArrowDown' && historyIndex !== null) {
      e.preventDefault()
      const next = historyIndex + 1
      if (next >= history.length) {
        setHistoryIndex(null)
        setValue('')
      } else {
        setHistoryIndex(next)
        setValue(history[next])
      }
    }
  }

  const time = now
    ? now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    : '--:--:--'

  return (
    <div className="glass w-full overflow-hidden rounded-2xl font-mono text-sm shadow-2xl shadow-indigo/10">
      <div className="flex items-center justify-between border-b border-glass-border px-4 py-3">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-destructive/80" />
          <span className="size-3 rounded-full bg-muted-foreground/40" />
          <span className="size-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-xs text-muted-foreground">~/jordan — zsh</span>
        <span className="text-xs tabular-nums text-muted-foreground">{time}</span>
      </div>

      <dl className="grid grid-cols-2 gap-px border-b border-glass-border bg-glass-border text-xs">
        <div className="flex flex-col gap-1 bg-background/60 px-4 py-3">
          <dt className="text-muted-foreground">status</dt>
          <dd className="flex items-center gap-2 text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            available
          </dd>
        </div>
        <div className="flex flex-col gap-1 bg-background/60 px-4 py-3">
          <dt className="text-muted-foreground">commits · 2026</dt>
          <dd className="tabular-nums text-foreground">{commits.toLocaleString('en-US')}</dd>
        </div>
        <div className="col-span-2 flex flex-col gap-1 bg-background/60 px-4 py-3">
          <dt className="text-muted-foreground">currently</dt>
          <dd key={taskIndex} className="truncate text-indigo-foreground animate-in fade-in slide-in-from-bottom-1" aria-live="polite">
            {CURRENT_TASKS[taskIndex]}
          </dd>
        </div>
      </dl>

      <div
        ref={scrollRef}
        className="flex h-52 cursor-text flex-col gap-1 overflow-y-auto px-4 py-3"
        onClick={() => inputRef.current?.focus()}
        role="log"
        aria-label="Terminal output"
      >
        {lines.map((l) => (
          <p
            key={l.id}
            className={
              l.kind === 'input'
                ? 'text-foreground'
                : l.kind === 'accent'
                  ? 'text-primary'
                  : l.kind === 'error'
                    ? 'text-destructive'
                    : 'text-muted-foreground'
            }
          >
            {l.kind === 'input' ? <span className="text-indigo">{'$ '}</span> : null}
            <span className="break-words whitespace-pre-wrap">{l.text}</span>
          </p>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-indigo" aria-hidden="true">
            $
          </span>
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type a command…"
            className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-glass-border px-4 py-3">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => run(cmd)}
            className="rounded-md border border-glass-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}
