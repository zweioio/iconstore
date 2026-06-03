import { Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import type { Language } from '@/store/useLanguageStore'

const languageOptions: { value: Language; label: string }[] = [
  { value: 'zh', label: '中文（简体）' },
  { value: 'zh-TW', label: '中文（繁体）' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = languageOptions.find((l) => l.value === language)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-[var(--is-white)] text-[var(--is-ink)] transition hover:bg-[var(--is-surface)]"
        aria-label="切换语言"
      >
        <Globe size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-[60] mt-2 flex w-[160px] flex-col gap-[4px] rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-1 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
          {languageOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setLanguage(opt.value)
                setOpen(false)
              }}
              className={cn(
                'flex h-10 w-full items-center justify-between rounded-[8px] px-3 text-left transition',
                language === opt.value
                  ? 'bg-[var(--is-surface)]'
                  : 'bg-[var(--is-white)] hover:bg-[var(--is-surface)]',
              )}
            >
              <span className="text-[14px] leading-[22px] text-[var(--is-ink)]">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
