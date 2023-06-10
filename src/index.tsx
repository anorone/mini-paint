import React from 'react';
import ReactDOM from 'react-dom/client';
import ThemeProvider from './providers/ThemeProvider';
import { initializeApp } from 'firebase/app';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG as string
);

const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <ThemeProvider>
        <CssBaseline />
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
