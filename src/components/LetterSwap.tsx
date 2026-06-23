import { useRef, useState, useCallback } from 'react'

interface TextProps {
  label: string
  reverse?: boolean
  duration?: number
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | number
  className?: string
  onClick?: () => void
}

function LetterSwapForward({
  label,
  reverse = true,
  duration = 0.6,
  staggerDuration = 0.05,
  className,
  onClick,
}: TextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [blocked, setBlocked] = useState(false)

  const hoverStart = useCallback(() => {
    if (blocked || !containerRef.current) return
    setBlocked(true)

    const letters = containerRef.current.querySelectorAll<HTMLElement>('.letter')
    const secondaries = containerRef.current.querySelectorAll<HTMLElement>('.letter-secondary')

    letters.forEach((el, i) => {
      el.style.transition = `transform ${duration}s ease ${i * staggerDuration}s`
      el.style.transform = reverse ? 'translateY(-100%)' : 'translateY(100%)'
    })
    secondaries.forEach((el, i) => {
      el.style.transition = `top ${duration}s ease ${i * staggerDuration}s`
      el.style.top = '0%'
    })

    setTimeout(() => {
      letters.forEach((el) => {
        el.style.transition = 'none'
        el.style.transform = 'translateY(0)'
      })
      secondaries.forEach((el) => {
        el.style.transition = 'none'
        el.style.top = reverse ? '-100%' : '100%'
      })
      setBlocked(false)
    }, (duration + label.length * staggerDuration) * 1000 + 50)
  }, [blocked, duration, label.length, reverse, staggerDuration])

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center overflow-hidden ${className}`}
      onMouseEnter={hoverStart}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {label.split('').map((letter, i) => (
        <span key={i} className="relative inline-flex whitespace-pre">
          <span className="letter relative inline-block" style={{ top: 0 }}>
            {letter}
          </span>
          <span
            className="letter-secondary absolute inline-block"
            aria-hidden
            style={{ top: reverse ? '-100%' : '100%' }}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  )
}

function LetterSwapPingPong({
  label,
  reverse = true,
  duration = 0.6,
  staggerDuration = 0.05,
  staggerFrom = 'first',
  className,
  onClick,
}: TextProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const getDelay = (i: number, total: number) => {
    if (staggerFrom === 'last') return (total - 1 - i) * staggerDuration
    if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - i) * staggerDuration
    return i * staggerDuration
  }

  const animate = useCallback((enter: boolean) => {
    if (!containerRef.current) return
    const letters = containerRef.current.querySelectorAll<HTMLElement>('.letter')
    const secondaries = containerRef.current.querySelectorAll<HTMLElement>('.letter-secondary')
    const total = letters.length

    letters.forEach((el, i) => {
      el.style.transition = `transform ${duration}s ease ${getDelay(i, total)}s`
      el.style.transform = enter
        ? reverse
          ? 'translateY(-100%)'
          : 'translateY(100%)'
        : 'translateY(0)'
    })
    secondaries.forEach((el, i) => {
      el.style.transition = `top ${duration}s ease ${getDelay(i, total)}s`
      el.style.top = enter ? '0%' : reverse ? '-100%' : '100%'
    })
  }, [duration, reverse, staggerDuration, staggerFrom])

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center overflow-hidden ${className}`}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {label.split('').map((letter, i) => (
        <span key={i} className="relative inline-flex whitespace-pre">
          <span className="letter relative inline-block" style={{ top: 0 }}>
            {letter}
          </span>
          <span
            className="letter-secondary absolute inline-block"
            aria-hidden
            style={{ top: reverse ? '-100%' : '100%' }}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  )
}

export { LetterSwapForward, LetterSwapPingPong }
export type { TextProps }
