import { Github, Moon, Sun, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SiteLogo } from './SiteLogo'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  function toggle() {
    document.documentElement.classList.add('transitioning')
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    setDark(next)
    setTimeout(() => document.documentElement.classList.remove('transitioning'), 300)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--is-white)] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
      aria-label={dark ? '切换亮色模式' : '切换暗色模式'}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export function SiteHeader() {
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
    <header className="border-b border-transparent bg-[var(--is-white)]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between py-6">
        <Link to="/">
          <SiteLogo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'inline-flex h-8 items-center rounded-[8px] px-3 text-[14px] leading-[22px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]',
                  isActive && 'bg-[var(--is-surface)] text-[var(--is-ink)]',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* 右上角社交入口保持轻量图标风格，接近设计稿的纯图标展示 */}
          <ThemeToggle />
          <a
            href="https://github.com/zweioio/iconstore"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--is-white)] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
            aria-label="GitHub"
          >
            <Github size={16} strokeWidth={1.8} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--is-white)] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
            aria-label="X"
          >
            <Twitter size={16} strokeWidth={1.8} />
          </a>
          <LanguageSwitcher />
          <Link
            to="/about"
            className="inline-flex rounded-[8px] border border-[var(--is-border)] px-3 py-1.5 text-[13px] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)] md:hidden"
          >
            {t.nav.aboutMobile}
          </Link>
        </div>
      </div>
    </header>
  )
}
