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
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        {/* Left Column: sticky section title */}
        <FadeInView className="lg:sticky lg:top-32 lg:col-span-1">
          <span className="section-label">06 / proof</span>
          <h2 className="section-title">
            Don't take my word — <br className="hidden lg:block" />
            <span className="gradient-text">here's the receipts.</span>
          </h2>
          <p className="section-subtitle">Measured impact from production work</p>
        </FadeInView>

        {/* Right Column: Content */}
        <div className="w-full lg:col-span-2 space-y-6">
          {/* Stat cards: 2-col */}
          <div className="grid sm:grid-cols-2 gap-4">
            {proofOfWork.highlights.map((h, idx) => (
              <FadeInView key={h.label} delay={idx * 0.07}>
                <GlassCard className="p-5">
                  <div className="text-2xl font-extrabold gradient-text leading-none mb-1">
                    <CountUp
                      target={parseFloat(h.value.replace(/[^0-9.]/g, ''))}
                      suffix={h.value.replace(/[0-9.]/g, '')}
                    />
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{h.label}</div>
                  <div className="text-caption">{h.detail}</div>
                </GlassCard>
              </FadeInView>
            ))}
          </div>

          {/* Contribution heatmap */}
          <FadeInView delay={0.2}>
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-caption font-mono">contribution activity</p>
                <a
                  href={profile.socials.github}
                  target="_blank" rel="noopener noreferrer"
                  className="text-brand-400 text-xs hover:underline font-mono"
                >
                  view on GitHub →
                </a>
              </div>

              <div className="flex gap-1 overflow-x-auto pb-2">
                {proofOfWork.contributions.map(({ week, count }) => {
                  const intensity = count / maxCount;
                  return (
                    <div key={week} className="flex flex-col gap-1">
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
              <div className="flex items-center gap-2 mt-3">
                <span className="text-caption">Less</span>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
                  <div key={o} className="heatmap-cell" style={{ backgroundColor: `rgba(0,229,173,${o})` }} />
                ))}
                <span className="text-caption">More</span>
              </div>
            </GlassCard>
          </FadeInView>
        </div>
      </div>
    </SectionWrapper>
  );
}
