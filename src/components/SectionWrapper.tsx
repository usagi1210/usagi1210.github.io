'use client'
import { motion } from 'framer-motion'
import { clipReveal } from '@/lib/motion'

interface Props {
  id: string
  label: string
  sublabel?: string
  children: React.ReactNode
}

export default function SectionWrapper({ id, label, sublabel, children }: Props) {
  return (
    <motion.div
      id={id}
      variants={clipReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 52px', borderTop: '1px solid var(--rule)' }}
    >
      <div data-section-grid style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4 }}>
            {label}
          </p>
          {sublabel && (
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.6875rem', color: 'var(--muted)', marginTop: 4 }}>
              {sublabel}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </motion.div>
  )
}
