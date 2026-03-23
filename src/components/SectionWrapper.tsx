import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Consistent section wrapper: full-width outer <section> for bg effects,
 * constrained inner container (max-w-6xl) for content.
 */
export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-20 ${className}`}>
      <div className="w-full max-w-6xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
