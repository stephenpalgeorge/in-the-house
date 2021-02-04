import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { ModalsProvider } from './app/contexts/modals-context';
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
