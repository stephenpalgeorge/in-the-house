export default async function signUp(email: string, password: string, username: string) {
  try {
    const response = await window.fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
  
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}