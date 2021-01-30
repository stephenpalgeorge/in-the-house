import * as React from 'react';
import { Route } from 'react-router-dom';
import { ActionsProps, Actions, SignupForm, Stack } from '@in-the-house/ui';

export function LandingPage() {
  const landingPageActions: ActionsProps = {
    actions: [
      { label: 'Create my account', path: '/signup', color: 'accent-bright' },
      { label: 'Find out more', path: '/demo', color: 'dark' },
    ],
  }
  return (
    <main className="page contents contents--narrow">
      <Route path="/signup">
        {/* update callback to hit the api */}
        <SignupForm submissionCallback={() => null} />
      </Route>

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
    </main>
  );
}