import React from 'react';

import './block.scss';

/* eslint-disable-next-line */
export interface BlockProps {
  contents?: 'full-width'|'narrow'|'very-narrow',
  children: React.ReactNode[]
}

export function Block({ contents = 'full-width', children }: BlockProps) {
  return (
    <section className="block">
      <div className={`contents contents--${contents}`}>
        { children }
      </div>
    </section>
  );
}

export default Block;
