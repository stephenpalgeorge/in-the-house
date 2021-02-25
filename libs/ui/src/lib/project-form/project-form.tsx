import React from 'react';

export interface ProjectFormProps {
  close(): any,
  submit(origin: string): any,
}

export function ProjectForm({ close, submit }: ProjectFormProps) {
  const [origin, setOrigin] = React.useState<string>('');

  return (
    <form onSubmit={async (e: React.FormEvent) => {
      e.preventDefault();
      await submit(origin);
    }} className="form project-form">
      <div className="form__form-field">
        <label htmlFor="add-project-origin" className="form__form-field--label">Origin</label>
        <input
          type="text"
          name="add-project-origin"
          id="add-project-origin"
          value={origin}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrigin(e.target.value)}
        />
        <p className="help-text">
          Enter the domain of your website/app, i.e. if your project will live at 
          'https://www.awesome.org' then, in this field, type "awesome.org".
        </p>
      </div>

      <div className="project-form__controls">
        <button type="submit" disabled={origin.length === 0}>Save project</button>
        <button className="close button-outline--red" onClick={close}>Close</button>
      </div>
    </form>
  );
}

export default ProjectForm;
