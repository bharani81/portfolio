import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { GlassCard } from '@components/GlassCard';
import { SectionWrapper } from '@components/SectionWrapper';
import { Calendar, MapPin } from 'lucide-react';

export function Experience() {
  const { experience } = usePortfolioData();
  const [expanded, setExpanded] = useState<number>(experience[0]?.id ?? 1);

  return (
    <SectionWrapper id="experience" className="relative">
      {/* Subtle radial bg accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
      />

      <FadeInView>
        <div className="section-header">
          <span className="section-label">02 / experience</span>
          <h2 className="section-title text-white">From intern to owning production.</h2>
          <p className="section-subtitle">Impact-driven engineering journey</p>
        </div>
      </FadeInView>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-[7px] top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,229,173,0.35) 10%, rgba(0,229,173,0.35) 90%, transparent)' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', paddingLeft: '2.5rem' }}>
          {experience.map((exp, idx) => (
            <FadeInView key={exp.id} delay={idx * 0.1}>
              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[2.65rem] top-5 w-3.5 h-3.5 rounded-full bg-brand-400 border-2 border-[#050c15] glow-brand" />

                <GlassCard
                  className="p-6 cursor-pointer"
                  onClick={() => setExpanded(id => id === exp.id ? -1 : exp.id)}
                >
                  {/* Header row */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }} className="sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-h3 text-white">{exp.role}</h3>
                      <p className="text-brand-400 font-semibold text-sm" style={{ marginTop: '0.375rem' }}>{exp.company}</p>
                    </div>
                    <span className="tech-badge w-fit shrink-0">{exp.type}</span>
                  </div>

                  {/* Meta */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Calendar size={11} />{exp.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <MapPin size={11} />{exp.location}
                    </span>
                  </div>

                  {/* Impact metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }} className="sm:grid-cols-4">
                    {exp.impact.map(m => (
                      <div key={m.metric} className="glass rounded-lg border border-white/5 text-center sm:text-left" style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '0.5rem', lineHeight: 1.3 }}>{m.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expandable highlights */}
                  <motion.div
                    initial={false}
                    animate={{ height: expanded === exp.id ? 'auto' : 0, opacity: expanded === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem', paddingTop: '0.5rem' }}>
                      {exp.highlights.map((h, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.875rem', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.65 }}>
                          <span style={{ color: '#00e5ad', marginTop: '0.25rem', flexShrink: 0, fontSize: '0.7rem' }}>▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Footer: tech stack + expand toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                      {exp.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                    </div>
                    <p style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#64748b', flexShrink: 0 }}>
                      {expanded === exp.id ? '▾ collapse' : '▸ expand'}
                    </p>
                  </div>
                </GlassCard>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
