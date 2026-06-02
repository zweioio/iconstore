import { Copy, Download, X } from 'lucide-react'

import { IconPreview } from '@/components/icons/IconPreview'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import type { IconItem, IconStyleMode, PreviewBackground } from '@/types/icon'
import type { Language } from '@/store/useLanguageStore'

const i18n: Record<Language, typeof zh> = { zh, en }

type IconDetailDrawerProps = {
  icon: IconItem | null
  svg: string
  styleMode: IconStyleMode
  background: PreviewBackground
  onClose: () => void
  onStyleChange: (value: IconStyleMode) => void
  onCopy: () => void
  onDownload: () => void
}

export function IconDetailDrawer({
  icon,
  svg,
  styleMode,
  background,
  onClose,
  onStyleChange,
  onCopy,
  onDownload,
}: IconDetailDrawerProps) {
  const { language } = useLanguageStore()
  const t = i18n[language]

  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,0.04)] backdrop-blur-sm">
      <button type="button" className="flex-1" aria-label={t.modal.close} onClick={onClose} />
      <aside className="relative h-full w-full max-w-xl overflow-y-auto border-l border-[var(--is-border)] bg-transparent p-8">
        <button
          type="button"
          onClick={onClose}
          className="is-icon-button absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center"
          aria-label={t.modal.close}
        >
          <X size={16} />
        </button>

        <div className="space-y-8 pt-14">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--is-ink-faint)]">Icon Detail</p>
            <h2 className="font-display text-4xl font-bold text-[var(--is-ink)]">{icon.name}</h2>
            <p className="text-sm leading-8 text-[var(--is-ink-soft)]">
              {t.drawer.category} {t.categories[icon.category] || icon.category}，{t.drawer.style}
              {styleMode === 'linear' ? t.modal.linear : t.modal.filled}
            </p>
          </div>

          <div className="is-panel p-8">
            <div className="flex justify-center">
              <IconPreview svg={svg} name={icon.name} background={background} size="lg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onStyleChange('linear')}
              className={cn(
                'rounded-[5px] border px-8 py-2 text-sm transition',
                styleMode === 'linear'
                  ? 'border-[var(--is-ink)] bg-[rgba(0,0,0,0.04)] text-[var(--is-ink)]'
                  : 'border-[var(--is-border)] bg-[var(--is-surface)] text-[var(--is-ink-soft)]',
              )}
            >
              {t.modal.linear}
            </button>
            <button
              type="button"
              onClick={() => onStyleChange('filled')}
              className={cn(
                'rounded-[5px] border px-8 py-2 text-sm transition',
                styleMode === 'filled'
                  ? 'border-[var(--is-ink)] bg-[rgba(0,0,0,0.04)] text-[var(--is-ink)]'
                  : 'border-[var(--is-border)] bg-[var(--is-surface)] text-[var(--is-ink-soft)]',
              )}
            >
              {t.modal.filled}
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onCopy}
              className="is-button-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <Copy size={16} />
              {t.modal.copySVG}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="is-button-secondary inline-flex items-center justify-center gap-2 text-sm"
            >
              <Download size={16} />
              {t.modal.downloadSVG}
            </button>
          </div>

          <div className="is-panel p-4">
            <p className="text-sm text-[var(--is-ink)]">{t.modal.keywords}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {icon.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="is-chip text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="is-code p-4">
            <p className="mb-2 text-sm text-[var(--is-ink-faint)]">{t.modal.svgCode}</p>
            <pre className="overflow-x-auto text-xs leading-8 text-[var(--is-ink-faint)]">
              <code>{svg}</code>
            </pre>
          </div>
        </div>
      </aside>
    </div>
  )
}
