import React from 'react';

export interface Icon {
  path: string,
  name: string,
  size: 'sm' | 'md' | 'lg',
  url?: string,
  external?: boolean,
}

export interface IconsRowProps {
  icons: Icon[]
}

export function IconsRow({ icons }: IconsRowProps) {
  return (
    <div className="icons-row">
      {
        icons.length > 0 &&
        icons.map(icon => {
          return icon.url ? (
            <a key={icon.name} href={icon.url} target={icon.external ? '_blank' : '_self'} rel="noopener noreferrer nofollow" className={`icons-row__icon icons-row__icon--${icon.size}`}>
              <img src={icon.path} id={`icon--${icon.name}`} alt={`${icon.name} icon`} />
            </a>
          ) : (
              <div key={icon.name} className={`icons-row__icon icons-row__icon--${icon.size}`}>
                <img src={icon.path} id={`icon--${icon.name}`} alt={`${icon.name} icon`} />
              </div>
            )
        })
      }
    </div>
  );
}

export default IconsRow;
