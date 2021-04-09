import './app.scss';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthContext } from './contexts/auth.context';
import { ModalsContext } from './contexts/modals.context';
import { Modals } from '@in-the-house/ui';
import { defaultNav, menuNav } from './config/nav-items';

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
          <BuildingPage navItems={menuNav}>
            <figure>
              <figcaption>Full docs will be coming soon. For now, here's an example of the kind of endpoints you can hit:</figcaption>
              <pre>
                <span>https://www.inthehouse.dev/api/v1/constituencies/single/north%20swindon</span>
                <span>https://www.inthehouse.dev/api/v1/search/single/boris+matt</span>
              </pre>
            </figure>
          </BuildingPage>
        </Route>

        <Route path="/demo">
          <BuildingPage navItems={menuNav}>
            <p style={{ marginTop: '1rem' }} className="font-family--sans-serif font-weight--light">
              This page will demo the <span className="font-weight--heavy color--primary font-family--serif">In the House API</span> with a small React application. The app
              will use the <a href="https://github.com/stephenpalgeorge/ith-ui-react" className="color--secondary--darkened">In the House UI - React Library</a>, a small set of components (still in development)
              that will make intergrating the API into your application as straightforward as possible.
              <br /><br />
              We're also working on similar libraries for Vue, Svelte and web-components.
            </p>
          </BuildingPage>
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
