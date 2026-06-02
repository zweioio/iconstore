import { Code2, Paintbrush } from 'lucide-react'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function GuidePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const designSteps = [t.guide.steps.style, t.guide.steps.size, t.guide.steps.preview]

  const devSteps = [t.guide.steps.copy, t.guide.steps.adjust, t.guide.steps.organize]

  return (
    <div className="pb-24 pt-4">
      {/* 页面标题 */}
      <section className="border-b border-[var(--is-border)] pb-12 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[40px] font-bold leading-[44px] text-[var(--is-ink)]">{t.guide.title}</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-6 text-[var(--is-ink-soft)]">
            {t.guide.description}
          </p>
        </div>
      </section>

      {/* 双栏步骤 */}
      <section className="py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* 设计师 */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Paintbrush size={20} className="text-[var(--is-ink)]" />
              <h2 className="text-[20px] font-bold leading-7 text-[var(--is-ink)]">{t.guide.forDesigners}</h2>
            </div>
            <div className="space-y-3">
              {designSteps.map((step, i) => (
                <p key={i} className="rounded-[8px] bg-[var(--is-surface)] px-4 py-3 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
                  {step}
                </p>
              ))}
            </div>
          </div>

          {/* 前端 */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Code2 size={20} className="text-[var(--is-ink)]" />
              <h2 className="text-[20px] font-bold leading-7 text-[var(--is-ink)]">{t.guide.forDevelopers}</h2>
            </div>
            <div className="space-y-3">
              {devSteps.map((step, i) => (
                <p key={i} className="rounded-[8px] bg-[var(--is-surface)] px-4 py-3 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
                  {step}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SVG 接入示例 */}
      <section className="border-t border-[var(--is-border)] py-16">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[24px] font-bold leading-8 text-[var(--is-ink)]">{t.guide.svgSection}</h2>
          <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{t.guide.svgDesc}</p>
        </div>
        <pre className="is-code mt-8 text-[13px]">
          <code>{`// 将复制到的 SVG 直接放入组件或静态资源目录
export function ExampleIcon() {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"></svg>',
      }}
    />
  )
}`}</code>
        </pre>
      </section>
    </div>
  )
}
