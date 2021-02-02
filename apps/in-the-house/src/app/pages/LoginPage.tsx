import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { LoginForm, SignupForm } from '@in-the-house/ui';
import { signUp } from '../fetch';

export function LoginPage() {
  const location = useLocation();

  return (
    <main>
      {
        /signup/.test(location.search) &&
        <SignupForm submit={signUp} />
      }
      <LoginForm />
    </main>
  )
}
