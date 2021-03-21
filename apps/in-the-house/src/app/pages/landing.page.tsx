import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ActionsProps, Actions, BasicPage, Icon, Stack } from '@in-the-house/ui';

import MessageIcon from '../assets/message.svg';
import TwitterIcon from '../assets/twitter.svg';
import BigBen from '../assets/big-ben.svg';
import { defaultNav } from '../config/nav-items';
import { signUp } from '../fetch';
import { AuthContext } from '../contexts/auth.context';
import { ModalsContext } from '../contexts/modals.context';

export interface LandingPageProps {
  version: string,
}

export function LandingPage({ version }: LandingPageProps) {
  const location = useLocation();
  const history = useHistory();
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);
  const navItems = defaultNav(location.pathname);

  React.useEffect(() => {
    console.log(authContext);
    if (authContext.userId && authContext.userId.length > 0) {
      history.push(`/dashboard/${authContext.userId}`);
    }
  }, [authContext.userId]);

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
    <BasicPage handleSignup={handleSignup} navItems={navItems} pageName="landing" version="production" formIcons={BetaFormIcons}>
      <Helmet>
        <title>Welcome - In the House</title>
        <meta name="description" content="The 'In the House' API provides political data from the UK government for easy querying, analysis or integration into your own app. Create your account, or login." />
      </Helmet>
      <Stack>
        <h1><img src={BigBen} />In the House {window.innerWidth < 768 && <br />} <span>{`{ ${version} }`}</span></h1>
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