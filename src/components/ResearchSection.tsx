'use client'
import { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { interests } from '@/data/content'

function InterestCell({ name, zh, desc, descZh }: { name: string; zh?: string; desc: string; descZh?: string }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(10, 8)
  const [showChinese, setShowChinese] = useState(false)

  const descriptionStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8125rem',
    color: 'var(--muted)', lineHeight: 1.65, position: 'relative',
    transition: 'opacity 0.35s ease',
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setShowChinese(true)}
      onMouseLeave={() => {
        onMouseLeave()
        setShowChinese(false)
      }}
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
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 2, position: 'relative', transition: 'color 0.2s' }}>
        {name}
      </p>
      {zh && <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 8, position: 'relative' }}>{zh}</p>}
      <div style={{ position: 'relative', minHeight: '4.95em' }}>
        <p style={{ ...descriptionStyle, opacity: showChinese && descZh ? 0 : 1 }}>
          {desc}
        </p>
        {descZh && (
          <p lang="zh-CN" style={{ ...descriptionStyle, position: 'absolute', inset: 0, opacity: showChinese ? 1 : 0, pointerEvents: 'none' }}>
            {descZh}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ResearchSection() {
  return (
    <SectionWrapper id="research" label="Research Interests" sublabel="Directions I am actively exploring.">
      <div data-two-col-grid style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {interests.map((item) => (
          <InterestCell key={item.name} name={item.name} zh={item.zh} desc={item.desc} descZh={item.descZh} />
        ))}
      </div>
    </SectionWrapper>
  )
}
