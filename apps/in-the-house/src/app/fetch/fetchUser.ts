export default async function fetchUser(id: string, accessToken: string) {
  console.log(id, accessToken);
  const response = await window.fetch(`/auth/user/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${accessToken}`
    },
    credentials: 'same-origin',
  });
  console.log('response: ', response);

  const data = await response.json();
  console.log('data: ', data);
}