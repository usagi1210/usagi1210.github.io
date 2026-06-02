'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleX } from '@/lib/motion'
import { useScramble } from '@/hooks/useScramble'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { person } from '@/data/content'

function EmailDropdown({ emails }: { emails: { label: string; addr: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        style={{
          padding: '11px 22px', background: 'transparent', color: 'var(--ink)',
          fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400,
          border: '1px solid var(--rule)', borderRadius: 2, textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 5, cursor: 'default',
          transition: 'border-color 0.2s',
        }}
      >
        Email ↓
      </span>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0,
          background: 'var(--bg)', border: '1px solid var(--rule)', borderRadius: 2,
          minWidth: 260, zIndex: 50, overflow: 'hidden',
        }}>
          {emails.map(({ label, addr }) => (
            <a
              key={addr}
              href={`mailto:${addr}`}
              style={{
                display: 'flex', flexDirection: 'column', gap: 2,
                padding: '10px 16px', textDecoration: 'none', color: 'var(--ink)',
                fontFamily: 'var(--font-sans)', borderBottom: '1px solid var(--rule)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'oklch(0.97 0.005 55)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 300 }}>{addr}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Hero() {
  const nameYuanRef   = useRef<HTMLParagraphElement>(null)
  const nameJunhaoRef = useRef<HTMLParagraphElement>(null)
  const { scramble } = useScramble()
  const { btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.35)
  const [photoHovered, setPhotoHovered] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => scramble(nameYuanRef.current,   'YUAN',     0),   850)
    const t2 = setTimeout(() => scramble(nameJunhaoRef.current, 'JUNHAO.', 180),  850)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [scramble])

  const nameStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(6rem, 17vw, 13rem)',
    lineHeight: 0.9,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
    display: 'block',
    minHeight: '1em',
  }

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '100px 52px 60px',
        maxWidth: 1080, margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Photo — right half, fades left-to-right */}
      <div
        onMouseEnter={() => setPhotoHovered(true)}
        onMouseLeave={() => setPhotoHovered(false)}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%',
          overflow: 'hidden', zIndex: 0,
          maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
          opacity: photoHovered ? 0.65 : 0.3,
          transition: 'opacity 0.7s ease',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/me.jpg"
          alt=""
          aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
        />
      </div>

      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
        style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}
      >
        <motion.span variants={scaleX} initial="hidden" animate="visible" custom={0.15} style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--red)', flexShrink: 0 }} />
        {person.eyebrow}
      </motion.p>

      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.22}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.8rem,4.5vw,3.5rem)', lineHeight: 1, letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--muted)' }}
      >
        Hi, I&apos;m
      </motion.p>

      <p ref={nameYuanRef}   aria-label="Yuan"    style={{ ...nameStyle, color: 'var(--ink)' }} />
      <p ref={nameJunhaoRef} aria-label="Junhao." style={{ ...nameStyle, color: 'var(--red)', marginBottom: 24 }} />

      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.85}
        style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(0.95rem,1.6vw,1.25rem)', color: 'var(--muted)', marginBottom: 18 }}
      >
        {person.subtitle}
      </motion.p>

      <motion.div
        variants={scaleX} initial="hidden" animate="visible" custom={0.92}
        style={{ height: 1, background: 'var(--rule)', marginBottom: 18, width: 40 }}
      />

      <motion.p
        variants={fadeUp} initial="hidden" animate="visible" custom={0.98}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem', lineHeight: 1.82, maxWidth: '50ch', marginBottom: 28 }}
        dangerouslySetInnerHTML={{
          __html: person.bio
            .replace('co-designed', '<em>co-designed</em>')
            .replace('neural scene representations', '<strong>neural scene representations</strong>')
        }}
      />

      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={1.06}
        style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}
      >
        <span onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ display: 'inline-block' }}>
          <button
            ref={btnRef as React.Ref<HTMLButtonElement>}
            onClick={() => window.dispatchEvent(new Event('cv-modal-open'))}
            style={{
              padding: '12px 26px', background: 'var(--red)', color: '#fff',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
              border: 'none', borderRadius: 2, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'background 0.2s',
            }}
          >
            Request CV ↗
          </button>
        </span>

        {[
          { label: 'GitHub ↗',         href: person.github },
          { label: 'Google Scholar ↗', href: person.scholar },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '11px 22px', background: 'transparent', color: 'var(--ink)',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 400,
              border: '1px solid var(--rule)', borderRadius: 2, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 5,
              transition: 'border-color 0.2s',
            }}
          >
            {label}
          </a>
        ))}
        <EmailDropdown emails={person.emails} />
      </motion.div>
    </section>
  )
}
