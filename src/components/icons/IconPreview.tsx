import { cn } from '@/lib/utils'

type IconPreviewProps = {
  svg: string
  name: string
  background?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg' | number
  framed?: boolean
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  lg: 'h-32 w-32',
}

export function IconPreview({
  svg,
  name,
  background = 'light',
  size = 'md',
  framed = true,
}: IconPreviewProps) {
  const isNumericSize = typeof size === 'number'

  return (
    <div
      className={cn(
        'icon-preview',
        'inline-flex items-center justify-center',
        framed && 'rounded-[5px] border border-[var(--ds-border)]',
        framed && background === 'light'
          ? 'bg-[var(--ds-surface)] text-[var(--ds-ink)]'
          : '',
        framed && background === 'dark'
          ? 'bg-[var(--ds-ink)] text-[var(--ds-neutral)]'
          : '',
        !framed && 'text-current',
        !isNumericSize && sizeClasses[size],
      )}
      style={isNumericSize ? { width: `${size}px`, height: `${size}px` } : undefined}
      aria-label={name}
      // 这里直接渲染 SVG 字符串，方便展示用户未来会复制下载的真实资源
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
