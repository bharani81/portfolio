import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Consistent section wrapper: full-width outer <section> for bg effects,
 * constrained inner container (max-w-7xl) for content — matches Navbar.
 */
export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${className}`}
      style={{ paddingTop: '6rem', paddingBottom: '6rem' }}  /* 96px = 8px × 12 */
    >
      <div className="layout-container">
        {children}
      </div>
    </section>
  );
}
