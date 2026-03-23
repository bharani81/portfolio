import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '> initializing bharanidharan.dev...',
  '> loading experience data          [OK]',
  '> connecting to AWS us-east-1      [OK]',
  '> cache warmed (redis hit-rate 98%) [OK]',
  '> launching portfolio              [READY]',
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx < BOOT_LINES.length) {
      const t = setTimeout(() => setLineIdx(i => i + 1), 400);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setDone(true); setTimeout(onComplete, 600); }, 300);
      return () => clearTimeout(t);
    }
  }, [lineIdx, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'var(--bg-900)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-md px-4">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <span className="gradient-text font-mono font-bold text-2xl">bharanidharan.dev</span>
            </motion.div>

            {/* Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-500" />
                <span className="terminal-dot bg-green-500" />
                <span className="text-slate-500 text-xs ml-2 font-mono">boot</span>
              </div>
              <div className="terminal-body min-h-[140px]">
                {BOOT_LINES.slice(0, lineIdx).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.includes('[READY]') ? 'terminal-success' : 'terminal-output'}
                  >
                    {line}
                    {i === lineIdx - 1 && lineIdx < BOOT_LINES.length && (
                      <span className="cursor-blink" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-0.5 bg-white/5 rounded overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(lineIdx / BOOT_LINES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
