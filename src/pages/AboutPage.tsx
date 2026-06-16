import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import { BackToTop } from '@/components/layout/BackToTop'

export default function AboutPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const stats = [
    { value: '108', label: t.aboutPage.statIcons, desc: t.aboutPage.statIconsDesc },
    { value: '2', label: t.aboutPage.statStyle, desc: t.aboutPage.statStyleDesc },
    { value: '100%', label: t.aboutPage.statFree, desc: t.aboutPage.statFreeDesc },
  ]

  const features = [
    { num: '01', title: t.aboutPage.feature1Title, desc: t.aboutPage.feature1Desc },
    { num: '02', title: t.aboutPage.feature2Title, desc: t.aboutPage.feature2Desc },
    { num: '03', title: t.aboutPage.feature3Title, desc: t.aboutPage.feature3Desc },
    { num: '04', title: t.aboutPage.feature4Title, desc: t.aboutPage.feature4Desc },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[720px] mx-auto text-center">
            <h1 className="text-[48px] leading-[56px] text-[var(--is-ink)]">
              {t.aboutPage.heroTitle}
            </h1>
            <p className="mt-6 text-[16px] leading-[24px] text-[var(--is-ink-soft)]">
              {t.aboutPage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Data row */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex items-start gap-16">
            {stats.map((item) => (
              <div key={item.label} className="flex-1">
                <p className="text-[36px] font-bold leading-[44px] tracking-[-0.02em] text-[var(--is-ink)]">{item.value}</p>
                <p className="mt-2 text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">{item.label}</p>
                <p className="mt-1 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mt-12 space-y-14">
            {features.map((item) => (
              <div key={item.num} className="flex items-start gap-10">
                <span className="w-10 shrink-0 text-[14px] font-normal leading-[22px] text-[var(--is-ink-faint)]">{item.num}</span>
                <div className="border-t border-[var(--is-border)] pt-5 w-full">
                  <h3 className="text-[22px] font-bold leading-[30px] tracking-[-0.01em] text-[var(--is-ink)]">{item.title}</h3>
                  <p className="mt-3 max-w-[520px] text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
