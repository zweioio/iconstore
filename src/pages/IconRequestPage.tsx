import { useState } from 'react'

import { Send } from 'lucide-react'

import { useLanguageStore } from '@/store/useLanguageStore'
import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import type { Language } from '@/store/useLanguageStore'

const i18n: Record<Language, typeof zh> = { zh, en }

export default function IconRequestPage() {
  const { language } = useLanguageStore()
  const t = i18n[language]

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
        <div className="is-panel max-w-[480px] p-8 text-center">
          <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
            {t.request.success.title}
          </h1>
          <p className="mt-4 text-[16px] leading-6 text-[#60656b]">
            {t.request.success.message}
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="is-button-primary mt-8 inline-flex"
          >
            {t.request.success.continue}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">Icon Request</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          {t.request.title}
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          {t.request.description}
        </p>
      </div>

      {/* 申请表单 */}
      <section className="is-panel max-w-[640px] p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 图标名称/类型 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              {t.request.form.name} <span className="text-[#b5b9bf]">*</span>
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
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              {t.request.form.style}
            </label>
            <div className="mt-3 flex gap-6">
              {[
                { value: 'linear', label: t.request.form.linear },
                { value: 'filled', label: t.request.form.filled },
                { value: 'both', label: t.request.form.both },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="radio"
                    name="style"
                    value={opt.value}
                    checked={form.style === opt.value}
                    onChange={(e) => setForm({ ...form, style: e.target.value })}
                    className="h-4 w-4 accent-[#202224]"
                  />
                  <span className="text-[14px] leading-[22px] text-[#60656b]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 使用场景描述 */}
          <div>
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              {t.request.form.scenario}
            </label>
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
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              {t.request.form.reference}
            </label>
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
            <label className="block text-[14px] font-medium leading-[22px] text-[#202224]">
              {t.request.form.email}
            </label>
            <input
              type="email"
              placeholder={t.request.form.emailPlaceholder}
              className="is-input mt-2 w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className="is-button-primary inline-flex items-center gap-2"
          >
            <Send size={14} />
            {t.request.form.submit}
          </button>
        </form>
      </section>
    </div>
  )
}
