'use client'
import { motion } from 'framer-motion'
import { useScrollspy } from '@/hooks/useScrollspy'
import { fadeIn } from '@/lib/motion'

const NAV_SECTIONS = ['research', 'pubs', 'projects', 'awards']
const NAV_LABELS: Record<string, string> = {
  research: 'Research',
  pubs:     'Publications',
  projects: 'Projects',
  awards:   'Awards',
}

export default function Nav() {
  const active = useScrollspy(NAV_SECTIONS, 0.25)

  return (
    <motion.nav
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      custom={0.9}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 52px',
        background: 'oklch(0.972 0.009 55 / 0.93)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Yuan Junhao
      </span>

      <ul style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
        {NAV_SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: active === id ? 'var(--ink)' : 'var(--muted)',
                textDecoration: 'none',
                position: 'relative', paddingBottom: 2,
                transition: 'color 0.2s',
              }}
            >
              {NAV_LABELS[id]}
              <span
                style={{
                  position: 'absolute', bottom: -1, left: 0, right: 0, height: 1,
                  background: 'var(--red)',
                  transformOrigin: 'left',
                  transform: active === id ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
                  display: 'block',
                }}
              />
            </a>
          </li>
        ))}
        <li>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}
          >
            CV ↓
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}
