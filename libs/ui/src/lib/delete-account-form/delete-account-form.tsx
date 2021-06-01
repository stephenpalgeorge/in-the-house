import React from 'react';

export interface DeleteAccountFormProps {
  deleteHandler?(p: string): any,
}

export function DeleteAccountForm({ deleteHandler }: DeleteAccountFormProps) {
  const [password, setPassword] = React.useState<string>('');
  const passwordInputRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    passwordInputRef.current.focus();
  }, []);

  return (
    <form className="form delete-account-form" onSubmit={async (e: React.FormEvent) => {
      e.preventDefault();
      if (deleteHandler) await deleteHandler(password);
    }}>
      <div className="form__form-field">
        <input
          ref={passwordInputRef}
          type="password"
          name="delete-account-password"
          id="delete-account-password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <label htmlFor="delete-account-password">Enter your password:</label>
      </div>

      <button type="submit">Delete</button>
    </form>
  );
}

export default DeleteAccountForm;
