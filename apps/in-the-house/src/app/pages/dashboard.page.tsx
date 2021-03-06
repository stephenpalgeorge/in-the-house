import * as React from 'react';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { AuthPage, Card, Stack, SubNav } from '@in-the-house/ui';
import { IUser } from '@in-the-house/api-interfaces';

import BigBen from '../assets/big-ben.svg';
import { authNav, dashboardSubNav } from '../config/nav-items';
import { AuthContext } from '../contexts/auth.context';
import { ModalsContext } from '../contexts/modals.context';
import { fetchFromUser } from '../fetch';

import { Account, Billing, Keys, Usage } from './dashboard-sections';

interface DashboardPageProps {
  user: IUser,
}

interface DashboardParams {
  userId: string,
}

export const DashboardPage = React.memo(({ user }: DashboardPageProps) => {
  const history = useHistory();
  const params = useParams<DashboardParams>();
  const navItems = dashboardSubNav(`/dashboard/${params.userId}`);

  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  React.useEffect(() => {
    const authenticateUser = async (id: string, accessToken: string) => {
      if (!id || id.length === 0) return;
      const authResponse = await fetchFromUser(accessToken, `/auth/user/${id}`);
      if (authResponse.status === 'error') {
        // handle error -> redirect to login page with modal
        modalsContext.addModal({
          name: 'Authentication Error',
          code: 401,
          type: 'warning',
          message: 'Your session has expired, please log in again',
          isDismissible: true,
        });
        history.push({ pathname: '/logout', state: { destination: '/login' } });
      } else {
        // handle success -> set authContext values
        if (authResponse.data.accessToken) authContext.setAccessToken(authResponse.data.accessToken);
        if (authResponse.data.user) {
          authContext.setUser(authResponse.data.user);
          authContext.setUserId(authResponse.data.user._id);
          if (!authResponse.data.user.verified) {
            modalsContext.addModal({
              name: 'Verification warning',
              type: 'warning',
              message: 'Your account isn\'t verified yet. Click the link in the email you got from us, or, if you need a new link, go to https://inthehouse.dev/verify',
              isDismissible: false,
            });
          }
        }
      }
    }

    authenticateUser(params.userId, authContext.accessToken);
  }, [params.userId]);

  return (
    <AuthPage navItems={authNav}>
      <Helmet>
        {
          (user.username && user.username.length > 0) ?
            <title>Dashboard: {user.username} - In the House</title> :
            <title>Dashboard - In the House</title>
        }
        <meta name="description" content="Control your account. Update your details, monitor your usage and manage your API keys." />
        <meta property="og:description" content="Control your account. Update your details, monitor your usage and manage your API keys." />
        <meta name="twitter:description" content="Control your account. Update your details, monitor your usage and manage your API keys." />
      </Helmet>
      <Stack>
        {
          (user.username && user.username.length > 0) &&
          <h1>
            <img src={BigBen} alt="an line drawing of the Big Ben tower" />
            Hi, {user.firstname && user.firstname.length > 0 ? user.firstname : user.username}
          </h1>
        }
        <p className="font-size--large font-weight--light">
          This is your dashboard, from whence you can control and edit your account. Use
          the menu below to view and update the different areas of your profile including your
          personal details, your API keys and billing information.
        </p>

        <SubNav navItems={navItems} />
        <Switch>
          <Route path={`/dashboard/${params.userId}/account`}>
            <Card themeColor="light">
              <Account
                accountType={user.account_type}
                email={user.email}
                firstName={user.firstname}
                lastName={user.lastname}
                username={user.username}
                notifications={user.notifications}
              />
            </Card>
          </Route>

          <Route path={`/dashboard/${params.userId}/usage`}>
            <Card themeColor="grey">
              <Usage count={user.usage_count} usage={user.usage} accountType={user.account_type} />
            </Card>
          </Route>

          <Route path={`/dashboard/${params.userId}/keys`}>
            <Card themeColor="light">
              <Keys />
            </Card>
          </Route>

          <Route path={`/dashboard/${params.userId}/billing`}>
            <Card themeColor="grey">
              <Billing />
            </Card>
          </Route>
        </Switch>
      </Stack>
    </AuthPage>
  );
});
