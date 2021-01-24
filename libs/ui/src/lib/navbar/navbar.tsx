import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Block } from '../block/block';

export interface ILink {
  path: string,
  label: string,
  color?: 'light'|'dark'|'accent-bright'|'accent-muted',
}

export interface NavbarProps {
  menu: ILink[],
  actions?: ILink[],  
}

export function Navbar(props: NavbarProps) {
  const { actions, menu } = props;
  const location = useLocation();
  const navBarRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const menuIconRef = React.useRef(null);

  const toggleMenu = () => {
    navBarRef.current.classList.toggle('open');
    menuRef.current.classList.toggle('open');
    menuIconRef.current.classList.toggle('open');
  }

  return (
    <nav ref={ navBarRef } className="navbar">
      <Block contents="narrow">
        <ul ref={ menuRef } className="menu">
          {
            (menu.length > 0) &&
            menu.map((item, i) => {
              return <li className={location.pathname === item.path ? 'active' : ''} key={i}>
                <Link to={item.path}>{ item.label }</Link>
              </li>
            })
          }
        </ul>
        <ul className="actions">
          <li ref={ menuIconRef } id="menu-icon" onClick={ toggleMenu }>
            <div className="icon-bar" id="icon-bar--top"></div>
            <div className="icon-bar" id="icon-bar--middle"></div>
            <div className="icon-bar" id="icon-bar--bottom"></div>
          </li>
          {
            (actions && actions.length > 0 && actions.length < 3) &&
            actions.map((action, i) => <li className={`action ${'background-color--' + action.color || ''}`} key={i}><Link to={action.path}>{ action.label }</Link></li>)
          }
        </ul>
      </Block>
    </nav>
  );
}

export default Navbar;
