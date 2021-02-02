import React from 'react';

export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // some basic validation
    // hit the api login endpoint with username and password:
  }

  return (
    <form className="form login-form" onSubmit={handleSubmit}>
      <p className="form-title">Login</p>
      <div className="form__form-field">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
      </div>
      <div className="form__form-field">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
    </form>
  );
}

export default LoginForm;
