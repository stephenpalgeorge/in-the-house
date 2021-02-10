import React from 'react';
import { Navbar, NavbarProps } from '../navbar/navbar';

export interface AuthPageProps {
  children: React.ReactNode|React.ReactNode[],
  contentsWidth?: 'full-width'|'narrow'|'very-narrow',
  navItems: NavbarProps,
}

export function AuthPage({ children, contentsWidth = 'narrow', navItems }: AuthPageProps) {
  return (
    <React.Fragment>
      <header>
        <Navbar {...navItems} />
      </header>

      <main className={`page contents contents--${contentsWidth}`}>
        {children}
      </main>
    </React.Fragment>
  );
}

export default AuthPage;
