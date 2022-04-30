import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/app.css';
import FirebaseContext from './context/firebase';

import { app, db } from './firebase';

const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container);

root.render(

  <FirebaseContext.Provider value={{ app, db }}>
    <App />
  </FirebaseContext.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
