import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import App from './App';
import './index.css';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string);
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
