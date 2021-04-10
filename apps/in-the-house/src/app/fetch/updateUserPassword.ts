export default async function updateUserPassword(userId: string, accessToken: string, currentPassword: string, newPassword: string) {
  const response = await window.fetch(`/auth/user/${userId}/change-password`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ current: currentPassword, new: newPassword }),
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return { status: 'success', data }
  else return { status: 'error', data }
}
