import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { BasicPage } from '@in-the-house/ui';
import { defaultNav } from '../config/nav-items';
import { signUp } from '../fetch';
import { ModalsContext } from '../contexts/modals.context';

export interface GoodbyePageProps {
  version?: 'production' | 'beta',
}

export function GoodbyePage({ version }: GoodbyePageProps) {
  const modalsContext = React.useContext(ModalsContext);
  const history = useHistory();
  const location = useLocation();
  const navItems = defaultNav(location.pathname);

  const handleSignup = async (email: string, password: string, username: string) => {
    const response = await signUp(email, password, username);
    if (response.status === 'error') {
      // handle errors
      modalsContext.addModal({
        name: 'Signup error',
        code: 400,
        type: 'error',
        message: response.data,
        isDismissible: true,
      });
    } else {
      // navigate to login page (with success message)
      modalsContext.addModal({
        name: 'Account Created!',
        code: 200,
        type: 'success',
        message: 'Successfully created your account, now you can login:',
        isDismissible: true,
      });
      history.push('/login');
    }
  }
  return (
    <BasicPage navItems={navItems} pageName="not-found" contentsWidth="narrow" version={version} handleSignup={handleSignup}>
      <Helmet>
        <title>Goodbye - In the House</title>
        <meta property="og:title" content="Goodbye - In the House" />
        <meta name="twitter:title" content="Goodbye - In the House" />
        <meta name="description" content="Sorry to see you go." />
        <meta property="og:description" content="Sorry to see you go." />
        <meta name="twitter:description" content="Sorry to see you go." />
      </Helmet>
      <div className="contents contents--narrow">
        <h1>Goodbye!</h1>
        <p className="font-family--sans-serif font-size--large font-weight--light">
          Your account has successfully been deleted. We're sorry to see you go, but we hope you got what you
          needed from the In the House API.
        </p>
      </div>
    </BasicPage>
  );
}
