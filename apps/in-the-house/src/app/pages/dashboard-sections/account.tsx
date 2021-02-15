import * as React from 'react';
import { PasswordForm, EditUserForm, Stack } from '@in-the-house/ui';
import { IUserProfile } from '@in-the-house/api-interfaces';

import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';
import { updateUserProfile } from '../../fetch';

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
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [editPassword, setEditPassword] = React.useState<boolean>(false);
  const [editable, setEditable] = React.useState<boolean>(false);
  const [accountInfo, setAccountInfo] = React.useState<AccountProps>({
    email, firstName, lastName, username
  });

  React.useEffect(() => {
    setAccountInfo({ email, firstName, lastName, username});
  }, [email, firstName, lastName, username]);

  const handleEditSubmission = async (updates: IUserProfile) => {
    // check keys.length on updates object, if none, set modal and return
    if (Object.keys(updates).length === 0) {
      modalsContext.addModal({
        name: 'No updates',
        code: 304,
        type: 'info',
        message: 'The form data matches your current user details - there is nothing to update.',
        isDismissible: true,
      });
    } else {
      // if updates, hit the api and set modal on successful response
      const response = await updateUserProfile(authContext.userId, updates, authContext.accessToken);
      if (response.status === 'error') {
        modalsContext.addModal({
          name: 'Update error',
          code: 400,
          type: 'error',
          message: 'Could not update your account...',
          isDismissible: true,
        });
      } else {
        modalsContext.addModal({
          name: 'Details updated',
          code: 200,
          type: 'success',
          message: 'Your account details have been changed.',
          isDismissible: true,
        });
        if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
        if (response.data.user) {
          authContext.setUser(response.data.user);
          authContext.setUserId(response.data.user._id);
        }
      }
    }
  }

  return (
    <Stack sectionName="dashboard-account">
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

      <button
        className={`button-outline--primary ${editPassword ? 'active' : ''}`}
        id="change-password"
        onClick={() => setEditPassword(!editPassword)}
      >
        Change your password
      </button>

      {
        editPassword &&
        <PasswordForm />
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
