import { Github, CreditCard, Wallet, MessageCircle, ExternalLink, Star, Coffee } from 'lucide-react'

export default function SupportPage() {
  const methods = [
    {
      name: 'PayPal',
      icon: CreditCard,
      desc: '支持国际信用卡和 PayPal 余额',
      detail: 'donate@iconstore.dev',
      color: '#0070BA',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: '支付宝',
      icon: Wallet,
      desc: '支持支付宝扫码支付',
      detail: 'iconstore@alipay.com',
      color: '#1677FF',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: '微信',
      icon: MessageCircle,
      desc: '支持微信扫码支付',
      detail: '微信号: iconstore',
      color: '#07C160',
      bg: 'bg-[#F0FFF4]',
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="border-b border-[var(--is-border)] pb-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">01 / 支持我们</p>
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              让好图标持续生长
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              IconStore 从第一天起就是免费、开源的。每个图标的设计、每行代码的打磨，背后都是真实投入的时间。
              如果你觉得这个项目有价值，你的支持会让我们走得更远。
            </p>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="border-b border-[var(--is-border)] py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">02 / 赞助方式</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {methods.map((method) => (
              <div key={method.name} className="rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-7 py-10 text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[14px] ${method.bg}`}>
                  <method.icon size={26} style={{ color: method.color }} />
                </div>
                <p className="mt-5 text-[17px] font-bold leading-6 text-[var(--is-ink)]">{method.name}</p>
                <p className="mt-2 text-[13px] leading-5 text-[var(--is-ink-soft)]">{method.desc}</p>
                <p className="mt-1 text-[12px] leading-[18px] text-[var(--is-ink-faint)]">{method.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <p className="text-[14px] font-medium leading-[22px] text-[var(--is-ink-faint)]">03 / 其他方式</p>
          <div className="mt-12 space-y-10">
            <div className="flex items-start gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--is-surface)]">
                <Star size={18} className="text-[var(--is-ink)]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold leading-6 text-[var(--is-ink)]">在 GitHub 点个 Star</h3>
                <p className="mt-2 max-w-[480px] text-[14px] leading-[24px] text-[var(--is-ink-soft)]">
                  这是最不需要成本但又最有意义的方式。一个 Star 不会占用你多少时间，但每一次点亮都是对开源的认可。
                </p>
                <a
                  href="https://github.com/zweioio/iconstore"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-[8px] border border-[var(--is-border)] bg-[var(--is-white)] px-5 text-[14px] font-medium leading-6 text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
                >
                  <Github size={16} />
                  zweioio/iconstore
                  <ExternalLink size={13} className="text-[var(--is-ink-faint)]" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--is-surface)]">
                <Coffee size={18} className="text-[var(--is-ink)]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold leading-6 text-[var(--is-ink)]">帮忙推广</h3>
                <p className="mt-2 max-w-[480px] text-[14px] leading-[24px] text-[var(--is-ink-soft)]">
                  如果你觉得 IconStore 好用，推荐给同事、分享到社交媒体、写篇文章介绍它——每一种分享都在帮助这个项目被更多人看到。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
