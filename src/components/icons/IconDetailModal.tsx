import { Clipboard, Copy, Download, Star, X } from 'lucide-react'
import { useEffect } from 'react'
import { getIconLabel } from '@/utils/iconLabel'

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import type { IconItem } from '@/types/icon'

const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']

function fireConfetti(e: React.MouseEvent) {
  const cx = e.clientX
  const cy = e.clientY

  const container = document.createElement('div')
  container.className = 'confetti-container'
  Object.assign(container.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9999',
  })
  document.body.appendChild(container)

  const layers = [
    { count: 12, minDist: 30,  maxDist: 80  },
    { count: 8,  minDist: 80,  maxDist: 150 },
    { count: 5,  minDist: 150, maxDist: 220 },
  ]

  const style = document.createElement('style')
  style.textContent = `
    @keyframes confetti-burst {
      0%   { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
      20%  { opacity: 1; transform: translate(calc(var(--dx)*0.3), calc(var(--dy)*0.3)) rotate(calc(var(--r)*0.3)) scale(1.3); }
      100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scale(0.2); }
    }
  `
  container.appendChild(style)

  layers.forEach(({ count, minDist, maxDist }) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      const shape = Math.random()
      const isStripe = shape > 0.7
      const isCircle = shape < 0.35

      const angle = Math.random() * Math.PI * 2
      const distance = minDist + Math.random() * (maxDist - minDist)
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance + 50

      let w: number, h: number, br: string
      if (isStripe) {
        w = 2 + Math.random() * 2
        h = 8 + Math.random() * 6; br = '1px'
        el.style.background = `linear-gradient(180deg, ${confettiColors[Math.floor(Math.random() * confettiColors.length)]}, ${confettiColors[Math.floor(Math.random() * confettiColors.length)]})`
      } else if (isCircle) {
        w = 5 + Math.random() * 3; h = w; br = '50%'
        el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      } else {
        w = 4 + Math.random() * 4; h = 4 + Math.random() * 4; br = '1px'
        el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      }

      Object.assign(el.style, {
        position: 'absolute',
        left: `${cx}px`,
        top: `${cy}px`,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: br,
        animation: `confetti-burst ${0.6 + Math.random() * 0.5}s ease-out ${Math.random() * 0.06}s forwards`,
      })
      el.style.setProperty('--dx', `${dx}px`)
      el.style.setProperty('--dy', `${dy}px`)
      el.style.setProperty('--r', `${Math.random() * 720}deg`)

      container.appendChild(el)
    }
  })

  setTimeout(() => container.remove(), 1500)
}

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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <button type="button" className="absolute inset-0" aria-label="关闭详情弹窗" onClick={onClose} />
      <div className="relative z-10 flex h-[288px] w-[640px] gap-6 rounded-[24px] bg-[var(--is-white)] p-6">
        {/* 左侧：图标展示区域 */}
        <div className="flex h-full w-[240px] shrink-0 items-center justify-center rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)]">
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
              <h2 className="text-[20px] font-bold leading-7 text-[var(--is-ink)]">{icon.name}</h2>
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
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[var(--is-ink)] px-3 py-1 text-[12px] leading-5 text-[var(--is-white)] opacity-0 transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-ink)]">
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
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[var(--is-ink)] px-3 py-1 text-[12px] leading-5 text-[var(--is-white)] opacity-0 transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-ink)]">
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

          {/* 关键词 */}
          <div className="mt-4">
            <p className="text-[14px] font-normal leading-[22px] text-[var(--is-ink-soft)]">{t.modal.keywords}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {icon.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-[6px] bg-[var(--is-code-bg)] px-3 py-1 text-[12px] leading-[20px] text-[var(--is-ink-soft)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 操作按钮 - 底部，间距 24px */}
          <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
            <button
              type="button"
              onClick={(e) => { onCopy(); fireConfetti(e) }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[var(--is-ink)] text-[16px] leading-6 text-[var(--is-white)] transition hover:-translate-y-0.5 hover:shadow-md"
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
