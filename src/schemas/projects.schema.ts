import { z } from 'zod';

const ChallengeSchema = z.object({
  title: z.string(),
  how: z.string(),
});

const CaseStudySchema = z.object({
  problem: z.string(),
  solution: z.string(),
  challenges: z.array(ChallengeSchema),
  architecture: z.array(z.string()),
  scalingDecisions: z.array(z.string()),
  futureImprovements: z.array(z.string()),
  impact: z.string(),
});

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  github: z.string().url().nullable(),
  live: z.string().url().nullable(),
  featured: z.boolean(),
  category: z.string(),
  caseStudy: CaseStudySchema,
});
