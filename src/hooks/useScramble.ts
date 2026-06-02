'use client'
import { useCallback, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

export function useScramble(interval = 55) {
  // Track all active intervals so cancel() can clean them all up
  const activeIds = useRef<Set<ReturnType<typeof setInterval>>>(new Set())

  const scramble = useCallback(
    (el: HTMLElement | null, target: string, startDelay = 0) => {
      if (!el) return
      const len = target.length
      let frame = 0
      const total = len * 6
      // Each call owns its own id in closure — no shared ref collision
      let id: ReturnType<typeof setInterval>

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
        if (frame > total + 4) {
          clearInterval(id)
          activeIds.current.delete(id)
        }
      }

      setTimeout(() => {
        id = setInterval(run, interval)
        activeIds.current.add(id)
      }, startDelay)
    },
    [interval]
  )

  const cancel = useCallback(() => {
    activeIds.current.forEach(id => clearInterval(id))
    activeIds.current.clear()
  }, [])

  return { scramble, cancel }
}
