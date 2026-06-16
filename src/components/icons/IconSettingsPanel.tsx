import { HelpCircle, Lock, RefreshCcw, Unlock } from 'lucide-react'
import { useRef, useState } from 'react'

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
  evenOnly?: boolean
  hint?: string
  onChange: (value: number) => void
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  evenOnly,
  hint,
  onChange,
}: SliderFieldProps) {
  const percent = ((value - min) / (max - min)) * 100
  const displayValue = Number.isInteger(value) ? value.toString() : value.toFixed(1)
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(displayValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<{ startX: number; startValue: number } | null>(null)

  function clampAndSnap(val: number) {
    let v = Math.min(max, Math.max(min, val))
    if (evenOnly) v = Math.round(v / 2) * 2
    return v
  }

  // 点击数值 → 编辑模式
  function handleValueClick() {
    setEditValue(displayValue)
    setEditing(true)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  function commitEdit() {
    setEditing(false)
    const parsed = parseFloat(editValue)
    if (!isNaN(parsed)) onChange(clampAndSnap(parsed))
  }

  // 左右拖拽调整
  function handleDragStart(e: React.MouseEvent) {
    e.preventDefault()
    dragRef.current = { startX: e.clientX, startValue: value }

    function onMove(ev: MouseEvent) {
      if (!dragRef.current) return
      const delta = (ev.clientX - dragRef.current.startX) * (step || 1) * 0.5
      onChange(clampAndSnap(dragRef.current.startValue + delta))
    }
    function onUp() {
      dragRef.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleSliderChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(clampAndSnap(Number(event.target.value)))
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <p className="text-[14px] leading-[22px] text-[var(--is-ink)]">{label}</p>
          {hint && (
            <div className="group relative">
              <button
                type="button"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[var(--is-ink-faint)] transition hover:bg-[var(--is-surface)] hover:text-[var(--is-ink)]"
              >
                <HelpCircle size={16} />
              </button>
              <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
                {hint}
              </span>
            </div>
          )}
        </div>
        {editing ? (
          <div className="flex h-[28px] w-[56px] items-center justify-between rounded-[8px] bg-[var(--is-code-bg)] px-2">
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitEdit()
                if (e.key === 'Escape') setEditing(false)
              }}
              className="min-w-0 bg-transparent text-[14px] leading-[22px] text-[var(--is-ink)] outline-none"
            />
            <span className="text-[14px] leading-[22px] text-[var(--is-ink-faint)]">{unit}</span>
          </div>
        ) : (
          <div
            className="flex h-[28px] w-[56px] cursor-ew-resize select-none items-center justify-between rounded-[8px] bg-[var(--is-code-bg)] px-2 text-[14px] leading-[22px]"
            onClick={handleValueClick}
            onMouseDown={handleDragStart}
          >
            <span className="text-[var(--is-ink)]">{displayValue}</span>
            <span className="text-[var(--is-ink-faint)]">{unit}</span>
          </div>
        )}
      </div>
      <div className="relative mt-2 h-5">
        <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[var(--is-code-bg)]" />
        <div
          className="absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[var(--is-code-bg)]"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={evenOnly ? 2 : step}
          value={value}
          onChange={handleSliderChange}
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

  const [sizeLinked, setSizeLinked] = useState(false)

  const isDefault =
    iconSize === DEFAULT_ICON_SIZE && strokeWidth === DEFAULT_STROKE_WIDTH

  const RATIO = DEFAULT_STROKE_WIDTH / DEFAULT_ICON_SIZE // 1.8 / 24 = 0.075

  function handleLinkedIconSize(newSize: number) {
    setIconSize(newSize)
    if (sizeLinked) {
      const linkedStroke = Math.round(newSize * RATIO * 10) / 10
      setStrokeWidth(Math.min(4, Math.max(0.5, linkedStroke)))
    }
  }

  function handleLinkedStrokeWidth(newWidth: number) {
    setStrokeWidth(newWidth)
    if (sizeLinked) {
      const linkedSize = Math.round(newWidth / RATIO / 2) * 2
      setIconSize(Math.min(48, Math.max(12, linkedSize)))
    }
  }

  return (
    <aside className="w-full rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-3 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[16px] leading-6 text-[var(--is-ink)]">{t.settings.title}</p>
        <div className="flex items-center gap-1">
          <div className="group relative">
            <button
              type="button"
              onClick={() => setSizeLinked(!sizeLinked)}
              className={`inline-flex h-7 w-7 items-center justify-center rounded-[8px] transition ${
                sizeLinked
                  ? 'text-[var(--is-ink)] hover:bg-[var(--is-surface)]'
                  : 'text-[var(--is-ink-muted)] hover:bg-[var(--is-surface)]'
              }`}
              aria-label={t.settings.sizeLock}
            >
              {sizeLinked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
              {sizeLinked ? t.settings.sizeLockLinked : t.settings.sizeLockUnlinked}
            </span>
          </div>
          <div className="group relative">
            <button
            type="button"
            onClick={resetIconSettings}
            disabled={isDefault}
            className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={t.settings.reset}
          >
            <RefreshCcw size={16} />
          </button>
          <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
            {t.settings.reset}
          </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <SliderField
          label={t.settings.iconSize}
          value={iconSize}
          min={12}
          max={48}
          step={2}
          unit="px"
          evenOnly
          onChange={handleLinkedIconSize}
        />
        <SliderField
          label={t.settings.strokeWidth}
          value={strokeWidth}
          min={0.5}
          max={4}
          step={0.1}
          unit="px"
          hint={t.settings.strokeWidthHint}
          onChange={handleLinkedStrokeWidth}
        />
      </div>
    </aside>
  )
}
