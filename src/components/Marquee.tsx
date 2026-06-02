import { marqueeItems } from '@/data/content'

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '18px 0', borderBottom: '1px solid var(--rule)', background: 'var(--ink)' }}>
      <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--font-display)', fontWeight: 900, fontStyle: 'italic', fontSize: 'clamp(1.5rem,3.5vw,2.75rem)', letterSpacing: '0.01em', textTransform: 'uppercase', color: 'oklch(0.972 0.009 55)', padding: '0 36px' }}>
              {item}
            </span>
            <span style={{ color: 'oklch(0.972 0.009 55 / 0.2)', padding: '0 4px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
