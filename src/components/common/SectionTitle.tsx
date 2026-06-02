type SectionTitleProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl space-y-4">
      {/* 标题层级加大，增强首屏品牌感和浏览站点的视觉冲击力 */}
      <p className="text-sm font-medium text-[var(--ds-accent)]">{eyebrow}</p>
      <h2 className="font-display text-5xl font-bold leading-[1.02] text-[var(--ds-ink)] md:text-6xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-[var(--ds-ink-soft)] md:text-lg">{description}</p>
    </div>
  )
}
