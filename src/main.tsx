import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '@/libs/redux/store.js';
import App from './App.jsx'

import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const root = createRoot(document.querySelector('#root')!);

root.render(
  <React.StrictMode>
    <ToastContainer className="notification"/>
    <Provider store={store.instance}>
      <App />
    </Provider>
  </React.StrictMode>,
)
