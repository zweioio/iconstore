import { Download, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import JSZip from 'jszip'

import { WheatDecoration } from '@/components/icons/WheatDecoration'

import { IconCard } from '@/components/icons/IconCard'
import { IconControls } from '@/components/icons/IconControls'
import { IconDetailModal } from '@/components/icons/IconDetailModal'
import { IconSettingsPanel } from '@/components/icons/IconSettingsPanel'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import { categoryLabels } from '@/data/icons'
import { icons } from '@/data/icons'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import { createDownloadName, filterIcons, getIconSvg } from '@/utils/iconLibrary'
import { categoryOrder } from '@/data/categories'

export default function IconLibraryPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const {
    keyword,
    category,
    viewMode,
    styleMode,
    iconSize,
    strokeWidth,
    favoriteIds,
    selectedIconId,
    setSelectedIconId,
    toggleFavorite,
    clearFavorites,
  } = useIconLibraryStore()
  const [feedback, setFeedback] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<'linear' | 'filled'>('linear')
  const [confirmClear, setConfirmClear] = useState(false)

  // 滚动到对应分类的分组
  function scrollToCategory(cat: string) {
    const el = document.getElementById(`category-${cat}`)
    if (el) {
      const yOffset = -80 // 吸顶搜索栏的偏移
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // 搜索模式下不受分类筛选影响
  const filteredIcons = useMemo(
    () => filterIcons(icons, keyword, keyword.trim() ? 'all' : 'all'),
    [keyword],
  )

  const favoriteIconIds = useMemo(() => new Set(favoriteIds), [favoriteIds])
  const visibleIcons = useMemo(() => {
    if (viewMode === 'favorites') {
      return filteredIcons.filter((icon) => favoriteIconIds.has(icon.id + '-linear') || favoriteIconIds.has(icon.id + '-filled'))
    }

    return filteredIcons
  }, [favoriteIconIds, filteredIcons, viewMode])

  const selectedIcon = icons.find((icon) => icon.id === selectedIconId) ?? null
  const selectedSvg = selectedIcon ? getIconSvg(selectedIcon, selectedStyle, strokeWidth) : ''

  function handlePreview(iconId: string, style: 'linear' | 'filled') {
    setSelectedIconId(iconId)
    setSelectedStyle(style)
  }

  // ↑↓ 键盘导航
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!selectedIconId) return
      const idx = visibleIcons.findIndex((icon) => icon.id === selectedIconId)
      if (idx === -1) return
      if (e.key === 'ArrowDown' && idx < visibleIcons.length - 1) {
        e.preventDefault()
        setSelectedIconId(visibleIcons[idx + 1].id)
        setSelectedStyle(selectedStyle)
      }
      if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault()
        setSelectedIconId(visibleIcons[idx - 1].id)
        setSelectedStyle(selectedStyle)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedIconId, visibleIcons, setSelectedIconId])

  // 按分类分组图标（搜索模式下不受 category 筛选影响）
  const groupedIcons = useMemo(() => {
    if (viewMode === 'favorites') {
      // 收藏夹模式下不分组
      return null
    }
    // 使用 filterIcons 统一过滤逻辑（keyword 存在时 category 为 'all'）
    const searchFiltered = filterIcons(icons, keyword, keyword.trim() ? 'all' : 'all')
    const groups: { category: string; label: string; icons: typeof searchFiltered }[] = []
    const temp: Record<string, typeof searchFiltered> = {}
    searchFiltered.forEach((icon) => {
      const cat = icon.category
      if (!temp[cat]) temp[cat] = []
      temp[cat].push(icon)
    })
    categoryOrder.forEach((cat) => {
      if (temp[cat]) {
        groups.push({ category: cat, label: t.categories[cat] || cat, icons: temp[cat] })
      }
    })
    return groups
  }, [icons, viewMode, keyword, category, t.categories])

  const metricItems = [
    { value: '1,600+', label: t.metrics.iconCount },
    { value: '100%', label: t.metrics.free },
    { value: '2.3K', label: t.metrics.githubStars },
  ]

  async function handleCopy(svg: string, styledName: string) {
    // currentColor 在 Figma 中不生效，替换为实际颜色值
    const svgForClipboard = svg
      .replace(/<title>.*?<\/title>/, `<title>${styledName}</title>`)
      .replace(/currentColor/g, '#202224')
    try {
      await navigator.clipboard.writeText(svgForClipboard)
      setFeedback(t.modal.copied)
      window.setTimeout(() => setFeedback(''), 1800)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = svgForClipboard
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setFeedback(t.modal.copied)
      window.setTimeout(() => setFeedback(''), 1800)
    }
  }

  function handleDownload(name: string, svg: string) {
    const svgWithColor = svg.replace(/currentColor/g, '#202224')
    const blob = new Blob([svgWithColor], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
    URL.revokeObjectURL(url)
    setFeedback(t.modal.downloaded)
    window.setTimeout(() => setFeedback(''), 1800)
  }

  async function handleDownloadAll() {
    const zip = new JSZip()
    favoriteIds.forEach((favId) => {
      const sepIdx = favId.lastIndexOf('-')
      const iconId = favId.slice(0, sepIdx)
      const style = favId.slice(sepIdx + 1) as 'linear' | 'filled'
      const icon = icons.find((i) => i.id === iconId)
      if (!icon) return
      const svg = getIconSvg(icon, style, 1.8).replace(/currentColor/g, '#202224')
      const fileName = `${icon.name}_${style === 'filled' ? 'fill' : 'line'}.svg`
      zip.file('iconstoreSVG/' + fileName, svg)
    })
    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'iconstoreSVG.zip'
    link.click()
    URL.revokeObjectURL(url)
    setFeedback(t.modal.downloaded)
    window.setTimeout(() => setFeedback(''), 1800)
  }

  // 渲染图标列表的公共部分 - 每个图标显示两次：线性 + 面型交替行
  function renderIconList(iconList: typeof filteredIcons) {
    if (iconList.length === 0) {
      return (
        <section className="rounded-[12px] border border-dashed border-[var(--is-border)] bg-[var(--is-white)] px-4 py-20 text-center">
          <p className="text-[32px] font-bold leading-10 text-[var(--is-ink)]">{t.empty.noResults}</p>
          <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
            {t.empty.noResultsHint}
          </p>
        </section>
      )
    }

      // 每 10 个一组，每组先生成线性行，再生成面型行，确保两行分开
    const chunkSize = 10
    const chunks: (typeof iconList)[number][][] = []
    for (let i = 0; i < iconList.length; i += chunkSize) {
      chunks.push(iconList.slice(i, i + chunkSize))
    }

    return (
      <div style={{ overflow: 'visible' }}>
        {chunks.map((chunk, chunkIdx) => (
          <div key={chunkIdx} className="space-y-8">
            {/* 线性行 */}
            <div className="grid min-w-[1200px] grid-cols-10" style={{ overflow: 'visible' }}>
              {chunk.map((icon) => {
                const svg = getIconSvg(icon, 'linear', strokeWidth)
                return (
                  <IconCard
                    key={`${icon.id}-linear-${chunkIdx}`}
                    icon={icon}
                    svg={svg}
                    iconSize={iconSize}
                    isFavorite={favoriteIconIds.has(icon.id + '-linear')}
                    isSelected={selectedIconId === icon.id}
                    onPreview={() => handlePreview(icon.id, 'linear')}
                    onToggleFavorite={() => toggleFavorite(icon.id + '-linear')}
                  />
                )
              })}
            </div>
            {/* 面型行 */}
            <div className="grid min-w-[1200px] grid-cols-10" style={{ overflow: 'visible' }}>
              {chunk.map((icon) => {
                const svg = getIconSvg(icon, 'filled', strokeWidth)
                return (
                  <IconCard
                    key={`${icon.id}-filled-${chunkIdx}`}
                    icon={icon}
                    svg={svg}
                    iconSize={iconSize}
                    isFavorite={favoriteIconIds.has(icon.id + '-filled')}
                    isSelected={selectedIconId === icon.id}
                    onPreview={() => handlePreview(icon.id, 'filled')}
                    onToggleFavorite={() => toggleFavorite(icon.id + '-filled')}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="pb-24 pt-0">
      {/* 图标设置面板 - 右侧固定，与版心保持 16px 间距 */}
      <div
        className="fixed top-1/2 z-[60] w-[240px] -translate-y-1/2"
        style={{ right: 'calc(max(16px, (100vw - 1200px) / 2 - 256px))', overflow: 'visible' }}
      >
        <IconSettingsPanel />
      </div>

      <section className="mx-auto flex max-w-[1200px] flex-col items-center pt-20 text-center">
        <div className="flex max-w-[1100px] flex-col items-center gap-4">
          <h1 className="text-[48px] leading-[56px] text-[var(--is-ink)]">
            {t.site.tagline}
          </h1>
          <p className="text-[16px] leading-6 text-[var(--is-ink-soft)] whitespace-pre-line">{t.site.description}</p>
        </div>
        <div className="mt-6 flex items-center gap-1">
          <WheatDecoration size={40} color="#D5B25F" />
          {metricItems.map((item) => (
            <div
              key={item.label}
              className="group flex h-[78px] w-[120px] flex-col items-center justify-center rounded-[12px] bg-[var(--is-white)] p-3 transition hover:bg-[var(--is-surface)]"
            >
              <p className="text-[20px] font-bold leading-7 text-[var(--is-ink)] transition group-hover:text-[#D5B25F]">{item.value}</p>
              <p className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.label}</p>
            </div>
          ))}
          <WheatDecoration size={40} color="#D5B25F" mirror />
        </div>
      </section>

      <IconControls favoriteCount={favoriteIds.length} onCategorySelect={scrollToCategory} />

      <div className="mt-4 relative" style={{ overflow: 'visible' }}>
        <section className="min-w-0" style={{ overflow: 'visible' }}>
          {/* 按分类分组显示 */}
          {groupedIcons ? (
            groupedIcons.map((group) => (
              <div key={group.category} id={`category-${group.category}`} className="mb-[96px] last:mb-0">
                <div className="mb-6 flex items-center gap-3" style={{ overflow: 'visible', zIndex: 1 }}>
                  <div className="rounded-[8px] bg-[var(--is-surface)] px-3 py-1 text-[16px] leading-6 text-[var(--is-ink)]">
                    {group.label}
                  </div>
                  <p className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{group.icons.length} {t.controls.iconsCount}</p>
                </div>
                {renderIconList(group.icons)}
              </div>
            ))
          ) : (
            // 收藏夹或搜索模式：不分组显示
            <div>
              <div className="mb-6 flex items-center gap-3" style={{ overflow: 'visible', zIndex: 1 }}>
                <div className="rounded-[8px] bg-[var(--is-surface)] px-3 py-1 text-[16px] leading-6 text-[var(--is-ink)]">
                  {viewMode === 'favorites' ? t.controls.favorites : t.empty.noResults}
                </div>
                <p className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{visibleIcons.length} {t.controls.iconsCount}</p>
                {viewMode === 'favorites' && favoriteIds.length > 0 && (
                  <div className="ml-auto flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDownloadAll}
                        className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 text-[14px] leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
                      >
                        <Download size={16} />
                        {t.controls.downloadAll}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClear(true)}
                        className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 text-[14px] leading-[22px] text-[#d32f2f] transition hover:bg-[#fbe9e7]"
                      >
                        <Trash2 size={16} />
                        {t.controls.clearAll}
                      </button>
                    </div>
                  )}
                </div>
              {viewMode === 'favorites' ? (
                // 收藏夹模式：只显示被收藏的风格，不双行展示
                <div style={{ overflow: 'visible' }}>
                  {favoriteIds.length > 0 ? (
                    <div className="grid min-w-[1200px] grid-cols-10" style={{ overflow: 'visible' }}>
                      {(() => {
                        const items: { icon: typeof icons[number]; style: 'linear' | 'filled' }[] = []
                        visibleIcons.forEach((icon) => {
                          if (favoriteIconIds.has(icon.id + '-linear')) items.push({ icon, style: 'linear' })
                          if (favoriteIconIds.has(icon.id + '-filled')) items.push({ icon, style: 'filled' })
                        })
                        return items.map(({ icon, style }) => {
                          const svg = getIconSvg(icon, style, strokeWidth)
                          return (
                            <IconCard
                              key={icon.id + '-' + style}
                              icon={icon}
                              svg={svg}
                              iconSize={iconSize}
                              isFavorite
                              isSelected={selectedIconId === icon.id}
                              onPreview={() => handlePreview(icon.id, style)}
                              onToggleFavorite={() => toggleFavorite(icon.id + '-' + style)}
                            />
                          )
                        })
                      })()}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                      <p className="text-[16px] leading-6 text-[var(--is-ink-soft)]">{t.controls.emptyFavorites}</p>
                      <p className="mt-1 text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{t.controls.emptyFavoritesHint}</p>
                    </div>
                  )}
                </div>
              ) : (
                renderIconList(visibleIcons)
              )}
            </div>
          )}
          {feedback && (
            <span className="fixed left-1/2 top-8 z-[80] -translate-x-1/2 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1.5 text-[14px] leading-[22px] text-[var(--is-ink)] shadow-[var(--is-shadow-card)]">
              {feedback}
            </span>
          )}
        </section>
      </div>

      <IconDetailModal
        icon={selectedIcon}
        svg={selectedSvg}
        styleMode={selectedStyle}
        isFavorite={selectedIcon ? favoriteIds.includes(selectedIcon.id + '-' + selectedStyle) : false}
        onClose={() => setSelectedIconId(null)}
        onStyleChange={(style) => {
          if (selectedIcon) {
            setSelectedIconId(selectedIcon.id)
            setSelectedStyle(style)
          }
        }}
        onCopy={() => {
          if (selectedIcon) {
            const styledName = selectedIcon.name + (selectedStyle === 'filled' ? '_fill' : '_line')
            handleCopy(selectedSvg, styledName)
          }
        }}
        onCopyName={(name) => {
          if (name) {
            navigator.clipboard.writeText(name).then(() => {
              setFeedback(t.modal.copiedName)
              window.setTimeout(() => setFeedback(''), 1800)
            })
          }
        }}
        onDownload={() =>
          selectedIcon && handleDownload(createDownloadName(selectedIcon, selectedStyle), selectedSvg)
        }
        onToggleFavorite={() => {
          if (selectedIcon) {
            toggleFavorite(selectedIcon.id + '-' + selectedStyle)
          }
        }}
      />
      <BackToTop />

      {/* 全部清空确认弹窗 */}
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
    </div>
  )
}
