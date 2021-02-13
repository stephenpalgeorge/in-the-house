export default async function fetchUser(id: string, accessToken: string) {
  const response = await window.fetch(`/auth/user/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    },
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return { status: 'success', data }
  else return { status: 'error', data }
}
