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
        <div className="mb-8">
          <span className="text-brand-400 font-mono text-sm block mb-2">06 / proof</span>
          <h2 className="text-3xl font-semibold text-white">Don't take my word — here's the receipts.</h2>
          <p className="text-gray-400 mt-2">Measured impact from production work</p>
        </div>
      </FadeInView>

      <div className="w-full space-y-6">
        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {proofOfWork.highlights.map((h, idx) => (
            <FadeInView key={h.label} delay={idx * 0.07}>
              <GlassCard className="p-5 text-left">
                <div className="text-2xl font-extrabold text-white leading-none mb-1">
                  <CountUp
                    target={parseFloat(h.value.replace(/[^0-9.]/g, ''))}
                    suffix={h.value.replace(/[0-9.]/g, '')}
                  />
                </div>
                <div className="text-gray-400 font-semibold text-xs mb-1 uppercase tracking-wider">{h.label}</div>
                <div className="text-gray-500 text-xs">{h.detail}</div>
              </GlassCard>
            </FadeInView>
          ))}
        </div>

        {/* Contribution heatmap */}
        <FadeInView delay={0.2}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-mono text-gray-400">contribution activity</p>
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
              <span className="text-xs text-gray-500">Less</span>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map(o => (
                <div key={o} className="heatmap-cell" style={{ backgroundColor: `rgba(0,229,173,${o})` }} />
              ))}
              <span className="text-xs text-gray-500">More</span>
            </div>
          </GlassCard>
        </FadeInView>
      </div>
    </SectionWrapper>
  );
}
