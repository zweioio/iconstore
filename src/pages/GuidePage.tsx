import { Code2, Paintbrush } from 'lucide-react'
import { BackToTop } from '@/components/layout/BackToTop'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function GuidePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const workflows = [
    {
      role: 'Designer',
      icon: Paintbrush,
      title: t.guidePage.designerTitle,
      steps: [
        t.guidePage.stepsDesigner[0],
        t.guidePage.stepsDesigner[1],
        t.guidePage.stepsDesigner[2],
      ],
      tip: t.guidePage.tipDesigner,
    },
    {
      role: 'Developer',
      icon: Code2,
      title: t.guidePage.developerTitle,
      steps: [
        t.guidePage.stepsDeveloper[0],
        t.guidePage.stepsDeveloper[1],
        t.guidePage.stepsDeveloper[2],
      ],
      tip: t.guidePage.tipDeveloper,
    },
  ]

  return (
    <div className="pb-32">
      {/* Hero */}
      <section className="py-20 pt-14">
        <div className="mx-auto max-w-[960px]">
          <div className="mt-6 max-w-[720px]">
            <h1 className="text-[44px] font-bold leading-[52px] tracking-[-0.02em] text-[var(--is-ink)]">
              {t.guidePage.heroTitle}
            </h1>
            <p className="mt-6 text-[17px] leading-[28px] text-[var(--is-ink-soft)]">
              {t.guidePage.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <div className="grid gap-16 md:grid-cols-2">
            {workflows.map((wf) => (
              <div key={wf.role}>
                <div className="flex items-center gap-3 border-b border-[var(--is-border)] pb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[var(--is-surface)]">
                    <wf.icon size={18} className="text-[var(--is-ink)]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium leading-4 text-[var(--is-ink-faint)]">{wf.role}</p>
                    <h2 className="text-[18px] font-bold leading-6 text-[var(--is-ink)]">{wf.title}</h2>
                  </div>
                </div>
                <div className="mt-7 space-y-6">
                  {wf.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--is-surface)] text-[12px] font-bold leading-5 text-[var(--is-ink)]">
                        {i + 1}
                      </span>
                      <p className="pt-0.5 text-[14px] leading-[24px] text-[var(--is-ink-soft)]">{step}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[8px] bg-[var(--is-surface)] px-4 py-3">
                  <p className="text-[13px] leading-[20px] text-[var(--is-ink-soft)]">
                    <span className="font-medium text-[var(--is-ink)]">Tip: </span>{wf.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-20">
        <div className="mx-auto max-w-[960px]">
          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">React</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                {t.guidePage.integrationReact}
              </p>
              <pre className="mt-5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-code-bg)] p-5 text-[13px] leading-6">
                <code className="text-[var(--is-ink-soft)]">{`function UserIcon() {
  return (
    <span dangerouslySetInnerHTML={{
      __html: '<svg viewBox="0 0 24 24" fill="none"...>'
    }} />
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">Vue</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                {t.guidePage.integrationVue}
              </p>
              <pre className="mt-5 rounded-[10px] border border-[var(--is-border)] bg-[var(--is-code-bg)] p-5 text-[13px] leading-6">
                <code className="text-[var(--is-ink-soft)]">{`<template>
  <span v-html="userSvg" />
</template>`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-12 flex items-start gap-10">
            <span className="text-[14px] font-medium leading-6 text-[var(--is-ink-faint)]">HTML</span>
            <div className="flex-1">
              <p className="text-[15px] leading-[26px] text-[var(--is-ink-soft)]">
                {t.guidePage.integrationHtml}
              </p>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  )
}
