import * as React from 'react';

import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';
import { addProject, deleteProject, fetchFromUser } from '../../fetch';
import { InputCopy, ProjectForm, Projects, Stack } from '@in-the-house/ui';
import { IProject } from '@in-the-house/api-interfaces';

export function Keys() {
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

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
    const confirm = window.confirm('Generating a new API Key means your old one can\'t be used anymore, and you\'ll have to update all references to it. Are you sure you want a new key?');
    if (!confirm) return;
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
        name: 'Fetching projects error',
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
    const confirm = window.confirm('Deleting a project will also delete all of it\'s associated "usage" data. Are you sure you want to continue?');
    if (!confirm) return;
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

  const copyCallback = () => {
    modalsContext.addModal({
      name: 'Text copied',
      type: 'info',
      message: 'Copied your API Key to the clipboard.',
      isDismissible: true,
    });
  }

  return (
    <Stack sectionName="keys">
      <h2>Keys</h2>
      <p>
        To use In the House, you need an <mark>API Key</mark>, and a <mark>project ID</mark> for any
        website from which you want to query the API. You must keep these details secret,
        if you have any reason to believe that your keys have been compromised,
        generate some new ones and update your application/website code.
      </p>
      <div className="stack--small">
        <h3>API Key</h3>
        <p>
          Your API Key is a unique string that you must include as an 'api-key'
          header in any request to the API. View and generate new API keys below.
        </p>

        <div className="keys__controls">
          <button className="button-outline--primary" onClick={handleFetchApiKey} id="fetch-api-key">
            {(apiKey && apiKey.length > 0) ? "Hide your API key" : "See your API key"}
          </button>

          <button className="button-outline--green" onClick={handleGenerateApiKey} id="generate-api-key">
            Generate a new API Key
          </button>
        </div>

        {
          (apiKey && apiKey.length > 0) &&
          <InputCopy copyCallback={copyCallback} value={apiKey} />
        }
      </div>
      <div className="stack--small">
        <h3>Projects</h3>
        <p>
          Any website or app from which you want to send requests to the API must be
          setup as a project in your account. Each project must define a 'source' (this
          is simply the domain of the project, e.g. website.co.uk) and an 'id'. You cannot
          create a new 'project Id' - should you ever need to, you would have to delete the
          project and recreate it, which would come at a cost of all the usage data that has
          been recorded against that project. Manange your projects below:
        </p>

        <div className="keys__controls">
          <button className="button-outline--primary" onClick={handleFetchProjects} id="fetch-projects">
            {(projects && projects.length > 0) ? "Hide your Projects" : "See your Projects"}
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
