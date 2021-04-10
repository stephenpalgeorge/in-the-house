import { IUserProfile } from '@in-the-house/api-interfaces';

export default async function updateUserProfile(userId: string, updates: IUserProfile, accessToken: string) {
  const response = await window.fetch(`/auth/user/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updates),
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return {status: 'success', data }
  else return { status: 'error', data }
}
