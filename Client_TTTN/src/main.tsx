import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/antd.css';
import './assets/scss/style.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
