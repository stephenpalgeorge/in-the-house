import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface ILink {
  path: string,
  label: string,
  color?: 'light'|'dark'|'accent-bright'|'accent-muted',
}

export interface NavbarProps {
  // items for the main "menu" of the navigation:
  menu: ILink[],
  // the navigation could feature some more prominent
  // call-to-action items that should be separated from
  // the main menu content:
  actions?: ILink[],  
}

export function Navbar(props: NavbarProps) {
  const { actions, menu } = props;
  const location = useLocation();
  // get components necessary for toggling the nav
  // on smaller breakpoints:
  const navBarRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const menuIconRef = React.useRef(null);

  // toggleMenu function simply controls the classes
  // of the relevant DOM elements. The 'toggle' itself
  // happens in the adjacent SCSS file:
  const toggleMenu = () => {
    navBarRef.current.classList.toggle('open');
    menuRef.current.classList.toggle('open');
    menuIconRef.current.classList.toggle('open');
  }

  return (
    <nav ref={ navBarRef } className="navbar contents contents--narrow">
      {/* MENU */}
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
      {/* ACTIONS */}
      <ul className="actions">
        {/* even if there are no actions, we include the menu toggle button */}
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
    </nav>
  );
}

export default Navbar;
