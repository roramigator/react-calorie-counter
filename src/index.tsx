import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import LocalStorageProvider from './context/localStorage';

import App from './App';

// import reportWebVitals from './reportWebVitals';

const div = document.getElementById('root');

if (!!div) {
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <LocalStorageProvider>
        <App />
      </LocalStorageProvider>
    </React.StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
