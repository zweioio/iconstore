import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function GuidePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const designSteps = [
    t.guide.steps.style,
    t.guide.steps.size,
    t.guide.steps.preview,
  ]

  const devSteps = [
    t.guide.steps.copy,
    t.guide.steps.adjust,
    t.guide.steps.organize,
  ]

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">Guide</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          {t.guide.title}
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          {t.guide.description}
        </p>
      </div>

      {/* 设计师 & 前端 */}
      <section className="grid gap-8 lg:grid-cols-2">
        <article className="is-panel p-8">
          <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{t.guide.forDesigners}</h2>
          <ul className="mt-8 space-y-3">
            {designSteps.map((item) => (
              <li key={item} className="rounded-[8px] bg-[#f8f8fc] px-4 py-3 text-[14px] leading-[22px] text-[#60656b]">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="is-panel p-8">
          <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{t.guide.forDevelopers}</h2>
          <ul className="mt-8 space-y-3">
            {devSteps.map((item) => (
              <li key={item} className="rounded-[8px] bg-[#f8f8fc] px-4 py-3 text-[14px] leading-[22px] text-[#60656b]">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* SVG 接入示例 */}
      <section className="is-panel p-8">
        <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{t.guide.svgSection}</h2>
        <p className="mt-2 text-[14px] leading-[22px] text-[#60656b]">
          {t.guide.svgDesc}
        </p>

        <pre className="is-code mt-8">
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
