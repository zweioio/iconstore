import { useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { ArrowRight, Sparkles, Star } from 'lucide-react'

import { IconCard } from '@/components/icons/IconCard'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import { getIconSvg } from '@/utils/iconLibrary'
import { icons } from '@/data/icons'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

// 精选图标展示
const featuredIcons = icons.slice(0, 9)

export default function AboutPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const features = [
    {
      title: t.home.featuresTitle,
      value: '1,600+',
      description: t.home.featuresDescScale,
    },
    {
      title: t.home.featuresDual,
      value: '2 Styles',
      description: t.home.featuresDescDual,
    },
    {
      title: t.home.featuresFree,
      value: '100%',
      description: t.home.featuresDescFree,
    },
  ]

  const principles = [
    {
      icon: '✦',
      title: t.about.principles.neutral,
      description: '图标采用中性、克制的视觉语言，不喧宾夺主，完美融入任何产品界面',
    },
    {
      icon: '◈',
      title: t.about.principles.grid,
      description: '所有图标基于 24x24 网格绘制，确保视觉一致性和像素级精准',
    },
    {
      icon: '⬡',
      title: t.about.principles.friendly,
      description: '提供即时预览、SVG 复制和下载功能，让图标查找和使用变得轻盈顺手',
    },
  ]

  const { styleMode, strokeWidth, favoriteIds } = useIconLibraryStore()
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null)
  const favoriteIconIds = useMemo(() => new Set(favoriteIds), [favoriteIds])

  const selectedIcon = icons.find((icon) => icon.id === selectedIconId) ?? null
  const selectedSvg = selectedIcon ? getIconSvg(selectedIcon, styleMode, strokeWidth) : ''

  return (
    <div className="pb-24 pt-4">
      {/* Hero 区域 */}
      <section className="pt-10 pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-[8px] bg-[#f8f8fc] px-4 py-2 text-[12px] font-medium leading-[22px] tracking-[0.16em] text-[#60656b]">
              <Sparkles size={14} />
              {t.home.badge}
            </div>

            <div className="space-y-6">
              <h1 className="max-w-5xl whitespace-pre-line text-[36px] font-bold leading-10 text-[#202224] md:text-[48px] md:leading-[52px]">
                {t.home.heroTitle}
              </h1>
              <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
                {t.home.heroDesc}
                {t.home.heroDescDetail}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="is-button-primary inline-flex items-center gap-2"
              >
                {t.nav.enterLibrary}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/guide"
                className="is-button-secondary inline-flex items-center gap-2"
              >
                {t.nav.viewGuide}
              </Link>
            </div>

            <div className="grid gap-2 text-[14px] leading-[22px] text-[#60656b] sm:grid-cols-3">
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                {t.nav.freeCommercial}
              </div>
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                {t.nav.unifiedSize}
              </div>
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                {t.nav.defaultStroke}
              </div>
            </div>
          </div>

          {/* 图标预览展示 */}
          <div className="rounded-[16px] bg-[#f8f8fc] p-6">
            <div className="mb-4 flex items-center justify-between px-2 text-[12px] font-medium leading-[22px] tracking-[0.16em] text-[#60656b]">
              <span>{t.home.productOverview}</span>
              <span>{t.home.systemReady}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {featuredIcons.map((icon, index) => (
                <div
                  key={icon.id}
                  className="flex flex-col items-center rounded-[12px] bg-white p-4 transition hover:bg-[#f8f8fc]"
                  style={{ transform: `translateY(${index % 3 === 1 ? 8 : 0}px)` }}
                >
                  <div className="flex h-[56px] w-[56px] items-center justify-center text-[#202224]">
                    <div dangerouslySetInnerHTML={{ __html: getIconSvg(icon, 'linear', 1.5) }} />
                  </div>
                  <p className="mt-2 text-[11px] leading-[18px] text-[#b5b9bf]">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 核心特性 */}
      <section className="grid gap-6 md:grid-cols-3 pb-16">
        {features.map((item, index) => (
          <div key={item.title} className="space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f8f8fc] text-[18px] font-bold text-[#202224]">
              {index + 1}
            </div>
            <p className="text-[20px] font-bold leading-7 text-[#202224]">{item.value}</p>
            <p className="text-[14px] font-medium leading-[22px] text-[#202224]">{item.title}</p>
            <p className="text-[14px] leading-[22px] text-[#60656b]">{item.description}</p>
          </div>
        ))}
      </section>

      {/* 产品理念 */}
      <section className="py-16">
        <div className="mb-10 space-y-3">
          <p className="text-[14px] font-medium leading-[22px] text-[#b5b9bf]">{t.home.coreValue}</p>
          <h2 className="text-[32px] font-bold leading-9 text-[#202224]">
            {t.home.coreTitle}
          </h2>
          <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
            {t.home.coreDesc}
          </p>
        </div>

        <div className="grid gap-0 divide-y divide-[#e9eaeb]">
          {principles.map((item) => (
            <div key={item.title} className="flex gap-6 py-8 first:pt-0 last:pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f8f8fc] text-[16px] text-[#202224]">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-[18px] font-bold leading-7 text-[#202224]">{item.title}</h3>
                <p className="text-[14px] leading-[22px] text-[#60656b]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 精选图标展示 */}
      <section className="rounded-[16px] bg-[#f8f8fc] p-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="mb-8 space-y-4 lg:mb-0">
          <p className="text-[14px] font-medium leading-[22px] text-[#b5b9bf]">{t.home.selectedIcons}</p>
          <h2 className="text-[32px] font-bold leading-9 text-[#202224]">
            {t.home.selectedTitle}
          </h2>
          <p className="text-[16px] leading-6 text-[#60656b]">
            {t.home.selectedDesc}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {featuredIcons.slice(0, 6).map((icon) => (
            <div
              key={icon.id}
              className="flex flex-col items-center rounded-[12px] bg-white p-5 transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <div className="flex h-[64px] w-[64px] items-center justify-center text-[#202224]">
                <div dangerouslySetInnerHTML={{ __html: getIconSvg(icon, 'linear', 1.5) }} />
              </div>
              <p className="mt-3 text-[13px] leading-[22px] text-[#60656b]">{icon.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 图标详情弹窗 */}
      {selectedIcon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
          <button
            type="button"
            className="absolute inset-0"
            aria-label={t.modal.close}
            onClick={() => setSelectedIconId(null)}
          />
          <div className="relative z-10 w-[480px] rounded-[16px] border border-[#e9eaeb] bg-white p-6 shadow-[0_6px_32px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={() => setSelectedIconId(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#919499] transition hover:bg-[#f8f8fc] hover:text-[#202224]"
              aria-label={t.modal.close}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="space-y-6 pr-8">
              <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{selectedIcon.name}</h2>
              <div className="flex h-[96px] w-full items-center justify-center rounded-[12px] border border-[#e9eaeb] bg-[#f8f8fc]">
                <div className="inline-flex h-[96px] w-[96px] items-center justify-center text-[#202224]">
                  <div dangerouslySetInnerHTML={{ __html: selectedSvg }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { navigator.clipboard.writeText(selectedSvg) }}
                  className="is-button-primary inline-flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {t.modal.copySVG}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const blob = new Blob([selectedSvg], { type: 'image/svg+xml' })
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${selectedIcon.name}.svg`
                    link.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="is-button-secondary inline-flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {t.modal.downloadSVG}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
