import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ActionsProps, Actions, BasicPage, Icon, Stack } from '@in-the-house/ui';

import MessageIcon from '../assets/message.svg';
import TwitterIcon from '../assets/twitter.svg';
import { defaultNav } from '../config/nav-items';
import { signUp } from '../fetch';
import { ModalsContext } from '../contexts/modals.context';

export function LandingPage() {
  const location = useLocation();
  const history = useHistory();
  const modalsContext = React.useContext(ModalsContext);
  const navItems = defaultNav(location.pathname);

  const landingPageActions: ActionsProps = {
    actions: [
      { label: 'Create my account', path: `${location.pathname}?signup`, color: 'primary' },
      { label: 'Find out more', path: '/demo', color: 'dark' },
    ],
  }

  const BetaFormIcons: Icon[] = [
    // @todo - UPDATE URLs FOR PROD
    { path: MessageIcon, name: 'message', size: 'sm', url: 'https://twitter.com' },
    { path: TwitterIcon, name: 'twitter', size: 'sm', url: 'https://google.co.uk' },
  ];

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
    <BasicPage handleSignup={handleSignup} navItems={navItems} version="beta" formIcons={BetaFormIcons}>
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