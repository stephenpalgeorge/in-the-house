import './app.scss';
import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { Navbar, NavbarProps } from '@in-the-house/ui';
import { LandingPage } from './pages/LandingPage';

export const App = () => {
  const location = useLocation();
  const navItems: NavbarProps = {
    menu: [
      { path: '/', label: 'Home' },
      { path: '/demo', label: 'Demo' },
      { path: '/docs', label: 'Docs' }
    ],
    actions: [
      { path: `${location.pathname}?signup`, label: 'Sign up', color: 'accent-bright' },
      { path: '/login', label: 'Login', color: 'accent-muted' },
    ]
  }

  return (
    <div className="app">
      <header>
        <Navbar { ...navItems } />
      </header>
      <Switch>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
