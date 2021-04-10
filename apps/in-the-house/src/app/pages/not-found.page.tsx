import * as React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { BasicPage } from '@in-the-house/ui';
import { defaultNav } from '../config/nav-items';

export function NotFound() {
  const location = useLocation();
  const navItems = defaultNav(location.pathname);

  return (
    <BasicPage navItems={navItems} pageName="not-found" contentsWidth="full-width">
      <Helmet>
        <title>Not Found - In the House</title>
        <meta property="og:title" content="Under Construction - In the House" />
        <meta name="twitter:title" content="Under Construction - In the House" />
        <meta name="description" content="This page couldn't be found :(...sorry." />
        <meta property="og:description" content="This page couldn't be found :(...sorry." />
        <meta name="twitter:description" content="This page couldn't be found :(...sorry." />
      </Helmet>
      <div className="contents contents--narrow">
        <h1>404 - Not Found.</h1>
        <p className="font-family--sans-serif font-size--large font-weight--light">
          We couldn't find anything to show you for this url. Maybe check for typos in the address bar?
          If you think something should be here, <a href="mailto:support@inthehouse.dev" className="color--primary">let us know.</a>
        </p>
      </div>
    </BasicPage>
  );
}
