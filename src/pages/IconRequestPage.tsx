import { useState } from 'react'
import { ArrowRight, Send, Sparkles } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9']

function fireConfetti(e: React.MouseEvent) {
  const cx = e.clientX
  const cy = e.clientY

  const container = document.createElement('div')
  container.className = 'confetti-container'
  Object.assign(container.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9999',
  })
  document.body.appendChild(container)

  const layers = [
    { count: 12, minDist: 30,  maxDist: 80  },
    { count: 8,  minDist: 80,  maxDist: 150 },
    { count: 5,  minDist: 150, maxDist: 220 },
  ]

  const style = document.createElement('style')
  style.textContent = `
    @keyframes confetti-burst {
      0%   { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
      20%  { opacity: 1; transform: translate(calc(var(--dx)*0.3), calc(var(--dy)*0.3)) rotate(calc(var(--r)*0.3)) scale(1.3); }
      100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)) scale(0.2); }
    }
  `
  container.appendChild(style)

  layers.forEach(({ count, minDist, maxDist }) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      const shape = Math.random()
      const isStripe = shape > 0.7
      const isCircle = shape < 0.35

      const angle = Math.random() * Math.PI * 2
      const distance = minDist + Math.random() * (maxDist - minDist)
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance + 50

      let w: number, h: number, br: string
      if (isStripe) {
        w = 2 + Math.random() * 2
        h = 8 + Math.random() * 6; br = '1px'
        el.style.background = `linear-gradient(180deg, ${confettiColors[Math.floor(Math.random() * confettiColors.length)]}, ${confettiColors[Math.floor(Math.random() * confettiColors.length)]})`
      } else if (isCircle) {
        w = 5 + Math.random() * 3; h = w; br = '50%'
        el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      } else {
        w = 4 + Math.random() * 4; h = 4 + Math.random() * 4; br = '1px'
        el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      }

      Object.assign(el.style, {
        position: 'absolute',
        left: `${cx}px`,
        top: `${cy}px`,
        width: `${w}px`,
        height: `${h}px`,
        borderRadius: br,
        animation: `confetti-burst ${0.6 + Math.random() * 0.5}s ease-out ${Math.random() * 0.06}s forwards`,
      })
      el.style.setProperty('--dx', `${dx}px`)
      el.style.setProperty('--dy', `${dy}px`)
      el.style.setProperty('--r', `${Math.random() * 720}deg`)

      container.appendChild(el)
    }
  })

  setTimeout(() => container.remove(), 1500)
}

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = '请输入图标名称'
    if (!form.email.trim()) errors.email = '请输入联系方式'
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
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
          <div className="mx-auto max-w-[1200px]">
            <div className="mt-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--is-surface)]">
                <Sparkles size={22} className="text-[var(--is-ink)]" />
              </div>
              <h1 className="mt-6 text-[28px] font-bold leading-9 tracking-[-0.01em] text-[var(--is-ink)]">{t.requestPage.successTitle}</h1>
              <p className="mt-3 mx-auto max-w-[460px] text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
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
      <section className="pt-20 pb-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto text-center">
            <h1 className="text-[48px] leading-[56px] text-[var(--is-ink)]">
              {t.requestPage.heroTitle}
            </h1>
            <p className="mt-6 text-[16px] leading-[24px] whitespace-pre-line text-[var(--is-ink-soft)]">
              {t.requestPage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto max-w-[560px]">
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {/* 图标名称 */}
              <div>
                <label className="block text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">
                  {t.requestPage.formName} <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{t.requestPage.formNameHint}</p>
                  {formErrors.name && <p className="text-[12px] leading-[22px] text-[#d32f2f]">{formErrors.name}</p>}
                </div>
                <input
                  type="text"
                  placeholder={t.requestPage.formNamePlaceholder}
                  className={`is-input mt-2 w-full ${formErrors.name ? 'border-[#d32f2f]' : ''}`}
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); if (formErrors.name) setFormErrors({ ...formErrors, name: '' }) }}
                />
              </div>

              {/* 风格偏好 */}
              <div>
                <label className="block text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">{t.requestPage.formStyle}</label>
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
                <label className="block text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">{t.requestPage.formScenario}</label>
                <p className="mt-0.5 text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{t.requestPage.formScenarioHint}</p>
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
                <label className="block text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">{t.requestPage.formReference}</label>
                <p className="mt-0.5 text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{t.requestPage.formReferenceHint}</p>
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
                <label className="block text-[14px] font-normal leading-[22px] text-[var(--is-ink)]">
                  {t.requestPage.formEmail} <span className="text-[var(--is-ink-faint)]">*</span>
                </label>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{t.requestPage.formEmailHint}</p>
                  {formErrors.email && <p className="text-[12px] leading-[22px] text-[#d32f2f]">{formErrors.email}</p>}
                </div>
                <input
                  type="email"
                  placeholder={t.requestPage.formEmailPlaceholder}
                  className={`is-input mt-2 w-full ${formErrors.email ? 'border-[#d32f2f]' : ''}`}
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); if (formErrors.email) setFormErrors({ ...formErrors, email: '' }) }}
                />
              </div>

              {/* 提交 */}
              <div className="pt-4">
                <button type="submit" onClick={(e) => fireConfetti(e)} className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-[var(--is-ink)] px-6 text-[14px] font-normal leading-[22px] text-[var(--is-white)]">
                  <Send size={16} />
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
