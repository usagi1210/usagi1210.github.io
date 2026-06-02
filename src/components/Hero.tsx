'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, scaleX } from '@/lib/motion'
import { useScramble } from '@/hooks/useScramble'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { person } from '@/data/content'

export default function Hero() {
  const nameYuanRef   = useRef<HTMLParagraphElement>(null)
  const nameJunhaoRef = useRef<HTMLParagraphElement>(null)
  const { scramble } = useScramble()
  const { btnRef, onMouseMove, onMouseLeave } = useMagneticButton(0.35)

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
          <a
            ref={btnRef as React.Ref<HTMLAnchorElement>}
            href={person.cvUrl}
            style={{
              padding: '12px 26px', background: 'var(--red)', color: '#fff',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
              border: 'none', borderRadius: 2, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              transition: 'background 0.2s',
            }}
          >
            Download CV ↓
          </a>
        </span>

        {[
          { label: 'GitHub ↗',         href: person.github },
          { label: 'Google Scholar ↗', href: person.scholar },
          { label: 'Email',            href: `mailto:${person.email}` },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
      </motion.div>
    </section>
  )
}
