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

      <div className="grid lg:grid-cols-[1fr,2fr] gap-12 lg:gap-16 items-start">
        {/* Left Column: sticky section title */}
        <FadeInView className="lg:sticky lg:top-32">
          <span className="section-label">02 / experience</span>
          <h2 className="section-title">
            From intern to <br className="hidden lg:block" />
            <span className="gradient-text">owning production.</span>
          </h2>
          <p className="section-subtitle">Impact-driven engineering journey</p>
        </FadeInView>

        {/* Right Column: Timeline */}
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
                  className="p-6 cursor-pointer"
                  onClick={() => setExpanded(id => id === exp.id ? -1 : exp.id)}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-h3 text-white">{exp.role}</h3>
                      <p className="text-brand-400 font-semibold text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="tech-badge shrink-0 mt-0.5">{exp.type}</span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-caption mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />{exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={11} />{exp.location}
                    </span>
                  </div>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {exp.impact.map(m => (
                      <div key={m.metric} className="glass rounded-lg p-3 border border-white/5">
                        <div className="text-lg font-extrabold gradient-text leading-none">{m.value}</div>
                        <div className="text-caption mt-1">{m.metric}</div>
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
                        <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
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


                  <p className="text-caption font-mono">
                    {expanded === exp.id ? '▾ collapse' : '▸ expand highlights'}
                  </p>
                </GlassCard>
              </div>
            </FadeInView>
          ))}
        </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
