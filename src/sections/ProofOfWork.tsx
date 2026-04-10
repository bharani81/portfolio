import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { CountUp } from '@components/CountUp';
import { GlassCard } from '@components/GlassCard';
import { SectionWrapper } from '@components/SectionWrapper';

export function ProofOfWork() {
  const { proofOfWork, profile } = usePortfolioData();
  const maxCount = Math.max(...proofOfWork.contributions.map(c => c.count));

  return (
    <SectionWrapper id="proof">
      <FadeInView>
        <div className="section-header">
          <span className="section-label">06 / proof</span>
          <h2 className="section-title text-white">Don't take my word — here's the receipts.</h2>
          <p className="section-subtitle">Measured impact from production work</p>
        </div>
      </FadeInView>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gap: '1.25rem' }} className="sm:grid-cols-2 lg:grid-cols-4">
          {proofOfWork.highlights.map((h, idx) => (
            <FadeInView key={h.label} delay={idx * 0.07}>
              <GlassCard className="p-7 h-full">
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '0.75rem' }}>
                  <CountUp
                    target={parseFloat(h.value.replace(/[^0-9.]/g, ''))}
                    suffix={h.value.replace(/[0-9.]/g, '')}
                  />
                </div>
                <div style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '0.7rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h.label}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.6 }}>{h.detail}</div>
              </GlassCard>
            </FadeInView>
          ))}
        </div>

        {/* Contribution heatmap */}
        <FadeInView delay={0.2}>
          <GlassCard className="p-7">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94a3b8', letterSpacing: '0.08em' }}>contribution activity</p>
              <a
                href={profile.socials.github}
                target="_blank" rel="noopener noreferrer"
                style={{ color: '#00e5ad', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}
                className="hover:underline"
              >
                view on GitHub →
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {proofOfWork.contributions.map(({ week, count }) => {
                const intensity = count / maxCount;
                return (
                  <div key={week} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => (
                      <div
                        key={day}
                        className="heatmap-cell"
                        style={{
                          backgroundColor: `rgba(0,229,173,${day === 0
                            ? intensity * 0.5
                            : intensity * (0.5 + Math.random() * 0.5)
                          })`,
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>Less</span>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
                <div key={o} className="heatmap-cell" style={{ backgroundColor: `rgba(0,229,173,${o})` }} />
              ))}
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>More</span>
            </div>
          </GlassCard>
        </FadeInView>
      </div>
    </SectionWrapper>
  );
}
