interface LoginData {
  userId: string,
  accessToken: string,
}

interface LoginResponse {
  status: 'success'|'error',
  accessToken?: string,
  userId?: string,
  message?: string,
}

export default async function login(password: string, username: string): Promise<LoginResponse> {
  try {
    const response = await window.fetch('/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ password, username }),
    });

    const data: LoginData = await response.json();
    if (!response.ok) throw data;
    return {
      status: 'success',
      accessToken: data.accessToken,
      userId: data.userId,
    }
  } catch (err) {
    console.error(err);
    return {
      status: 'error',
      message: err.message || 'unspecified error with api /login route.',
    }
  }
}