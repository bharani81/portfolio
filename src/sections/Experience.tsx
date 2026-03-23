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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
      />

      <FadeInView>
        <div className="mb-8">
          <span className="text-brand-400 font-mono text-sm block mb-2">02 / experience</span>
          <h2 className="text-3xl font-semibold text-white">From intern to owning production.</h2>
          <p className="text-gray-400 mt-2">Impact-driven engineering journey</p>
        </div>
      </FadeInView>

      <div className="relative w-full">
        {/* Vertical line — left-aligned on all screens */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,229,173,0.35) 15%, rgba(0,229,173,0.35) 85%, transparent)' }}
        />

        <div className="space-y-8 ml-12">
          {experience.map((exp, idx) => (
            <FadeInView key={exp.id} delay={idx * 0.12}>
              <div className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-5 w-3 h-3 rounded-full bg-brand-400 border-2 border-[#050c15] glow-brand" />

                <GlassCard
                  className="p-6 cursor-pointer max-w-4xl"
                  onClick={() => setExpanded(id => id === exp.id ? -1 : exp.id)}
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-brand-400 font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="tech-badge w-fit">{exp.type}</span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />{exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />{exp.location}
                    </span>
                  </div>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {exp.impact.map(m => (
                      <div key={m.metric} className="glass rounded-lg p-3 border border-white/5">
                        <div className="text-lg font-extrabold text-white leading-none">{m.value}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">{m.metric}</div>
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
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-gray-400 max-w-2xl text-left leading-relaxed">
                          <span className="text-brand-400 mt-0.5 shrink-0 text-xs">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>

                  <p className="text-xs font-mono text-gray-500">
                    {expanded === exp.id ? '▾ collapse' : '▸ expand highlights'}
                  </p>
                </GlassCard>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
