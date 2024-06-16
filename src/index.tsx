import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'normalize.css';

import { App } from './App';
import './index.scss';

const appElement = (
  <BrowserRouter>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </BrowserRouter>
);

const container = document.querySelector('#root') as HTMLElement;
const hasChildNodes = container?.hasChildNodes() ?? false;

if (hasChildNodes) {
  ReactDOM.hydrateRoot(container, appElement);
} else {
  ReactDOM.createRoot(container).render(appElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
