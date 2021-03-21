import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AuthContext } from '../contexts/auth.context';

interface LocationState {
  destination: string,
}

interface LogoutPageProps {
  redirect?: string,
}

export function LogoutPage({ redirect = '/' }: LogoutPageProps) {
  const history = useHistory();
  const location = useLocation<LocationState>();
  if (location.state && location.state.destination) redirect = location.state.destination;
  const authContext = React.useContext(AuthContext);

  const handleLogout = async (url) => {
    // clear auth context values
    authContext.setAccessToken('');
    authContext.setUser({});
    authContext.setUserId('');
    // hit the API /logout endpoint (which will remove the cookie)
    await window.fetch('/auth/logout', {
      method: 'POST'
    });
    // redirect to '/${redirect}' home
    history.push(url);
  }

  React.useEffect(() => {
    handleLogout(redirect);
  }, []);

  return (
    <Helmet>
      <title>Logout - In the House</title>
      <meta name="description" content="unsetting state variables, removing cookies..." />
      <meta name="robots" content="noindex" />
    </Helmet>
  );
}