import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';
import { addProject, deleteProject, fetchFromUser } from '../../fetch';
import { InputCopy, ProjectForm, Projects, Stack } from '@in-the-house/ui';
import { IProject } from '@in-the-house/api-interfaces';

/**
 * @todo fetch 'api_key' and 'projects' data for the current user when buttons are clicked.
 * This will require useParams hook and/or authContext to get logged in user id.
 *    - one button to view api_key DONE
 *    - one button to generate new api key DONE
 *    - display api key in an input that can be copied to clipboard.
 *    - one button to view projects - they should load in forms with a save button, to allow for
 *    inline editing of each project. Each one will also need the option to generate a new ID. Each
 *    project should have a delete button - require some auth (re-enter password? type project name?) 
 *    to confirm deletion.
 */

export function Keys() {
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);
  const keyRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [apiKey, setApiKey] = React.useState<string>('');
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [addingProject, setAddingProject] = React.useState<boolean>(false);

  const handleFetchApiKey = async () => {
    if (apiKey.length > 0) {
      setApiKey('');
      return;
    }
    const response = await fetchFromUser(authContext.accessToken, `/auth/user/${authContext.userId}/fetch-key`, "POST");
    if (response.status === 'error') {
      // set modal
      modalsContext.addModal({
        name: 'API Key error',
        code: 404,
        type: 'error',
        message: 'Couldn\'t find an API key for this account. Do you need to generate one?',
        isDismissible: true,
      });
    } else {
      if (response.data.apiKey) setApiKey(response.data.apiKey);
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
    }
  }

  const handleGenerateApiKey = async () => {
    const response = await fetchFromUser(authContext.accessToken, `/auth/user/${authContext.userId}/generate-key`, "POST");
    if (response.status === 'error') {
      // set modal
      modalsContext.addModal({
        name: 'Generate API Key error',
        code: 500,
        type: 'error',
        message: 'Couldn\'t create an API key...',
        isDismissible: true,
      });
    } else {
      if (response.data.apiKey) setApiKey(response.data.apiKey);
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
    }
  }

  const handleFetchProjects = async () => {
    if (projects.length > 0) {
      setProjects([]);
      return;
    };
    const response = await fetchFromUser(authContext.accessToken, `/auth/user/${authContext.userId}/projects`, "POST");
    if (response.status === 'error') {
      // set modal
      modalsContext.addModal({
        name: 'Fetching projcets error',
        code: 500,
        type: 'error',
        message: 'Couldn\'t fetch your projects...do you have any setup yet?',
        isDismissible: true,
      });
    } else {
      // response will include array of projects, update local state and 
      // accesstoken if there is one.
      if (response.data.projects) setProjects(response.data.projects);
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
    }
  }

  const handleAddProject = async (origin: string) => {
    const response = await addProject(authContext.userId, authContext.accessToken, origin);
    if (response.status === 'error') {
      modalsContext.addModal({
        name: 'Add project error',
        code: 406,
        type: 'error',
        message: 'Couldn\'t add this project, maybe check if you\'ve reached the project limit for your account type?',
        isDismissible: true,
      });
    } else {
      if (response.data.projects) setProjects(response.data.projects);
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
      setAddingProject(false);
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    const response = await deleteProject(authContext.userId, authContext.accessToken, projectId);
    if (response.status === 'error') {
      modalsContext.addModal({
        name: 'Delete project error',
        code: 400,
        type: 'error',
        message: 'Could not delete your project...',
        isDismissible: true,
      });
    } else {
      if (response.data.projects) setProjects(response.data.projects);
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
    }
  }

  return (
    <Stack sectionName="keys">
      <div className="keys-header">
        <h2>Keys</h2>
        <ul>
          <li onClick={() => window.scrollTo(0, window.scrollY + keyRef.current.getBoundingClientRect().top)}>
            <Link to={{pathname: location.pathname, hash: '#api-key'}}>API Key</Link>
          </li>
          <li onClick={() => window.scrollTo(0, window.scrollY + projectsRef.current.getBoundingClientRect().top)}>
            <Link to={{pathname: location.pathname, hash: '#projects'}}>Projects</Link>
          </li>
        </ul>
      </div>
      <p>
        To use In the House, you need an API Key, and a project ID for any 
        website from which you want to query the API. You must keep these details secret, 
        if you have any reason to believe that your keys have been compromised, 
        generate some new ones and update your application/website code.
      </p>
      <div className="stack--small" ref={keyRef}>
        <h3>API Key</h3>
        <p>
          Your API Key is a unique string that you must include as an 'api-key' 
          header in any request to the API. View and generate new API keys below.
        </p>

        <div className="keys__controls">
          <button className="button-outline--primary" onClick={handleFetchApiKey} id="fetch-api-key">
            { (apiKey && apiKey.length > 0) ? "Hide your API key" : "See your API key" }
          </button>

          <button className="button-outline--green" onClick={handleGenerateApiKey} id="generate-api-key">
            Generate a new API Key
          </button>
        </div>

        {
          (apiKey && apiKey.length > 0) &&
          <InputCopy value={apiKey} />
        }
      </div>
      <div className="stack--small" ref={projectsRef}>
        <h3>Projects</h3>
        <p>
          Any website or app from which you want to send requests to the API must be 
          setup as a project in your account. Each project must define a 'source' (this 
          is simply the domain of the project, e.g. website.co.uk) and an 'id'. Manange 
          your projects below:
        </p>

        <div className="keys__controls">
          <button className="button-outline--primary" onClick={handleFetchProjects} id="fetch-projects">
            { (projects && projects.length > 0) ? "Hide your Projects" : "See your Projects" }
          </button>

          <button className="button-outline--green" onClick={() => setAddingProject(true)} id="generate-api-key">
            Add a project
          </button>
        </div>

        {
          addingProject &&
          <ProjectForm close={() => setAddingProject(false)} submit={handleAddProject} />
        }
        <Projects deleteProject={handleDeleteProject} projects={projects} />
      </div>
    </Stack>
  )
}
