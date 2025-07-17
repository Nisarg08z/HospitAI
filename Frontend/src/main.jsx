import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { PatientProvider } from './contexts/PatientContext'; 
import './index.css';
import '@xyflow/react/dist/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <PatientProvider>
        <App />
      </PatientProvider>
    </UserProvider>
  </React.StrictMode>
);
