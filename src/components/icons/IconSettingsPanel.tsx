import { RefreshCcw } from 'lucide-react'
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  useIconLibraryStore,
} from '@/store/useIconLibraryStore'
import { useLanguageStore } from '@/store/useLanguageStore'
import { translations } from '@/i18n'

type SliderFieldProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  onChange: (value: number) => void
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: SliderFieldProps) {
  // 用百分比驱动自定义滑轨填充，让视觉更接近设计稿中的细滑杆。
  const percent = ((value - min) / (max - min)) * 100
  const displayValue = Number.isInteger(value) ? value.toString() : value.toFixed(1)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-[14px] leading-[22px] text-[#202224]">{label}</p>
        <div className="rounded-[8px] bg-[#f4f6f7] px-2 py-[2px] text-[14px] leading-[22px] text-[#202224]">
          {displayValue}
          {unit}
        </div>
      </div>
      <div className="relative mt-2 h-5">
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#f4f6f7]" />
        <div
          className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#d6dce3]"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="icon-slider absolute left-0 top-1/2 h-5 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
          aria-label={label}
        />
      </div>
    </div>
  )
}

export function IconSettingsPanel() {
  const { language } = useLanguageStore()
  const t = translations[language]

  const {
    iconSize,
    strokeWidth,
    setIconSize,
    setStrokeWidth,
    resetIconSettings,
  } = useIconLibraryStore()

  const isDefault =
    iconSize === DEFAULT_ICON_SIZE && strokeWidth === DEFAULT_STROKE_WIDTH

  return (
    <aside className="w-full rounded-[12px] border border-[#e9eaeb] bg-white p-3 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[16px] leading-6 text-[#202224]">{t.settings.title}</p>
        <button
          type="button"
          onClick={resetIconSettings}
          disabled={isDefault}
          className="inline-flex items-center gap-1 rounded-[8px] px-[6px] py-1 text-[14px] leading-[22px] text-[#919499] transition hover:bg-[#f8f8fc] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t.settings.reset}
        >
          <RefreshCcw size={14} />
          {t.settings.reset}
        </button>
      </div>

      <div className="mt-6 space-y-6">
        <SliderField
          label={t.settings.iconSize}
          value={iconSize}
          min={12}
          max={64}
          step={1}
          unit="px"
          onChange={setIconSize}
        />
        <SliderField
          label={t.settings.strokeWidth}
          value={strokeWidth}
          min={0.5}
          max={4}
          step={0.1}
          unit="px"
          onChange={setStrokeWidth}
        />
      </div>
    </aside>
  )
}
