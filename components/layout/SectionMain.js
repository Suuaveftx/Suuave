import React from 'react';
import { NAVBAR_OFFSET_CLASS } from './layoutConstants';

/**
 * Standard main content wrapper for section pages with a fixed navbar.
 * Centralizes navbar offset so page content starts at a consistent distance below the header.
 */
export default function SectionMain({
  children,
  className = '',
  withNavbarOffset = true,
  fontClass = 'font-satoshi',
}) {
  return (
    <main
      className={[
        'w-full min-w-0 overflow-x-hidden',
        fontClass,
        withNavbarOffset ? NAVBAR_OFFSET_CLASS : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </main>
  );
}
