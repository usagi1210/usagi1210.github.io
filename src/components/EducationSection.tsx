import SectionWrapper from './SectionWrapper'
import { education } from '@/data/content'

export default function EducationSection() {
  return (
    <SectionWrapper id="education" label="Education">
      <div>
        {education.map((edu, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '0 24px',
              padding: '22px 0',
              borderBottom: '1px solid var(--rule)',
              alignItems: 'start',
            }}
          >
            {/* Period */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 400,
                color: 'var(--muted)',
                lineHeight: 1.6,
                paddingTop: 2,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {edu.period}
            </span>

            {/* Content */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 3, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {edu.institution}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                  }}
                >
                  {edu.institutionZh}
                </span>
                {edu.current && (
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.5625rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      background: 'var(--red)',
                      padding: '2px 7px',
                      borderRadius: 2,
                    }}
                  >
                    Current
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {edu.department}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    opacity: 0.7,
                    lineHeight: 1.5,
                  }}
                >
                  {edu.departmentZh}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                    lineHeight: 1.5,
                  }}
                >
                  {edu.role}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {edu.roleZh}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
