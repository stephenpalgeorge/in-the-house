import * as React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { BasicPage, Stack } from '@in-the-house/ui';
import { authNav, defaultNav } from '../config/nav-items';
import { AuthContext } from '../contexts/auth.context';

export function RoadMapPage() {
  const location = useLocation();
  const authContext = React.useContext(AuthContext);
  const navItems = authContext.userId && authContext.userId.length > 0 ? authNav : defaultNav(location.pathname);

  return (
    <BasicPage navItems={navItems} pageName="not-found" contentsWidth="full-width">
      <Helmet>
        <title>Roadmap - In the House</title>
        <meta property="og:title" content="Roadmap - In the House" />
        <meta name="twitter:title" content="Roadmap - In the House" />
        <meta name="description" content="An outline an explanation of what's coming up for 'In the House' - the features, data and capabilities we're going to add to the API." />
        <meta property="og:description" content="An outline an explanation of what's coming up for 'In the House' - the features, data and capabilities we're going to add to the API." />
        <meta name="twitter:description" content="An outline an explanation of what's coming up for 'In the House' - the features, data and capabilities we're going to add to the API." />
      </Helmet>
      <div className="contents contents--narrow">
        <Stack>
          <h1>Road map</h1>
          <p className="font-family--sans-serif font-size--large font-weight--light">
            Below is a brief summary of what's coming up in the life of the 'In the House' API. We've got plans to
            add features, add datapoints and add too the purpose of our product. If there are things that you'd like to
            see, or ideas you have about what we're doing, <a href="mailto:support@inthehouse.dev">we'd love to hear them</a>.
          </p>
        </Stack>
      </div>
    </BasicPage>
  );
}
