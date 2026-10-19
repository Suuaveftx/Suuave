'use client';

import React from 'react';

/**
 * Responsive CTA button group — stacks vertically on mobile, aligns horizontally on sm+.
 * Use with HeroUI Button or CustomButton children for consistent spacing and touch targets.
 */
export default function CtaButtonGroup({
  children,
  className = '',
  align = 'stretch',
  direction = 'responsive',
}) {
  const alignClasses = {
    stretch: 'items-stretch sm:items-center',
    start: 'items-stretch sm:items-start',
    center: 'items-stretch sm:items-center',
    end: 'items-stretch sm:items-end',
  };

  const directionClasses = {
    responsive: 'flex-col sm:flex-row',
    column: 'flex-col',
    row: 'flex-row flex-wrap',
  };

  return (
    <div
      className={[
        'flex w-full min-w-0 gap-3 sm:gap-4',
        directionClasses[direction] || directionClasses.responsive,
        alignClasses[align] || alignClasses.stretch,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
