import * as React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { BasicPage } from '@in-the-house/ui';
import { defaultNav } from '../config/nav-items';

export interface BuildingPageProps {
  children?: React.ReactNode | React.ReactNode[]
}

export function BuildingPage({ children }: BuildingPageProps) {
  const location = useLocation();
  const navItems = defaultNav(location.pathname);

  return (
    <BasicPage navItems={navItems} pageName="building" contentsWidth="full-width">
      <Helmet>
        <title>Under Construction - In the House</title>
        <meta property="og:title" content="Under Construction - In the House" />
        <meta name="twitter:title" content="Under Construction - In the House" />
        <meta name="description" content="This page is under construction - we're working on it!" />
        <meta property="og:description" content="This page is under construction - we're working on it!" />
        <meta name="twitter:description" content="This page is under construction - we're working on it!" />
      </Helmet>
      <div className="contents contents--narrow">
        <h1>Under Construction.</h1>
        <p className="font-family--sans-serif font-size--large font-weight--light">
          This page is coming soon! We're working on it, thanks for your patience.
        </p>
        {children}
      </div>
    </BasicPage>
  );
}
