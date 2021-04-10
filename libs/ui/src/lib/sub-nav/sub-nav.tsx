import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ILink } from '../navbar/navbar';

export interface SubNavProps {
  navItems: ILink[],
}

export function SubNav({ navItems }: SubNavProps) {
  const location = useLocation();
  return (
    <nav className="sub-nav" aria-label="Secondary Navigation">
      <h2 className="visuallyhidden">Dashboard navigation</h2>
      {
        navItems.map(item => {
          const partials = item.path.split('/');
          const pattern = new RegExp(partials[partials.length - 1]);
          const active = pattern.test(location.pathname) ? 'active' : null;
          return <Link key={item.label} to={item.path} className={active} role="menuitem">{item.label}</Link>
        })
      }
    </nav>
  );
}

export default SubNav;
