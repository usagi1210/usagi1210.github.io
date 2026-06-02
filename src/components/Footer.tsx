import { person } from '@/data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ borderTop: '3px solid var(--ink)', maxWidth: 1080, margin: '0 auto', padding: '24px 52px 52px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Yuan Junhao
      </span>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.75rem', color: 'var(--muted)' }}>
        <a href={`mailto:${person.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{person.email}</a>
        {' · '}Updated {year}
      </span>
    </footer>
  )
}
