export default async function deleteUserAccount(userId: string, accessToken: string, password: string): Promise<string | undefined> {
  const response = await window.fetch(`/auth/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
    credentials: 'same-origin',
  });

  if (!response.ok) return undefined;
  const data = await response.json();
  return data.userId;
}