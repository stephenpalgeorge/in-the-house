import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BasicPage, LoginForm } from '@in-the-house/ui';

import { menuNav } from '../config/nav-items';
import { AuthContext } from '../contexts/auth.context';
import { ModalsContext } from '../contexts/modals.context';
import { login } from '../fetch';

export function LoginPage() {
  const history = useHistory();
  const modalsContext = React.useContext(ModalsContext);
  const authContext = React.useContext(AuthContext);

  const handleLogin = async (password: string, username: string) => {
    const response = await login(password, username);
    if (response.status === 'error') {
      // handle error
      modalsContext.addModal({
        name: 'Login error',
        code: 401,
        type: 'error',
        message: response.message,
        isDismissible: true,
      });
    } else {
      // success -> navigate to dashboard page
      modalsContext.addModal({
        name: 'Logged in',
        code: 200,
        type: 'success',
        message: 'Successfully logged in, welcome to your account',
        isDismissible: true,
      });

      // set access token and user id to authcontext
      authContext.setUserId(response.userId);
      authContext.setAccessToken(response.accessToken);
      history.push(`/dashboard/${response.userId}`);
    }
  }
  return (
    <BasicPage navItems={menuNav} pageName="login" contentsWidth="full-width">
      <LoginForm submit={handleLogin} />
      <div className="contents contents--narrow">
        <h1>Buy this space.</h1>
        <p className="font-family--sans-serif font-size--large font-weight--light">
          This log-in page is pretty empty...wouldn't it be nice to fill 
          it with your brand, your message or your product? For a quote, and 
          to discuss your unique requirements, you can find us at <em>email</em>.
        </p>
      </div>
    </BasicPage>
  )
}
