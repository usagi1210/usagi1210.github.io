'use client'
import { useEffect, useState } from 'react'
import { person } from '@/data/content'

export default function CVModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('cv-modal-open', handler)
    return () => window.removeEventListener('cv-modal-open', handler)
  }, [])

  if (!open) return null

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'oklch(0.1 0 0 / 0.45)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)', border: '1px solid var(--rule)',
          borderRadius: 4, padding: '40px 44px', maxWidth: 480, width: '100%',
          position: 'relative',
        }}
      >
        <button
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute', top: 16, right: 18,
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--muted)',
            lineHeight: 1, padding: 4,
          }}
        >
          ✕
        </button>

        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 16 }}>
          CV Request · 简历获取
        </p>

        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--ink)', marginBottom: 8 }}>
          My CV is available upon request. Please reach out via my educational email and I'll get back to you shortly.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--muted)', marginBottom: 28 }}>
          简历可通过邮件申请获取，请发送至我的教育邮箱，我会尽快回复。
        </p>

        <a
          href={`mailto:${person.emails[0].addr}?subject=CV%20Request`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', background: 'var(--red)', color: '#fff',
            fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
            borderRadius: 2, textDecoration: 'none', transition: 'opacity 0.2s',
          }}
        >
          {person.emails[0].addr} ↗
        </a>

        <p style={{ marginTop: 16, fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          Click outside or ✕ to close · 点击背景或右上角关闭
        </p>
      </div>
    </div>
  )
}
