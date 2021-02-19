export default async function generateApiKey(userId: string, accessToken: string) {
  const response = await window.fetch(`/auth/user/${userId}/generate-key`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return { status: 'success', data }
  else return { status: 'error', data }
}