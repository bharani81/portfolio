import { useMemo } from 'react';
import { z } from 'zod';
import { ProfileSchema } from '@schemas/profile.schema';
import { ExperienceSchema } from '@schemas/experience.schema';
import { ProjectSchema } from '@schemas/projects.schema';
import { SkillCategorySchema } from '@schemas/skills.schema';

import rawProfile from '@data/profile.json';
import rawExperience from '@data/experience.json';
import rawProjects from '@data/projects.json';
import rawSkills from '@data/skills.json';
import rawProofOfWork from '@data/proofOfWork.json';

import type { Profile, Experience, Project, SkillCategory, ProofOfWork } from '@types_/index';

const ProofOfWorkSchema = z.object({
  highlights: z.array(z.object({ label: z.string(), value: z.string(), detail: z.string() })),
  contributions: z.array(z.object({ week: z.number(), count: z.number() })),
  technologies: z.array(z.string()),
});

export function usePortfolioData() {
  return useMemo(() => {
    const profile: Profile     = ProfileSchema.parse(rawProfile);
    const experience: Experience[] = z.array(ExperienceSchema).parse(rawExperience);
    const projects: Project[]      = z.array(ProjectSchema).parse(rawProjects);
    const skills: SkillCategory[]  = z.array(SkillCategorySchema).parse(rawSkills);
    const proofOfWork: ProofOfWork = ProofOfWorkSchema.parse(rawProofOfWork);

    return { profile, experience, projects, skills, proofOfWork };
  }, []);
}
