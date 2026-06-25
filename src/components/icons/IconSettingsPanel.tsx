import { HelpCircle, Layers, Lock, Palette, RefreshCcw, Unlock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_STROKE_WIDTH,
  useIconLibraryStore,
} from '@/store/useIconLibraryStore'

const COLOR_PRESETS = [
  '#FF6352', '#FEAE16', '#F7DC6F', '#2BC671',
  '#08CACD', '#007AFF', '#956AFF', '#000000',
]
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
  // 根据 step 自动决定小数位数
  function decimalsFromStep(s: number) {
    const parts = String(s).split('.')
    return parts.length > 1 ? parts[1].length : 0
  }
  const decimals = decimalsFromStep(step)
  const displayValue = decimals === 0 ? value.toString() : value.toFixed(Math.max(decimals, 1)).replace(/\.?0+$/, '')
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
          <div className="flex h-[28px] w-[64px] items-center justify-between rounded-[8px] bg-[var(--is-code-bg)] px-2">
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
            className="flex h-[28px] w-[64px] cursor-ew-resize select-none items-center justify-end gap-1 rounded-[8px] bg-[var(--is-code-bg)] px-2 text-[14px] leading-[22px]"
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

  // 注入选中放大动画
  useEffect(() => {
    if (document.getElementById('is-swatch-pulse')) return
    const s = document.createElement('style')
    s.id = 'is-swatch-pulse'
    s.textContent = `@keyframes swatch-pulse{0%{transform:scale(1)}40%{transform:scale(1.25)}100%{transform:scale(1)}}`
    document.head.appendChild(s)
  }, [])

  // 基于 DOM class 实时检测深色模式（跨组件共享，不受 useTheme 独立实例限制）
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const {
    iconSize,
    strokeWidth,
    iconColor,
    colorEnabled,
    setIconSize,
    setStrokeWidth,
    setIconColor,
    setColorEnabled,
    showFilled,
    setShowFilled,
    resetIconSettings,
  } = useIconLibraryStore()

  const [sizeLinked, setSizeLinked] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const alphaDragRef = useRef<{ startX: number; startAlpha: number } | null>(null)
  const alphaInputRef = useRef<HTMLInputElement>(null)
  const [alphaEditing, setAlphaEditing] = useState(false)
  const [pickerOffset, setPickerOffset] = useState({ x: 0, y: 0 })
  const [colorMode, setColorMode] = useState('hex')
  const [lastClickedColor, setLastClickedColor] = useState<string | null>(null)
  const [clickSeq, setClickSeq] = useState(0)
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)

  function openPicker(e: React.MouseEvent) {
    setPickerOffset({ x: 0, y: 0 })
    setPickerOpen(true)
  }

  function handlePickerDrag(e: React.MouseEvent<HTMLDivElement>) {
    if (!pickerRef.current) return
    const rect = pickerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const pad = 12
    // 点击内容区域（非 padding）时不启动拖动
    if (
      x > pad && x < rect.width - pad &&
      y > pad && y < rect.height - pad
    ) return
    e.preventDefault()
    const startX = e.clientX, startY = e.clientY
    dragStart.current = { x: startX, y: startY, ox: pickerOffset.x, oy: pickerOffset.y }
    const onMove = (ev: MouseEvent) => {
      if (!dragStart.current) return
      setPickerOffset({
        x: dragStart.current.ox + ev.clientX - dragStart.current.x,
        y: dragStart.current.oy + ev.clientY - dragStart.current.y,
      })
    }
    const onUp = () => {
      dragStart.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // 点击外部关闭选色器
  useEffect(() => {
    if (!pickerOpen) return
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [pickerOpen])
  const [hueDeg, setHueDeg] = useState(0)
  const [satPercent, setSatPercent] = useState(100)
  const [briPercent, setBriPercent] = useState(100)
  const [alpha, setAlpha] = useState(1)

  // hex → HSL 转换
  function hexToHsl(hex: string) {
    let r = 0, g = 0, b = 0
    const h = hex.replace('#', '')
    if (h.length === 6) {
      r = parseInt(h.slice(0, 2), 16) / 255
      g = parseInt(h.slice(2, 4), 16) / 255
      b = parseInt(h.slice(4, 6), 16) / 255
    }
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let hx = 0, s = 0, l = (max + min) / 2
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: hx = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: hx = ((b - r) / d + 2) / 6; break
        case b: hx = ((r - g) / d + 4) / 6; break
      }
    }
    return { h: hx * 360, s: s * 100, l: l * 100 }
  }

  // HSB → hex（饱和度/明度面板使用 HSB 模型，非 HSL）
  function hsb2hex(h: number, s: number, b: number) {
    s /= 100; b /= 100
    const i = Math.floor((h % 360) / 60)
    const f = (h / 60) - i
    const p = b * (1 - s)
    const q = b * (1 - s * f)
    const t = b * (1 - s * (1 - f))
    const channels = [
      [b, t, p], [q, b, p], [p, b, t],
      [p, q, b], [t, p, b], [b, p, q],
    ][i]
    return '#' + channels.map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
  }

  // HSL → hex
  function hslToHex(h: number, s: number, l: number) {
    s /= 100; l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
  }

  // 打开选色器时同步 HSL
  useEffect(() => {
    if (pickerOpen) syncPickerFromColor()
  }, [pickerOpen])

  // hex → HSB（用于面板指示器定位）
  function hexToHsb(hex: string) {
    const r = parseInt(hex.slice(1,3), 16) / 255
    const g = parseInt(hex.slice(3,5), 16) / 255
    const b = parseInt(hex.slice(5,7), 16) / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const delta = max - min
    let h = 0
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
      else if (max === g) h = ((b - r) / delta + 2) * 60
      else h = ((r - g) / delta + 4) * 60
    }
    const s = max === 0 ? 0 : (delta / max) * 100
    const br = max * 100
    return { h, s, b: br }
  }

  function syncPickerFromColor() {
    const { h, s, b } = hexToHsb(iconColor)
    setHueDeg(Math.round(h))
    setSatPercent(Math.round(s))
    setBriPercent(Math.round(b))
  }

  function handleSaturationBrightness(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const update = (ev: MouseEvent) => {
      const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (ev.clientY - rect.top) / rect.height))
      const sat = Math.round(x * 100)
      const bri = Math.round((1 - y) * 100)
      setSatPercent(sat)
      setBriPercent(bri)
      setIconColor(hsb2hex(hueDeg, sat, bri))
    }
    update(e.nativeEvent as unknown as MouseEvent)
    const onMove = (ev: MouseEvent) => update(ev)
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleHue(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const update = (ev: MouseEvent) => {
      const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
      const h = Math.round(x * 360)
      setHueDeg(h)
      setIconColor(hsb2hex(h, satPercent, briPercent))
    }
    update(e.nativeEvent as unknown as MouseEvent)
    const onMove = (ev: MouseEvent) => update(ev)
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleAlpha(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    const update = (ev: MouseEvent) => {
      const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
      setAlpha(x)
    }
    update(e.nativeEvent as unknown as MouseEvent)
    const onMove = (ev: MouseEvent) => update(ev)
    const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  // 透明度拖拽调整（在 div 上触发，阻止文本选中）
  function handleAlphaInputDrag(e: React.MouseEvent) {
    e.preventDefault()
    alphaDragRef.current = { startX: e.clientX, startAlpha: alpha }
    const onMove = (ev: MouseEvent) => {
      if (!alphaDragRef.current) return
      const delta = (ev.clientX - alphaDragRef.current.startX) / 200
      setAlpha(Math.max(0, Math.min(1, alphaDragRef.current.startAlpha + delta)))
    }
    const onUp = () => { alphaDragRef.current = null; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp) }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleAlphaEditClick() {
    setAlphaEditing(true)
    setTimeout(() => alphaInputRef.current?.select(), 0)
  }

  function commitAlphaEdit() {
    setAlphaEditing(false)
  }

  // 当前主题对应的默认颜色
  const defaultColor = isDark ? '#FFFFFF' : '#000000'

  // 同步主题切换：如果当前颜色是切换前的默认色，自动变为新主题的默认色
  const prevThemeRef = useRef(isDark)
  useEffect(() => {
    if (prevThemeRef.current !== isDark) {
      const oldDefault = prevThemeRef.current ? '#FFFFFF' : '#000000'
      const newDefault = isDark ? '#FFFFFF' : '#000000'
      if (iconColor === oldDefault) {
        setIconColor(newDefault)
      }
      prevThemeRef.current = isDark
    }
  }, [isDark, iconColor, setIconColor])

  // 任一模式的默认色都视为「默认状态」
  const isDefault =
    iconSize === DEFAULT_ICON_SIZE && strokeWidth === DEFAULT_STROKE_WIDTH &&
    (iconColor === '#000000' || iconColor === '#FFFFFF')

  function handleReset() {
    setIconSize(DEFAULT_ICON_SIZE)
    setStrokeWidth(DEFAULT_STROKE_WIDTH)
    setIconColor(defaultColor)
    setShowFilled(true)
  }

  const RATIO = DEFAULT_STROKE_WIDTH / DEFAULT_ICON_SIZE // 1.8 / 24 = 0.075

  function handleLinkedIconSize(newSize: number) {
    setIconSize(newSize)
    if (sizeLinked) {
      const linkedStroke = Math.round(newSize * RATIO * 20) / 20
      setStrokeWidth(Math.min(4, Math.max(1, linkedStroke)))
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
    <aside className="w-full rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 pt-3 pb-4 shadow-[0_6px_32px_rgba(0,0,0,0.05)]">
      <div>
        {/* 标题工具栏 */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-[16px] leading-6 text-[var(--is-ink)]">{t.settings.title}</p>
          <div className="flex items-center gap-1">
            {/* 面性图标开关 */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => setShowFilled(!showFilled)}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[8px] transition ${
                  showFilled
                    ? 'text-[var(--is-ink)] hover:bg-[var(--is-surface)]'
                    : 'text-[var(--is-ink-muted)] hover:bg-[var(--is-surface)]'
                }`}
                aria-label="面性图标"
              >
                <Layers size={16} />
              </button>
              <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
                {showFilled ? '隐藏面性图标' : '显示面性图标'}
              </span>
            </div>
            {/* 图标颜色开关 */}
            <div className="group relative">
              <button
                type="button"
                onClick={() => { if (colorEnabled) setPickerOpen(false); setColorEnabled(!colorEnabled) }}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[8px] transition ${
                  colorEnabled
                    ? 'text-[var(--is-ink)] hover:bg-[var(--is-surface)]'
                    : 'text-[var(--is-ink-muted)] hover:bg-[var(--is-surface)]'
                }`}
                aria-label="图标颜色"
              >
                <Palette size={16} />
              </button>
              <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
                图标颜色设置
              </span>
            </div>
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
              onClick={handleReset}
              disabled={isDefault}
              className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] text-[var(--is-ink-muted)] transition hover:bg-[var(--is-surface)] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t.settings.reset}
            >
              <RefreshCcw size={16} />
            </button>
            <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[6px] border border-[var(--is-border)] bg-[var(--is-white)] px-3 py-1 text-[12px] leading-5 text-[var(--is-ink)] opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-[var(--is-white)]">
              重置图标
          </span>
            </div>
          </div>
        </div>
        {/* 图标颜色 - 始终在 DOM 中，通过 transition 平滑折叠 */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{
            maxHeight: colorEnabled ? '300px' : '0',
            opacity: colorEnabled ? 1 : 0,
            marginBottom: colorEnabled ? '24px' : '0',
            overflow: pickerOpen ? 'visible' : 'hidden',
          }}
        >
          <div>
            <div className="flex items-center justify-between">
            <p className="text-[14px] leading-[22px] text-[var(--is-ink)]">{t.settings.iconColor}</p>
            <div className="flex h-7 items-center gap-2 rounded-[8px] bg-[var(--is-surface)] px-2">
              <input
                type="text"
                value={iconColor.replace('#', '').toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value
                  if (/^[0-9a-fA-F]{0,6}$/.test(val)) setIconColor('#' + val)
                }}
                onBlur={(e) => {
                  if (!/^[0-9a-fA-F]{6}$/.test(e.target.value)) setIconColor(defaultColor)
                }}
                className="w-[64px] bg-transparent text-right text-[14px] leading-[22px] text-[var(--is-ink)] outline-none"
              />
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={(e) => pickerOpen ? setPickerOpen(false) : openPicker(e)}
                  className="h-4 w-4 shrink-0 rounded-[4px]"
                  style={{ backgroundColor: iconColor }}
                />
                {pickerOpen && (
                  <div ref={pickerRef} className="absolute right-full top-full z-20 mt-1 mr-1 w-[228px] select-none rounded-[12px] border border-[var(--is-border)] bg-[var(--is-white)] p-3 shadow-[0_6px_32px_rgba(0,0,0,0.08)]"
                    style={{ transform: `translate(${pickerOffset.x}px, ${pickerOffset.y}px)` }}
                    onMouseDown={(e) => handlePickerDrag(e)}>
                    {/* 主色板 */}
                    <div className="relative h-[160px] w-full overflow-hidden rounded-[6px] cursor-crosshair"
                      style={{
                        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hueDeg}, 100%, 50%))`,
                      }}
                      onMouseDown={(e) => handleSaturationBrightness(e)}
                    >
                      <div
                        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                        style={{ left: `${satPercent}%`, top: `${100 - briPercent}%`, backgroundColor: iconColor }}
                      />
                    </div>
                    {/* 色相 + 透明度行 */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 space-y-2">
                        {/* 色相 */}
                        <div className="relative h-3 w-full cursor-pointer rounded-[6px]"
                          style={{
                            background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                          }}
                          onMouseDown={(e) => handleHue(e)}
                        >
                          <div
                            className="absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                            style={{ left: `${(hueDeg / 360) * 100}%`, backgroundColor: `hsl(${hueDeg}, 100%, 50%)` }}
                          />
                        </div>
                        {/* 透明度 */}
                        <div className="relative h-3 w-full cursor-pointer rounded-[6px]"
                          style={{
                            background: `linear-gradient(to right, transparent, hsl(${hueDeg}, ${satPercent}%, ${briPercent}%)), repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 6px 6px`,
                            backgroundColor: '#f0f0f0',
                          }}
                          onMouseDown={(e) => handleAlpha(e)}
                        >
                          <div
                            className="absolute top-1/2 h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                            style={{ left: `${alpha * 100}%`, backgroundColor: iconColor }}
                          />
                        </div>
                      </div>
                      {/* 预览色块 */}
                      {(() => {
                        const displayColor = iconColor
                        return (
                          <div className="h-8 w-8 shrink-0 rounded-[6px] border border-[var(--is-border)]"
                            style={{
                              background: `
                                linear-gradient(rgba(${parseInt(displayColor.slice(1,3),16)},${parseInt(displayColor.slice(3,5),16)},${parseInt(displayColor.slice(5,7),16)},${alpha}),
                                rgba(${parseInt(displayColor.slice(1,3),16)},${parseInt(displayColor.slice(3,5),16)},${parseInt(displayColor.slice(5,7),16)},${alpha})),
                                repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 0 0 / 6px 6px
                              `,
                            }}
                          />
                        )
                      })()}
                    </div>
                    {/* 模式切换标签页 */}
                    <div className="mt-2 flex gap-0.5 rounded-[6px] bg-[var(--is-surface)] p-0.5">
                      {['Hex','RGB','HSB','HSL'].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setColorMode(mode.toLowerCase())}
                          className={`flex-1 rounded-[6px] py-0.5 text-[12px] leading-[18px] transition ${
                            colorMode === mode.toLowerCase()
                              ? 'bg-[var(--is-white)] text-[var(--is-ink)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                              : 'text-[var(--is-ink-soft)] hover:text-[var(--is-ink)]'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                    {/* HEX 输入 */}
                    {colorMode === 'hex' && (
                      <div className="mt-1 grid grid-cols-4 gap-1">
                        <div className="col-span-3">
                          <input
                            type="text"
                            value={iconColor.replace('#', '')}
                            onChange={(e) => {
                              const val = e.target.value
                              if (/^[0-9a-fA-F]{0,6}$/.test(val)) setIconColor('#' + val)
                            }}
                            className="w-full rounded-[6px] border border-[var(--is-border)] px-1.5 py-0.5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none"
                            maxLength={6}
                          />
                        </div>
                        <div className="relative">
                          {alphaEditing ? (
                            <input
                              ref={alphaInputRef}
                              type="text"
                              value={Math.round(alpha * 100)}
                              onChange={(e) => {
                                const v = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                                setAlpha(v / 100)
                              }}
                              onBlur={commitAlphaEdit}
                              onKeyDown={(e) => { if (e.key === 'Enter') commitAlphaEdit(); if (e.key === 'Escape') commitAlphaEdit() }}
                              className="w-full rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none"
                            />
                          ) : (
                            <div
                              onMouseDown={handleAlphaInputDrag}
                              onClick={handleAlphaEditClick}
                              className="flex h-full w-full cursor-ew-resize select-none items-center justify-center rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)]"
                            >
                              {Math.round(alpha * 100)}
                            </div>
                          )}
                          <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">%</span>
                        </div>
                      </div>
                    )}
                    {/* RGB 输入 */}
                    {colorMode === 'rgb' && (
                      <div className="mt-1 grid grid-cols-4 gap-1">
                        {[
                          { label: 'R', value: Math.round(parseInt(iconColor.slice(1,3), 16) || 0), max: 255 },
                          { label: 'G', value: Math.round(parseInt(iconColor.slice(3,5), 16) || 0), max: 255 },
                          { label: 'B', value: Math.round(parseInt(iconColor.slice(5,7), 16) || 0), max: 255 },
                          { label: 'A', value: Math.round(alpha * 100), max: 100, unit: '%' },
                        ].map(({ label, value, max, unit }) => (
                          <div key={label} className={unit ? 'relative' : ''}>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => {
                                const v = Math.min(max, Math.max(0, parseInt(e.target.value) || 0))
                                if (label === 'A') {
                                  setAlpha(v / 100)
                                } else {
                                  const idx = { R: 1, G: 3, B: 5 }[label]!
                                  const newHex = iconColor.slice(0, idx) + v.toString(16).padStart(2, '0').toUpperCase() + iconColor.slice(idx + 2)
                                  setIconColor(newHex)
                                }
                              }}
                              className={`w-full rounded-[6px] border border-[var(--is-border)] px-1.5 py-0.5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none ${unit ? 'pr-5' : ''}`}
                            />
                            {unit && (label === 'A' ? (
                              <div className="relative" style={{ marginTop: '-1px' }}>
                                {alphaEditing ? (
                                  <input
                                    ref={alphaInputRef}
                                    type="text"
                                    value={Math.round(alpha * 100)}
                                    onChange={(e) => {
                                      const v = Math.min(100, Math.max(0, parseInt(e.target.value) || 0))
                                      setAlpha(v / 100)
                                    }}
                                    onBlur={commitAlphaEdit}
                                    onKeyDown={(e) => { if (e.key === 'Enter') commitAlphaEdit(); if (e.key === 'Escape') commitAlphaEdit() }}
                                    className="w-full rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none"
                                  />
                                ) : (
                                  <div
                                    onMouseDown={handleAlphaInputDrag}
                                    onClick={handleAlphaEditClick}
                                    className="flex h-full w-full cursor-ew-resize select-none items-center justify-center rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)]"
                                  >
                                    {Math.round(alpha * 100)}
                                  </div>
                                )}
                                <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">%</span>
                              </div>
                            ) : (
                              <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">{unit}</span>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    {/* HSB 输入 */}
                    {colorMode === 'hsb' && (
                      <div className="mt-1 grid grid-cols-4 gap-1">
                        {(() => {
                          const r = parseInt(iconColor.slice(1,3), 16) / 255
                          const g = parseInt(iconColor.slice(3,5), 16) / 255
                          const b = parseInt(iconColor.slice(5,7), 16) / 255
                          const max = Math.max(r, g, b), min = Math.min(r, g, b)
                          const delta = max - min
                          let h = 0
                          if (delta !== 0) {
                            if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                            else if (max === g) h = ((b - r) / delta + 2) * 60
                            else h = ((r - g) / delta + 4) * 60
                          }
                          const s = max === 0 ? 0 : (delta / max) * 100
                          const br = max * 100
                          return [
                            { label: 'H', value: Math.round(h), max: 360 },
                            { label: 'S', value: Math.round(s), max: 100 },
                            { label: 'B', value: Math.round(br), max: 100 },
                            { label: 'A', value: Math.round(alpha * 100), max: 100, unit: '%' },
                          ].map(({ label, value, max, unit }) => (
                            <div key={label} className={unit ? 'relative' : ''}>
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  const v = Math.min(max, Math.max(0, parseInt(e.target.value) || 0))
                                  if (label === 'A') { setAlpha(v / 100); return }
                                  if (label === 'H') { setHueDeg(v); setIconColor(hsb2hex(v, satPercent, briPercent)) }
                                  if (label === 'S') { setSatPercent(v) }
                                  if (label === 'B') { setBriPercent(v) }
                                  if (label === 'S' || label === 'B') {
                                    const nh = hueDeg
                                    const ns = label === 'S' ? v : satPercent
                                    const nb = label === 'B' ? v : briPercent
                                    setIconColor(hsb2hex(nh, ns, nb))
                                  }
                                }}
                                className={`w-full rounded-[6px] border border-[var(--is-border)] px-1.5 py-0.5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none ${unit ? 'pr-5' : ''}`}
                              />
                              {unit && (label === 'A' ? (
                                <div className="relative" style={{ marginTop: '-1px' }}>
                                  {alphaEditing ? (
                                    <input
                                      ref={alphaInputRef}
                                      type="text"
                                      value={Math.round(alpha * 100)}
                                      onChange={(e) => { const v = Math.min(100, Math.max(0, parseInt(e.target.value) || 0)); setAlpha(v / 100) }}
                                      onBlur={commitAlphaEdit}
                                      onKeyDown={(e) => { if (e.key === 'Enter') commitAlphaEdit(); if (e.key === 'Escape') commitAlphaEdit() }}
                                      className="w-full rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none"
                                    />
                                  ) : (
                                    <div
                                      onMouseDown={handleAlphaInputDrag}
                                      onClick={handleAlphaEditClick}
                                      className="flex h-full w-full cursor-ew-resize select-none items-center justify-center rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)]"
                                    >
                                      {Math.round(alpha * 100)}
                                    </div>
                                  )}
                                  <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">%</span>
                                </div>
                              ) : (
                                <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">{unit}</span>
                              ))}
                            </div>
                          ))
                        })()}
                      </div>
                    )}
                    {/* HSL 输入 */}
                    {colorMode === 'hsl' && (
                      <div className="mt-1 grid grid-cols-4 gap-1">
                        {(() => {
                          const r = parseInt(iconColor.slice(1,3), 16) / 255
                          const g = parseInt(iconColor.slice(3,5), 16) / 255
                          const b = parseInt(iconColor.slice(5,7), 16) / 255
                          const max = Math.max(r, g, b), min = Math.min(r, g, b)
                          const delta = max - min
                          let h = 0, s = 0, l = (max + min) / 2
                          if (delta !== 0) {
                            s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
                            if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                            else if (max === g) h = ((b - r) / delta + 2) * 60
                            else h = ((r - g) / delta + 4) * 60
                          }
                          return [
                            { label: 'H', value: Math.round(h), max: 360 },
                            { label: 'S', value: Math.round(s * 100), max: 100 },
                            { label: 'L', value: Math.round(l * 100), max: 100 },
                            { label: 'A', value: Math.round(alpha * 100), max: 100, unit: '%' },
                          ].map(({ label, value, max, unit }) => (
                            <div key={label} className={unit ? 'relative' : ''}>
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => {
                                  const v = Math.min(max, Math.max(0, parseInt(e.target.value) || 0))
                                  if (label === 'A') { setAlpha(v / 100); return }
                                  if (label === 'H') { setHueDeg(v) }
                                  if (label === 'S') { setSatPercent(v) }
                                  if (label === 'L') { setBriPercent(v) }
                                  const nh = label === 'H' ? v : hueDeg
                                  const ns = label === 'S' ? v : satPercent
                                  const nl = label === 'L' ? v : briPercent
                                  setIconColor(hslToHex(nh, ns, nl))
                                }}
                                className={`w-full rounded-[6px] border border-[var(--is-border)] px-1.5 py-0.5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none ${unit ? 'pr-5' : ''}`}
                              />
                              {unit && (label === 'A' ? (
                                <div className="relative" style={{ marginTop: '-1px' }}>
                                  {alphaEditing ? (
                                    <input
                                      ref={alphaInputRef}
                                      type="text"
                                      value={Math.round(alpha * 100)}
                                      onChange={(e) => { const v = Math.min(100, Math.max(0, parseInt(e.target.value) || 0)); setAlpha(v / 100) }}
                                      onBlur={commitAlphaEdit}
                                      onKeyDown={(e) => { if (e.key === 'Enter') commitAlphaEdit(); if (e.key === 'Escape') commitAlphaEdit() }}
                                      className="w-full rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)] outline-none"
                                    />
                                  ) : (
                                    <div
                                      onMouseDown={handleAlphaInputDrag}
                                      onClick={handleAlphaEditClick}
                                      className="flex h-full w-full cursor-ew-resize select-none items-center justify-center rounded-[6px] border border-[var(--is-border)] py-0.5 pr-5 text-center text-[12px] leading-[18px] text-[var(--is-ink)]"
                                    >
                                      {Math.round(alpha * 100)}
                                    </div>
                                  )}
                                  <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">%</span>
                                </div>
                              ) : (
                                <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[12px] leading-[18px] text-[var(--is-ink-soft)]">{unit}</span>
                              ))}
                            </div>
                          ))
                        })()}
                      </div>
                    )}
                    {/* 预设颜色 */}
                    <div className="mt-2 grid grid-cols-8 gap-1">
                      {['#FF6352','#FEAE16','#F7DC6F','#2BC671','#08CACD','#007AFF','#956AFF','#000000',
                        '#333333','#666666','#999999','#BDBDBD','#CCCCCC','#E0E0E0','#F5F5F5','#FFFFFF'].map((c) => {
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => { setIconColor(c); setPickerOpen(false) }}
                            className="h-[18px] w-[18px] rounded-[4px] transition hover:scale-110"
                            style={{ backgroundColor: c }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            {COLOR_PRESETS.map((color) => {
              const isLast = color === '#000000'
              const targetColor = isLast && isDark ? '#ffffff' : color
              const isSelected = iconColor === targetColor
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setIconColor(targetColor)
                    setLastClickedColor(targetColor)
                    setClickSeq((n) => n + 1)
                  }}
                  className="group flex h-5 w-5 items-center justify-center rounded-[4px] bg-transparent"
                >
                  <span
                    key={`${color}-${clickSeq}`}
                    className={`h-4 w-4 rounded-[3px] transition-all duration-300 group-hover:rotate-[90deg] ${
                      isSelected && lastClickedColor === targetColor ? 'animate-[swatch-pulse_400ms_ease-out]' : ''
                    }`}
                    style={{ backgroundColor: targetColor }}
                  />
                </button>
              )
            })}
          </div>
        </div>
        </div>
        <div className="mb-6">
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
        </div>
        <SliderField
          label={t.settings.strokeWidth}
          value={strokeWidth}
          min={1}
          max={4}
          step={sizeLinked ? 0.05 : 0.1}
          unit="px"
          hint={t.settings.strokeWidthHint}
          onChange={handleLinkedStrokeWidth}
        />
      </div>
    </aside>
  )
}
