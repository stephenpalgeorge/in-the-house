import './app.scss';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthContext } from './contexts/auth.context';
import { ModalsContext } from './contexts/modals.context';
import { Modals } from '@in-the-house/ui';

import {
  BuildingPage,
  DashboardPage,
  LandingPage,
  LoginPage,
  LogoutPage,
  NotFound
} from './pages';

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

        <Route path="/docs">
          <BuildingPage />
        </Route>

        <Route path="/demo">
          <BuildingPage />
        </Route>

        <Route path="/" exact>
          <LandingPage version="beta 0.0.1" />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
