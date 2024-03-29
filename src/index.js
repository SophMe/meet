import React from 'react';
// import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';

atatus.config('0a47bcac788349ec82621bc2f0b3015a').install();
// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = document.getElementById('root');
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// atatus.notify(new Error('Test Atatus Setup'));