import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LanguageProvider } from './context/LanguageContext';
import { LoaderProvider } from './context/LoaderContext';
import { fetchInitialData } from './utils/fetchData';
import './Olowa/Components/Loader.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoaderProvider fetchInitialData={fetchInitialData}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LoaderProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
