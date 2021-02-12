import * as React from 'react';
import { EditUserForm, Stack } from '@in-the-house/ui';

export interface AccountProps {
  email?: string,
  firstName?: string,
  lastName?: string,
  username?: string,
}

export function Account({
  email = '',
  firstName = '',
  lastName = '',
  username = '',
}: AccountProps) {
  const [editable, setEditable] = React.useState<boolean>(false);
  const [accountInfo, setAccountInfo] = React.useState<AccountProps>({
    email, firstName, lastName, username
  });

  React.useEffect(() => {
    setAccountInfo({ email, firstName, lastName, username});
  }, [email, firstName, lastName, username]);

  const handleEditSubmission = () => {

  }

  return (
    <Stack>
      <div className="account-header">
        <h2>Your account</h2>
        <button className={`edit-button ${editable ? 'active' : ''}`} onClick={() => setEditable(!editable)}>Edit</button>
      </div>

      <p className="user-info">
        Your account is registered to the <span>email</span> address <mark>{email}</mark>, with the <span>username</span> of <mark>{username}</mark>.
      </p>
      {
        (firstName.length > 0 && lastName.length > 0) &&
        <p className="user-info">Your <span>name</span> is <mark>{firstName} {lastName}</mark></p>
      }
      {
        (firstName.length > 0 && lastName.length <= 0) &&
        <p className="user-info">Your <span>first name</span> is <mark>{firstName}</mark></p>
      }
      {
        (firstName.length <= 0 && lastName.length > 0) &&
        <p className="user-info">Your <span>last name</span> is <mark>{lastName}</mark></p>
      }

      {
        editable &&
        <EditUserForm
          email={accountInfo.email}
          firstname={accountInfo.firstName}
          lastname={accountInfo.lastName}
          username={accountInfo.username}
          submit={handleEditSubmission}
        />
      }
    </Stack>
  )
}
