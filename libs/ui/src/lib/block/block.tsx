import React from 'react';

export interface BlockProps {
  contents?: 'full-width'|'narrow'|'very-narrow',
  children: React.ReactNode[],
  padding?: 'padding--base'|'padding--none'|'padding--large',
}

export function Block({ contents = 'full-width', children, padding = 'padding--base' }: BlockProps) {
  return (
    <section className={`block ${padding}`}>
      <div className={`contents contents--${contents}`}>
        { children }
      </div>
    </section>
  );
}

export default Block;
