import React from 'react';
import { Navbar, NavbarProps } from '../navbar/navbar';
import { SignupForm } from '../signup-form/signup-form';

// import './basic-page.module.scss';

/* eslint-disable-next-line */
export interface BasicPageProps {
  children: React.ReactNode|React.ReactNode[],
  contentsWidth?: 'full-width'|'narrow'|'very-narrow',
  handleSignup?(email: string, password: string, username: string): any,
  navItems: NavbarProps,
}

export function BasicPage({ children, contentsWidth = 'narrow', handleSignup, navItems }: BasicPageProps) {
  return (
    <React.Fragment>
      <header>
        <Navbar { ...navItems } />
      </header>
      <main className={`page contents contents--${contentsWidth}`}>
        {
          (/signup/.test(location.search) && handleSignup) &&
          <SignupForm submit={handleSignup} />
        }
        {children}
      </main>
    </React.Fragment>
  );
}

export default BasicPage;
