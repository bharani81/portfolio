import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  amount?: number;
}

export function FadeInView({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.2,
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount });

  const offsets: Record<string, { x: number; y: number }> = {
    up:    { x: 0,   y: 30  },
    down:  { x: 0,   y: -30 },
    left:  { x: 30,  y: 0   },
    right: { x: -30, y: 0   },
    none:  { x: 0,   y: 0   },
  };

  const { x, y } = offsets[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
