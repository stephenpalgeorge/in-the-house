import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ILink } from '../navbar/navbar';

export interface SubNavProps {
  navItems: ILink[],
}

export function SubNav({ navItems }: SubNavProps) {
  const location = useLocation();
  return (
    <nav className="sub-nav">
      {
        navItems.map(item => {
          const pattern = new RegExp(location.pathname);
          const active = pattern.test(item.path) ? 'active' : null;
          return <Link key={item.label} to={item.path} className={active}>{item.label}</Link>
        })
      }
    </nav>
  );
}

export default SubNav;
