import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import AppContextProvider from './context/AppContext';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <AppContextProvider>
  <App/>
  </AppContextProvider>
  </BrowserRouter>
  

);


reportWebVitals();
