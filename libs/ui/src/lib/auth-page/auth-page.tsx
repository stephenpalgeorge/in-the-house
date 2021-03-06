import React from 'react';
import { Footer } from '../footer/footer';
import { Navbar, NavbarProps } from '../navbar/navbar';

export interface AuthPageProps {
  children: React.ReactNode | React.ReactNode[],
  contentsWidth?: 'full-width' | 'narrow' | 'very-narrow',
  navItems: NavbarProps,
}

export function AuthPage({ children, contentsWidth = 'narrow', navItems }: AuthPageProps) {
  return (
    <React.Fragment>
      <header>
        <Navbar {...navItems} />
      </header>

      <main className={`page auth-page contents contents--${contentsWidth}`}>
        {children}
      </main>

      <Footer />
    </React.Fragment>
  );
}

export default AuthPage;
