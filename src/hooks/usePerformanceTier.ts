import { useEffect, useState } from 'react';
import type { PerformanceTier } from '@types_/index';

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('HIGH');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) { setTier('LOW'); return; }

    const cores = navigator.hardwareConcurrency ?? 4;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory: number = nav.deviceMemory ?? 8;

    if (cores < 4 || memory < 4) setTier('LOW');
    else if (cores < 8 || memory < 8) setTier('MID');
    else setTier('HIGH');
  }, []);

  return tier;
}
