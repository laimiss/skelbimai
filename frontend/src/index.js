import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdContextProvider } from './context/AdContext'
import { AuthContextProvider } from './context/AuthContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdContextProvider>
        <App />
      </AdContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
