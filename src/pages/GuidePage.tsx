import { SectionTitle } from '@/components/common/SectionTitle'

const designSteps = [
  '优先根据场景选择线性或面型，让整页风格先统一',
  '需要更轻的视觉效果时选择线性，需要更强识别度时选择面型',
  '设计稿中尽量保持 24 x 24 的基础尺寸，避免风格被拉坏',
]

const devSteps = [
  '优先直接复制 SVG，按需放进项目组件或静态资源目录',
  '线性图标可在产品内先预览描边粗细，再决定最终值',
  '如果页面同时使用线性和面型，建议按模块分区，不要混杂得过碎',
]

export default function GuidePage() {
  return (
    <div className="space-y-10 pb-24 pt-10">
      <SectionTitle
        eyebrow="Guide"
        title="第一版使用说明先讲清楚最常用的路径"
        description="这个页面主要服务设计师和前端开发者，帮助他们快速知道怎么预览、复制、下载和接入图标"
      />

      <section className="grid gap-8 lg:grid-cols-2">
        <article className="ds-panel p-8">
          <h2 className="font-display text-3xl font-bold text-[var(--ds-ink)]">给设计师</h2>
          <ul className="mt-8 space-y-2 text-sm leading-8 text-[var(--ds-ink-soft)]">
            {designSteps.map((item) => (
              <li key={item} className="ds-panel-strong px-2 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="ds-panel p-8">
          <h2 className="font-display text-3xl font-bold text-[var(--ds-ink)]">给前端</h2>
          <ul className="mt-8 space-y-2 text-sm leading-8 text-[var(--ds-ink-soft)]">
            {devSteps.map((item) => (
              <li key={item} className="ds-panel-strong px-2 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="ds-panel p-8">
        <h2 className="font-display text-3xl font-bold text-[var(--ds-ink)]">SVG 接入示例</h2>
        <p className="mt-2 text-sm leading-8 text-[var(--ds-ink-soft)]">
          第一版先围绕 SVG 展开，既适合设计资源交付，也方便前端直接接入
        </p>

        <pre className="ds-code mt-8 overflow-x-auto p-8 text-xs leading-8">
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
