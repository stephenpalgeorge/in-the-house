import React from 'react';
import { Link } from 'react-router-dom';

import { Icon, IconsRow } from '../icons-row/icons-row';
import MessageIcon from '../../../../../apps/in-the-house/src/app/assets/message.svg';
import TwitterIcon from '../../../../../apps/in-the-house/src/app/assets/twitter.svg';

export function Footer() {
  const footerIcons: Icon[] = [
    { path: MessageIcon, name: 'message', size: 'sm', url: 'mailto:hello@inthehouse.dev' },
    { path: TwitterIcon, name: 'twitter', size: 'sm', url: 'https://twitter.com/house_api', external: true },
  ];

  const footerMenu = [
    { path: '/login', label: 'login', external: false },
    { path: 'https://twitter.com/StephennGeorge', label: 'developer', external: true },
    { path: '/roadmap', label: 'road map', external: false },
  ];

  return (
    <footer>
      <div className="footer-contents contents contents--narrow">
        <section className="footer-left">
          <IconsRow icons={footerIcons} />
        </section>

        <section className="footer-right">
          <ul className="footer-menu">
            {
              footerMenu.map((link, i) => {
                if (link.external) return <li key={i}><a href={link.path} target="_blank" rel="noopenner noreferrer">{link.label}</a></li>
                else return <li key={i}><Link to={link.path}>{link.label}</Link></li>
              })
            }
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
