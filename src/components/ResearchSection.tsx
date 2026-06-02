'use client'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { interests } from '@/data/content'

function InterestCell({ name, desc }: { name: string; desc: string }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(10, 8)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: 'var(--bg)', padding: '22px 24px',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        transformStyle: 'preserve-3d', transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), oklch(1 0 0 / 0.12) 0%, transparent 60%)',
      }} />
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6, position: 'relative', transition: 'color 0.2s' }}>
        {name}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.65, position: 'relative' }}>
        {desc}
      </p>
    </div>
  )
}

export default function ResearchSection() {
  return (
    <SectionWrapper id="research" label="Research Interests" sublabel="4 areas">
      <div data-two-col-grid style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {interests.map((item) => (
          <InterestCell key={item.name} name={item.name} desc={item.desc} />
        ))}
      </div>
    </SectionWrapper>
  )
}
