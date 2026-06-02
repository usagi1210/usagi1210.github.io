import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.15, 0, 0, 1], delay, type: 'tween' },
  }),
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay, type: 'tween' },
  }),
}

export const clipReveal: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0, 0, 1], type: 'tween' },
  },
}

export const scaleX: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay, type: 'tween' },
  }),
}
