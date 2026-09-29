'use client'

import { createContext, startTransition, useActionState, useCallback, useContext, useMemo, useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { sendContactMessage, type ContactState } from '@/app/actions/contact'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/lib/portfolio-data'
import { SocialLinks } from './social-links'

type ContactContextValue = { openContact: () => void }

const ContactContext = createContext<ContactContextValue | null>(null)

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContact must be used within ContactProvider')
  return ctx
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const openContact = useCallback(() => {
    setFormKey((k) => k + 1)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openContact }), [openContact])

  return (
    <ContactContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass gap-6 rounded-2xl bg-popover/80 p-6 sm:max-w-lg">
          <DialogHeader>
            <p className="font-mono text-xs text-primary">{'// new message'}</p>
            <DialogTitle className="text-xl font-semibold">{"Let's build something"}</DialogTitle>
            <DialogDescription className="leading-relaxed">
              {'Tell me about your project, role, or idea. You can also email '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </DialogDescription>
          </DialogHeader>
          <ContactForm key={formKey} onDone={() => setOpen(false)} />
          <div className="flex flex-col gap-3 border-t border-glass-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted-foreground">Or find me on</span>
            <SocialLinks />
          </div>
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  )
}

const initialState: ContactState = { status: 'idle' }

function ContactForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState)
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  const update = (key: keyof typeof fields, value: string) => setFields((f) => ({ ...f, [key]: value }))

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center" role="status">
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <p className="text-pretty leading-relaxed">{state.message}</p>
        <Button variant="outline" onClick={onDone}>
          Close
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        startTransition(() => formAction(data))
      }}
      className="flex flex-col gap-4"
      noValidate
    >
      <Field
        id="contact-name"
        label="Name"
        error={state.errors?.name}
        input={
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            required
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? 'contact-name-error' : undefined}
            className="h-10"
          />
        }
      />
      <Field
        id="contact-email"
        label="Email"
        error={state.errors?.email}
        input={
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ada@example.com"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            required
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? 'contact-email-error' : undefined}
            className="h-10"
          />
        }
      />
      <Field
        id="contact-message"
        label="Message"
        error={state.errors?.message}
        input={
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Hi Alex, I'd love to chat about..."
            value={fields.message}
            onChange={(e) => update("message", e.target.value)}
            required
            aria-invalid={Boolean(state.errors?.message)}
            aria-describedby={state.errors?.message ? 'contact-message-error' : undefined}
            className="min-h-28 resize-y"
          />
        }
      />
      {state.status === 'error' && state.message ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending} className="h-11 text-sm">
        {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {pending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  input,
}: {
  id: string
  label: string
  error?: string
  input: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {input}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
