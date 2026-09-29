export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-sm text-primary">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl leading-relaxed text-pretty text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
