import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { usePortfolioData } from '@hooks/usePortfolioData';
import { FadeInView } from '@components/FadeInView';
import { GlassCard } from '@components/GlassCard';
import { SectionWrapper } from '@components/SectionWrapper';
import { ProjectModal } from '@modals/ProjectModal';
import { trackEvent } from '@lib/analytics';
import type { Project } from '@types_/index';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function Projects() {
  const { projects } = usePortfolioData();
  const [selected, setSelected] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelected(project);
    trackEvent('project_modal_open', { title: project.title });
  };

  return (
    <SectionWrapper id="projects">
      <FadeInView>
        <div className="section-header">
          <span className="section-label">04 / projects</span>
          <h2 className="section-title text-white">Proof: code that ships and scales.</h2>
          <p className="section-subtitle">Click any card to read the full case study</p>
        </div>
      </FadeInView>

      <div style={{ display: 'grid', gap: '2rem' }} className="md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, idx) => (
          <FadeInView
            key={project.id}
            delay={idx * 0.08}
            className="flex"
          >
            <GlassCard
              className="p-7 flex flex-col group cursor-pointer w-full"
              onClick={() => openModal(project)}
            >
              {/* Top */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  {project.featured && (
                    <span style={{ color: '#fbbf24', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '0.375rem' }}>★ featured</span>
                  )}
                  <h3 className="text-h3 text-white group-hover:text-brand-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
                <span className="tech-badge shrink-0">{project.category}</span>
              </div>

              {/* Description */}
              <p className="text-body text-sm flex-1" style={{ marginBottom: '1.25rem' }}>{project.description}</p>

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => { e.stopPropagation(); trackEvent('github_click', { project: project.title }); }}
                      className="text-gray-500 hover:text-brand-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-gray-500 hover:text-brand-400 transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748b' }} className="group-hover:text-brand-400 transition-colors">
                  case study <ArrowRight size={10} />
                </span>
              </div>
            </GlassCard>
          </FadeInView>
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}
