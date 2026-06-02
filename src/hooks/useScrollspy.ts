'use client'
import { useEffect, useState } from 'react'

export function useScrollspy(ids: string[], threshold = 0.25): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [ids, threshold])

  return active
}
