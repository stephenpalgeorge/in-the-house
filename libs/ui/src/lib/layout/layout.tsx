import React from 'react';

// ----------
// STACK
// ----------
export interface StackProps {
  background?: string,
  children?: React.ReactNode | React.ReactNode[],
  recursive?: boolean,
  sectionName?: string,
  size?: 'small' | 'large',
}

export function Stack({ background, children, recursive = false, sectionName = '', size = 'small' }: StackProps) {
  const classes = [
    'stack',
    `stack--${size}`,
  ];
  if (recursive) classes.push('stack--recursive');
  if (background) classes.push(`background-color--${background}`);
  if (sectionName) classes.push(`section--${sectionName}`);
  return (
    <section className={classes.join(' ')}>
      { children}
    </section>
  );
}

// ----------
// BLOCK
// ----------
export interface BlockProps {
  contents?: 'full-width' | 'narrow' | 'very-narrow',
  children: React.ReactNode | React.ReactNode[],
  padding?: 'padding--base' | 'padding--none' | 'padding--large',
}

export function Block({ contents = 'full-width', children, padding = 'padding--base' }: BlockProps) {
  return (
    <section className={`block ${padding}`}>
      <div className={`contents contents--${contents}`}>
        {children}
      </div>
    </section>
  );
}
