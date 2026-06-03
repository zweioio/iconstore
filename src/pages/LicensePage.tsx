import { Check, Ban, RefreshCw, Heart, Shield, ExternalLink } from 'lucide-react'

export default function LicensePage() {
  const terms = [
    {
      icon: Check,
      title: '✅ 可商用',
      desc: '可用于个人项目、商业项目、网站、移动应用、印刷品、品牌设计。完全免费，无需支付任何费用。',
    },
    {
      icon: RefreshCw,
      title: '✅ 可修改',
      desc: '可以自由修改颜色、尺寸、样式。修改后的图标可作为你项目的一部分继续使用。',
    },
    {
      icon: Ban,
      title: '❌ 不可转售',
      desc: '禁止将图标本身（原始或修改后的 SVG 文件）作为独立产品转售或分发。',
    },
    {
      icon: Heart,
      title: '✅ 无需署名',
      desc: '使用 IconStore 不需要标注出处。当然，如果你愿意提一下我们，我们会很开心。',
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">01 / 授权说明</p>
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              开源、免费，且对商业友好
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              IconStore 采用 Apache 2.0 开源协议。这意味着你可以把它用在几乎任何地方——个人项目、商业产品、公司官网——都不需要额外授权。
            </p>
          </div>
        </div>
      </section>

      {/* Terms grid */}
      <section className="border-b border-[var(--is-border)] py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">02 / 授权条款</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {terms.map((item) => (
              <div key={item.title} className="rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-7 py-8">
                <h3 className="text-[17px] font-bold leading-6 text-[var(--is-ink)]">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* License detail */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">03 / 补充说明</p>
          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-5">
              <Shield size={18} className="mt-0.5 shrink-0 text-[var(--is-ink)]" />
              <div>
                <h3 className="text-[16px] font-bold leading-6 text-[var(--is-ink)]">关于商标使用</h3>
                <p className="mt-1 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">
                  你可以将 IconStore 图标用于你的产品 Logo、品牌标识和应用图标。但不允许将 IconStore 的名称或标识注册为你的商标。
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <ExternalLink size={18} className="mt-0.5 shrink-0 text-[var(--is-ink)]" />
              <div>
                <h3 className="text-[16px] font-bold leading-6 text-[var(--is-ink)]">完整协议</h3>
                <p className="mt-1 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">
                  完整的 Apache 2.0 许可证文本可在项目 GitHub 仓库中查看。如果你对授权有任何疑问，欢迎通过 Issues 或邮件联系我们。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
