import SectionWrapper from './SectionWrapper'
import { awards } from '@/data/content'

export default function AwardsSection() {
  return (
    <SectionWrapper id="awards" label="Awards" sublabel="National level">
      <div>
        {awards.map((a, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '15px 0', borderBottom: '1px solid var(--rule)', cursor: 'default', transition: 'padding-left 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '8px' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '0' }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', width: 36, flexShrink: 0 }}>
              {a.year}
            </span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9375rem', fontWeight: 400, flex: 1, lineHeight: 1.4, transition: 'color 0.2s' }}>
              {a.name}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: 'var(--red)', padding: '3px 9px', borderRadius: 2, flexShrink: 0 }}>
              {a.level}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
