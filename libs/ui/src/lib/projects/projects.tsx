import React from 'react';
import { IProject } from '@in-the-house/api-interfaces';

/**
 * PROJECT (single)
 */
export interface ProjectProps {
  id: string,
  index: number,
  origin: string,
  submit(project: IProject): any,
  newId(origin: string): any,
}

export function Project({ id, index, origin, submit, newId }: ProjectProps) {
  const [projectId, setProjectId] = React.useState<string>(id);
  const [projectOrigin, setProjectOrigin] = React.useState<string>(origin);
  React.useEffect(() => {
    setProjectId(id);
    setProjectOrigin(origin);
  }, [origin, id]);

  return (
    <form className="projects__project">
      <fieldset className="form__fieldset form__fieldset--inline">
        <div className="form__form-field">
          <label htmlFor={`project-${index}-origin`} className="form__form-field--label">Origin:</label>
          <input
            type="text"
            name={`project-${index}-origin`}
            id={`project-${index}-origin`}
            value={projectOrigin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectOrigin(e.target.value)}
          />
        </div>

        <div className="form__form-field">
          <label htmlFor={`project-${index}-id`} className="form__form-field--label">ID:</label>
          <input
            type="text"
            name={`project-${index}-id`}
            id={`project-${index}-id`}
            value={projectId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectId(e.target.value)}
            readOnly={true}
          />
          <button id="new-id" onClick={() => newId(origin)}>New ID</button>
        </div>
      </fieldset>
      
      <button type="submit" onClick={() => submit({origin, id})}>Save</button>
    </form>
  )
}


/**
 * PROJECTS (list)
 */
export interface ProjectsProps {
  projects: IProject[],
  saveProject(project: IProject): any,
  generateProjectId(origin: string): any,
}

export function Projects({ projects = [], saveProject, generateProjectId }: ProjectsProps) {
  return (
    <div className="projects">
      {
        (projects && projects.length > 0) &&
        projects.map((proj, i) => <Project id={proj.id} origin={proj.origin} index={i} submit={saveProject} newId={generateProjectId} />)
      }
    </div>
  );
}

export default Projects;
