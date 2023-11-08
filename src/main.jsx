import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import {GoogleOAuthProvider} from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <GoogleOAuthProvider clientId="604595836281-re6t95b2ipci2749o5blhpl2de38mnj2.apps.googleusercontent.com">
      <App />
        </GoogleOAuthProvider>;
    </Router>
  </React.StrictMode>
);
