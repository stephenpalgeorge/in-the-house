import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


import { BasicPage, Stack } from '@in-the-house/ui';
import { menuNav } from '../config/nav-items';

export function VerifyPage() {
  const params = useParams();
  console.log(params);

  const handleResend = () => {
    // hit the api `/verify-resend` endpoint.
  }

  return (
    <BasicPage navItems={menuNav}>
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
