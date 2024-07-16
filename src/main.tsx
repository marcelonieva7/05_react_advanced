import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './libs/redux/store.js';
import App from './App.jsx'

import './index.css'

const root = createRoot(document.querySelector('#root')!);

root.render(
  <React.StrictMode>
    <Provider store={store.instance}>
      <App />
    </Provider>
  </React.StrictMode>,
)
