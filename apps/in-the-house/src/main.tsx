import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './app/contexts/auth.context';
import { ModalsProvider } from './app/contexts/modals.context';
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
