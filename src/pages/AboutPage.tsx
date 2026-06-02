import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function AboutPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const stats = [
    { value: '1,600+', label: t.about.features.scale, desc: t.home.featuresDescScale },
    { value: '2 Styles', label: t.about.features.dual, desc: t.home.featuresDescDual },
    { value: '100%', label: t.about.features.free, desc: t.home.featuresDescFree },
  ]

  const values = [
    { icon: '▣', title: t.about.principles.neutral, desc: '图标采用中性、克制的视觉语言，不喧宾夺主，完美融入任何产品界面' },
    { icon: '◈', title: t.about.principles.grid, desc: '所有图标基于 24x24 网格绘制，确保视觉一致性和像素级精准' },
    { icon: '✦', title: t.about.principles.friendly, desc: '提供即时预览、SVG 复制和下载功能，让图标查找和使用变得轻盈顺手' },
  ]

  return (
    <div className="pb-24 pt-4">
      {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-16 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[40px] font-bold leading-[44px] text-[var(--is-ink)]">为设计师与前端打造的现代图标库</h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-6 text-[var(--is-ink-soft)]">
            IconStore 提供中性风格的系统图标，支持线性与面型双风格切换、在线预览、SVG 快速复制和下载，适合用于网页、移动应用与产品界面。
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/" className="is-button-primary inline-flex items-center gap-2">
              {t.nav.enterLibrary}
              <ArrowRight size={16} />
            </Link>
            <Link to="/guide" className="is-button-secondary inline-flex items-center gap-2">
              {t.nav.viewGuide}
            </Link>
          </div>
        </div>
      </section>

      {/* 核心数据 */}
      <section className="py-16">
        <div className="grid gap-px overflow-hidden rounded-[12px] border border-[var(--is-border)] bg-[var(--is-border)] md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="bg-white px-8 py-10">
              <p className="text-[32px] font-bold leading-9 text-[var(--is-ink)]">{item.value}</p>
              <p className="mt-2 text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{item.label}</p>
              <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 产品理念 */}
      <section className="border-t border-[var(--is-border)] py-16">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">{t.about.principles.title}</p>
          <h2 className="mt-3 text-[32px] font-bold leading-9 text-[var(--is-ink)]">{t.home.coreTitle}</h2>
        </div>
        <div className="mt-12 divide-y divide-[var(--is-border)]">
          {values.map((item) => (
            <div key={item.title} className="flex items-start gap-6 py-8 first:pt-0 last:pb-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--is-surface)] text-[20px] text-[var(--is-ink)]">
                {item.icon}
              </div>
              <div>
                <h3 className="text-[18px] font-bold leading-7 text-[var(--is-ink)]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
