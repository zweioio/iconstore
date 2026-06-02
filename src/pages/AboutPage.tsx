import { useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { ArrowRight, Sparkles, Star } from 'lucide-react'

import { IconCard } from '@/components/icons/IconCard'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import { getIconSvg } from '@/utils/iconLibrary'
import { icons } from '@/data/icons'

// 精选图标展示
const featuredIcons = icons.slice(0, 9)

const features = [
  {
    title: '图标规模',
    value: '1,600+',
    description: '持续扩充的图标库，覆盖基础、箭头、编辑、媒体、系统、品牌等六大分类',
  },
  {
    title: '双风格',
    value: '2 Styles',
    description: '每个图标提供线性和面型两套独立稿，满足不同场景的视觉需求',
  },
  {
    title: '免费商用',
    value: '100%',
    description: '所有图标均可免费用于个人和商业项目，无需额外授权',
  },
]

const principles = [
  {
    icon: '✦',
    title: '中性克制的设计风格',
    description: '图标采用中性、克制的视觉语言，不喧宾夺主，完美融入任何产品界面',
  },
  {
    icon: '◈',
    title: '统一的 24x24 网格系统',
    description: '所有图标基于 24x24 网格绘制，确保视觉一致性和像素级精准',
  },
  {
    icon: '⬡',
    title: '设计师与开发者友好',
    description: '提供即时预览、SVG 复制和下载功能，让图标查找和使用变得轻盈顺手',
  },
]

export default function AboutPage() {
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
              开源图标库
            </div>

            <div className="space-y-6">
              <h1 className="max-w-5xl text-[36px] font-bold leading-10 text-[#202224] md:text-[48px] md:leading-[52px]">
                这是一个为设计师与前端准备的
                <br />
                现代图标产品
              </h1>
              <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
                IconStore 是一套中性风格的系统图标，强调统一风格、即时预览、清晰结构和顺手的 SVG 使用体验。
                这一页只负责讲清楚它是什么、适合谁、为什么好用。
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="is-button-primary inline-flex items-center gap-2"
              >
                进入图标库首页
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/guide"
                className="is-button-secondary inline-flex items-center gap-2"
              >
                查看使用说明
              </Link>
            </div>

            <div className="grid gap-2 text-[14px] leading-[22px] text-[#60656b] sm:grid-cols-3">
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                免费可商用
              </div>
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                24 x 24 统一尺寸
              </div>
              <div className="inline-flex items-center gap-2">
                <Star size={16} className="text-[#FADC19]" />
                线性默认描边 1.5
              </div>
            </div>
          </div>

          {/* 图标预览展示 */}
          <div className="rounded-[16px] bg-[#f8f8fc] p-6">
            <div className="mb-4 flex items-center justify-between px-2 text-[12px] font-medium leading-[22px] tracking-[0.16em] text-[#60656b]">
              <span>Product Overview</span>
              <span>System Ready</span>
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
          <p className="text-[14px] font-medium leading-[22px] text-[#b5b9bf]">Core Value</p>
          <h2 className="text-[32px] font-bold leading-9 text-[#202224]">
            让图标查找和使用都变得轻盈
          </h2>
          <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
            产品说明页不承担图标查找任务，只负责补充产品理念、风格原则，以及为什么要同时服务设计师与前端
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
          <p className="text-[14px] font-medium leading-[22px] text-[#b5b9bf]">Selected Icons</p>
          <h2 className="text-[32px] font-bold leading-9 text-[#202224]">
            产品说明页强调风格与系统感
          </h2>
          <p className="text-[16px] leading-6 text-[#60656b]">
            这部分用精选图标解释产品气质，让用户知道这不是单个图标拼凑，而是一套完整风格体系
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
            aria-label="关闭详情弹窗"
            onClick={() => setSelectedIconId(null)}
          />
          <div className="relative z-10 w-[480px] rounded-[16px] border border-[#e9eaeb] bg-white p-6 shadow-[0_6px_32px_rgba(0,0,0,0.08)]">
            <button
              type="button"
              onClick={() => setSelectedIconId(null)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#919499] transition hover:bg-[#f8f8fc] hover:text-[#202224]"
              aria-label="关闭"
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
                  复制 SVG
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
                  下载 SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
