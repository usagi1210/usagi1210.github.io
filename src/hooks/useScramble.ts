'use client'
import { useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export function useScramble() {
  const frameRef = useRef<number | null>(null)

  const scramble = useCallback(
    (el: HTMLElement | null, target: string, startDelay = 0) => {
      if (!el) return
      const len = target.length
      let frame = 0
      const total = len * 6

      const run = () => {
        let out = ''
        for (let i = 0; i < len; i++) {
          if (frame > i * 6 + 5) {
            out += target[i]
          } else if (frame > i * 4) {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            out += '<span style="opacity:0">' + target[i] + '</span>'
          }
        }
        el.innerHTML = out
        frame++
        if (frame <= total + 4) {
          frameRef.current = requestAnimationFrame(run)
        }
      }

      setTimeout(() => {
        frameRef.current = requestAnimationFrame(run)
      }, startDelay)
    },
    []
  )

  const cancel = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
  }, [])

  return { scramble, cancel }
}
