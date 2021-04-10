import React from 'react';

export interface PasswordFormProps {
  submit(updates: { current: string, new: string }): any,
}

export function PasswordForm({ submit }: PasswordFormProps) {
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('');

  const currentPasswordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    currentPasswordRef.current.focus();
  }, []);

  return (
    <form className="form password-form" onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      submit({ current: currentPassword, new: newPassword });
    }}>
      <p className="form-title">Update your password</p>

      <div className="form__form-field">
        <label htmlFor="current-password" className="form__form-field--label">Current password:</label>
        <input
          autoComplete="current-password"
          ref={currentPasswordRef}
          type="password"
          name="current-password"
          id="current-password"
          value={currentPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
          required={true}
        />
      </div>

      <fieldset className="form__fieldset form__fieldset--inline">
        <legend className="visuallyhidden">Enter, and confirm, your new password.</legend>
        <div className="form__form-field">
          <label htmlFor="new-password" className="form__form-field--label">New password:</label>
          <input
            autoComplete="new-password"
            type="password"
            name="new-password"
            id="new-password"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form__form-field">
          <label htmlFor="confirm-new-password" className="form__form-field--label">Re-type new password:</label>
          <input
            autoComplete="new-password"
            type="password"
            name="confirm-new-password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
          />
        </div>
      </fieldset>

      <button type="submit" disabled={
        confirmNewPassword.length === 0 ||
        newPassword.length === 0 ||
        currentPassword.length === 0 ||
        newPassword !== confirmNewPassword
      }>Change password</button>
    </form>
  );
}

export default PasswordForm;
