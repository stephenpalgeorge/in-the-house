import React from 'react';
import { Link } from 'react-router-dom';
import { IUserProfile } from '@in-the-house/api-interfaces';

export interface EditUserFormProps {
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  submit(updates: IUserProfile): any,
}

export function EditUserForm({
  email = '',
  firstname = '',
  lastname = '',
  username = '',
  submit,
}: EditUserFormProps) {
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    firstNameRef.current.focus();
  }, [firstNameRef]);

  const [editEmail, setEditEmail] = React.useState<string>(email);
  const [editFirstname, setEditFirstname] = React.useState<string>(firstname);
  const [editLastname, setEditLastname] = React.useState<string>(lastname);
  const [editUsername, setEditUsername] = React.useState<string>(username);

  return (
    <form className="form edit-user-form" onSubmit={(e: React.FormEvent) => {
      e.preventDefault();
      const updates: IUserProfile = {};
      if (editEmail !== email) updates.email = editEmail;
      if (editFirstname !== firstname) updates.firstname = editFirstname;
      if (editLastname !== lastname) updates.lastname = editLastname;
      if (editUsername !== username) updates.username = editUsername;

      submit(updates);
    }}>
      <p className="form-title">Edit your account</p>

      <fieldset className="form__fieldset form__fieldset--inline">
        <legend className="visuallyhidden">Enter, and edit, your first and last name.</legend>
        <div className="form__form-field">
          <label htmlFor="edit-first-name" className="form__form-field--label">First name:</label>
          <input
            autoComplete="given-name"
            ref={firstNameRef}
            type="text"
            name="edit-first-name"
            id="edit-first-name"
            value={editFirstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditFirstname(e.target.value)}
          />
        </div>

        <div className="form__form-field">
          <label htmlFor="edit-last-name" className="form__form-field--label">Last name:</label>
          <input
            autoComplete="family-name"
            type="text"
            name="edit-last-name"
            id="edit-last-name"
            value={editLastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditLastname(e.target.value)}
          />
        </div>
      </fieldset>

      <div className="form__form-field">
        <label htmlFor="edit-username" className="form__form-field--label">Username:</label>
        <input
          autoComplete="username"
          type="text"
          name="edit-username"
          id="edit-username"
          value={editUsername}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditUsername(e.target.value)}
        />
      </div>

      <div className="form__form-field">
        <label htmlFor="edit-email" className="form__form-field--label">Email:</label>
        <input
          autoComplete="email"
          type="text"
          name="edit-email"
          id="edit-email"
          value={editEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditEmail(e.target.value)}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
}

export default EditUserForm;
