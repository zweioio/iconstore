import { Clipboard, Copy, Download, Star, X } from 'lucide-react'
import { getIconLabel } from '@/utils/iconLabel'

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import type { IconItem } from '@/types/icon'

type IconDetailModalProps = {
  icon: IconItem | null
  svg: string
  isFavorite: boolean
  onClose: () => void
  onCopy: () => void
  onCopyName: () => void
  onDownload: () => void
  onToggleFavorite: () => void
}

export function IconDetailModal({
  icon,
  svg,
  isFavorite,
  onClose,
  onCopy,
  onCopyName,
  onDownload,
  onToggleFavorite,
}: IconDetailModalProps) {
  const { language } = useLanguageStore()
  const t = translations[language]

  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <button type="button" className="absolute inset-0" aria-label="关闭详情弹窗" onClick={onClose} />
      <div className="relative z-10 flex gap-6 rounded-[24px] bg-[var(--is-white)] p-6">
        {/* 左侧：图标展示区域 240×240 */}
        <div className="flex h-[240px] w-[240px] shrink-0 items-center justify-center self-center rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)]">
          <div
            className="icon-preview flex h-[120px] w-[120px] items-center justify-center text-[var(--is-ink)]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        {/* 右侧：详情信息 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* 图标名称 + 分类 + 操作按钮 */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-[20px] font-normal leading-7 text-[var(--is-ink)]">{icon.name}</h2>
              <p className="text-[14px] leading-[22px] text-[var(--is-ink)]">
                {getIconLabel(icon.name, language)}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="group relative">
                <button
                  type="button"
                  onClick={onCopyName}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
                  aria-label="复制图标名称"
                >
                  <Clipboard size={16} />
                </button>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[var(--is-ink)] px-3 py-1 text-[12px] leading-5 text-white opacity-0 transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-ink)]">
                  {t.modal.copyName}
                </span>
              </div>
              <div className="group relative">
                <button
                  type="button"
                  onClick={onToggleFavorite}
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-[8px] transition',
                    isFavorite
                      ? 'text-[var(--is-yellow)] hover:text-[var(--is-yellow)]'
                      : 'text-[var(--is-ink-muted)] hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]',
                  )}
                  aria-label={isFavorite ? '取消收藏' : '收藏'}
                >
                  <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[var(--is-ink)] px-3 py-1 text-[12px] leading-5 text-white opacity-0 transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-ink)]">
                  {isFavorite ? t.card.unfavorite : t.card.favorite}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
                aria-label="关闭"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 关键词 - 间距 24px */}
          <div className="mt-6">
            <p className="text-[14px] font-normal leading-[22px] text-[var(--is-ink-soft)]">{t.modal.keywords}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {icon.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-[6px] bg-[var(--is-code-bg)] px-3 py-1 text-[12px] leading-[22px] text-[var(--is-ink-soft)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 操作按钮 - 底部，间距 24px */}
          <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[var(--is-ink)] text-[16px] leading-6 text-white transition hover:bg-[var(--is-ink-soft)]"
            >
              <Copy size={20} />
              {t.modal.copySVG}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] text-[16px] leading-6 text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
            >
              <Download size={20} />
              {t.modal.downloadSVG}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
