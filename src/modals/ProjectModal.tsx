import { motion } from 'framer-motion';
import { X, ExternalLink, AlertTriangle, TrendingUp, Cpu, Lightbulb, ArrowRight } from 'lucide-react';

const GithubIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;

import { useEffect, useState } from 'react';
import type { Project } from '@types_/index';

interface Props { project: Project; onClose: () => void; }

type Tab = 'overview' | 'challenges' | 'architecture' | 'scaling' | 'future';
const TABS: { id: Tab; label: string; Icon: typeof X }[] = [
  { id: 'overview',      label: 'Overview',      Icon: ArrowRight },
  { id: 'challenges',    label: 'Challenges',    Icon: AlertTriangle },
  { id: 'architecture',  label: 'Architecture',  Icon: Cpu },
  { id: 'scaling',       label: 'Scaling',       Icon: TrendingUp },
  { id: 'future',        label: 'Future',        Icon: Lightbulb },
];

export function ProjectModal({ project, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const cs = project.caseStudy;

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Focus trap (lock scroll)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] glass rounded-2xl border border-white/10 overflow-hidden flex flex-col"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5">
          <div>
            <p className="text-brand-400 text-xs font-mono mb-1">{project.category}</p>
            <h2 className="text-white font-bold text-xl">{project.title}</h2>
            <p className="text-slate-400 text-sm mt-1">{project.tagline}</p>
          </div>
          <div className="flex items-center gap-3 ml-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-400 transition-colors">
                <GithubIcon />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="text-slate-400 hover:text-brand-400 transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-white/5 overflow-x-auto hide-scrollbar">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-all ${
                tab === id
                  ? 'text-brand-400 border-b-2 border-brand-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {tab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-mono text-slate-500 mb-1">Problem</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 mb-1">Solution</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{cs.solution}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 mb-1">Impact</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{cs.impact}</p>
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </div>
              </div>
            )}

            {tab === 'challenges' && (
              <div className="space-y-4">
                {cs.challenges.map((c, i) => (
                  <div key={i} className="glass rounded-xl p-4 border border-amber-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                      <p className="text-white font-semibold text-sm">{c.title}</p>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{c.how}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'architecture' && (
              <div className="space-y-3">
                <div className="terminal-window">
                  <div className="terminal-header">
                    <span className="terminal-dot bg-red-500"/><span className="terminal-dot bg-yellow-500"/><span className="terminal-dot bg-green-500"/>
                    <span className="text-slate-500 text-xs ml-2 font-mono">architecture.md</span>
                  </div>
                  <div className="terminal-body">
                    {cs.architecture.map((line, i) => (
                      <div key={i} className="terminal-output">{line}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'scaling' && (
              <div className="space-y-3">
                {cs.scalingDecisions.map((d, i) => (
                  <div key={i} className="flex gap-3 text-sm text-slate-300">
                    <TrendingUp size={14} className="text-brand-400 mt-0.5 shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            )}

            {tab === 'future' && (
              <div className="space-y-3">
                {cs.futureImprovements.map((f, i) => (
                  <div key={i} className="flex gap-3 text-sm text-slate-300">
                    <Lightbulb size={14} className="text-amber-400 mt-0.5 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
