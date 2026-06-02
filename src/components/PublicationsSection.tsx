'use client'
import SectionWrapper from './SectionWrapper'
import { publications } from '@/data/content'

export default function PublicationsSection() {
  return (
    <SectionWrapper id="pubs" label="Publications" sublabel={`${publications.length} paper`}>
      <div>
        {publications.map((pub, i) => (
          <div
            key={i}
            style={{ padding: '28px 0', borderBottom: '1px solid var(--rule)', position: 'relative', transition: 'padding-left 0.25s cubic-bezier(.4,0,.2,1)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = '16px'
              const bar = e.currentTarget.querySelector<HTMLSpanElement>('.pub-bar')
              if (bar) bar.style.transform = 'scaleY(1)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = '0'
              const bar = e.currentTarget.querySelector<HTMLSpanElement>('.pub-bar')
              if (bar) bar.style.transform = 'scaleY(0)'
            }}
          >
            <span className="pub-bar" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--red)', transform: 'scaleY(0)', transformOrigin: 'top', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', display: 'block' }} />

            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-display)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 10 }}>
              <span style={{ display: 'inline-block', width: 10, height: 1.5, background: 'currentColor' }} />
              {pub.venue}
            </p>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.015em', lineHeight: 1.42, marginBottom: 8, transition: 'color 0.2s' }}>
              {pub.title}
            </h3>

            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
              {pub.authors.map((a, j) => (
                <span key={j}>
                  {j > 0 && ' · '}
                  {a === pub.selfAuthor ? <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{a}</strong> : a}
                </span>
              ))}
            </p>

            <div style={{ display: 'flex', gap: 16 }}>
              {Object.entries(pub.links).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none', textTransform: 'capitalize', transition: 'color 0.2s' }}
                >
                  {key === 'bibtex' ? 'BibTeX' : key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
