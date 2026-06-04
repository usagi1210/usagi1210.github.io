'use client'
import { forwardRef, useMemo, useRef, useEffect } from 'react'

function useAnimationFrame(callback: () => void) {
  const cbRef = useRef(callback)
  useEffect(() => { cbRef.current = callback })
  useEffect(() => {
    let id: number
    const loop = () => { cbRef.current(); id = requestAnimationFrame(loop) }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])
}

function useMousePositionRef(containerRef: React.RefObject<HTMLElement>) {
  const pos = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      pos.current = rect
        ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
        : { x: e.clientX, y: e.clientY }
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      const rect = containerRef.current?.getBoundingClientRect()
      pos.current = rect
        ? { x: t.clientX - rect.left, y: t.clientY - rect.top }
        : { x: t.clientX, y: t.clientY }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [containerRef])
  return pos
}

export interface VariableProximityProps {
  label: string
  fromFontVariationSettings: string
  toFontVariationSettings: string
  containerRef: React.RefObject<HTMLElement>
  radius?: number
  falloff?: 'linear' | 'exponential' | 'gaussian'
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 120,
    falloff = 'linear',
    className = '',
    onClick,
    style,
  } = props

  const letterRefs = useRef<(HTMLElement | null)[]>([])
  const mousePos = useMousePositionRef(containerRef)
  const lastPos = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

  const parsedSettings = useMemo(() => {
    const parse = (s: string) =>
      new Map(
        s.split(',').map(seg => {
          const parts = seg.trim().split(' ')
          return [parts[0].replace(/['"]/g, ''), parseFloat(parts[1])] as [string, number]
        })
      )
    const from = parse(fromFontVariationSettings)
    const to = parse(toFontVariationSettings)
    return Array.from(from.entries()).map(([axis, fromVal]) => ({
      axis,
      fromVal,
      toVal: to.get(axis) ?? fromVal,
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  useAnimationFrame(() => {
    if (!containerRef?.current) return
    const { x, y } = mousePos.current
    if (lastPos.current.x === x && lastPos.current.y === y) return
    lastPos.current = { x, y }

    const cRect = containerRef.current.getBoundingClientRect()

    letterRefs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2 - cRect.left
      const cy = r.top + r.height / 2 - cRect.top
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)

      if (dist >= radius) {
        el.style.fontVariationSettings = fromFontVariationSettings
        return
      }

      const norm = Math.min(Math.max(1 - dist / radius, 0), 1)
      let fv: number
      switch (falloff) {
        case 'exponential': fv = norm ** 2; break
        case 'gaussian':    fv = Math.exp(-((dist / (radius / 2)) ** 2) / 2); break
        default:            fv = norm
      }

      el.style.fontVariationSettings = parsedSettings
        .map(({ axis, fromVal, toVal }) => `'${axis}' ${fromVal + (toVal - fromVal) * fv}`)
        .join(', ')
    })
  })

  const words = label.split(' ')
  let idx = 0

  return (
    <span
      ref={ref}
      className={className}
      onClick={onClick}
      style={{ display: 'inline', ...style }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map(ch => {
            const i = idx++
            return (
              <span
                key={i}
                ref={el => { letterRefs.current[i] = el }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {ch}
              </span>
            )
          })}
          {wi < words.length - 1 && (
            <span style={{ display: 'inline-block' }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span
        style={{
          position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
          overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
        }}
      >
        {label}
      </span>
    </span>
  )
})

VariableProximity.displayName = 'VariableProximity'
export default VariableProximity
