import React from 'react';
import { useHistory } from 'react-router-dom';

export interface SignupFormProps {
  closeForm?(): any,
  submit(email: string, password: string, username: string): any,
}

export function SignupForm({ closeForm, submit }: SignupFormProps) {
  const history = useHistory();
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [passwordConf, setPasswordConf] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [invalidForm, setInvalidForm] = React.useState<boolean>(true);
  const [errors, setErrors] = React.useState({
    username: '',
    password: '',
    passwordConf: '',
    email: '',
  });

  React.useEffect(() => {
    usernameInputRef.current.focus();
  }, [usernameInputRef]);
  // every time an error message is set, check if the form is now valid:
  React.useEffect(() => { checkValidForm() }, [errors]);

  // form submission, does some final validation and then calls whatever
  // callback has been provided in the props:
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      email.length === 0 || password.length === 0 ||
      passwordConf.length === 0 || username.length === 0
    ) return;
    await submit(email, password, username);
  }

  // if there are any error messages, or if any of the form fields
  // are emyty strings, then the form is not valid.
  const checkValidForm = () => {
    const errorMessages: string[] = [];
    for (const value of Object.values(errors)) {
      if (value.length > 0) errorMessages.push(value);
    }

    let isRequiredError: boolean = false;
    if (
      email.length === 0 ||
      password.length === 0 ||
      passwordConf.length === 0 ||
      username.length === 0
    ) isRequiredError = true;

    setInvalidForm(errorMessages.length > 0 || isRequiredError);
  }

  // function validates any field that has to have a value:
  const handleRequired = (v: string, field: 'username' | 'email') => {
    // if there's no value for the field, set an error:
    if (v.length === 0) setErrors({ ...errors, [field]: `${field} is required` });
    // otherwise, if there is currently an error for the field in question, clear it out:
    else if (errors[field].length > 0) setErrors({ ...errors, [field]: '' });
    // set field regardless, to keep state up to date with user input:
    field === 'email' ? setEmail(v) : setUsername(v);
  }

  // validates the password field, checks that it is at least 8 characters:
  const handlePassword = (v: string) => {
    if (v.length < 8) setErrors({ ...errors, password: 'password must be at least 8 characters' });
    else if (errors.password.length > 0) setErrors({ ...errors, password: '' });
    setPassword(v);
  }

  // confirm that the re-typed password matches the original password, helps users catch typos:
  const handlePasswordConf = (v: string) => {
    if (password.length > 0 && v !== password) setErrors({ ...errors, passwordConf: 'passwords do not match, check for typos :)' });
    else setErrors({ ...errors, passwordConf: '' });
    setPasswordConf(v);
  }

  // signup form loads on the /signup route, by moving back to the previous url
  // the form will no longer be rendered:
  const closeSignupForm = () => { closeForm ? closeForm() : history.goBack() };

  return (
    <form className="form signup-form" onSubmit={handleSubmit}>
      <button className="close-signup-form" onClick={closeSignupForm}>
        <div className="cross-bar"></div>
        <div className="cross-bar"></div>
      </button>

      <p className="form-title">Create an account</p>
      <div className="form__form-field">
        <label htmlFor="username" className="form__form-field--label">Username:</label>
        <input
          ref={usernameInputRef}
          id="username"
          name="username"
          type="text"
          value={username}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRequired(e.target.value, 'username')}
        />
        {
          errors.username.length > 0 &&
          <span className="error">{errors.username}</span>
        }
      </div>

      <div className="form__form-field">
        <label htmlFor="email" className="form__form-field--label">Email address:</label>
        <input
          id="email"
          name="email"
          type="text"
          value={email}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRequired(e.target.value, 'email')}
        />
        {
          errors.email.length > 0 &&
          <span className="error">{errors.email}</span>
        }
      </div>

      <fieldset className="form__fieldset">
        <legend className="visuallyhidden">Set password</legend>
        <div className="form__form-field">
          <label htmlFor="password" className="form__form-field--label">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePassword(e.target.value)}
          />
          {
            errors.password.length > 0 &&
            <span className="error">{errors.password}</span>
          }
        </div>
        <div className="form__form-field">
          <label htmlFor="password-conf" className="form__form-field--label">Re-type Password:</label>
          <input
            id="password-conf"
            name="password-conf"
            type="password"
            value={passwordConf}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordConf(e.target.value)}
          />
          {
            errors.passwordConf.length > 0 &&
            <span className="error">{errors.passwordConf}</span>
          }
        </div>
      </fieldset>

      <button type="submit" disabled={invalidForm}>Sign up</button>
    </form>
  );
}

export default SignupForm;
