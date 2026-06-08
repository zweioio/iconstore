import { useState } from 'react'
import { ArrowRight, Send, Sparkles } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function IconRequestPage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const [form, setForm] = useState({
    name: '',
    style: 'both',
    scenario: '',
    reference: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`${t.requestPage.formName}: ${form.name}`)
    const body = encodeURIComponent(
      `${t.requestPage.formName}: ${form.name}\n${t.requestPage.formStyle}: ${form.style === 'linear' ? t.requestPage.formStyleLinear : form.style === 'filled' ? t.requestPage.formStyleFilled : t.requestPage.formStyleBoth}\n${t.requestPage.formScenario}: ${form.scenario}\n${t.requestPage.formReference}: ${form.reference}\n${t.requestPage.formEmail}: ${form.email}`
    )
    window.open(`mailto:iconstore@request.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <div className="pb-32 pt-14">
          <div className="mx-auto max-w-[960px]">
            <div className="mt-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--is-surface)]">
                <Sparkles size={22} className="text-[var(--is-ink)]" />
              </div>
              <h1 className="mt-6 text-[28px] font-bold leading-8 tracking-[-0.01em] text-[var(--is-ink)]">{t.requestPage.successTitle}</h1>
              <p className="mt-3 max-w-[460px] text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                {t.requestPage.successDesc}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ name: '', style: 'both', scenario: '', reference: '', email: '' })
                }}
                className="is-button-primary mt-8 inline-flex items-center gap-2"
              >
                {t.requestPage.successAgain}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <div className="pb-32">
        {/* Hero */}
      <section className="py-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              {t.requestPage.heroTitle}
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              {t.requestPage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <div className="mt-12 max-w-[560px]">
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 图标名称 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
                  {t.requestPage.formName} <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">{t.requestPage.formNameHint}</p>
                <input
                  type="text"
                  required
                  placeholder={t.requestPage.formNamePlaceholder}
                  className="is-input mt-2 w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* 风格偏好 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.requestPage.formStyle}</label>
                <div className="mt-3 flex gap-6">
                  {[
                    { value: 'linear', label: t.requestPage.formStyleLinear },
                    { value: 'filled', label: t.requestPage.formStyleFilled },
                    { value: 'both', label: t.requestPage.formStyleBoth },
                  ].map((opt) => (
                    <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="style"
                        value={opt.value}
                        checked={form.style === opt.value}
                        onChange={(e) => setForm({ ...form, style: e.target.value })}
                        className="h-4 w-4 accent-[var(--is-ink)]"
                      />
                      <span className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 使用场景 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.requestPage.formScenario}</label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">{t.requestPage.formScenarioHint}</p>
                <textarea
                  rows={3}
                  placeholder={t.requestPage.formScenarioPlaceholder}
                  className="is-textarea mt-2 w-full"
                  value={form.scenario}
                  onChange={(e) => setForm({ ...form, scenario: e.target.value })}
                />
              </div>

              {/* 参考链接 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.requestPage.formReference}</label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">{t.requestPage.formReferenceHint}</p>
                <input
                  type="text"
                  placeholder={t.requestPage.formReferencePlaceholder}
                  className="is-input mt-2 w-full"
                  value={form.reference}
                  onChange={(e) => setForm({ ...form, reference: e.target.value })}
                />
              </div>

              {/* 联系方式 */}
              <div>
                <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
                  {t.requestPage.formEmail} <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <p className="mt-0.5 text-[13px] leading-5 text-[var(--is-ink-faint)]">{t.requestPage.formEmailHint}</p>
                <input
                  type="email"
                  required
                  placeholder={t.requestPage.formEmailPlaceholder}
                  className="is-input mt-2 w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* 提交 */}
              <div className="pt-4">
                <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[var(--is-ink)] px-6 text-[15px] font-medium leading-6 text-[var(--is-white)] transition hover:bg-[var(--is-ink-soft)]">
                  <Send size={15} />
                  {t.requestPage.formSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      </div>
      <BackToTop />
    </>
  )
}
