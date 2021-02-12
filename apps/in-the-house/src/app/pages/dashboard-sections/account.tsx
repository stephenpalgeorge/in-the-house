import * as React from 'react';
import { Stack, UserInfo } from '@in-the-house/ui';

export interface AccountProps {}

export function Account(props: AccountProps) {
  const [editable, setEditable] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>('');

  return (
    <Stack>
      <h2>Your account</h2>
      <p className="section-title">Personal details:</p>

      <UserInfo editable={editable} label="First name" value={firstName} setValue={setFirstName} />
    </Stack>
  )
}
