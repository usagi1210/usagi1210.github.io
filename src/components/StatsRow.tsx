'use client'
import { useCounter } from '@/hooks/useCounter'
import { stats } from '@/data/content'

function StatItem({ value, label }: { value: number; label: string }) {
  const { value: count, ref } = useCounter(value)

  return (
    <div
      ref={ref}
      style={{ padding: '28px 52px', borderRight: '1px solid var(--rule)', display: 'flex', flexDirection: 'column', gap: 4 }}
    >
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {count}
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {label}
      </span>
    </div>
  )
}

export default function StatsRow() {
  return (
    <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {stats.map((s, i) => (
        <StatItem key={i} value={s.value} label={s.label} />
      ))}
    </div>
  )
}
