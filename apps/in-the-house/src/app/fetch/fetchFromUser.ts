export default async function fetchFromUser(accessToken: string, endpoint: string, method: 'POST'|'GET' = 'GET') {
  const response = await window.fetch(endpoint, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`
    },
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return { status: 'ok', data }
  else return { status: 'error', data }
}
