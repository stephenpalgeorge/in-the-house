import React from 'react';

export interface StackProps {
  children?: React.ReactNode|React.ReactNode[],
  recursive?: boolean,
  size?: 'small'|'large',
}

export function Stack({ children, recursive = false, size = 'small' }: StackProps) {
  const classes = [
    'stack',
    `stack--${size}`,
    recursive ? 'stack--recursive' : null,
  ];
  return (
    <section className={classes.join(' ')}>
      { children }
    </section>
  );
}
