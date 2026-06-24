import { Copy, Download, Star, X } from 'lucide-react'
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
  styleMode: 'linear' | 'filled'
  isFavorite: boolean
  onClose: () => void
  onCopy: () => void
  onCopyName: (name: string) => void
  onDownload: () => void
  onToggleFavorite: () => void
  onStyleChange?: (style: 'linear' | 'filled') => void
}

export function IconDetailModal({
  icon,
  svg,
  styleMode,
  isFavorite,
  onClose,
  onCopy,
  onCopyName,
  onDownload,
  onToggleFavorite,
  onStyleChange,
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
        <div className="relative flex h-full w-[240px] shrink-0 items-center justify-center rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)]">
          <div
            className="icon-preview flex h-[120px] w-[120px] items-center justify-center text-[var(--is-ink)]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          {/* 风格切换 tab - 叠在图标区域下方 */}
          {onStyleChange && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 inline-flex h-8 items-center rounded-full bg-[var(--is-code-bg)] p-0.5">
              <button
                type="button"
                onClick={() => onStyleChange('linear')}
                className={`inline-flex h-full items-center rounded-full px-3 text-[12px] leading-none transition ${
                  styleMode === 'linear'
                    ? 'bg-[var(--is-white)] text-[var(--is-ink)] shadow-sm'
                    : 'text-[var(--is-ink-soft)] hover:text-[var(--is-ink)]'
                }`}
              >
                {t.modal.linear}
              </button>
              <button
                type="button"
                onClick={() => onStyleChange('filled')}
                className={`inline-flex h-full items-center rounded-full px-3 text-[12px] leading-none transition ${
                  styleMode === 'filled'
                    ? 'bg-[var(--is-white)] text-[var(--is-ink)] shadow-sm'
                    : 'text-[var(--is-ink-soft)] hover:text-[var(--is-ink)]'
                }`}
              >
                {t.modal.filled}
              </button>
            </div>
          )}
        </div>

        {/* 右侧：详情信息 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* 图标名称 + 分类 + 操作按钮 */}
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1 space-y-1">
              <button
                type="button"
                onClick={() => onCopyName(icon.name + (styleMode === 'filled' ? '_fill' : '_line'))}
                className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-left text-[18px] font-bold leading-7 text-[var(--is-ink)]"
                aria-label="复制图标名称"
              >
                {icon.name}{styleMode === 'filled' ? '_fill' : '_line'}
              </button>
              <p className="text-[14px] leading-[22px] text-[var(--is-ink)]">
                {getIconLabel(icon.name, language)}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="group relative">
                <button
                  type="button"
                  onClick={() => onCopyName(icon.name + (styleMode === 'filled' ? '_fill' : '_line'))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
                  aria-label="复制图标名称"
                >
                  <Copy size={16} />
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
                      ? 'text-[var(--is-yellow)] hover:bg-[var(--is-surface)] hover:text-[var(--is-yellow)]'
                      : 'text-[var(--is-ink-muted)] hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]',
                  )}
                  aria-label={isFavorite ? t.card.unfavorite : t.card.favorite}
                >
                  <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[6px] bg-[var(--is-ink)] px-3 py-1 text-[12px] leading-5 text-[var(--is-white)] opacity-0 transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-ink)]">
                  {isFavorite ? t.card.unfavorite : t.card.favorite}
                </span>
              </div>
            </div>
          </div>

          {/* 关键词 */}
          <div className="mt-4">
            <p className="mb-1 text-[12px] leading-[20px] text-[var(--is-ink-muted)]">{t.modal.keywords}</p>
            <div className="flex flex-wrap gap-2 overflow-hidden" style={{ maxHeight: '64px' }}>
              {icon.keywords.filter((kw) => {
                if (kw === icon.name) return false
                const parts = icon.name.split('-')
                return !parts.some((p) => p.toLowerCase() === kw.toLowerCase() && p !== kw)
              }).sort((a, b) => {
                // 按语言分组：英文 → 中日 → 韩文，同组保持原始顺序
                const isAEn = /^[a-zA-Z]+$/.test(a)
                const isBEn = /^[a-zA-Z]+$/.test(b)
                if (isAEn && !isBEn) return -1
                if (!isAEn && isBEn) return 1
                const isAKo = /[\uAC00-\uD7AF]/.test(a)
                const isBKo = /[\uAC00-\uD7AF]/.test(b)
                if (isAKo && !isBKo) return 1
                if (!isAKo && isBKo) return -1
                return 0
              }).map((keyword) => (
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
          <div className="mt-auto grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={(e) => { onCopy(); fireConfetti(e) }}
              className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[12px] bg-[var(--is-ink)] text-[14px] leading-[22px] text-[var(--is-white)]"
            >
              <Copy size={16} />
              {t.modal.copySVG}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] text-[14px] leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
            >
              <Download size={16} />
              {t.modal.downloadSVG}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
