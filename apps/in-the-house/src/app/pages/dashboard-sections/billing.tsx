import * as React from 'react';
import { Stack } from '@in-the-house/ui';

export function Billing() {
  return (
    <Stack sectionName="billing">
      <h2>Billing details</h2>
      <p>
        <mark>In the House</mark> is currently in beta, which means we're not charging anyone
        to use it yet! But when we release version 1, we'll introduce different account types.
        You'll have the following options:
      </p>
      <ul>
        <li>
          <p><mark>Limited</mark> - Free (forever)</p>
          <p>Intended for development purposes only, this account type allows you 1 project, and up to 250 API calls/month.</p>
        </li>
        <li>
          <p><mark>Standard</mark> - £5 / €6 / $7 per month</p>
          <p>With a standard account, you can have up to 3 different projects, and up to 3000 API calls/month per project.</p>
        </li>
        <li>
          <p><mark id="stand-out">Unlimited</mark> - £10 / €12 / $14 per month</p>
          <p>Unlimited means exactly that - you can setup as many projects as you like, and we'll never cap your API usage.</p>
        </li>
      </ul>
    </Stack>
  )
}
