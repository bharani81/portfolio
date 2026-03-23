import { z } from 'zod';

const SkillItemSchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
  years: z.number(),
});

export const SkillCategorySchema = z.object({
  category: z.string(),
  icon: z.string(),
  description: z.string(),
  color: z.enum(['brand', 'purple', 'amber']),
  items: z.array(SkillItemSchema),
});
