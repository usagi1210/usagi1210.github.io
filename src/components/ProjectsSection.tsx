'use client'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { projects } from '@/data/content'

const FRAMEWORK_TAGS = new Set(['Python', 'PyTorch', 'CUDA', 'OpenCV', 'NumPy', 'Dobot Magician'])

function tagStyle(tag: string): React.CSSProperties {
  if (tag === 'In Progress' || tag === 'Private')
    return { color: 'var(--muted)', border: '1px solid var(--rule)', background: 'transparent' }
  if (FRAMEWORK_TAGS.has(tag))
    return { color: 'oklch(0.42 0.10 240)', border: '1px solid oklch(0.78 0.07 240)', background: 'oklch(0.95 0.02 240)' }
  return { color: 'oklch(0.42 0.12 7)', border: '1px solid oklch(0.78 0.08 7)', background: 'oklch(0.96 0.01 7)' }
}

function ProjectCard({ name, zh, desc, tags, url }: { name: string; zh?: string; desc: string; tags: string[]; url: string }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(8, 6)

  return (
    <a
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      onMouseLeave={onMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      style={{
        background: 'var(--bg)', padding: 24, textDecoration: 'none', color: 'inherit',
        display: 'block', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d',
        transition: 'background 0.18s',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at var(--sx,50%) var(--sy,50%), oklch(1 0 0/0.14) 0%, transparent 55%)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2, position: 'relative' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>{name}</span>
        <span style={{ fontSize: '1rem', color: 'oklch(0.80 0 0)', transition: 'transform 0.2s, color 0.2s' }}>↗</span>
      </div>
      {zh && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)', letterSpacing: '0.03em', marginBottom: 8, position: 'relative' }}>{zh}</p>}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 12, position: 'relative' }}>{desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative' }}>
        {tags.map((t) => (
          <span key={t} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', padding: '2px 8px', borderRadius: 2, ...tagStyle(t) }}>{t}</span>
        ))}
      </div>
    </a>
  )
}

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" label="Projects" sublabel="GitHub">
      <div data-two-col-grid style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--rule)', border: '1px solid var(--rule)' }}>
        {projects.map((p) => (
          <ProjectCard key={p.name} name={p.name} zh={p.zh} desc={p.desc} tags={p.tags} url={p.url} />
        ))}
      </div>
    </SectionWrapper>
  )
}
