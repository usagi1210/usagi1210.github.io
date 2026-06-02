'use client'
import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', e.clientX + 'px')
      el.style.setProperty('--my', e.clientY + 'px')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle 480px at var(--mx, 50%) var(--my, 50%), oklch(0.50 0.195 7 / 0.05) 0%, transparent 70%)',
      }}
    />
  )
}
