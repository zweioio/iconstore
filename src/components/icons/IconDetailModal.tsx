import { Copy, Download, X } from 'lucide-react'

import { en } from '@/i18n/en'
import { zh } from '@/i18n/zh'
import { categoryLabels } from '@/data/icons'
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/useLanguageStore'
import type { IconItem, IconStyleMode } from '@/types/icon'
import type { Language } from '@/store/useLanguageStore'

const i18n: Record<Language, typeof zh> = { zh, en }

type IconDetailModalProps = {
  icon: IconItem | null
  svg: string
  styleMode: IconStyleMode
  onClose: () => void
  onStyleChange: (value: IconStyleMode) => void
  onCopy: () => void
  onDownload: () => void
}

export function IconDetailModal({
  icon,
  svg,
  styleMode,
  onClose,
  onStyleChange,
  onCopy,
  onDownload,
}: IconDetailModalProps) {
  const { language } = useLanguageStore()
  const t = i18n[language]

  if (!icon) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
      <button type="button" className="absolute inset-0" aria-label="关闭详情弹窗" onClick={onClose} />
      <div className="relative z-10 w-[480px] rounded-[16px] border border-[#e9eaeb] bg-white p-6 shadow-[0_6px_32px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-[#919499] transition hover:bg-[#f8f8fc] hover:text-[#202224]"
          aria-label="关闭"
        >
          <X size={16} />
        </button>

        <div className="space-y-6">
          {/* 图标名称 */}
          <div className="space-y-2 pr-8">
            <h2 className="text-[24px] font-bold leading-8 text-[#202224]">{icon.name}</h2>
            <p className="text-[14px] leading-[22px] text-[#60656b]">
              {t.categories[icon.category] || icon.category} · {styleMode === 'linear' ? t.modal.linear : t.modal.filled}
            </p>
          </div>

          {/* 图标预览 */}
          <div className="flex items-center justify-center rounded-[12px] border border-[#e9eaeb] bg-[#f8f8fc] py-12">
            <div className="inline-flex h-[96px] w-[96px] items-center justify-center text-[#202224]">
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
          </div>

          {/* 风格切换 */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onStyleChange('linear')}
              className={cn(
                'rounded-[8px] border px-4 py-2 text-[14px] leading-[22px] transition',
                styleMode === 'linear'
                  ? 'border-[#202224] bg-[#f8f8fc] text-[#202224]'
                  : 'border-[#e9eaeb] bg-white text-[#60656b] hover:bg-[#f8f8fc]',
              )}
            >
              {t.modal.linear}
            </button>
            <button
              type="button"
              onClick={() => onStyleChange('filled')}
              className={cn(
                'rounded-[8px] border px-4 py-2 text-[14px] leading-[22px] transition',
                styleMode === 'filled'
                  ? 'border-[#202224] bg-[#f8f8fc] text-[#202224]'
                  : 'border-[#e9eaeb] bg-white text-[#60656b] hover:bg-[#f8f8fc]',
              )}
            >
              {t.modal.filled}
            </button>
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
            <pre className="mt-2 rounded-[8px] bg-[#f4f6f7] p-3 text-[12px] leading-5 text-[#60656b]">
              <code className="break-all">{svg}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
