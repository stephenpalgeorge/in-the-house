import './app.scss';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  return (
    <div className="app">
      {/* RENDER ERRORS */}
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
