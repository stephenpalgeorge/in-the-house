import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ActionsProps, Actions, BasicPage, NavbarProps, Stack } from '@in-the-house/ui';

import { defaultNav } from '../config/nav-items';
import { signUp } from '../fetch';

export function LandingPage() {
  const location = useLocation();

  const landingPageActions: ActionsProps = {
    actions: [
      { label: 'Create my account', path: `${location.pathname}?signup`, color: 'accent-bright' },
      { label: 'Find out more', path: '/demo', color: 'dark' },
    ],
  }

  const handleSignup = async (email: string, password: string, username: string) => {
    const response = await signUp(email, password, username);
    if (response.status === 'error') {
      // handle errors
    } else {
      // navigate to login page (with success message)
    }
  }
  return (
    <BasicPage handleSignup={handleSignup} navItems={defaultNav}>
      <Stack>
        <h1>In the House</h1>
        <p className="font-size--large font-weight--light">
          The In The House API defines a series of endpoints for accessing data 
          on UK Members of Parliament. If you’re building something that needs 
          political data for the UK, the In The House API has you covered.
        </p>
        <p className="font-size--large font-weight--light">
          All our data comes from publicly available, government resources, which 
          we have collated and into one developer-friendly API with consistent 
          request and response structures.
        </p>
        <Actions {...landingPageActions} />
      </Stack>
    </BasicPage>
  );
}