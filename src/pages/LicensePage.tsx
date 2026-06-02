import { Ban, Check, Pencil } from 'lucide-react'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function LicensePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const items = [
    {
      icon: Check,
      title: t.license.items.commercial,
      desc: t.license.items.commercialDesc,
    },
    {
      icon: Pencil,
      title: t.license.items.modify,
      desc: t.license.items.modifyDesc,
    },
    {
      icon: Ban,
      title: t.license.items.noResell,
      desc: t.license.items.noResellDesc,
    },
  ]

  return (
    <div className="pb-24 pt-4">
      {/* 页面标题 */}
      <section className="border-b border-[var(--is-border)] pb-12 pt-10">
        <div className="mx-auto max-w-[720px] text-center">
          <h1 className="text-[40px] font-bold leading-[44px] text-[var(--is-ink)]">{t.license.title}</h1>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-6 text-[var(--is-ink-soft)]">
            IconStore 提供开源图标，可用于个人和商业项目。以下是我们的授权条款说明。
          </p>
        </div>
      </section>

      {/* 授权条款 */}
      <section className="py-16">
        <div className="grid gap-px overflow-hidden rounded-[12px] border border-[var(--is-border)] bg-[var(--is-border)] md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="bg-white px-8 py-10">
              <item.icon size={24} className="text-[var(--is-ink)]" />
              <h2 className="mt-6 text-[18px] font-bold leading-7 text-[var(--is-ink)]">{item.title}</h2>
              <p className="mt-3 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 授权总结 */}
      <section className="border-t border-[var(--is-border)] py-16">
        <div className="mx-auto max-w-[720px]">
          <h2 className="text-[20px] font-bold leading-7 text-[var(--is-ink)]">{t.license.advice}</h2>
          <div className="mt-8 space-y-4">
            {[t.license.advice1, t.license.advice2, t.license.advice3].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0 text-[var(--is-ink)]" />
                <p className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
