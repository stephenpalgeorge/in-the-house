import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from './app/contexts/auth.context';
import { ModalsProvider } from './app/contexts/modals.context';
import App from './app/app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
