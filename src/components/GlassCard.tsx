import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'brand' | 'purple' | 'amber' | 'none';
  onClick?: () => void;
}

const glowClasses = {
  brand:  'hover:border-brand-400/40 hover:shadow-glow-sm',
  purple: 'hover:border-purple-400/40 hover:glow-purple',
  amber:  'hover:border-amber-400/40 hover:glow-amber',
  none:   '',
};

export function GlassCard({ children, className = '', hover = true, glow = 'brand', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'glass rounded-xl border border-white/5',
        hover ? `transition-all duration-300 ${glowClasses[glow]}` : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
