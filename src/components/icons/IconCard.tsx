import { Star } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { IconPreview } from '@/components/icons/IconPreview'
import { cn } from '@/lib/utils'
import type { IconItem } from '@/types/icon'

type IconCardProps = {
  icon: IconItem
  svg: string
  iconSize: number
  isFavorite: boolean
  isSelected: boolean
  onPreview: () => void
  onToggleFavorite: () => void
}

export function IconCard({
  icon,
  svg,
  iconSize,
  isFavorite,
  isSelected,
  onPreview,
  onToggleFavorite,
}: IconCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 弹窗关闭时恢复 hover 效果
  useEffect(() => {
    if (!isSelected) {
      // 延迟清除，避免弹窗关闭瞬间重新触发 hover
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovering(false)
      }, 50)
    }
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [isSelected])

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onPreview()
    }
  }

  function handleClick() {
    setIsHovering(false)
    onPreview()
  }

  function handleMouseEnter() {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovering(true)
  }

  function handleMouseLeave() {
    setIsHovering(false)
  }

  const showHover = isHovering && !isSelected

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-[120px] cursor-pointer flex-col items-center gap-1 text-[var(--is-ink)] focus-visible:outline-none"
      style={{ overflow: 'visible' }}
      aria-label={`查看 ${icon.name} 详情`}
    >
      {/* 图标区域包含预览区和四角小方块，120x120 */}
      <div className="relative flex h-[120px] w-[120px] items-center justify-center" style={{ overflow: 'visible' }}>
        {/* 四角小方块 */}
        {showHover && (
          <>
            <span className="pointer-events-none absolute z-[40] -left-[4px] -top-[4px] h-2 w-2 border border-[var(--is-ink)] bg-[var(--is-white)] opacity-0 transition group-hover:opacity-100" />
            <span className="pointer-events-none absolute z-[40] -right-[4px] -top-[4px] h-2 w-2 border border-[var(--is-ink)] bg-[var(--is-white)] opacity-0 transition group-hover:opacity-100" />
            <span className="pointer-events-none absolute z-[40] -bottom-[4px] -left-[4px] h-2 w-2 border border-[var(--is-ink)] bg-[var(--is-white)] opacity-0 transition group-hover:opacity-100" />
            <span className="pointer-events-none absolute z-[40] -bottom-[4px] -right-[4px] h-2 w-2 border border-[var(--is-ink)] bg-[var(--is-white)] opacity-0 transition group-hover:opacity-100" />
          </>
        )}

        {/* 居中描边框，绝对定位在图标区域外部 */}
        {showHover && (
          <span className="pointer-events-none absolute -left-[1px] -top-[1px] h-[122px] w-[122px] border border-[var(--is-ink)]" style={{ zIndex: 30 }} />
        )}

        {/* 预览区保持 120 x 120 */}
        <div className="relative flex h-[120px] w-[120px] items-center justify-center bg-[var(--is-white)]">
        {/* 收藏按钮 - 已收藏时始终显示，未收藏时hover显示 */}
        {(showHover || isFavorite) && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite()
            }}
            className={cn(
              'absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)]',
              isFavorite && 'text-[var(--is-yellow)] hover:text-[var(--is-yellow)]',
              !isFavorite && 'opacity-0 group-hover:opacity-100',
            )}
            aria-label={isFavorite ? `取消收藏 ${icon.name}` : `收藏 ${icon.name}`}
            aria-pressed={isFavorite}
          >
            <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}

          <IconPreview svg={svg} name={icon.name} size={iconSize} framed={false} />
        </div>
      </div>
      <p className="max-w-[106px] truncate text-center text-[12px] leading-5 text-[var(--is-ink)]">
        {icon.name}
      </p>
    </article>
  )
}
