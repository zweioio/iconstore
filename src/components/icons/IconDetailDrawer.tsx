import { Copy, Download, X } from 'lucide-react'

import { IconPreview } from '@/components/icons/IconPreview'
import { categoryLabels } from '@/data/icons'
import { cn } from '@/lib/utils'
import type { IconItem, IconStyleMode, PreviewBackground } from '@/types/icon'

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
  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[rgba(0,0,0,0.04)] backdrop-blur-sm">
      <button type="button" className="flex-1" aria-label="关闭详情面板" onClick={onClose} />
      <aside className="relative h-full w-full max-w-xl overflow-y-auto border-l border-[var(--ds-border)] bg-transparent p-8">
        <button
          type="button"
          onClick={onClose}
          className="ds-icon-button absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center"
          aria-label="关闭"
        >
          <X size={16} />
        </button>

        <div className="space-y-8 pt-14">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--ds-neutral)]">Icon Detail</p>
            <h2 className="font-display text-4xl font-bold text-[var(--ds-ink)]">{icon.name}</h2>
            <p className="text-sm leading-8 text-[var(--ds-ink-soft)]">
              分类属于 {categoryLabels[icon.category]}，当前展示风格为
              {styleMode === 'linear' ? '线性' : '面型'}
            </p>
          </div>

          <div className="ds-panel-strong p-8">
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
                  ? 'border-[var(--ds-ink)] bg-[rgba(0,0,0,0.04)] text-[var(--ds-ink)]'
                  : 'border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-ink-soft)]',
              )}
            >
              线性
            </button>
            <button
              type="button"
              onClick={() => onStyleChange('filled')}
              className={cn(
                'rounded-[5px] border px-8 py-2 text-sm transition',
                styleMode === 'filled'
                  ? 'border-[var(--ds-ink)] bg-[rgba(0,0,0,0.04)] text-[var(--ds-ink)]'
                  : 'border-[var(--ds-border)] bg-[var(--ds-surface)] text-[var(--ds-ink-soft)]',
              )}
            >
              面型
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onCopy}
              className="ds-button-primary inline-flex items-center justify-center gap-2 text-sm"
            >
              <Copy size={16} />
              复制 SVG
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="ds-button-secondary inline-flex items-center justify-center gap-2 text-sm"
            >
              <Download size={16} />
              下载 SVG
            </button>
          </div>

          <div className="ds-panel-strong p-4">
            <p className="text-sm text-[var(--ds-ink)]">关键词</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {icon.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="ds-chip text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="ds-code p-4">
            <p className="mb-2 text-sm text-[var(--ds-neutral)]">当前 SVG 代码</p>
            <pre className="overflow-x-auto text-xs leading-8 text-[var(--ds-neutral)]">
              <code>{svg}</code>
            </pre>
          </div>
        </div>
      </aside>
    </div>
  )
}
