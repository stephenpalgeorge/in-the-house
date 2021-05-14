import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { IVerifyURLParams } from '@in-the-house/api-interfaces';
import { BasicPage, Stack } from '@in-the-house/ui';
import { menuNav } from '../config/nav-items';
import { ModalsContext } from '../contexts/modals.context';

export function VerifyPage() {
  const location = useLocation();

  const [verified, setVerified] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = React.useState<IVerifyURLParams>({});
  const [emailAddress, setEmailAddress] = React.useState<string>('');
  const modalsContext = React.useContext(ModalsContext);

  function parseSearchParams(search: string): IVerifyURLParams {
    const params = {};
    // remove the `&` from the location.search string, and create an array from the different params.
    const searchParams = search.substring(1).split('&');
    searchParams.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
    });

    return params;
  }

  React.useEffect(() => {
    // parse the url search params and update state:
    const params = parseSearchParams(location.search);
    if (!params.id || !params.hash) {
      console.warn('Couldn\'t find the right query params in the url...');
      return;
    };

    setSearchParams(params);
  }, []);

  React.useEffect(() => {
    const verifyUser = async (id: string, hash: string) => {
      const response = await window.fetch(
        `/auth/user/${id}/verify`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hash }),
        }
      );

      if (response.ok) {
        modalsContext.addModal({
          name: 'Account verified!',
          code: 200,
          type: 'success',
          message: 'You\'ve successfully verified your account! Login to get your API Keys and start building.',
          isDismissible: true,
        });
        setVerified(true);
      }
      else {
        modalsContext.addModal({
          name: 'Verification failed',
          code: 400,
          type: 'error',
          message: 'We couldn\'t verify your account. Try using the resend button below. If the problem persists, reach out at support@inthehouse.dev',
        });
      }
    }

    if (searchParams.id && searchParams.hash) {
      verifyUser(searchParams.id, searchParams.hash);
    }
  }, [searchParams]);

  const handleResend = async () => {
    // hit the api `/verify-resend` endpoint.
    const response = await window.fetch(
      '/auth/verify-resend', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailAddress }),
    });

    if (response.ok) {
      // handle success - add modal that says "email sent!"
      modalsContext.addModal({
        name: 'Email verification re-sent',
        code: 200,
        type: 'success',
        message: 'Email resent, please check your inbox and click on your new link...',
        isDismissible: true,
      });
    } else {
      // handle error - add modal that says "could not send email..."
      modalsContext.addModal({
        name: 'Email send error',
        code: 403,
        type: 'error',
        message: 'Could not resend the email, are you sure you gave the correct email address?',
        isDismissible: true,
      });
    }
  }

  return (
    <BasicPage navItems={menuNav} pageName="verify">
      <Helmet>
        <title>Verify - In the House</title>
        <meta name="description" content="This page will attempt to verify your email address to make sure your's is a genuine account!" />
        <meta property="og:description" content="This page will attempt to verify your email address to make sure your's is a genuine account!" />
        <meta name="twitter:description" content="This page will attempt to verify your email address to make sure your's is a genuine account!" />
      </Helmet>

      <Stack>
        <h1>Verifying your account...</h1>
        <p>
          We're just checking to make sure everything's as it should be. Once your
          account has been verified, you'll be able to use the API to the full extent
          of whatever tier you are on. If you have any questions, or if you've been sat
          on this page for ages and nothing has happened...just <a href="mailto:support@inthehouse.dev">email us</a>.
        </p>
        {
          !verified &&
          <form className="form" onSubmit={e => {
            e.preventDefault();
            handleResend();
          }}>
            <div className="form__form-field">
              <label htmlFor="email-address" className="form__form-field--label">Your email address:</label>
              <input
                autoComplete="email"
                type="text"
                name="email-address"
                id="email-address"
                value={emailAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailAddress(e.target.value)}
              />
            </div>
            <button disabled={emailAddress.length < 1} type="submit">
              Resend email
            </button>
          </form>
        }
      </Stack>
    </BasicPage>
  );
}
