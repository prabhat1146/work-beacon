import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import dotenv from '.'
import NavBarContextProvider from './context/NavBarContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBarContextProvider>
      <App />
    </NavBarContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

