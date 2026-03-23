import { z } from 'zod';

export const ImpactMetricSchema = z.object({
  metric: z.string(),
  value: z.string(),
  icon: z.string(),
  color: z.enum(['brand', 'purple', 'amber']),
});

export const ExperienceSchema = z.object({
  id: z.number(),
  company: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  type: z.string(),
  highlights: z.array(z.string()),
  impact: z.array(ImpactMetricSchema),
  tech: z.array(z.string()),
});
