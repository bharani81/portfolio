import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

// Data-driven command map — add new commands here, no code changes needed
const COMMANDS: Record<string, string[]> = {
  'help': [
    '  Available commands:',
    '  GET /api/health      — check system health',
    '  POST /api/request    — simulate a request',
    '  QUERY users          — query the database',
    '  ls services          — list microservices',
    '  ping redis           — check cache connectivity',
    '  status               — system status overview',
    '  sudo make me coffee  — ☕',
    '  clear                — clear terminal',
  ],
  'GET /api/health': [
    '  ← 200 OK',
    '  latency: 2ms | cache: HIT | uptime: 99.98%',
    '  services: [gateway ✓] [auth ✓] [db ✓] [redis ✓]',
  ],
  'POST /api/request': [
    '  ← 202 Accepted',
    '  request-id: req_7f2a9c',
    '  → queued to SQS | worker: ECS task spinning up...',
    '  → processed in 14ms',
  ],
  'QUERY users': [
    '  → executing: SELECT * FROM users WHERE active = true',
    '  ← 847 rows | pg: 9ms | plan: Index Scan on users_pkey',
    '  → cached result (TTL 60s)',
  ],
  'ls services': [
    '  API Gateway    golang/gin     :8080  [HEALTHY]',
    '  Auth Service   golang         :8081  [HEALTHY]',
    '  Redis Cache    redis:7         :6379  [HEALTHY]',
    '  SQS Worker     aws-lambda     async  [HEALTHY]',
    '  PostgreSQL     postgres:15    :5432  [HEALTHY]',
  ],
  'ping redis': [
    '  PONG from redis:6379 — 0.3ms',
    '  memory: 42MB / 512MB | hit-rate: 97.8%',
  ],
  'status': [
    '  ┌─ system status ─────────────────────────────┐',
    '  │ API: ✓ healthy    Cache: ✓ warm              │',
    '  │ DB:  ✓ connected  Queue: ✓ 0 pending         │',
    '  │ Deployments today: 3  Errors (24h): 0        │',
    '  └─────────────────────────────────────────────┘',
  ],
  'sudo make me coffee': [
    '  [sudo] password for bharanidharan: ********',
    '  ☕ Brewing... Done.',
    '  → coffee_quality: excellent | latency: 3min',
  ],
};

interface Line { type: 'prompt' | 'output' | 'error'; text: string; }

export function SystemSimulator() {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: '  bharanidharan.dev system simulator v1.0' },
    { type: 'output', text: '  Type "help" to see available commands.' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim();
    const newLines: Line[] = [{ type: 'prompt', text: `$ ${trimmed}` }];

    if (trimmed === 'clear') {
      setLines([{ type: 'output', text: '' }]);
      setInput('');
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach(l => newLines.push({ type: 'output', text: l }));
    } else if (trimmed !== '') {
      newLines.push({ type: 'error', text: `  command not found: ${trimmed} — try "help"` });
    }

    setLines(prev => [...prev, ...newLines, { type: 'output', text: '' }]);
    setInput('');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') execute(input);
  };

  if (!visible) {
    return (
      <motion.button
        onClick={() => setVisible(true)}
        whileHover={{ scale: 1.02 }}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 rounded-xl glass border border-brand-400/20 text-brand-400 text-sm font-mono hover:border-brand-400/50 hover:shadow-glow-sm transition-all"
      >
        <Terminal size={15} />
        Open Terminal
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 right-6 z-30 w-96 max-w-[calc(100vw-2rem)] terminal-window shadow-2xl"
      style={{ maxHeight: 400 }}
    >
      <div className="terminal-header flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button onClick={() => setVisible(false)} className="terminal-dot bg-red-500 hover:bg-red-400 transition-colors" />
          <span className="terminal-dot bg-yellow-500" />
          <span className="terminal-dot bg-green-500" />
        </div>
        <span className="text-slate-500 text-xs font-mono flex-1 text-center">system-simulator</span>
        <button onClick={() => setVisible(false)} className="text-slate-600 hover:text-slate-400">
          <X size={12} />
        </button>
      </div>

      <div className="terminal-body overflow-y-auto hide-scrollbar" style={{ height: 280 }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'prompt' ? 'terminal-prompt' :
              line.type === 'error'  ? 'terminal-error' :
              'terminal-output'
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 border-t border-white/5">
        <span className="terminal-prompt text-sm">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
          className="flex-1 bg-transparent text-slate-200 text-sm font-mono outline-none placeholder-slate-700"
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </motion.div>
  );
}
