import React from 'react';

export interface LoginFormProps {
  submit(password: string, username: string): any,
}

export function LoginForm({ submit }: LoginFormProps) {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const usernameRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    usernameRef.current.focus();
  }, [usernameRef]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit(password, username);
  }

  return (
    <form className="form login-form" onSubmit={handleSubmit}>
      <p className="form-title">Login</p>
      <div className="form__form-field">
        <label htmlFor="username">Username:</label>
        <input
          ref={usernameRef}
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

      <button type="submit" disabled={username.length === 0 || password.length === 0}>Login</button>
    </form>
  );
}

export default LoginForm;
