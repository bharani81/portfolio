import { track } from '@vercel/analytics';

export const trackEvent = (name: string, props?: Record<string, string>) => {
  try {
    track(name, props);
  } catch {
    // Analytics not available (local dev) — silently ignore
    if (import.meta.env.DEV) {
      console.debug('[analytics]', name, props);
    }
  }
};
