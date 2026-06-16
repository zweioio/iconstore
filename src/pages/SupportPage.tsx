import { Github, CreditCard, Wallet, MessageCircle, ExternalLink, Star, Coffee } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function SupportPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const methods = [
    {
      name: t.supportPage.paypal,
      icon: CreditCard,
      desc: t.supportPage.paypalDesc,
      detail: 'donate@iconstore.dev',
      color: '#0070BA',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: t.supportPage.alipay,
      icon: Wallet,
      desc: t.supportPage.alipayDesc,
      detail: 'iconstore@alipay.com',
      color: '#1677FF',
      bg: 'bg-[#F0F7FF]',
    },
    {
      name: t.supportPage.wechat,
      icon: MessageCircle,
      desc: t.supportPage.wechatDesc,
      detail: `${t.nav.support}: iconstore`,
      color: '#07C160',
      bg: 'bg-[#F0FFF4]',
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto text-center">
            <h1 className="text-[48px] leading-[56px] text-[var(--is-ink)]">
              {t.supportPage.heroTitle}
            </h1>
            <p className="mt-6 text-[16px] leading-[24px] whitespace-pre-line text-[var(--is-ink-soft)]">
              {t.supportPage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 sm:grid-cols-3">
            {methods.map((method) => (
              <div key={method.name} className="rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-7 py-10 text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-[14px] ${method.bg}`}>
                  <method.icon size={26} style={{ color: method.color }} />
                </div>
                <p className="mt-5 text-[18px] font-bold leading-[26px] text-[var(--is-ink)]">{method.name}</p>
                <p className="mt-2 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{method.desc}</p>
                <p className="mt-1 text-[12px] leading-[20px] text-[var(--is-ink-faint)]">{method.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section className="py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="flex items-start gap-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--is-surface)]">
                <Star size={18} className="text-[var(--is-ink)]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold leading-[26px] text-[var(--is-ink)]">{t.supportPage.starTitle}</h3>
                <p className="mt-2 max-w-[480px] text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
                  {t.supportPage.starDesc}
                </p>
                <a
                  href="https://github.com/zweioio/iconstore"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-[8px] border border-[var(--is-border)] bg-[var(--is-white)] px-5 text-[14px] font-normal leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
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
                <h3 className="text-[18px] font-bold leading-[26px] text-[var(--is-ink)]">{t.supportPage.shareTitle}</h3>
                <p className="mt-2 max-w-[480px] text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
                  {t.supportPage.shareDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
