import React from 'react';

export interface CardProps {
  children: React.ReactNode|React.ReactNode[],
  themeColor?: 'primary'|'secondary'|'grey'|'dark-grey'|'dark'|'light',
}

export function Card({ children, themeColor = 'dark-grey' }: CardProps) {
  return (
    <div className={`card card--theme-${themeColor}`}>
      { children }
    </div>
  );
}

export default Card;
