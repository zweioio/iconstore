import { Shield, ExternalLink } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function LicensePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const terms = [
    {
      title: t.licensePage.termCommercial,
      desc: t.licensePage.termCommercialDesc,
    },
    {
      title: t.licensePage.termModify,
      desc: t.licensePage.termModifyDesc,
    },
    {
      title: t.licensePage.termNoResell,
      desc: t.licensePage.termNoResellDesc,
    },
    {
      title: t.licensePage.termNoCredit,
      desc: t.licensePage.termNoCreditDesc,
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="py-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              {t.licensePage.heroTitle}
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              {t.licensePage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Terms grid */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
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
          <div className="mt-12 space-y-8">
            <div className="flex items-start gap-5">
              <Shield size={18} className="mt-0.5 shrink-0 text-[var(--is-ink)]" />
              <div>
                <h3 className="text-[16px] font-bold leading-6 text-[var(--is-ink)]">{t.licensePage.trademark}</h3>
                <p className="mt-1 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">{t.licensePage.trademarkDesc}</p>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <ExternalLink size={18} className="mt-0.5 shrink-0 text-[var(--is-ink)]" />
              <div>
                <h3 className="text-[16px] font-bold leading-6 text-[var(--is-ink)]">{t.licensePage.fullLicense}</h3>
                <p className="mt-1 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">{t.licensePage.fullLicenseDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
