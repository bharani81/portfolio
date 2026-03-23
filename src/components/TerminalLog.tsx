import { useEffect, useRef, useState } from 'react';

interface LogLine {
  type: 'prompt' | 'output' | 'success' | 'warn' | 'error';
  text: string;
}

interface TerminalLogProps {
  lines: LogLine[];
  title?: string;
  autoplay?: boolean;
  delay?: number;
  className?: string;
}

export function TerminalLog({ lines, title = 'terminal', autoplay = true, delay = 120, className = '' }: TerminalLogProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoplay) { setVisibleCount(lines.length); return; }
    setVisibleCount(0);
    let i = 0;
    const tick = () => {
      i++;
      setVisibleCount(i);
      if (i < lines.length) timer.current = setTimeout(tick, delay);
    };
    timer.current = setTimeout(tick, 300);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [lines, autoplay, delay]);

  const colorClass: Record<LogLine['type'], string> = {
    prompt:  'terminal-prompt',
    output:  'terminal-output',
    success: 'terminal-success',
    warn:    'terminal-warn',
    error:   'terminal-error',
  };

  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-500" />
        <span className="terminal-dot bg-green-500" />
        <span className="text-slate-500 text-xs ml-2 font-mono">{title}</span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={colorClass[line.type]}>
            {line.type === 'prompt' && <span className="terminal-prompt mr-2">$</span>}
            {line.text}
            {i === visibleCount - 1 && visibleCount < lines.length && (
              <span className="cursor-blink" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
