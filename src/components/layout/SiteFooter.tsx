import { Github, Twitter } from 'lucide-react'
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
        {/* 左侧：品牌 */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#0395ff]">
              <span className="text-[12px] font-bold leading-none text-white">Ic</span>
            </div>
            <p className="text-[16px] font-bold leading-[19px] text-black">iconStore</p>
          </Link>
        </div>

        {/* 中间：导航链接 */}
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
        </div>

        {/* 右侧：社交图标 */}
        <div className="ml-6 flex items-center gap-2">
          <a
            href="https://github.com/zweioio/iconstore"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-soft)] transition hover:bg-[#f8f8fc] hover:text-[var(--is-ink)]"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[var(--is-ink-soft)] transition hover:bg-[#f8f8fc] hover:text-[var(--is-ink)]"
            aria-label="X"
          >
            <Twitter size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
