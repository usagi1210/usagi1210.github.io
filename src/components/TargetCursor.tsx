'use client'
import { useEffect, useRef } from 'react'

const S = 10   // corner bracket square size (px)
const B = 2    // border width (px)
const P = 6    // padding around target (px)
const DUR = '0.18s'

export default function TargetCursor({
  targetSelector = '.cursor-target',
}: {
  targetSelector?: string
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const applyPositions = (
      positions: { x: number; y: number }[],
      opacity: number,
      withTransition: boolean,
    ) => {
      refs.current.forEach((el, i) => {
        if (!el) return
        el.style.transition = withTransition
          ? `opacity ${DUR} ease, transform ${DUR} ease`
          : 'none'
        el.style.opacity = String(opacity)
        el.style.transform = `translate(${positions[i].x}px,${positions[i].y}px)`
      })
    }

    const clusterAroundCursor = () => {
      const { x, y } = mouse.current
      return [
        { x: x - S - 2, y: y - S - 2 },
        { x: x + 2,     y: y - S - 2 },
        { x: x + 2,     y: y + 2     },
        { x: x - S - 2, y: y + 2     },
      ]
    }

    const cornersOfTarget = (el: Element) => {
      const r = el.getBoundingClientRect()
      return [
        { x: r.left  - P,      y: r.top    - P      },
        { x: r.right + P - S,  y: r.top    - P      },
        { x: r.right + P - S,  y: r.bottom + P - S  },
        { x: r.left  - P,      y: r.bottom + P - S  },
      ]
    }

    let activeTarget: Element | null = null
    let pendingLeave: (() => void) | null = null

    const onOver = (e: MouseEvent) => {
      // Walk up DOM to find a matching cursor-target ancestor
      let el: Element | null = e.target as Element
      while (el && el !== document.body) {
        if (el.matches(targetSelector)) break
        el = el.parentElement
      }
      if (!el?.matches(targetSelector) || el === activeTarget) return

      // Remove previous leave handler
      if (activeTarget && pendingLeave) {
        activeTarget.removeEventListener('mouseleave', pendingLeave)
      }

      activeTarget = el

      // Snap corners to cursor cluster (no animation), then animate to target
      applyPositions(clusterAroundCursor(), 0, false)
      refs.current[0]?.getBoundingClientRect() // force reflow
      applyPositions(cornersOfTarget(el), 1, true)

      const leave = () => {
        applyPositions(clusterAroundCursor(), 0, true)
        activeTarget = null
        pendingLeave = null
        el!.removeEventListener('mouseleave', leave)
      }
      pendingLeave = leave
      el.addEventListener('mouseleave', leave)
    }

    window.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      if (activeTarget && pendingLeave) {
        activeTarget.removeEventListener('mouseleave', pendingLeave)
      }
    }
  }, [targetSelector])

  const base: React.CSSProperties = {
    position: 'fixed', left: 0, top: 0,
    width: S, height: S,
    pointerEvents: 'none', zIndex: 8001, opacity: 0,
  }
  const c = `${B}px solid var(--red)`

  return (
    <>
      <div ref={el => { refs.current[0] = el }} style={{ ...base, borderTop: c, borderLeft:  c }} />
      <div ref={el => { refs.current[1] = el }} style={{ ...base, borderTop: c, borderRight: c }} />
      <div ref={el => { refs.current[2] = el }} style={{ ...base, borderBottom: c, borderRight: c }} />
      <div ref={el => { refs.current[3] = el }} style={{ ...base, borderBottom: c, borderLeft: c }} />
    </>
  )
}
