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
        <div className="section-header">
          <span className="section-label">05 / skills</span>
          <h2 className="section-title text-white">The tools — organized as systems.</h2>
          <p className="section-subtitle">Not just buzzwords — grouped by real-world system categories</p>
        </div>
      </FadeInView>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Category tab strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
          {skills.map(cat => {
            const Icon = ICON_MAP[cat.icon] ?? Terminal;
            const color = COLOR_MAP[cat.color as ColorKey] ?? COLOR_MAP.brand;
            const isActive = cat.category === activeCategory;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 1.125rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  border: '1px solid',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  ...(isActive
                    ? { background: color.bg, borderColor: color.border, color: color.text }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' })
                }}
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
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <p className="text-body">{active.description}</p>

            {/* Skill grid */}
            <div style={{ display: 'grid', gap: '1rem' }} className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {active.items.map((item, i) => {
                const color = COLOR_MAP[active.color as ColorKey] ?? COLOR_MAP.brand;
                return (
                  <FadeInView key={item.name} delay={i * 0.04}>
                    <GlassCard className="p-5">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>{item.years}y</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: color.text }}>{item.level}%</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: '3px', borderRadius: '9999px', width: '100%', background: 'rgba(255,255,255,0.07)' }}>
                        <motion.div
                          style={{ height: '100%', borderRadius: '9999px', background: `linear-gradient(90deg, ${color.text}, ${color.text}80)` }}
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
