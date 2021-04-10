export default async function deleteProject(userId: string, accessToken: string, projId: string) {
  const response = await window.fetch(`/auth/user/${userId}/project`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ projId }),
    credentials: 'same-origin',
  });

  const data = await response.json();
  if (response.ok) return { status: 'success', data }
  else return { status: 'error', data }
}
