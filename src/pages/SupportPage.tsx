import { Github, Wallet, CreditCard, MessageCircle } from 'lucide-react'

export default function SupportPage() {
  const supportOptions = [
    {
      name: 'PayPal',
      icon: CreditCard,
      description: '国际用户首选',
    },
    {
      name: '支付宝',
      icon: Wallet,
      description: '国内用户推荐',
    },
    {
      name: '微信支付',
      icon: MessageCircle,
      description: '国内用户推荐',
    },
  ]

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
            支持我们
          </h1>
          <p className="max-w-[640px] text-[16px] leading-6 text-[#60656b]">
            IconStore 是一款免费但精致的产品，我们已投入大量时间和精力进行设计、开发和完善。
            如果您喜欢这些图标并希望看到我们继续努力推出更多优质图标的话，请考虑通过捐赠来支持我们的团队，
            以推动我们的工作进程。
          </p>
        </div>
        <a
          href="https://github.com/zweioio/iconstore"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-[8px] bg-[#f8f8fc] px-4 py-2 text-[14px] leading-[22px] text-[#202224] transition hover:bg-[#f1f2f6] lg:inline-flex"
        >
          <Github size={16} />
          星标此仓库
          <span className="rounded-[6px] bg-white px-2 py-0.5 text-[12px] text-[#60656b]">
            8.2k
          </span>
        </a>
      </div>

      {/* 支付方式 */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((option) => (
          <div
            key={option.name}
            className="is-panel flex h-[200px] flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <option.icon size={48} className="text-[#202224]" />
            <div>
              <p className="text-[18px] font-bold leading-7 text-[#202224]">{option.name}</p>
              <p className="mt-1 text-[14px] leading-[22px] text-[#60656b]">{option.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
