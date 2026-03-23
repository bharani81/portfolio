import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { usePortfolioData } from '@hooks/usePortfolioData';
import { usePerformanceTier } from '@hooks/usePerformanceTier';
import { useMobile } from '@hooks/useMobile';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { trackEvent } from '@lib/analytics';

const HeroCanvas = lazy(() => import('@3d/HeroCanvas').then(m => ({ default: m.HeroCanvas })));

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function Hero() {
  const { profile } = usePortfolioData();
  const tier = usePerformanceTier();
  const isMobile = useMobile();
  const show3D = !isMobile && tier !== 'LOW';
  const [simCount, setSimCount] = useState(0);

  const handleSimulate = () => {
    setSimCount(c => c + 1);
    trackEvent('hero_simulate_request');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 65% 40%, rgba(0,229,173,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* 2-column grid: text left, canvas right */}
        <div className="grid lg:grid-cols-[1fr,1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="section-label"
            >
              Backend Engineer · Golang Specialist
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-hero gradient-text mb-4"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="text-lg sm:text-xl text-slate-400 font-medium mb-4 prose-narrow"
            >
              {profile.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              className="text-body mb-5 prose-default"
            >
              {profile.bio}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="font-mono text-brand-400 text-sm mb-8 italic"
            >
              "I build the systems your apps depend on."
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.58 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <a
                href={profile.resumeUrl}
                download
                onClick={() => trackEvent('resume_download', { source: 'hero' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-brand-500 text-dark-900 hover:bg-brand-400 transition-all hover:shadow-glow-md"
              >
                <Download size={14} /> Download Resume
              </a>
              <a
                href={profile.socials.github}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { platform: 'github', source: 'hero' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm glass border border-white/10 text-slate-300 hover:text-brand-400 hover:border-brand-400/30 transition-all"
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('social_click', { platform: 'linkedin', source: 'hero' })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm glass border border-white/10 text-slate-300 hover:text-brand-400 hover:border-brand-400/30 transition-all"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </motion.div>

            {/* Sim feedback */}
            {simCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-400/20 text-brand-400 text-xs font-mono self-start"
              >
                ✓ {simCount} request{simCount > 1 ? 's' : ''} simulated
              </motion.div>
            )}
          </div>

          {/* ── Right: 3D Canvas ── */}
          <div className="relative h-[400px] lg:h-[520px] order-first lg:order-last">
            {show3D ? (
              <ErrorBoundary
                fallback={
                  <div className="h-full glass rounded-2xl flex items-center justify-center text-slate-600 text-sm">
                    3D visualization unavailable
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-brand-400/30 border-t-brand-400 rounded-full animate-spin" />
                    </div>
                  }
                >
                  <HeroCanvas onSimulate={handleSimulate} />
                </Suspense>
              </ErrorBoundary>
            ) : (
              <div className="h-full glass rounded-2xl flex flex-col items-center justify-center gap-5 p-8 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,229,173,0.3) 0%, transparent 70%)' }}
                />
                <div className="text-5xl">⚡</div>
                <div>
                  <p className="text-brand-400 font-mono text-sm text-center">Backend Systems</p>
                  <p className="text-slate-500 text-xs mt-1 text-center">APIs · Queues · Microservices</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {['Golang', 'AWS', 'Redis', 'PostgreSQL'].map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex flex-col items-center mt-12 text-slate-600"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono mb-1">scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </div>
    </section>
  );
}
