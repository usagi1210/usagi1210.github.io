'use client'
import SectionWrapper from './SectionWrapper'
import { useTilt3D } from '@/hooks/useTilt3D'
import { projects } from '@/data/content'

function ProjectCard({ name, desc, tags, url }: { name: string; desc: string; tags: string[]; url: string }) {
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, position: 'relative' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', transition: 'color 0.2s' }}>{name}</span>
        <span style={{ fontSize: '1rem', color: 'oklch(0.80 0 0)', transition: 'transform 0.2s, color 0.2s' }}>↗</span>
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 300, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 12, position: 'relative' }}>{desc}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', position: 'relative' }}>
        {tags.map((t) => (
          <span key={t} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6875rem', color: 'var(--muted)', border: '1px solid var(--rule)', padding: '2px 8px', borderRadius: 2 }}>{t}</span>
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
          <ProjectCard key={p.name} name={p.name} desc={p.desc} tags={p.tags} url={p.url} />
        ))}
      </div>
    </SectionWrapper>
  )
}
