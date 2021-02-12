import React from 'react';

export interface StackProps {
  background?: string,
  children?: React.ReactNode|React.ReactNode[],
  recursive?: boolean,
  size?: 'small'|'large',
}

export function Stack({ background, children, recursive = false, size = 'small' }: StackProps) {
  const classes = [
    'stack',
    `stack--${size}`,
    recursive ? 'stack--recursive' : null,
    background ? `background-color--${background}` : null,
  ];
  return (
    <section className={classes.join(' ')}>
      { children }
    </section>
  );
}
