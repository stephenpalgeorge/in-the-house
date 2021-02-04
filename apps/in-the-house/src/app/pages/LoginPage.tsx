import * as React from 'react';
import { BasicPage, LoginForm } from '@in-the-house/ui';

import { menuNav } from '../config/nav-items';
import { login } from '../fetch';

export function LoginPage() {
  const handleLogin = async (password: string, username: string) => {
    const response = await login(password, username);
    if (response.status === 'error') {
      // handtle error
    } else {
      // success -> navigate to dashboard page
    }
  }
  return (
    <BasicPage navItems={menuNav}>
      <LoginForm submit={handleLogin} />
    </BasicPage>
  )
}
