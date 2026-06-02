import { SectionTitle } from '@/components/common/SectionTitle'

const licenseItems = [
  {
    title: '允许商用',
    description: '可用于商业项目、品牌官网、后台系统、产品界面和设计提案',
  },
  {
    title: '允许修改',
    description: '可根据项目需要调整尺寸、颜色和布局，也可基于风格做延展',
  },
  {
    title: '禁止单独转售',
    description: '不得把原始图标资源打包后作为独立素材库再次出售或冒充原创',
  },
]

export default function LicensePage() {
  return (
    <div className="space-y-10 pb-24 pt-10">
      <SectionTitle
        eyebrow="License"
        title="免费可商用，但边界要写清楚"
        description="第一版授权说明强调可用性和明确边界，避免用户理解模糊，也保护你的原创图标体系"
      />

      <section className="grid gap-8 lg:grid-cols-3">
        {licenseItems.map((item) => (
          <article key={item.title} className="ds-panel p-8">
            <h2 className="font-display text-3xl font-bold text-[var(--ds-ink)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-8 text-[var(--ds-ink-soft)]">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="ds-panel p-8">
        <h2 className="font-display text-3xl font-bold text-[var(--ds-ink)]">授权建议文案</h2>
        <div className="mt-8 space-y-2 text-sm leading-8 text-[var(--ds-ink-soft)]">
          <p>你可以免费下载和使用这些图标，并可将它们用于个人或商业项目</p>
          <p>你可以根据项目需求对图标做颜色、尺寸和细节上的调整</p>
          <p>你不能将原始图标资源重新打包后作为独立图标库、素材库或模板资源再次出售</p>
        </div>
      </section>
    </div>
  )
}
