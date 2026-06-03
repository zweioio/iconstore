import { useMemo, useState } from 'react'

import { WheatDecoration } from '@/components/icons/WheatDecoration'

import { IconCard } from '@/components/icons/IconCard'
import { IconControls } from '@/components/icons/IconControls'
import { IconDetailModal } from '@/components/icons/IconDetailModal'
import { IconSettingsPanel } from '@/components/icons/IconSettingsPanel'
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
  } = useIconLibraryStore()
  const [feedback, setFeedback] = useState('')

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
      return filteredIcons.filter((icon) => favoriteIconIds.has(icon.id))
    }

    return filteredIcons
  }, [favoriteIconIds, filteredIcons, viewMode])

  const selectedIcon = icons.find((icon) => icon.id === selectedIconId) ?? null
  const selectedSvg = selectedIcon ? getIconSvg(selectedIcon, styleMode, strokeWidth) : ''

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

  async function handleCopy(svg: string) {
    try {
      await navigator.clipboard.writeText(svg)
      setFeedback(t.modal.copied)
      window.setTimeout(() => setFeedback(''), 1800)
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = svg
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
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = name
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

    // 每 10 个一组，每组先线性再面型交替行
    const chunkSize = 10
    const dualList: { icon: (typeof iconList)[number]; style: 'linear' | 'filled'; key: string }[] = []
    for (let i = 0; i < iconList.length; i += chunkSize) {
      const chunk = iconList.slice(i, i + chunkSize)
      chunk.forEach((icon) => dualList.push({ icon, style: 'linear', key: `${icon.id}-linear-${i}` }))
      chunk.forEach((icon) => dualList.push({ icon, style: 'filled', key: `${icon.id}-filled-${i}` }))
    }

    return (
      <div style={{ overflow: 'visible' }}>
        <div className="grid min-w-[1200px] grid-cols-10 gap-y-8" style={{ overflow: 'visible' }}>
          {dualList.map(({ icon, style, key }) => {
            const svg = getIconSvg(icon, style, strokeWidth)

            return (
              <IconCard
                key={key}
                icon={icon}
                svg={svg}
                iconSize={iconSize}
                isFavorite={favoriteIconIds.has(icon.id)}
                isSelected={selectedIconId === icon.id}
                onPreview={() => setSelectedIconId(icon.id)}
                onToggleFavorite={() => toggleFavorite(icon.id)}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 pt-2">
      {/* 图标设置面板 - 右侧固定，与版心保持 16px 间距 */}
      <div
        className="fixed top-1/2 z-[60] w-[240px] -translate-y-1/2"
        style={{ right: 'calc(max(16px, (100vw - 1200px) / 2 - 256px))', overflow: 'visible' }}
      >
        <IconSettingsPanel />
      </div>

      <section className="mx-auto flex max-w-[1200px] flex-col items-center pt-16 text-center">
        <div className="flex max-w-[1100px] flex-col items-center gap-4">
          <h1 className="text-[48px] leading-[52px] text-[var(--is-ink)]">
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
              {visibleIcons.length > 0 && (
                <div className="mb-6 flex items-center gap-3" style={{ overflow: 'visible', zIndex: 1 }}>
                  <div className="rounded-[8px] bg-[var(--is-surface)] px-3 py-1 text-[16px] leading-6 text-[var(--is-ink)]">
                    {viewMode === 'favorites' ? t.controls.favorites : t.empty.noResults}
                  </div>
                  <p className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{visibleIcons.length} {t.controls.iconsCount}</p>
                </div>
              )}
              {renderIconList(visibleIcons)}
            </div>
          )}
          {feedback && (
            <span className="fixed left-1/2 top-8 z-[80] -translate-x-1/2 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1.5 text-[14px] text-[var(--is-ink)] shadow-[var(--is-shadow-card)]">
              {feedback}
            </span>
          )}
        </section>
      </div>

      <IconDetailModal
        icon={selectedIcon}
        svg={selectedSvg}
        isFavorite={selectedIcon ? favoriteIds.includes(selectedIcon.id) : false}
        onClose={() => setSelectedIconId(null)}
        onCopy={() => selectedIcon && handleCopy(selectedSvg)}
        onCopyName={() => {
          if (selectedIcon) {
            navigator.clipboard.writeText(selectedIcon.name).then(() => {
              setFeedback(t.modal.copiedName)
              window.setTimeout(() => setFeedback(''), 1800)
            })
          }
        }}
        onDownload={() =>
          selectedIcon && handleDownload(createDownloadName(selectedIcon, styleMode), selectedSvg)
        }
        onToggleFavorite={() => {
          if (selectedIcon) {
            toggleFavorite(selectedIcon.id)
          }
        }}
      />
    </div>
  )
}
