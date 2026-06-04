'use client'
import { useEffect, useRef } from 'react'

const MAX_POINTS = 28
// Brand red rgba approximation of oklch(0.50 0.195 7)
const R = 185, G = 26, B_CH = 26

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number }[]>([])
  const rafRef = useRef<number>(0)
  const clearTimer = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      points.current.push({ x: e.clientX, y: e.clientY })
      if (points.current.length > MAX_POINTS) points.current.shift()

      // Clear trail 350ms after mouse stops
      clearTimeout(clearTimer.current)
      clearTimer.current = window.setTimeout(() => { points.current = [] }, 350)
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = points.current
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const t = i / pts.length           // 0 = oldest, 1 = newest
          const prev = pts[i - 1]
          const curr = pts[i]

          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(curr.x, curr.y)
          ctx.strokeStyle = `rgba(${R},${G},${B_CH},${(t * 0.22).toFixed(3)})`
          ctx.lineWidth   = t * 4.5
          ctx.lineCap     = 'round'
          ctx.lineJoin    = 'round'
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(clearTimer.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 7997,
      }}
    />
  )
}
