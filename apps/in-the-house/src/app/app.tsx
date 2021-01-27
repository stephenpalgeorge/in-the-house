import './app.scss';
import * as React from 'react';
import { Navbar, NavbarProps, Stack } from '@in-the-house/ui';
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
          <Stack>
            <h1>In the House</h1>
            <p className="font-size--large font-weight--light">
              The In The House API defines a series of endpoints for accessing data 
              on UK Members of Parliament. If you’re building something that needs 
              political data for the UK, the In The House API has you covered.
            </p>
            <p className="font-size--large font-weight--light">
              All our data comes from publicly available, government resources, which 
              we have collated and into one developer-friendly API with consistent 
              request and response structures.
            </p>
          </Stack>
        </main>
      </div>
    </Router>
  );
};

export default App;
