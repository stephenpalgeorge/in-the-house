import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

export interface ILink {
  path: string,
  label: string,
}

export interface NavbarProps {
  menu: ILink[],
  actions?: ILink[],  
}

export function Navbar(props: NavbarProps) {
  const { actions, menu } = props;
  return (
    <nav className="navbar">
      <ul className="menu">
        {
          (menu.length > 0) &&
          menu.map((item, i) => <li key={i}><Link to={item.path}>{ item.label }</Link></li>)
        }
      </ul>
      {
        (actions && actions.length > 0 && actions.length < 3) &&
        <ul className="actions">
          { actions.map((action, i) => <li key={i}><Link to={action.path}>{ action.label }</Link></li>) }
        </ul>
      }
    </nav>
  );
}

export default Navbar;
