import { Github, Twitter } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguageStore } from '@/store/useLanguageStore'
import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import type { Language } from '@/store/useLanguageStore'

const i18n: Record<Language, typeof zh> = { zh, en }

export function SiteHeader() {
  const { language } = useLanguageStore()
  const t = i18n[language]

  const navItems = [
    { to: '/', label: t.nav.icons },
    { to: '/about', label: t.nav.about },
    { to: '/guide', label: t.nav.guide },
    { to: '/license', label: t.nav.license },
    { to: '/request', label: t.nav.request },
    { to: '/support', label: t.nav.support },
  ]

  return (
    <header className="border-b border-transparent bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-[#0395ff]">
            <span className="text-[12px] font-bold leading-none text-white">Ic</span>
          </div>
          <p className="text-[16px] font-bold leading-[19px] text-black">iconStore</p>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex h-8 items-center rounded-[8px] px-3 text-[14px] leading-[22px] text-[#202224] transition hover:bg-[#f8f8fc]',
                  isActive && 'bg-[#f8f8fc] text-black',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* 右上角社交入口保持轻量图标风格，接近设计稿的纯图标展示 */}
          <a
            href="https://github.com/zweioio/iconstore"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#ffffff] text-[#09244b] transition hover:bg-[#f8f8fc]"
            aria-label="GitHub"
          >
            <Github size={16} strokeWidth={1.8} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#ffffff] text-[#09244b] transition hover:bg-[#f8f8fc]"
            aria-label="X"
          >
            <Twitter size={16} strokeWidth={1.8} />
          </a>
          <LanguageSwitcher />
          <Link
            to="/about"
            className="inline-flex rounded-[8px] border border-[#e9eaeb] px-3 py-1.5 text-[13px] text-[#202224] transition hover:bg-[#f8f8fc] md:hidden"
          >
            {t.nav.aboutMobile}
          </Link>
        </div>
      </div>
    </header>
  )
}
