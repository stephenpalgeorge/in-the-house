import React from 'react';

import './block.scss';

/* eslint-disable-next-line */
export interface BlockProps {
  contents?: 'full-width'|'narrow'|'very-narrow',
}

export function Block({ contents = 'full-width'}: BlockProps) {
  return (
    <div>
      <h1>Welcome to block!</h1>
    </div>
  );
}

export default Block;
