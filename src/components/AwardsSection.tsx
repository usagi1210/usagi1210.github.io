'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import SectionWrapper from './SectionWrapper'
import { awards } from '@/data/content'

const LEVEL_RANK: Record<string, number> = {
  International: 0,
  National:      1,
  Provincial:    2,
  University:    3,
}

const LEVEL_COLOR: Record<string, string> = {
  International: 'var(--ink)',
  National:      'var(--red)',
  Provincial:    'oklch(0.50 0.10 60)',
  University:    'oklch(0.48 0.06 220)',
}

const sortedAwards = [...awards].sort((a, b) => {
  const levelDiff = (LEVEL_RANK[a.level] ?? 99) - (LEVEL_RANK[b.level] ?? 99)
  if (levelDiff !== 0) return levelDiff
  return Number(b.year) - Number(a.year)
})

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'oklch(0.08 0 0 / 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        cursor: 'zoom-out',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(860px, 94vw)',
          maxHeight: '90vh',
          boxShadow: '0 32px 80px oklch(0 0 0 / 0.5)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{ display: 'block', maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
        />
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 10, right: 10,
            background: 'oklch(0.10 0 0 / 0.7)',
            border: 'none', borderRadius: 2,
            color: '#fff', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500,
            padding: '4px 10px', letterSpacing: '0.06em',
          }}
        >
          ESC
        </button>
      </div>
    </div>
  )
}

export default function AwardsSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <SectionWrapper id="awards" label="Awards">
        <div>
          {sortedAwards.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: '15px 0', borderBottom: '1px solid var(--rule)',
                cursor: 'default', transition: 'padding-left 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '8px' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = '0' }}
            >
              {/* Year */}
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
                color: 'var(--muted)', fontVariantNumeric: 'tabular-nums',
                width: 36, flexShrink: 0, paddingTop: 2,
              }}>
                {a.year}
              </span>

              {/* Name (bilingual) */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{
                  fontFamily: 'var(--font-serif)', fontSize: '0.9375rem',
                  fontWeight: 400, lineHeight: 1.4, transition: 'color 0.2s',
                }}>
                  {a.name}
                </span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
                  fontWeight: 300, color: 'var(--muted)', lineHeight: 1.4,
                }}>
                  {a.nameZh}
                </span>
              </div>

              {/* Level badge */}
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '0.625rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                background: LEVEL_COLOR[a.level] ?? 'var(--muted)',
                padding: '3px 9px', borderRadius: 2, flexShrink: 0, marginTop: 2,
              }}>
                {a.level}
              </span>

              {/* Certificate thumbnail */}
              {a.image && (
                <button
                  onClick={() => setLightbox({ src: a.image!, alt: a.name })}
                  aria-label={`View certificate: ${a.name}`}
                  style={{
                    flexShrink: 0, padding: 0, border: '1px solid var(--rule)',
                    background: 'none', cursor: 'zoom-in', borderRadius: 2,
                    overflow: 'hidden', display: 'block',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--red)'
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px oklch(0.50 0.195 7 / 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--rule)'
                    ;(e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'
                  }}
                >
                  <Image
                    src={a.image}
                    alt={a.name}
                    width={52}
                    height={38}
                    style={{ display: 'block', objectFit: 'cover' }}
                    unoptimized
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
