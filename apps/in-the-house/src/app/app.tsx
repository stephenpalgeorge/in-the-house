import './app.scss';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Navbar, NavbarProps } from '@in-the-house/ui';
import { LandingPage } from './pages/LandingPage';

export const App = () => {
  const navItems: NavbarProps = {
    menu: [
      { path: '/', label: 'Home' },
      { path: '/demo', label: 'Demo' },
      { path: '/docs', label: 'Docs' }
    ],
    actions: [
      { path: '/signup', label: 'Sign up', color: 'accent-bright' },
      { path: '/login', label: 'Login', color: 'accent-muted' },
    ]
  }

  return (
    <Router>
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
    </Router>
  );
};

export default App;
