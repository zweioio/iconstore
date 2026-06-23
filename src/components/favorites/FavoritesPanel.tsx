import { Download, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import JSZip from 'jszip'

import { IconCard } from '@/components/icons/IconCard'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import { translations } from '@/i18n'
import { icons } from '@/data/icons'
import { getIconSvg, createDownloadName } from '@/utils/iconLibrary'

type FavoritesPanelProps = {
  open: boolean
  onClose: () => void
  onPreview: (iconId: string, style: 'linear' | 'filled') => void
  onToggleFavorite: (favKey: string) => void
}

export function FavoritesPanel({ open, onClose, onPreview, onToggleFavorite }: FavoritesPanelProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { favoriteIds, iconSize, strokeWidth, iconColor, selectedIconId, setSelectedIconId, clearFavorites } = useIconLibraryStore()
  const [confirmClear, setConfirmClear] = useState(false)

  const favoriteItems = useMemo(() => {
    const items: { icon: typeof icons[number]; style: 'linear' | 'filled' }[] = []
    favoriteIds.forEach((favId) => {
      const sepIdx = favId.lastIndexOf('-')
      if (sepIdx === -1) return
      const iconId = favId.slice(0, sepIdx)
      const style = favId.slice(sepIdx + 1) as 'linear' | 'filled'
      const icon = icons.find((i) => i.id === iconId)
      if (icon) items.push({ icon, style })
    })
    return items
  }, [favoriteIds])

  async function handleBatchDownload() {
    if (favoriteItems.length === 0) return
    const zip = new JSZip()
    favoriteItems.forEach(({ icon, style }) => {
      const svg = getIconSvg(icon, style, strokeWidth, iconColor)
      const fileName = createDownloadName(icon, style)
      zip.file('iconstoreSVG/' + fileName, svg)
    })
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'iconstore-favorites.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (<>
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-300 ease-out ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ height: '450px' }}
    >
      {/* 面板内容 */}
      <div className="flex h-full flex-col mx-auto max-w-[1200px] rounded-t-[16px] bg-[var(--is-white)]" style={{ boxShadow: '0 6px 32px rgba(0,0,0,0.05), 0 0 0 1px var(--is-border)' }}>
        {/* 标题栏 */}
        <div className="flex shrink-0 items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-[16px] leading-6 text-[var(--is-ink)]">
              {t.controls.favorites}
            </span>
            <span className="rounded-[8px] bg-[var(--is-surface)] px-3 py-0.5 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{favoriteItems.length}</span>
          </div>
          <div className="flex items-center gap-3">
            {favoriteItems.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleBatchDownload}
                  className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 text-[14px] leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
                >
                  <Download size={16} />
                  下载全部 SVG
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 text-[14px] leading-[22px] text-[#d32f2f] transition hover:bg-[#fbe9e7]"
                >
                  <Trash2 size={16} />
                  清空全部
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        {/* 图标列表 — 和图标网格一致的 10 列布局 */}
        <div className="flex-1 pb-12">
          {favoriteItems.length === 0 ? (
            <p className="py-8 text-center text-[14px] leading-[22px] text-[var(--is-ink-faint)]">
              暂无收藏图标，点击图标上的星标即可收藏
            </p>
          ) : (
            <div className="grid min-w-[1200px] grid-cols-10 gap-y-8">
              {favoriteItems.map(({ icon, style }) => {
                const svg = getIconSvg(icon, style, strokeWidth, iconColor)
                const favKey = icon.id + '-' + style
                return (
                  <IconCard
                    key={favKey}
                    icon={icon}
                    svg={svg}
                    iconSize={iconSize}
                    isFavorite={true}
                    hideFavoriteStar
                    isSelected={selectedIconId === icon.id}
                    onPreview={() => onPreview(icon.id, style)}
                    onToggleFavorite={() => onToggleFavorite(favKey)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    {confirmClear && (
      <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(0,0,0,0.4)]" onClick={() => setConfirmClear(false)}>
        <div className="relative z-10 w-[360px] rounded-[16px] bg-[var(--is-white)] p-6 shadow-[0_6px_32px_rgba(0,0,0,0.1)]" onClick={(e) => e.stopPropagation()}>
          <p className="text-[18px] font-bold leading-7 text-[var(--is-ink)]">{t.controls.clearAll}</p>
          <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{t.settings.confirmClearTitle.replace('{count}', String(favoriteIds.length))}</p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setConfirmClear(false)}
              className="inline-flex h-10 items-center rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-5 text-[14px] leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
            >
              {t.settings.confirmClearCancel}
            </button>
            <button
              type="button"
              onClick={() => { clearFavorites(); setConfirmClear(false) }}
              className="inline-flex h-10 items-center rounded-[10px] bg-[var(--is-ink)] px-5 text-[14px] leading-[22px] text-[var(--is-white)] transition hover:opacity-90"
            >
              {t.settings.confirmClearConfirm}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
