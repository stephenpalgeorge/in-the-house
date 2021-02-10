import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IUser } from '@in-the-house/api-interfaces';
import { AuthPage } from '@in-the-house/ui';

import { authNav } from '../config/nav-items';
import { AuthContext } from '../contexts/auth.context';
import { ModalsContext } from '../contexts/modals.context';
import { fetchUser } from '../fetch';

interface DashboardParams {
  userId: string,
}

export function DashboardPage() {
  const history = useHistory();
  const params = useParams<DashboardParams>();
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [user, setUser] = React.useState({ username: '' });
  
  React.useEffect(() => {
    const authenticateUser = async (id: string, accessToken: string) => {
      const authResponse = await fetchUser(id, accessToken);
      if (authResponse.status === 'error') {
        // handle error -> redirect to login page with modal
        modalsContext.addModal({
          name: 'Authentication Error',
          code: 401,
          type: 'warning',
          message: 'Your session has expired, please log in again',
          isDismissible: true,
        });
        history.push({ pathname: '/logout', state: {destination: '/login'} });
      } else {
        // handle success -> set authContext values
        if (authResponse.data.accessToken) authContext.setAccessToken(authResponse.data.accessToken);
        if (authResponse.data.user._id) authContext.setUserId(authResponse.data.user._id);
        setUser(authResponse.data.user);
      }
    }
    
    authenticateUser(params.userId, authContext.accessToken);
  }, [params.userId, authContext.accessToken]);

  return (
    <AuthPage navItems={authNav}>
        <h1>Welcome, {user.username}</h1>
    </AuthPage>
  );
}
