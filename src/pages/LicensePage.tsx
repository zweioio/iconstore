import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export default function LicensePage() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const licenseItems = [
    {
      title: t.license.items.commercial,
      description: t.license.items.commercialDesc,
    },
    {
      title: t.license.items.modify,
      description: t.license.items.modifyDesc,
    },
    {
      title: t.license.items.noResell,
      description: t.license.items.noResellDesc,
    },
  ]

  return (
    <div className="space-y-10 pb-24 pt-10">
      {/* 页面标题 */}
      <div className="space-y-4">
        <p className="text-[14px] font-medium leading-[22px] text-[#60656b]">License</p>
        <h1 className="text-[36px] font-bold leading-10 text-[#202224]">
          {t.license.title}
        </h1>
        <p className="max-w-2xl text-[16px] leading-6 text-[#60656b]">
          {t.license.description}
        </p>
      </div>

      {/* 授权条款 */}
      <section className="grid gap-8 lg:grid-cols-3">
        {licenseItems.map((item) => (
          <article key={item.title} className="is-panel p-8">
            <h2 className="text-[20px] font-bold leading-7 text-[#202224]">{item.title}</h2>
            <p className="mt-4 text-[14px] leading-[22px] text-[#60656b]">{item.description}</p>
          </article>
        ))}
      </section>

      {/* 授权建议文案 */}
      <section className="is-panel p-8">
        <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{t.license.advice}</h2>
        <div className="mt-8 space-y-3 text-[14px] leading-[22px] text-[#60656b]">
          <p>{t.license.advice1}</p>
          <p>{t.license.advice2}</p>
          <p>{t.license.advice3}</p>
        </div>
      </section>
    </div>
  )
}
