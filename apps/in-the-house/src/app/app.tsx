import './app.scss';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthContext } from './contexts/auth.context';

import { DashboardPage } from './pages/dashboard.page';
import { LandingPage } from './pages/landing.page';
import { LoginPage } from './pages/login.page';
import { LogoutPage } from './pages/logout.page';
import { ModalsContext } from './contexts/modals.context';

import { Modals } from '@in-the-house/ui';

export const App = () => {
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);
  return (
    <div className="app">
      <Modals modals={modalsContext.modals} closeModal={modalsContext.deleteModal} />
      <Switch>
        <Route path="/dashboard/:userId">
          <DashboardPage user={authContext.user} />
        </Route>
        
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/logout">
          <LogoutPage />
        </Route>

        <Route path="/">
          <LandingPage version="beta 0.0.1" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
