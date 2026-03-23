import { z } from 'zod';

export const StatSchema = z.object({
  label: z.string(),
  value: z.string(),
  suffix: z.string(),
});

export const EducationSchema = z.object({
  degree: z.string(),
  college: z.string(),
  cgpa: z.string(),
  year: z.string(),
});

export const SocialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  bio: z.string(),
  location: z.string(),
  email: z.string().email(),
  resumeUrl: z.string(),
  education: EducationSchema,
  stats: z.array(StatSchema),
  socials: SocialSchema,
});
