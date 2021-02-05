interface SignUpData {
  userId?: string,
  error?: {
    message: string,
    type: string,
  }
}

interface SignUpResponse {
  status: 'success'|'error',
  data: string,
}

export default async function signUp(email: string, password: string, username: string): Promise<SignUpResponse> {
  try {
    const response = await window.fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    
    const data: SignUpData = await response.json();
    if (!response.ok) throw data.error;
    return {
      status: 'success',
      data: data.userId
    };
  } catch (err) {
    console.error(err);
    if (err.message) return {
      status: 'error',
      data: err.message,
    };
  }
}