import React from 'react';
import { useLocation } from 'react-router-dom';

import { Icon } from '../icons-row/icons-row';
import { Navbar, NavbarProps } from '../navbar/navbar';
import { RequestAccessForm } from '../request-access-form/request-access-form';
import { SignupForm } from '../signup-form/signup-form';

export interface BasicPageProps {
  children: React.ReactNode|React.ReactNode[],
  contentsWidth?: 'full-width'|'narrow'|'very-narrow',
  handleSignup?(email: string, password: string, username: string): any,
  navItems: NavbarProps,
  pageName?: string,
  version?: 'beta'|'production',
  formIcons?: Icon[],
}

export function BasicPage({
  children,
  contentsWidth = 'narrow',
  handleSignup,
  navItems,
  pageName = '',
  version = 'production',
  formIcons = [],
}: BasicPageProps) {
  const location = useLocation();
  return (
    <React.Fragment>
      <header>
        <Navbar { ...navItems } />
      </header>
      <main className={`page contents contents--${contentsWidth} ${pageName !== '' ? `page--${pageName}` : ''}`}>
        {
          (version === 'production' && /signup/.test(location.search) && handleSignup) &&
          <SignupForm submit={handleSignup} />
        }
        {
          (version === 'beta' && /signup/.test(location.search)) &&
          <RequestAccessForm icons={formIcons} />
        }
        {children}
      </main>
    </React.Fragment>
  );
}

export default BasicPage;
