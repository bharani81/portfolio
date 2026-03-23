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
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        {/* Left Column: sticky section title */}
        <FadeInView className="lg:sticky lg:top-32 lg:col-span-1">
          <span className="section-label">04 / projects</span>
          <h2 className="section-title">
            Proof: code that <br className="hidden lg:block" />
            <span className="gradient-text">ships and scales.</span>
          </h2>
          <p className="section-subtitle">Click any card to read the full case study</p>
        </FadeInView>

        {/* Right Column: Grid for project cards */}
        <div className="grid md:grid-cols-2 gap-6 w-full lg:col-span-2">
          {projects.map((project, idx) => (
            <FadeInView 
              key={project.id} 
              delay={idx * 0.1}
              className="flex"
            >
            {/* Card wrapper to equalize heights */}
            <GlassCard 
              className="p-5 h-full flex flex-col group cursor-pointer"
              onClick={() => openModal(project)}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  {project.featured && (
                    <span className="text-amber-400 text-xs font-mono block mb-0.5">★ featured</span>
                  )}
                  <h3 className="text-h3 text-white group-hover:text-brand-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>
                <span className="tech-badge shrink-0">{project.category}</span>
              </div>

              {/* Description */}
              <p className="text-body text-sm flex-1 mb-4">{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => { e.stopPropagation(); trackEvent('github_click', { project: project.title }); }}
                      className="text-slate-500 hover:text-brand-400 transition-colors"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-slate-500 hover:text-brand-400 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
                <span className="text-caption font-mono flex items-center gap-1 group-hover:text-brand-400 transition-colors">
                  case study <ArrowRight size={10} />
                </span>
              </div>
            </GlassCard>
            </FadeInView>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  );
}
