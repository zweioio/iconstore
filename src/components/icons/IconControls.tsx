import { ChevronDown, Search, Star, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import { categoryLabels } from '@/data/icons'
import { icons } from '@/data/icons'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { useIconLibraryStore } from '@/store/useIconLibraryStore'
import type { IconCategory } from '@/types/icon'
import type { Language } from '@/store/useLanguageStore'

const i18n: Record<Language, typeof zh> = { zh, en }

// 统计每个分类的图标数量
const categoryCounts = Object.keys(categoryLabels).reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = icons.filter((icon) => icon.category === cat).length
  return acc
}, {})
categoryCounts['all'] = icons.length

type IconControlsProps = {
  favoriteCount: number
  onCategorySelect?: (cat: string) => void
}

export function IconControls({ favoriteCount, onCategorySelect }: IconControlsProps) {
  const { language } = useLanguageStore()
  const t = i18n[language]

  const {
    keyword,
    category,
    viewMode,
    setKeyword,
    setCategory,
    setViewMode,
  } = useIconLibraryStore()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    setViewMode('all')
    setDropdownOpen(false)
    if (onCategorySelect) {
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

  return (
    <div className="sticky top-0 z-[50] bg-white mt-6 mb-2 flex flex-wrap items-center gap-4 px-2 py-4 lg:px-0">
      {/* 自定义下拉框 */}
      <div className="relative w-[200px]" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex h-12 w-full items-center justify-between rounded-[12px] bg-[#f8f8fc] px-3"
        >
          <span className="text-[16px] leading-6 text-[#202224]">
            {currentCategory?.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[14px] text-[#60656b]">
            {categoryCounts[category] ?? ''}
            <ChevronDown size={14} className="text-[#202224]" />
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 top-full z-[60] mt-2 flex w-[200px] flex-col gap-[4px] rounded-[12px] border border-[#e9eaeb] bg-white p-1 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(item.value)}
                className={cn(
                  'flex w-full items-center justify-between rounded-[8px] px-3 py-3 text-left transition',
                  category === item.value
                    ? 'bg-[#f8f8fc]'
                    : 'bg-white hover:bg-[#f8f8fc]',
                )}
              >
                <span className="text-[16px] leading-6 text-[#202224]">{item.label}</span>
                <span className="text-[14px] leading-[22px] text-[#60656b]">
                  {categoryCounts[item.value]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 搜索框按设计稿做成长条，右侧保留清空按钮提高可用性 */}
      <label className="flex h-12 flex-1 items-center justify-between rounded-[12px] bg-[#f8f8fc] px-3">
        <div className="flex items-center gap-2 cursor-text flex-1">
          <Search size={18} className="text-[#202224]" />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="w-full bg-transparent text-[16px] leading-6 text-[#202224] outline-none placeholder:text-[#b5b9bf]"
            placeholder={t.controls.searchPlaceholder}
          />
        </div>
        {keyword && (
          <button
            type="button"
            onClick={() => setKeyword('')}
            className="inline-flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-white text-[#60656b] transition hover:text-black"
            aria-label="清空搜索"
          >
            <X size={16} />
          </button>
        )}
      </label>

      {/* 收藏按钮直接切换列表范围，避免额外再占一行 */}
      <button
        type="button"
        onClick={() => setViewMode(viewMode === 'favorites' ? 'all' : 'favorites')}
        className={cn(
          'inline-flex h-12 w-[180px] items-center justify-between rounded-[12px] px-4 text-[16px] leading-6 transition',
          viewMode === 'favorites'
            ? 'bg-[#202224] text-white'
            : 'bg-[#f8f8fc] text-[#202224] hover:bg-[#f1f2f6]',
        )}
      >
        <span className="inline-flex items-center gap-1">
          <Star size={16} fill={viewMode === 'favorites' ? 'currentColor' : 'none'} />
          {t.controls.favorites}
        </span>
        <span className={cn('text-[14px]', viewMode === 'favorites' ? 'text-white/70' : 'text-[#60656b]')}>
          {favoriteCount}
        </span>
      </button>
    </div>
  )
}
