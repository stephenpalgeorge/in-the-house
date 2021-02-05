import './app.scss';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ModalsContext } from './contexts/modals.context';

import { Modals } from '@in-the-house/ui';

export const App = () => {
  const modalsContext = React.useContext(ModalsContext);
  return (
    <div className="app">
      <Modals modals={modalsContext.modals} closeModal={modalsContext.deleteModal} />
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
