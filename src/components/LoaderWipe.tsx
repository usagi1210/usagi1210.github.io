'use client'
import { useEffect, useRef } from 'react'

export default function LoaderWipe() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => {
      el.style.transform = 'scaleY(0)'
    }, 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'var(--ink)',
        transformOrigin: 'top',
        transition: 'transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)',
        pointerEvents: 'none',
      }}
    />
  )
}
