type FeaturePanelProps = {
  title: string
  description: string
  value: string
}

export function FeaturePanel({ title, description, value }: FeaturePanelProps) {
  return (
    <article className="ds-panel p-8">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--ds-neutral)]">{title}</p>
      <p className="font-display mt-2 text-4xl font-bold text-[var(--ds-ink)]">{value}</p>
      <p className="mt-2 text-sm leading-8 text-[var(--ds-ink-soft)]">{description}</p>
    </article>
  )
}
