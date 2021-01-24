import './app.module.scss';
import * as React from 'react';
import { Navbar, NavbarProps } from '@in-the-house/ui';
import { BrowserRouter as Router } from 'react-router-dom';

export const App = () => {
  const navItems: NavbarProps = {
    menu: [
      { path: '/', label: 'Home' },
      { path: '/demo', label: 'Demo' },
      { path: '/decs', label: 'Docs' }
    ],
    actions: [
      { path: '/signup', label: 'Sign up', color: 'accent-bright' },
      { path: '/login', label: 'Login', color: 'accent-muted' },
    ]
  }

  return (
    <Router>
      <main>
        <header>
          <Navbar { ...navItems } />
        </header>
        <h1>Welcome</h1>
      </main>
    </Router>
  );
};

export default App;
