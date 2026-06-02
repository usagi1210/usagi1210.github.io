'use client'
import { useRef, useCallback } from 'react'

export function useMagneticButton(strength = 0.35) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const btn = btnRef.current
      if (!btn) return
      const rect = btn.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      btn.style.transform = `translate(${x}px, ${y}px)`
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    if (btnRef.current) btnRef.current.style.transform = ''
  }, [])

  return { btnRef, onMouseMove, onMouseLeave }
}
