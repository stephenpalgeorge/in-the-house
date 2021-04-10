import React from 'react';
import { IProject } from '@in-the-house/api-interfaces';

/**
 * PROJECTS (list)
 */
export interface ProjectsProps {
  projects: IProject[],
  deleteProject(projectId: string): any,
}

export function Projects({ projects = [], deleteProject }: ProjectsProps) {
  return (
    <div className="projects stack--small">
      {
        (projects && projects.length > 0) &&
        projects.map((proj, i) => (
          <div key={i} className="project">
            <p className="project-origin">{proj.origin}</p>
            <input
              type="text"
              name={`project-id-${i}`}
              id={`project-id-${i}`}
              className="project-id"
              value={proj.id}
              readOnly={true}
            />
            <button onClick={() => deleteProject(proj.id)} className="delete-project">
              <div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Projects;
