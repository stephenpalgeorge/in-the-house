import React from 'react';

export interface PasswordFormProps {}

export function PasswordForm(props: PasswordFormProps) {
  return (
    <form className="form" onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
    }}>
      <p className="form-title">Update your password</p>
    </form>
  );
}

export default PasswordForm;
