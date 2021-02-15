import React from 'react';

export interface StackProps {
  background?: string,
  children?: React.ReactNode|React.ReactNode[],
  recursive?: boolean,
  sectionName?: string,
  size?: 'small'|'large',
}

export function Stack({ background, children, recursive = false, sectionName = '', size = 'small' }: StackProps) {
  console.log(sectionName);
  const classes = [
    'stack',
    `stack--${size}`,
    recursive ? 'stack--recursive' : null,
    background ? `background-color--${background}` : null,
    sectionName ? `section--${sectionName}` : null,
  ];
  return (
    <section className={classes.join(' ')}>
      { children }
    </section>
  );
}
