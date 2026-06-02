'use client'
import { useRef, useCallback } from 'react'

export function useTilt3D(maxX = 10, maxY = 8) {
  const ref = useRef<HTMLDivElement | null>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width  - 0.5
      const y = (e.clientY - r.top)  / r.height - 0.5
      el.style.transform = `perspective(700px) rotateY(${x * maxX}deg) rotateX(${-y * maxY}deg) scale(1.02)`
      el.style.setProperty('--sx', (e.clientX - r.left) + 'px')
      el.style.setProperty('--sy', (e.clientY - r.top)  + 'px')
    },
    [maxX, maxY]
  )

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
