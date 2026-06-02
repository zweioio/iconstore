import { useState } from 'react'

import { Send, Sparkles } from 'lucide-react'

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
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-[400px] items-center justify-center pb-24 pt-10">
        <div className="mx-auto max-w-[440px] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--is-surface)]">
            <Sparkles size={28} className="text-[var(--is-ink)]" />
          </div>
          <h1 className="mt-6 text-[28px] font-bold leading-8 text-[var(--is-ink)]">{t.request.success.title}</h1>
          <p className="mt-3 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{t.request.success.message}</p>
          <button type="button" onClick={() => setSubmitted(false)} className="is-button-primary mt-8 inline-flex">
            {t.request.success.continue}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 pt-4">
      {/* 页面标题 */}
      <section className="border-b border-[var(--is-border)] pb-12 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[40px] font-bold leading-[44px] text-[var(--is-ink)]">{t.request.title}</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-6 text-[var(--is-ink-soft)]">
            {t.request.description}
          </p>
        </div>
      </section>

      {/* 表单 */}
      <section className="py-16">
        <div className="mx-auto max-w-[560px]">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* 图标名称 */}
            <div>
              <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">
                {t.request.form.name} <span className="text-[var(--is-ink-faint)]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={t.request.form.namePlaceholder}
                className="is-input mt-2 w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* 风格偏好 */}
            <div>
              <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.request.form.style}</label>
              <div className="mt-3 flex gap-6">
                {[
                  { value: 'linear', label: t.request.form.linear },
                  { value: 'filled', label: t.request.form.filled },
                  { value: 'both', label: t.request.form.both },
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
              <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.request.form.scenario}</label>
              <textarea
                rows={4}
                placeholder={t.request.form.scenarioPlaceholder}
                className="is-textarea mt-2 w-full"
                value={form.scenario}
                onChange={(e) => setForm({ ...form, scenario: e.target.value })}
              />
            </div>

            {/* 参考链接 */}
            <div>
              <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.request.form.reference}</label>
              <input
                type="text"
                placeholder={t.request.form.referencePlaceholder}
                className="is-input mt-2 w-full"
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
              />
            </div>

            {/* 联系方式 */}
            <div>
              <label className="block text-[14px] font-medium leading-[22px] text-[var(--is-ink)]">{t.request.form.email}</label>
              <input
                type="email"
                placeholder={t.request.form.emailPlaceholder}
                className="is-input mt-2 w-full"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* 提交 */}
            <div className="pt-4">
              <button type="submit" className="is-button-primary inline-flex items-center gap-2">
                <Send size={14} />
                {t.request.form.submit}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
