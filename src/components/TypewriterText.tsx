'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  text: string
  delay?: number   // ms before typing starts
  speed?: number   // base ms per character
  jitter?: number  // ±ms random variation for human feel
}

export default function TypewriterText({
  text,
  delay = 0,
  speed = 42,
  jitter = 18,
}: Props) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const timer = useRef<number>(0)

  useEffect(() => {
    let i = 0

    const type = () => {
      if (i > text.length) {
        setDone(true)
        return
      }
      setDisplayed(text.slice(0, i))
      i++
      const next = speed + (Math.random() - 0.5) * 2 * jitter
      timer.current = window.setTimeout(type, Math.max(10, next))
    }

    const init = window.setTimeout(type, delay)
    return () => { clearTimeout(init); clearTimeout(timer.current) }
  }, [text, delay, speed, jitter])

  return (
    <>
      {displayed}
      <span className={`tw-cursor${done ? ' tw-cursor--idle' : ''}`}>|</span>
    </>
  )
}
