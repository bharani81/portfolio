// ── Shared TypeScript interfaces for all data models ──────────────────────────

export interface Social {
  github: string;
  linkedin: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface Education {
  degree: string;
  college: string;
  cgpa: string;
  year: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  resumeUrl: string;
  education: Education;
  stats: Stat[];
  socials: Social;
}

// ── Experience ─────────────────────────────────────────────────────────────────

export interface ImpactMetric {
  metric: string;
  value: string;
  icon: string;
  color: 'brand' | 'purple' | 'amber';
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  impact: ImpactMetric[];
  tech: string[];
}

// ── Projects ───────────────────────────────────────────────────────────────────

export interface Challenge {
  title: string;
  how: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  challenges: Challenge[];
  architecture: string[];
  scalingDecisions: string[];
  futureImprovements: string[];
  impact: string;
}

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  category: string;
  caseStudy: CaseStudy;
}

// ── Skills ─────────────────────────────────────────────────────────────────────

export interface SkillItem {
  name: string;
  level: number;
  years: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  color: 'brand' | 'purple' | 'amber';
  items: SkillItem[];
}

// ── Proof of Work ──────────────────────────────────────────────────────────────

export interface ProofHighlight {
  label: string;
  value: string;
  detail: string;
}

export interface ContributionWeek {
  week: number;
  count: number;
}

export interface ProofOfWork {
  highlights: ProofHighlight[];
  contributions: ContributionWeek[];
  technologies: string[];
}

// ── Performance Tier ───────────────────────────────────────────────────────────
export type PerformanceTier = 'LOW' | 'MID' | 'HIGH';
