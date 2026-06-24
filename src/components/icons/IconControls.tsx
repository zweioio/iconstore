import { ChevronDown, Clock, Search, Star, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { categoryLabels } from '@/data/icons'
import { icons } from '@/data/icons'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import type { IconCategory } from '@/types/icon'

// 统计每个分类的图标数量
const categoryCounts = Object.keys(categoryLabels).reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = icons.filter((icon) => icon.category === cat).length
  return acc
}, {})
categoryCounts['all'] = icons.length

type IconControlsProps = {
  favoriteCount: number
  favoritesOpen: boolean
  onCategorySelect?: (cat: string) => void
  onFavoritesToggle: () => void
}

export function IconControls({ favoriteCount, favoritesOpen, onCategorySelect, onFavoritesToggle }: IconControlsProps) {
  const { language } = useLanguageStore()
  const t = translations[language]

  const {
    keyword,
    category,
    setKeyword,
    setCategory,
  } = useIconLibraryStore()

  const [inputValue, setInputValue] = useState(keyword)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [visibleCategory, setVisibleCategory] = useState<string | null>(null)
  const [animPhase, setAnimPhase] = useState<'enter' | 'exit' | 'idle'>('idle')
  const [searchHistoryOpen, setSearchHistoryOpen] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('is-search-history') || '[]').slice(0, 5) }
    catch { return [] }
  })
  const displayRef = useRef({ name: t.categories.all, count: categoryCounts['all'] })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchHistoryRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  // 注入进出场动画
  useEffect(() => {
    if (document.getElementById('is-cat-anim')) return
    const s = document.createElement('style')
    s.id = 'is-cat-anim'
    s.textContent = `@keyframes cat-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes cat-exit{from{opacity:1}to{opacity:0}}`
    document.head.appendChild(s)
  }, [])

  // 滚动时检测顶部分类（基于元素到视口顶部的距离，准确无间隙）
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[id^="category-"]')
    if (sections.length === 0) return

    function updateFromScroll() {
      requestAnimationFrame(() => {
        let lastInView = ''
        for (const el of sections) {
          const top = el.getBoundingClientRect().top
          if (top > -90 && top < window.innerHeight * 0.3) {
            setVisibleCategory(el.id.replace('category-', ''))
            return
          }
          // 记录最后一个顶部在检测区附近的元素
          if (top < window.innerHeight * 0.3) lastInView = el.id.replace('category-', '')
        }
        // 底部兜底：取最后一个分类
        setVisibleCategory(lastInView || null)
      })
    }

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateFromScroll)
  }, [])

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  function handleSelect(value: IconCategory | 'all') {
    setCategory(value)
    setDropdownOpen(false)
    if (onCategorySelect && value !== 'all') {
      onCategorySelect(value)
    }
  }

  // 构建分类列表（带翻译）
  const categories: Array<{ value: IconCategory | 'all'; label: string }> = [
    { value: 'all', label: t.categories.all },
    ...Object.entries(categoryLabels).map(([value]) => ({
      value: value as IconCategory,
      label: t.categories[value as keyof typeof t.categories] || value,
    })),
  ]

  const currentCategory = categories.find((c) => c.value === category)

  // 分类切换动画：先消失再入场
  const currentCat = visibleCategory || 'all'
  const currentCatLabel = categories.find((c) => c.value === currentCat)?.label || t.categories.all
  useEffect(() => {
    if (displayRef.current.name === currentCatLabel) return
    setAnimPhase('exit')
    const t1 = setTimeout(() => {
      displayRef.current = { name: currentCatLabel, count: categoryCounts[currentCat] ?? categoryCounts['all'] }
      setAnimPhase('enter')
    }, 200)
    const t2 = setTimeout(() => setAnimPhase('idle'), 500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      // 避免快速切换时文本消失
      displayRef.current = { name: currentCatLabel, count: categoryCounts[currentCat] ?? categoryCounts['all'] }
      setAnimPhase('idle')
    }
  }, [currentCatLabel, currentCat])

  // 搜索历史持久化
  function saveSearchHistory(history: string[]) {
    setSearchHistory(history)
    localStorage.setItem('is-search-history', JSON.stringify(history))
  }

  function addSearchQuery(query: string) {
    const trimmed = query.trim()
    if (!trimmed) return
    const next = [trimmed, ...searchHistory.filter((h) => h !== trimmed)].slice(0, 5)
    saveSearchHistory(next)
  }

  function removeSearchQuery(query: string) {
    saveSearchHistory(searchHistory.filter((h) => h !== query))
  }

  // 点击外部关闭历史面板
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchHistoryRef.current && !searchHistoryRef.current.contains(e.target as Node)) {
        setSearchHistoryOpen(false)
      }
    }
    if (searchHistoryOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchHistoryOpen])

  // 组件卸载时清理防抖
  useEffect(() => () => clearTimeout(debounceRef.current), [])

  return (
    <div className="sticky top-[80px] z-[50] mt-6 mb-2">
      {/* 突破父级 max-w-[1200px] 的全宽背景 */}
      <div
        className="absolute inset-y-0 bg-[var(--is-white)]"
        style={{ left: 'calc(-50vw + 50%)', width: '100vw' }}
      />
      {/* 内容区域保持 max-w-[1200px] 居中 */}
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center gap-4 px-2 py-4 lg:px-0">
      {/* 自定义下拉框 */}
      <div className="relative w-[200px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-12 w-full items-center justify-between rounded-[12px] bg-[var(--is-surface)] px-3 transition hover:bg-[var(--is-surface-hover)]"
        >
          <span className="text-[16px] leading-6 text-[var(--is-ink)]"
            style={{ animation: animPhase === 'exit' ? 'cat-exit 200ms ease-out forwards' : animPhase === 'enter' ? 'cat-enter 300ms ease-out' : '' }}>
            {displayRef.current.name}
          </span>
          <span className="inline-flex items-center gap-1 text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
            <span style={{ animation: animPhase === 'exit' ? 'cat-exit 200ms ease-out forwards' : animPhase === 'enter' ? 'cat-enter 300ms ease-out' : '' }}>
              {displayRef.current.count}
            </span>
            <ChevronDown size={16} className="text-[var(--is-ink)]" />
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 top-full z-[60] mt-2 flex max-h-[480px] w-[200px] flex-col gap-[4px] overflow-y-auto rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-1 shadow-[0_6px_32px_rgba(0,0,0,0.05)] custom-scrollbar">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item.value)}
                className={cn(
                  'flex w-full items-center justify-between rounded-[8px] px-3 py-3 text-left transition',
                  category === item.value
                    ? 'bg-[var(--is-surface)]'
                    : 'bg-[var(--is-white)] hover:bg-[var(--is-surface)]',
                )}
              >
                <span className="text-[16px] leading-6 text-[var(--is-ink)]">{item.label}</span>
                <span className="text-[14px] leading-[22px] text-[var(--is-ink-soft)]">
                  {categoryCounts[item.value]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 搜索框 + 搜索历史 */}
      <div className="relative flex-1" ref={searchHistoryRef}>
        <label className="flex h-12 w-full items-center justify-between rounded-[12px] bg-[var(--is-surface)] px-3">
          <div className="flex items-center gap-2 cursor-text flex-1">
            <Search size={18} className="text-[var(--is-ink)]" />
            <input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                clearTimeout(debounceRef.current)
                debounceRef.current = setTimeout(() => {
                  setKeyword(e.target.value)
                  addSearchQuery(e.target.value)
                }, 800)
              }}
              onFocus={() => searchHistory.length > 0 && setSearchHistoryOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  clearTimeout(debounceRef.current)
                  setKeyword(e.currentTarget.value)
                  addSearchQuery(e.currentTarget.value)
                }
                if (e.key === 'Escape') setSearchHistoryOpen(false)
              }}
              className="w-full bg-transparent text-[16px] leading-6 text-[var(--is-ink)] outline-none placeholder:text-[var(--is-ink-faint)]"
              placeholder={t.controls.searchPlaceholder}
            />
          </div>
          {keyword && (
            <button
              type="button"
              onClick={() => { setInputValue(''); clearTimeout(debounceRef.current); setKeyword('') }}
              className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[var(--is-white)] text-[var(--is-ink-soft)] transition hover:text-black"
              aria-label="清空搜索"
            >
              <X size={16} />
            </button>
          )}
        </label>
        {searchHistoryOpen && searchHistory.length > 0 && (
          <div className="absolute left-0 top-full z-[60] mt-2 w-full rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-1 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
            {searchHistory.map((query) => (
              <div
                key={query}
                className="group flex items-center justify-between rounded-[8px] px-3 py-3 transition hover:bg-[var(--is-surface)]"
              >
                <button
                  type="button"
                  className="flex flex-1 items-center gap-2 text-left"
                  onClick={() => { setInputValue(query); clearTimeout(debounceRef.current); setKeyword(query); setSearchHistoryOpen(false) }}
                >
                  <Clock size={16} className="shrink-0 text-[var(--is-ink-muted)]" />
                  <span className="truncate text-[16px] leading-6 text-[var(--is-ink)]">{query}</span>
                </button>
                <button
                  type="button"
                  onClick={() => removeSearchQuery(query)}
                  className="invisible ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] text-[var(--is-ink-muted)] transition hover:text-[#d32f2f] hover:bg-[#fbe9e7] group-hover:visible"
                  aria-label="删除搜索记录"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 收藏按钮直接切换列表范围，避免额外再占一行 */}
      <button
        type="button"
        onClick={onFavoritesToggle}
        className={cn(
          'inline-flex h-12 w-[180px] items-center justify-between rounded-[12px] px-4 text-[16px] leading-6 transition',
          favoritesOpen
            ? 'border border-[var(--is-border)] bg-[var(--is-white)] text-[var(--is-ink)]'
            : 'border border-transparent bg-[var(--is-surface)] text-[var(--is-ink)] hover:bg-[var(--is-surface-hover)]',
        )}
      >
        <span className="inline-flex items-center gap-1">
          <Star size={16} />
          {t.controls.favorites}
        </span>
        <span className={cn('text-[14px] leading-[22px]', favoritesOpen ? 'text-[var(--is-ink)]' : 'text-[var(--is-ink-soft)]')}>
          {favoriteCount}
        </span>
      </button>
    </div>
    </div>
  )
}
