import { Link } from 'react-router-dom'

import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

export function SiteFooter() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const navItems = [
    { to: '/', label: t.nav.icons },
    { to: '/about', label: t.nav.about },
    { to: '/guide', label: t.nav.guide },
    { to: '/license', label: t.nav.license },
    { to: '/request', label: t.nav.request },
    { to: '/support', label: t.nav.support },
  ]

  return (
    <footer className="border-t border-[var(--is-border)] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-2 py-6 lg:px-0">
        {/* 左侧：品牌 + 描述 */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#0395ff]">
              <span className="text-[12px] font-bold leading-none text-white">Ic</span>
            </div>
            <p className="text-[16px] font-bold leading-[19px] text-black">iconStore</p>
          </Link>
          <p className="hidden text-[14px] leading-[22px] text-[var(--is-ink-soft)] sm:block">
            {t.site.tagline}
          </p>
        </div>

        {/* 右侧：导航链接 + 联系 */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[14px] leading-[22px] text-[var(--is-ink-soft)] transition hover:text-[var(--is-ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="hidden text-[14px] leading-[22px] text-[var(--is-ink-faint)] md:inline">
            {t.license.free}
          </span>
        </div>
      </div>
    </footer>
  )
}
