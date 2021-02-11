import * as React from 'react';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';

import { AuthPage, Card, Stack, SubNav } from '@in-the-house/ui';

import { authNav, dashboardSubNav } from '../config/nav-items';
import { AuthContext } from '../contexts/auth.context';
import { ModalsContext } from '../contexts/modals.context';
import { fetchUser } from '../fetch';

import { Account } from './dashboard-sections/account';

interface DashboardParams {
  userId: string,
}

export function DashboardPage() {
  const history = useHistory();
  const params = useParams<DashboardParams>();
  const navItems = dashboardSubNav(`/dashboard/${params.userId}`);

  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [user, setUser] = React.useState({ username: '' });
  console.log(user);
  
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
      <Stack>
        {
          (user.username && user.username.length > 0) &&
          <h1>Welcome, {user.username}</h1>
        }
        <p className="font-size--large font-weight--light">
          This is your dashboard, from whence you can control and edit your account. Use 
          the menu below to view and update the different areas of your profile including your 
          personal details, your API keys and billing information.
        </p>

        <SubNav navItems={navItems} />
        <Switch>
          <Route path={`/dashboard/${params.userId}/account`}>
            <Card themeColor="grey">
              <Account />
            </Card>
          </Route>
        </Switch>
      </Stack>
    </AuthPage>
  );
}
