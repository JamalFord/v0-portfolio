'use server'

export type ContactState = {
  status: 'idle' | 'error' | 'success'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
  fields?: { name: string; email: string; message: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: ContactState['errors'] = {}
  if (name.length < 2 || name.length > 80) errors.name = 'Please enter your name (2–80 characters).'
  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = 'Please enter a valid email address.'
  if (message.length < 10 || message.length > 2000)
    errors.message = 'Message should be between 10 and 2000 characters.'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      errors,
      fields: { name, email, message },
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    status: 'success',
    message: `Thanks, ${name.split(' ')[0]}! Your message is on its way — expect a reply within 48 hours.`,
  }
}
