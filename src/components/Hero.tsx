'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleX } from '@/lib/motion'
import { useScramble } from '@/hooks/useScramble'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { person } from '@/data/content'
import VariableProximity from './VariableProximity'
import TypewriterText from './TypewriterText'

// Scramble timing (ms):
// YUAN   (4 chars): start=850,  run=4*6*55=1320, done≈2200
// JUNHAO.(7 chars): start=1030, run=7*6*55=2310, done≈3340
// Crossfade triggers at 3600 (safe margin after both finish)
const CROSSFADE_DELAY = 3600

function EmailDropdown({ emails }: { emails: { label: string; addr: string }[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="cursor-target"
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
  const sectionRef    = useRef<HTMLElement>(null)
  const nameYuanRef   = useRef<HTMLParagraphElement>(null)
  const nameJunhaoRef = useRef<HTMLParagraphElement>(null)
  const { scramble }  = useScramble()
  const { btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.35)
  const [photoHovered, setPhotoHovered] = useState(false)
  const [scrambleDone, setScrambleDone] = useState(false)
  const [bioZh, setBioZh] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => scramble(nameYuanRef.current,   'YUAN',     0),   850)
    const t2 = setTimeout(() => scramble(nameJunhaoRef.current, 'JUNHAO.', 180),  850)
    const t3 = setTimeout(() => setScrambleDone(true), CROSSFADE_DELAY)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [scramble])

  const nameStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontWeight: 900,
    fontSize: 'clamp(6rem, 17vw, 13rem)',
    lineHeight: 0.9,
    letterSpacing: '0.01em',
    textTransform: 'uppercase',
    display: 'block',
    margin: 0,
  }

  const fade = (done: boolean): React.CSSProperties => ({
    opacity: done ? 1 : 0,
    transition: 'opacity 0.5s ease',
  })

  return (
    <section
      ref={sectionRef as React.Ref<HTMLElement>}
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

      {/* YUAN — scramble fades out, VariableProximity fades in */}
      <div style={{ position: 'relative' }}>
        <p style={{ ...nameStyle, color: 'var(--ink)', ...fade(scrambleDone) }}>
          <VariableProximity
            label="YUAN"
            fromFontVariationSettings="'wght' 700, 'opsz' 14"
            toFontVariationSettings="'wght' 900, 'opsz' 72"
            containerRef={sectionRef as React.RefObject<HTMLElement>}
            radius={220}
            falloff="linear"
          />
        </p>
        <p
          ref={nameYuanRef}
          aria-label="Yuan"
          style={{
            ...nameStyle, color: 'var(--ink)',
            position: 'absolute', top: 0, left: 0, right: 0,
            pointerEvents: 'none',
            ...fade(!scrambleDone),
          }}
        />
      </div>

      {/* JUNHAO. — scramble fades out, VariableProximity fades in */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <p style={{ ...nameStyle, color: 'var(--red)', ...fade(scrambleDone) }}>
          <VariableProximity
            label="JUNHAO."
            fromFontVariationSettings="'wght' 700, 'opsz' 14"
            toFontVariationSettings="'wght' 900, 'opsz' 72"
            containerRef={sectionRef as React.RefObject<HTMLElement>}
            radius={220}
            falloff="linear"
          />
        </p>
        <p
          ref={nameJunhaoRef}
          aria-label="Junhao."
          style={{
            ...nameStyle, color: 'var(--red)',
            position: 'absolute', top: 0, left: 0, right: 0,
            pointerEvents: 'none',
            ...fade(!scrambleDone),
          }}
        />
      </div>

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

      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={0.98}
        style={{ position: 'relative', maxWidth: '50ch', marginBottom: 28 }}
        onMouseEnter={() => setBioZh(true)}
        onMouseLeave={() => setBioZh(false)}
      >
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem',
          lineHeight: 1.82, minHeight: '5.46em', textAlign: 'justify',
          opacity: bioZh ? 0 : 1, transition: 'opacity 0.35s ease',
        }}>
          <TypewriterText text={person.bio} delay={1600} speed={22} jitter={10} />
        </p>
        <p style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem',
          lineHeight: 1.82, textAlign: 'justify',
          opacity: bioZh ? 1 : 0, transition: 'opacity 0.35s ease',
          pointerEvents: 'none', color: 'var(--ink)',
        }}>
          {person.bioZh}
        </p>
      </motion.div>

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
            className="cursor-target"
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
