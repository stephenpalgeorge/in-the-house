import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DeleteAccountForm, PasswordForm, EditUserForm, Toggle, Stack } from '@in-the-house/ui';
import { IUserProfile } from '@in-the-house/api-interfaces';

import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';
import { deleteUserAccount, updateNotifications, updateUserPassword, updateUserProfile } from '../../fetch';
import toggles from '../../config/email-notifications';

export interface AccountProps {
  email?: string,
  firstName?: string,
  lastName?: string,
  username?: string,
  notifications?: string[],
  accountType?: [number, number],
}

export function Account({
  email = '',
  firstName = '',
  lastName = '',
  username = '',
  notifications = [],
  accountType = [0, 0],
}: AccountProps) {
  const history = useHistory();
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [editPassword, setEditPassword] = React.useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = React.useState<boolean>(false);
  const [editable, setEditable] = React.useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = React.useState<string[]>(notifications);
  const [accountInfo, setAccountInfo] = React.useState<AccountProps>({
    email, firstName, lastName, username,
  });

  const accountLevel = accountType[0] === 0 ? 'limited' : accountType[0] === 1 ? 'standard' : 'unlimited';
  const isAccountBillable = accountLevel === 'limited' || accountType[1] === 0 ? 'is not' : 'is';

  React.useEffect(() => {
    setAccountInfo({ email, firstName, lastName, username });
    setEmailNotifications(notifications);
  }, [email, firstName, lastName, username, notifications]);

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
        setEditable(false);
      }
    }
  }

  const handlePasswordSubmit = async (updates: { current: string, new: string }) => {
    if (updates.new.length === 0 || updates.new === updates.current) {
      // add a modal, nothing to update
    } else {
      // hit the 'change-password' endpoint with the current and new passwords
      const response = await updateUserPassword(authContext.userId, authContext.accessToken, updates.current, updates.new);
      if (response.status === 'error') {
        modalsContext.addModal({
          name: 'Update password error',
          code: 500,
          type: 'error',
          message: response.data.message,
          isDismissible: true,
        });
      } else {
        modalsContext.addModal({
          name: 'Password updated',
          code: 200,
          type: 'success',
          message: 'successfully changed your password',
          isDismissible: true,
        });
        setEditPassword(false);
      }
    }
  }

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const method = e.target.checked ? 'PUT' : 'DELETE';
    const notifications: string[] | undefined = await updateNotifications(authContext.userId, authContext.accessToken, e.target.id, method);
    if (!notifications) {
      // handle error
      modalsContext.addModal({
        name: 'Update notification error',
        code: 400,
        type: 'error',
        message: 'We could not update your email preferences...',
        isDismissible: true,
      });
      setEmailNotifications([...emailNotifications]);
    } else {
      // success
      setEmailNotifications(notifications);
    }
  }

  const handleDeleteAccount = async (pass: string) => {
    const confirm = window.confirm('You are about to delete your account and all your data. This cannot be undone. Are you sure you want to continue?');
    if (!confirm) return;
    const response = await deleteUserAccount(authContext.userId, authContext.accessToken, pass);
    if (!response) {
      modalsContext.addModal({
        name: 'Deletion error',
        code: 400,
        type: 'error',
        message: 'We could not delete your account...are you sure you typed the right password?',
        isDismissible: true,
      });
    } else {
      console.log('account deleted');
      history.push('/logout', { destination: '/goodbye' });
    }
  }

  return (
    <Stack sectionName="dashboard-account">
      <div className="account-header">
        <h2>Your account</h2>
      </div>

      <p className="user-info">
        Your account is registered to the <span>email</span> address <mark>{email}</mark>, with the <span>username</span> of <mark>{username}</mark>.
        Your current <span>account type</span> is <mark>{accountLevel}</mark> and <mark>{isAccountBillable}</mark> being charged. You can change your
        account type and card details in the <Link to={`/dashboard/${authContext.userId}/billing`}>billing details</Link> section.
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

      <div>
        <h3>Email Notifications</h3>
        <p>Turn off any emails that you don't want to receive by unchecking the relevant box below.</p>
      </div>
      {
        toggles.map(t => {
          return <Toggle label={t.label} description={t.description} handleApiCall={handleToggle} initial={emailNotifications.includes(t.slug)} key={t.id} />
        })
      }

      <div className="account-controls">
        <button
          className={`edit-button ${editable ? 'active' : ''}`}
          onClick={() => setEditable(!editable)}
        >
          {editable ? 'Hide form' : 'Edit account'}
        </button>
        <button
          className={`button-outline--primary ${editPassword ? 'active' : ''}`}
          id="change-password"
          onClick={() => setEditPassword(!editPassword)}
        >
          {editPassword ? 'Hide form' : 'Change your password'}
        </button>
      </div>

      {
        editPassword &&
        <PasswordForm submit={handlePasswordSubmit} />
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

      <button id="delete-link" onClick={() => setDeleteAccount(!deleteAccount)}>
        {deleteAccount ? 'Hide form' : 'Delete my account'}
      </button>
      {
        deleteAccount &&
        <DeleteAccountForm deleteHandler={handleDeleteAccount} />
      }
    </Stack>
  )
}
