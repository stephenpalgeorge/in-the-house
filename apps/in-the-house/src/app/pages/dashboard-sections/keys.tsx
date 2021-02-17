import * as React from 'react';

import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';
import { fetchApiKey, generateApiKey } from '../../fetch';
import { InputCopy, Stack } from '@in-the-house/ui';

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

  const [apiKey, setApiKey] = React.useState<string>('');

  const handleFetchApiKey = async () => {
    if (apiKey.length > 0) {
      setApiKey('');
      return;
    }
    const response = await fetchApiKey(authContext.userId, authContext.accessToken);
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
    const response = await generateApiKey(authContext.userId, authContext.accessToken);
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

  return (
    <Stack sectionName="keys">
      <h2>Keys</h2>
      <p>
        To use In the House, you need an API Key, and a project ID for any 
        website from which you want to query the API. You can view and generate 
        these keys with the controls below. You must keep these details secret, 
        if you have any reason to believe that your keys have been compromised, 
        generate some new ones and update your application/website code.
      </p>

      <div className="keys__controls">
        <button className="button-outline--red" onClick={handleFetchApiKey} id="fetch-api-key">
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
    </Stack>
  )
}
