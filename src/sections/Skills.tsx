import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { GlassCard } from '@components/GlassCard';
import { SectionWrapper } from '@components/SectionWrapper';
import { Terminal, Database, Cloud, Zap, GitBranch, Settings } from 'lucide-react';

const ICON_MAP: Record<string, typeof Terminal> = {
  terminal: Terminal, database: Database, cloud: Cloud, zap: Zap, 'git-branch': GitBranch, settings: Settings,
};

type ColorKey = 'brand' | 'purple' | 'amber';
const COLOR_MAP: Record<ColorKey, { bg: string; border: string; text: string }> = {
  brand:  { bg: 'rgba(0,229,173,0.08)',   border: 'rgba(0,229,173,0.2)',   text: '#00e5ad' },
  purple: { bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  text: '#8b5cf6' },
  amber:  { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  text: '#f59e0b' },
};

export function Skills() {
  const { skills } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState(skills[0]?.category ?? '');
  const active = skills.find(s => s.category === activeCategory);

  return (
    <SectionWrapper id="skills">
      <FadeInView>
        <div className="mb-12">
          <span className="section-label">05 / skills</span>
          <h2 className="section-title text-white">The tools — organized as systems.</h2>
          <p className="section-subtitle">Not just buzzwords — grouped by real-world system categories</p>
        </div>
      </FadeInView>

      <div className="space-y-8">
        {/* Category tab strip */}
        <div className="flex flex-wrap gap-2">
          {skills.map(cat => {
            const Icon = ICON_MAP[cat.icon] ?? Terminal;
            const color = COLOR_MAP[cat.color as ColorKey] ?? COLOR_MAP.brand;
            const isActive = cat.category === activeCategory;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border"
                style={
                  isActive
                    ? { background: color.bg, borderColor: color.border, color: color.text }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }
                }
              >
                <Icon size={13} />
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Active category panel */}
        {active && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <p className="text-body">{active.description}</p>

            {/* Skill grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {active.items.map((item, i) => {
                const color = COLOR_MAP[active.color as ColorKey] ?? COLOR_MAP.brand;
                return (
                  <FadeInView key={item.name} delay={i * 0.04}>
                    <GlassCard className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold text-sm">{item.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-gray-500">{item.years}y</span>
                          <span className="text-xs font-bold font-mono" style={{ color: color.text }}>{item.level}%</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${color.text}, ${color.text}80)` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.level}%` }}
                          transition={{ duration: 0.7, delay: i * 0.04, ease: 'easeOut' }}
                        />
                      </div>
                    </GlassCard>
                  </FadeInView>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
