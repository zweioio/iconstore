import { Github, CreditCard, Wallet, MessageCircle, ExternalLink } from 'lucide-react'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function SupportPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const methods = [
    {
      name: t.support.methods.paypal,
      icon: CreditCard,
      desc: t.support.methods.paypalDesc,
      iconColor: 'text-[#0070BA]',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: t.support.methods.alipay,
      icon: Wallet,
      desc: t.support.methods.alipayDesc,
      iconColor: 'text-[#1677FF]',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: t.support.methods.wechat,
      icon: MessageCircle,
      desc: t.support.methods.wechatDesc,
      iconColor: 'text-[#07C160]',
      bg: 'bg-[#F0FFF4]',
    },
  ]

  return (
    <div className="pb-24 pt-4">
      {/* 页面标题 */}
      <section className="border-b border-[var(--is-border)] pb-12 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[40px] font-bold leading-[44px] text-[var(--is-ink)]">{t.support.title}</h1>
          <p className="mx-auto max-w-[600px] text-[16px] leading-6 text-[var(--is-ink-soft)]">
            IconStore 从一开始就是免费、开源的。每一个图标的设计、每一行代码的实现，背后都是真实的时间和热爱。
            如果你喜欢这些图标，并希望这个项目能持续成长，你的每一份支持都是对我们最大的鼓励。
          </p>
        </div>
      </section>

      {/* 支付方式 - 柔和阴影卡片 */}
      <section className="py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.name}
              className="flex flex-col items-center rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-8 py-12 text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-[16px] ${method.bg} ${method.iconColor}`}>
                <method.icon size={32} />
              </div>
              <p className="mt-6 text-[18px] font-bold leading-7 text-[var(--is-ink)]">{method.name}</p>
              <p className="mt-1 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{method.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GitHub */}
      <section className="border-t border-[var(--is-border)] py-16">
        <div className="mx-auto max-w-[560px] rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-8 py-10 text-center shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
          <p className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
            如果 IconStore 对你的工作或学习有所帮助，欢迎在 GitHub 上点个 Star。
            这不会花费你太多时间，但对开源作者来说是莫大的认可和动力。
          </p>
          <a
            href="https://github.com/zweioio/iconstore"
            target="_blank"
            rel="noreferrer"
            className="is-button-primary mt-6 inline-flex items-center gap-2"
          >
            <Github size={16} />
            {t.support.starRepo}
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </div>
  )
}
