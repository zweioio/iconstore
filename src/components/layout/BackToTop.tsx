import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--is-border)] bg-[var(--is-white)] text-[var(--is-ink)] transition-all hover:bg-[var(--is-surface)] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      style={{ right: 'calc(max(16px, (100vw - 1200px) / 2 - 64px))' }}
      aria-label="回到顶部"
    >
      <ArrowUp size={18} />
    </button>
  )
}
