import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { SectionTitle } from '@/components/common/SectionTitle'
import { FeaturePanel } from '@/components/home/FeaturePanel'
import { IconPreview } from '@/components/icons/IconPreview'
import { icons } from '@/data/icons'
import { getIconSvg } from '@/utils/iconLibrary'

// 产品说明页挑选一组图标做展示，帮助用户理解整体风格和定位
const featuredIcons = icons.slice(0, 6)

export default function Home() {
  return (
    <div className="space-y-24 pb-24 pt-4">
      <section className="pt-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="ds-panel inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--ds-neutral)]">
              <Sparkles size={14} />
              第二个 Tab 为产品说明
            </div>

            <div className="space-y-6">
              <h1 className="font-display max-w-5xl text-5xl font-bold leading-[1.02] text-[var(--ds-ink)] md:text-7xl">
                这是一个为设计师与前端准备的
                <br />
                现代图标产品
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--ds-ink-soft)] md:text-lg">
                Anicon 是一套偏产品官网表达的图标系统，强调统一风格、即时预览、清晰结构和顺手的
                SVG 使用体验。这一页只负责讲清楚它是什么、适合谁、为什么好用
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="ds-button-primary inline-flex items-center gap-2 text-sm"
              >
                进入图标库首页
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/guide"
                className="ds-button-secondary inline-flex items-center gap-2 text-sm"
              >
                查看使用说明
              </Link>
            </div>

            <div className="grid gap-2 text-sm text-[var(--ds-ink-soft)] sm:grid-cols-3">
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--ds-ink)]" />
                免费可商用
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--ds-ink)]" />
                24 x 24 统一尺寸
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[var(--ds-ink)]" />
                线性默认描边 1.5
              </div>
            </div>
          </div>

          <div className="ds-panel p-4">
            <div className="ds-panel-strong mb-4 flex items-center justify-between px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--ds-neutral)]">
              <span>Product Overview</span>
              <span>System Ready</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {featuredIcons.map((icon, index) => (
                <div
                  key={icon.id}
                  className="ds-panel p-4"
                  style={{ transform: `translateY(${index % 3 === 1 ? 10 : 0}px)` }}
                >
                  <IconPreview
                    svg={getIconSvg(icon, 'linear', 1.5)}
                    name={icon.name}
                    background="light"
                    size="md"
                  />
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--ds-neutral)]">{icon.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <FeaturePanel
          title="图标规模"
          value="100 - 300"
          description="第一版先控制图标量，保证风格统一和资源质量，适合快速上线与持续扩充"
        />
        <FeaturePanel
          title="双风格"
          value="2 Styles"
          description="每个图标提供线性和面型两套独立稿，不做粗糙的自动转换"
        />
        <FeaturePanel
          title="使用方式"
          value="SVG First"
          description="先把复制 SVG、下载 SVG 和预览体验做到足够顺手，再扩展更多格式"
        />
      </section>

      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionTitle
          eyebrow="Core Value"
          title="让图标查找和使用都变得轻盈"
          description="产品说明页不承担图标查找任务，只负责补充产品理念、风格原则，以及为什么要同时服务设计师与前端"
        />

        <div className="grid gap-4">
          {[
            {
              title: '双风格切换',
              description: '线性和面型一键切换，便于设计稿和开发场景快速比较',
            },
            {
              title: '描边在线预览',
              description: '线性图标支持粗细调节，让你先看到效果再决定是否使用',
            },
            {
              title: '设计师友好的品牌感',
              description: '整体风格克制而高级，不做普通素材站式的堆砌布局',
            },
          ].map((item) => (
            <article key={item.title} className="ds-panel p-8">
              <h3 className="font-display text-lg font-bold text-[var(--ds-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-8 text-[var(--ds-ink-soft)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ds-panel grid gap-8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
        <SectionTitle
          eyebrow="Selected Icons"
          title="产品说明页强调风格与系统感"
          description="这部分用精选图标解释产品气质，让用户知道这不是单个图标拼凑，而是一套完整风格体系"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {featuredIcons.map((icon, index) => (
            <div
              key={icon.id}
              className="ds-panel-strong p-4"
              style={{ opacity: index === 4 ? 0.7 : 1 }}
            >
              <IconPreview
                svg={getIconSvg(icon, index % 2 === 0 ? 'linear' : 'filled', 1.5)}
                name={icon.name}
                background="light"
                size="md"
              />
              <p className="mt-4 text-sm text-[var(--ds-ink-soft)]">{icon.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
