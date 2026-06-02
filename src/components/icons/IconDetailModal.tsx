import { Clipboard, Copy, Download, Star, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'
import type { IconItem } from '@/types/icon'

type IconDetailModalProps = {
  icon: IconItem | null
  svg: string
  isFavorite: boolean
  onClose: () => void
  onCopy: () => void
  onCopyName: () => void
  onDownload: () => void
  onToggleFavorite: () => void
}

export function IconDetailModal({
  icon,
  svg,
  isFavorite,
  onClose,
  onCopy,
  onCopyName,
  onDownload,
  onToggleFavorite,
}: IconDetailModalProps) {
  const { language } = useLanguageStore()
  const t = translations[language]

  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <button type="button" className="absolute inset-0" aria-label="关闭详情弹窗" onClick={onClose} />
      <div className="relative z-10 w-[480px] rounded-[16px] border border-[#e9eaeb] bg-white p-6 shadow-[0_6px_32px_rgba(0,0,0,0.08)]">
        <div className="space-y-6">
          {/* 图标名称 + 分类 + 操作 */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{icon.name}</h2>
              <p className="text-[14px] leading-[22px] text-[#60656b]">
                {t.categories[icon.category] || icon.category}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCopyName}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#919499] transition hover:bg-[#f8f8fc] hover:text-[#202224]"
                aria-label="复制图标名称"
                title={t.modal.copyName}
              >
                <Clipboard size={16} />
              </button>
              <button
                type="button"
                onClick={onToggleFavorite}
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-[8px] transition',
                  isFavorite
                    ? 'text-[#FADC19] hover:text-[#FADC19]'
                    : 'text-[#919499] hover:bg-[#f8f8fc] hover:text-[#202224]',
                )}
                aria-label={isFavorite ? '取消收藏' : '收藏'}
              >
                <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#919499] transition hover:bg-[#f8f8fc] hover:text-[#202224]"
                aria-label="关闭"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 图标预览 */}
          <div className="flex items-center justify-center rounded-[12px] border border-[#e9eaeb] bg-[#f8f8fc] py-12">
            <div
              className="icon-preview inline-flex h-[120px] w-[120px] items-center justify-center text-[#202224]"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>

          {/* 操作按钮 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-[#202224] px-4 py-2.5 text-[14px] leading-[22px] text-white transition hover:bg-[#333]"
            >
              <Copy size={14} />
              {t.modal.copySVG}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#e9eaeb] bg-white px-4 py-2.5 text-[14px] leading-[22px] text-[#202224] transition hover:bg-[#f8f8fc]"
            >
              <Download size={14} />
              {t.modal.downloadSVG}
            </button>
          </div>

          {/* 关键词 */}
          <div>
            <p className="text-[14px] font-medium leading-[22px] text-[#202224]">{t.modal.keywords}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {icon.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-[6px] bg-[#f4f6f7] px-3 py-1 text-[12px] leading-[22px] text-[#202224]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* SVG 代码 */}
          <div>
            <p className="text-[14px] font-medium leading-[22px] text-[#202224]">{t.modal.svgCode}</p>
            <pre className="mt-2 max-h-[160px] overflow-auto rounded-[8px] bg-[#f4f6f7] p-3 text-[12px] leading-5 text-[#60656b]">
              <code>{svg}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
