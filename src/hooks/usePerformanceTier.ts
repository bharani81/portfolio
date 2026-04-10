import { useState } from 'react';
import type { PerformanceTier } from '@types_/index';

function computeTier(): PerformanceTier {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'LOW';
  const cores = navigator.hardwareConcurrency ?? 4;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const memory: number = nav.deviceMemory ?? 8;
  if (cores < 4 || memory < 4) return 'LOW';
  if (cores < 8 || memory < 8) return 'MID';
  return 'HIGH';
}

export function usePerformanceTier(): PerformanceTier {
  const [tier] = useState<PerformanceTier>(computeTier);
  return tier;
}
