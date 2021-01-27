import './app.scss';
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
      <div className="app">
        <header>
          <Navbar { ...navItems } />
        </header>
        <main className="page contents contents--narrow">
          <h1>In the House</h1>
        </main>
      </div>
    </Router>
  );
};

export default App;
