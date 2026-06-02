'use client'
import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const dot    = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left    = e.clientX + 'px'
      dot.style.top     = e.clientY + 'px'
      dot.style.opacity = '1'
      ringEl.style.opacity = '1'
    }

    const onLeave = () => {
      dot.style.opacity    = '0'
      ringEl.style.opacity = '0'
    }

    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      rafRef.current = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 8000,
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--red)',
          transform: 'translate(-50%,-50%)',
          opacity: 0, transition: 'opacity 0.3s',
          left: 0, top: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 7999,
          width: 36, height: 36, borderRadius: '50%',
          border: '1.5px solid oklch(0.50 0.195 7 / 0.4)',
          transform: 'translate(-50%,-50%)',
          opacity: 0, transition: 'opacity 0.3s, width 0.2s, height 0.2s, border-color 0.2s',
          left: 0, top: 0,
        }}
      />
    </>
  )
}
