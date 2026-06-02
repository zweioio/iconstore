import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--ds-border)] bg-transparent">
      <div className="mx-auto grid max-w-7xl gap-8 px-2 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-2">
          <p className="font-display text-2xl font-bold text-[var(--ds-ink)]">Anicon</p>
          <p className="max-w-xl text-sm leading-8 text-[var(--ds-ink-soft)]">
            为设计师和前端准备的浅色图标官网，第一版聚焦统一风格、快速查找和顺手的 SVG 使用体验
          </p>
        </div>

        <div className="grid gap-2 text-sm text-[var(--ds-ink-soft)] sm:grid-cols-3">
          <Link className="transition hover:text-[var(--ds-ink)]" to="/">
            图标库
          </Link>
          <Link className="transition hover:text-[var(--ds-ink)]" to="/about">
            产品说明
          </Link>
          <Link className="transition hover:text-[var(--ds-ink)]" to="/guide">
            使用说明
          </Link>
          <Link className="transition hover:text-[var(--ds-ink)]" to="/license">
            授权说明
          </Link>
          <a className="transition hover:text-[var(--ds-ink)]" href="mailto:hello@anicon.design">
            商务联系
          </a>
          <span>免费可商用</span>
        </div>
      </div>
    </footer>
  )
}
