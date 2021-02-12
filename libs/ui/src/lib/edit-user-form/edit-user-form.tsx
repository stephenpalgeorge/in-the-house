import React from 'react';

export interface EditUserFormProps {
  email: string,
  firstname: string,
  lastname: string,
  username: string,
  submit(): any,
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
      submit();
    }}>
      <p className="form-title">Edit your account</p>
      
      <fieldset className="form__fieldset form__fieldset--inline">
        <div className="form__form-field">
          <label htmlFor="edit-first-name" className="form__form-field--label">First name:</label>
          <input
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
