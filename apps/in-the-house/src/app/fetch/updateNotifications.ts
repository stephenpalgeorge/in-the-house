export default async function updateNotifications(
  userId: string,
  accessToken: string,
  notification: string,
  method: 'PUT' | 'DELETE' = "PUT"
): Promise<string[] | undefined> {
  const response = await window.fetch(`/auth/user/${userId}/notifications`, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    credentials: 'same-origin',
    body: JSON.stringify({ notification }),
  });

  if (!response.ok) return undefined;
  const data = await response.json();
  return data.notifications;
}
