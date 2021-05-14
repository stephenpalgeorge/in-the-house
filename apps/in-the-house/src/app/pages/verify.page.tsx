import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { IVerifyURLParams } from '@in-the-house/api-interfaces';
import { BasicPage, Stack } from '@in-the-house/ui';
import { menuNav } from '../config/nav-items';

export function VerifyPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = React.useState<IVerifyURLParams>({});
  console.log(searchParams);

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

  const handleResend = async () => {
    // hit the api `/verify-resend` endpoint.
    const response = await window.fetch(
      '/auth/user/<id>'
    );
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
        <button onClick={handleResend} className="button-outline--red">
          Resend email
        </button>
      </Stack>
    </BasicPage>
  );
}
