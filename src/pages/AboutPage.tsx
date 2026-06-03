import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function AboutPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const stats = [
    { value: '108', label: '当前图标', desc: '首批精选图标，覆盖 34 个分类' },
    { value: '2', label: '风格体系', desc: '线性与面型双版本，满足不同场景' },
    { value: '100%', label: '免费开源', desc: 'Apache 2.0 授权，可商用可修改' },
  ]

  const features = [
    {
      num: '01',
      title: '中性的视觉语言',
      desc: '不抢戏、不喧哗。每一个图标的弧度和比例都经过克制地设计，天然适配你产品的界面气质。',
    },
    {
      num: '02',
      title: '24px 网格系统',
      desc: '所有图标基于统一的 24×24 网格绘制。放在一起时，它们看起来像同一双手画出来的。',
    },
    {
      num: '03',
      title: '双风格双稿交付',
      desc: '线性用于结构表达，面型用于信息强调。每个图标两套独立稿，你选就行。',
    },
    {
      num: '04',
      title: 'SVG 优先的工作流',
      desc: '不需要安装任何库。复制 SVG 代码直接粘贴到项目里，它是通用语言。',
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">01 / 项目介绍</p>
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              IconStore 是什么
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              一套为设计师和前端准备的中性风格系统图标。不是那种"看起来很酷但用不上"的花哨图标，
              而是真正能在产品界面里舒适工作、统一表达的实用工具。
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/" className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[var(--is-ink)] px-6 text-[15px] font-medium leading-6 text-white transition hover:bg-[var(--is-ink-soft)]">
                {t.nav.enterLibrary}
                <ArrowRight size={16} />
              </Link>
              <Link to="/guide" className="inline-flex h-11 items-center gap-2 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-white)] px-6 text-[15px] font-medium leading-6 text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]">
                {t.nav.viewGuide}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Data row */}
      <section className="border-b border-[var(--is-border)] py-16">
        <div className="mx-auto max-w-[960px]">
          <div className="flex items-start gap-16">
            {stats.map((item) => (
              <div key={item.label} className="flex-1">
                <p className="text-[36px] font-bold leading-[40px] tracking-[-0.02em] text-[var(--is-ink)]">{item.value}</p>
                <p className="mt-2 text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{item.label}</p>
                <p className="mt-1 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">02 / 设计原则</p>
          <div className="mt-12 space-y-14">
            {features.map((item) => (
              <div key={item.num} className="flex items-start gap-10">
                <span className="w-10 shrink-0 text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">{item.num}</span>
                <div className="border-t border-[var(--is-border)] pt-5 w-full">
                  <h3 className="text-[22px] font-bold leading-7 tracking-[-0.01em] text-[var(--is-ink)]">{item.title}</h3>
                  <p className="mt-3 max-w-[520px] text-[15px] leading-[26px] text-[var(--is-ink-soft)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
