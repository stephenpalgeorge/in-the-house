import React from 'react';

// export interface SignupFormProps {}

export function SignupForm() {
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

  React.useEffect(() => { checkValidForm() }, [errors]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const checkValidForm = () => {
    const errorMessages: string[] = [];
    let isRequiredError: boolean = false;
    for (const value of Object.values(errors)) {
      if (value.length > 0) errorMessages.push(value);
    }

    if (
      email.length === 0 ||
      password.length === 0 ||
      passwordConf.length === 0 ||
      username.length === 0
    ) isRequiredError = true;

    setInvalidForm(errorMessages.length > 0 || isRequiredError);
  }

  const handleRequired = (v: string, field: 'username'|'email') => {
    // if there's no value for the field, set an error:
    if (v.length === 0) setErrors({...errors, [field]: `${field} is required`});
    // otherwise, if there is currently an error for the field in question, clear it out:
    else if (errors[field].length > 0) setErrors({...errors, [field]: ''});
    // set field regardless, to keep state up to date with user input:
    field === 'email' ? setEmail(v) : setUsername(v);
  }

  const handlePassword = (v: string) => {
    if (v.length < 8) setErrors({...errors, password: 'password must be at least 8 characters'});
    else if (!/[a-z]/.test(password)) setErrors({...errors, password: 'password must contain at least one lowercase letter'});
    else if (!/[A-Z]/.test(password)) setErrors({...errors, password: 'password must contain at least one uppercase letter'});
    else if (errors.password.length > 0) setErrors({...errors, password: ''});
    setPassword(v);
  }

  const handlePasswordConf = (v: string) => {
    if (password.length > 0 && v !== password) setErrors({...errors, passwordConf: 'passwords do not match, check for typos :)'});
    else setErrors({...errors, passwordConf: ''});
    setPasswordConf(v);
  }


  return (
    <form className="form signup-form" onSubmit={handleSubmit}>
      <div className="form__form-field">
        <label htmlFor="username" className="form__form-field--label">Username</label>
        <input
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
        <label htmlFor="email" className="form__form-field--label">Email address</label>
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
        <div className="form__form-field">
          <label htmlFor="password" className="form__form-field--label">Password</label>
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
          <label htmlFor="password-conf" className="form__form-field--label">Re-type Password</label>
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
