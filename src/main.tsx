import React from 'react'
import App from './App.jsx'
import { createRoot } from 'react-dom/client';
import './index.css'

const root = createRoot(document.querySelector('#root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
